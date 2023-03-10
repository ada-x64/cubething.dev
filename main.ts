/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";

import twindPlugin from "twind_fresh_plugin/twind.ts";
import twindConfig from "@/twind.config.ts";

await start(manifest, {
  port: parseInt(Deno.env.get("DENO_PORT") ?? "8000"),
  plugins: [twindPlugin(twindConfig)],
});
