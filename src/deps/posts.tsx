import { CDN_URL } from "@/deps/paths.ts";
import { formatTime } from "@/deps/time.ts";
import { TimeStyle, TwClass } from "@/deps/styles.ts";

export interface Post {
  content: string;
  metadata: PostMetadata;
}

export class PostMetadata {
  slug: string;
  title: string;
  snippet: string;
  publishedAt: Date;
  lastCommit: Date;
  contentPath: URL;

  constructor(slug: string, postMetadata: any) {
    this.slug = slug;
    const frontmatter = postMetadata.frontmatter;
    this.title = frontmatter.title;
    this.snippet = frontmatter.snippet;
    this.publishedAt = new Date(frontmatter.publishedAt);
    this.lastCommit = new Date(postMetadata.lastCommitDate);
    this.contentPath = new URL(postMetadata.path);
  }

  getTime(inline: boolean) {
    const publishedAt = new Date(this.publishedAt);
    const lastCommit = new Date(this.lastCommit);
    let style = TwClass([TimeStyle]);
    if (inline) {
      style = TwClass([style, "text-sm"]);
    } else {
      style = TwClass([style, "text-center", "-mt-2", "mb-2"]);
    }
    let time;
    if (publishedAt !== lastCommit) {
      time = (
        <>
          First published {formatTime(publishedAt)}
          {(() => {
            if (!inline) {
              return <br />;
            } else {
              return " | ";
            }
          })()}
          Updated {formatTime(lastCommit)}
        </>
      );
    } else {
      time = <>{formatTime(publishedAt)}</>;
    }
    return <time class={style}> {time}</time>;
  }
}

export interface PostResponse {
  name: string;
  url: string;
  metadata: {
    lastCommitDate: string;
    contentType: string;
    frontmatter: {
      title: string;
      publishedAt: string;
      snippet: string;
    };
  };
}

export async function getPostMetadata(max?: number): Promise<PostMetadata[]> {
  const resp = await fetch("https://cdn.cubething.dev/posts/");
  const metadata: PostResponse[] = await resp.json();

  return metadata
    .map((d) => new PostMetadata(d.name.replace(".md", ""), d.metadata))
    .slice(max ? max + 1 : undefined);
}

export async function getPost(slug: string): Promise<Post> {
  const resp = await fetch(new URL(CDN_URL + "/posts/" + slug + ".md.meta"));
  const metadata = new PostMetadata(slug, await resp.json());
  const resp2 = await fetch(new URL(CDN_URL + "/posts/" + slug + ".md"));
  let content = await resp2.text();
  content = content.replace(/---\n(.*\n)*---\n/, "");
  return {
    content: content,
    metadata: metadata,
  };
}
