import { join } from "$std/path/posix.ts";
import extract from "$std/encoding/front_matter/any.ts";
import { PostsPath } from "@/deps/paths.ts";

export interface Post {
  slug: string;
  title: string;
  mtime: Date | null;
  content: string;
  snippet: string;
}

export async function getPosts(max?: number): Promise<Post[]> {
  const files = Deno.readDir(PostsPath);
  const promises = [];
  let count = 0;
  for await (const file of files) {
    if (max && count++ > max) {
      break;
    }
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = (await Promise.all(promises)) as Post[];
  posts.sort((a, b) =>
    a.mtime && b.mtime ? b.mtime.getTime() - a.mtime.getTime() : Infinity
  );
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  const path = join(PostsPath, `${slug}.md`);
  const text = await Deno.readTextFile(path);
  const mtime = (await Deno.stat(path)).mtime;
  const { attrs, body } = extract<Record<string, string>>(text);
  return {
    slug,
    title: attrs.title,
    mtime,
    content: body,
    snippet: attrs.snippet,
  };
}
