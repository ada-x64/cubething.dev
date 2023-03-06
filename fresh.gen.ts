// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/about.tsx";
import * as $1 from "./routes/archive.tsx";
import * as $2 from "./routes/articles/[slug].tsx";
import * as $3 from "./routes/contact.tsx";
import * as $4 from "./routes/index.tsx";
import * as $$0 from "./islands/DarkModeToggle.tsx";
import * as $$1 from "./islands/HomeBtn.tsx";

const manifest = {
  routes: {
    "./routes/about.tsx": $0,
    "./routes/archive.tsx": $1,
    "./routes/articles/[slug].tsx": $2,
    "./routes/contact.tsx": $3,
    "./routes/index.tsx": $4,
  },
  islands: {
    "./islands/DarkModeToggle.tsx": $$0,
    "./islands/HomeBtn.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;