import { GfxMetadataResponse, GfxMetadataResponseMap } from "@/cdn/metadata.ts";
import { CDN_URL } from "@/deps/paths.ts";

export interface GfxModule {
  slug: string;
  title: string;
  publishedAt: Date;
  lastCommit: Date;
  textContent: string;
  snippet: string;
  modulePath: string;
}

export type GfxModuleMetadata = {
  slug: string;
  title: string;
  snippet: string;

  publishedAt: Date;
  lastCommit: Date;

  readmePath: URL;
  previewPath: URL;
  modulePath: URL;
};

function getLatestDate(value: GfxMetadataResponse): Date {
  return new Date(
    Math.max(
      +new Date(value["target.min.js"].lastCommitDate),
      +new Date(value["README.md"].lastCommitDate),
      +new Date(value["preview.webp"].lastCommitDate),
      +new Date(value["target_bg.wasm"].lastCommitDate)
    )
  );
}

export async function getGfxModuleMetadata(
  max?: number
): Promise<GfxModuleMetadata[]> {
  const resp = await fetch(CDN_URL + "/gfx/");
  const json = (await resp.json()) as GfxMetadataResponseMap;
  const metadata: GfxModuleMetadata[] = [];
  for (const [key, value] of Object.entries(json)) {
    // explcitly converts Dates to numbers with + operator
    // this way we don't get type complaints

    metadata.push({
      slug: key,
      title: value["README.md"].frontmatter.title,
      snippet: value["README.md"].frontmatter.snippet,
      publishedAt: new Date(value["README.md"].frontmatter.publishedAt),
      lastCommit: getLatestDate(value),
      readmePath: new URL(value["README.md"].url),
      previewPath: new URL(value["preview.webp"].url),
      modulePath: new URL(value["target.min.js"].url),
    });
  }

  metadata.sort((a, b) => +b.publishedAt - +a.publishedAt);

  if (max) {
    return metadata.slice(0, max);
  } else {
    return metadata;
  }
}

export async function getGfxModule(slug: string): Promise<GfxModule | null> {
  const metaResp = await fetch(CDN_URL + "/gfx/" + slug);
  const metadata = (await metaResp.json()) as GfxMetadataResponse;

  const textResp = await fetch(CDN_URL + "/gfx/" + slug + "/README.md");
  const textContent = await textResp.text();

  return {
    slug,
    title: metadata["README.md"].frontmatter.title,
    publishedAt: new Date(metadata["README.md"].frontmatter.publishedAt),
    lastCommit: getLatestDate(metadata),
    textContent,
    snippet: metadata["README.md"].frontmatter.snippet,
    modulePath: metadata["target.min.js"].url,
  };
}
