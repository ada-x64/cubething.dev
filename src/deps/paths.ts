import { resolve } from "$std/path/mod.ts";
import * as dotenv from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const root = Deno.env.has("DEPLOY") ? "./src/" : "./";

if (Deno.env.has("PROD")) {
  await dotenv.load({ envPath: root + "prod.env", export: true });
} else {
  await dotenv.load({ envPath: root + "dev.env", export: true });
}

console.log("root = " + Deno.realPathSync(root));
for (const item in Deno.readDirSync(root)) {
  console.log(item.name);
}

export const CDN_URL = Deno.env.get("CDN_URL");

/// NOTE: You cannot use this in an island!
export const ScriptsPath = resolve("./static/scripts");
