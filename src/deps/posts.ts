import { CDN_URL } from "@/deps/paths.ts";
import { PostMetadataResponse } from "@/deps/metadata.ts";

// NOTE: No post cache. Rendered posts are cached at markdown-it.ts Articles object
// No point to having post request cache. Need to check if it's been updated every time.

export class PostMetadata {
  slug: string;
  title: string;
  snippet: string;
  publishedAt: Date;
  lastCommit: Date;
  contentPath: URL;

  constructor(slug: string, postMetadata: PostMetadataResponse) {
    this.slug = slug;
    const frontmatter = postMetadata.frontmatter;
    this.title = frontmatter.title;
    this.snippet = frontmatter.snippet;
    this.publishedAt = new Date(frontmatter.publishedAt);
    this.lastCommit = new Date(postMetadata.lastCommitDate);
    this.contentPath = new URL(postMetadata.url);
  }
}
export interface Post {
  content: string;
  metadata: PostMetadata;
}

export async function getPostMetadata(max?: number): Promise<PostMetadata[]> {
  const resp = await fetch("https://cdn.cubething.dev/posts/");
  const json = await resp.json();
  const metadata: { [x: string]: PostMetadataResponse } = json;
  const mapped = [];
  for (const key in metadata) {
    mapped.push(new PostMetadata(key.replace(".md", ""), metadata[key]));
  }

  mapped.sort((a, b) => +b.publishedAt - +a.publishedAt);

  if (max) {
    return mapped.slice(0, max);
  } else {
    return mapped;
  }
}

export async function getPost(slug: string): Promise<Post> {
  const resp = await fetch(
    new URL(CDN_URL + "/posts/" + slug + ".md" + "?meta=true")
  );
  const metadata = new PostMetadata(slug, await resp.json());
  const resp2 = await fetch(new URL(CDN_URL + "/posts/" + slug + ".md"));
  let content = await resp2.text();
  content = content.replace(/---\n(.*\n)*---\n/, "");
  return {
    content: content,
    metadata: metadata,
  };
}
