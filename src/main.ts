/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";

import freshwind from "freshwind/plugin.ts";
import config, { configUrl } from "@/twind.config.ts";

await start(manifest, {
  port: parseInt(Deno.env.get("DENO_PORT") ?? "8000"),
  plugins: [freshwind(config, configUrl)],
});
