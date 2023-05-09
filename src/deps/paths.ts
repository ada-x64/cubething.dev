import { resolve } from "$std/path/mod.ts";

export const CDN_URL = "https://cdn.cubething.dev";
export const POSTS_URL = CDN_URL + "/posts/";
export const GfxPath = resolve("./static/gfx-modules");
export const DataPath = resolve("./static/data");
/// NOTE: You cannot use this in an island!
export const ScriptsPath = resolve("./static/scripts");
