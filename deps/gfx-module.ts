import extract from "$std/encoding/front_matter/any.ts";
import { join } from "$std/path/mod.ts";
import { GfxPath } from "@/deps/paths.ts";

export interface GfxModule {
  slug: string;
  title: string;
  mtime: Date | null;
  text_content: string;
  snippet: string;
}

export async function getGfxModules(max?: number): Promise<GfxModule[]> {
  const dirs = Deno.readDir(GfxPath);
  const promises = [];
  let count = 0;
  for await (const dir of dirs) {
    if (max && count++ > max) {
      break;
    }
    const slug = dir.name;
    promises.push(getGfxModule(slug));
  }
  const posts = (await Promise.all(promises)) as GfxModule[];
  posts.sort((a, b) =>
    a.mtime && b.mtime ? b.mtime.getTime() - a.mtime.getTime() : Infinity
  );
  return posts;
}

export async function getGfxModule(slug: string): Promise<GfxModule | null> {
  const path = join(GfxPath, slug);
  const readme_path = join(path, "README.md");
  const readme = await Deno.readTextFile(readme_path);
  const mtime = (await Deno.stat(path)).mtime;
  const { attrs, body } = extract<Record<string, string>>(readme);
  return {
    slug,
    title: attrs.title,
    mtime,
    text_content: body,
    snippet: attrs.snippet,
  };
}
