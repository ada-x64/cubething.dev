import { resolve } from "$std/path/mod.ts";
import * as dotenv from "https://deno.land/std@0.224.0/dotenv/mod.ts";

if (Deno.env.has("PROD")) {
  await dotenv.load({ envPath: "./prod.env", export: true });
} else {
  await dotenv.load({ envPath: "./dev.env", export: true });
}

export const CDN_URL = Deno.env.get("CDN_URL");

/// NOTE: You cannot use this in an island!
export const ScriptsPath = resolve("./static/scripts");
