// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[slug].tsx";
import * as $1 from "./routes/about.tsx";
import * as $2 from "./routes/archive.tsx";
import * as $3 from "./routes/contact.tsx";
import * as $4 from "./routes/index.tsx";
import * as $$0 from "./islands/DarkModeToggle.tsx";

const manifest = {
  routes: {
    "./routes/[slug].tsx": $0,
    "./routes/about.tsx": $1,
    "./routes/archive.tsx": $2,
    "./routes/contact.tsx": $3,
    "./routes/index.tsx": $4,
  },
  islands: {
    "./islands/DarkModeToggle.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
