import { Head } from "$fresh/src/runtime/head.ts";
import { CDN_URL } from "@/deps/paths.ts";

export default function HeadComponent() {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" type="image/vnd.microsoft.icon" />
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link rel="stylesheet" href="/style/toc.css" />
      <link rel="stylesheet" href="/style/global.css" />
      <link href={CDN_URL + "/font/Fonts.css"} rel="stylesheet" />
      {/*<!-- Starry-night code highlighter theme -->*/}
      <link
        rel="stylesheet"
        href="https://esm.sh/@wooorm/starry-night@2/style/dark.css"
      />
      <script src="/scripts/detectTheme.js"></script>

      {/*<!-- Primary Meta Tags -->*/}
      <meta name="title" content="< cubething />" />
      <meta
        name="description"
        content="Personal home page of Ada Mandala. Posts about tech, art, philosophy. // Rust, Linux, WASM // Graphics, Games // Metaphysics, Aesthetics"
      />

      {/*<!-- Open Graph / Facebook -->*/}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://cubething.dev/" />
      <meta property="og:title" content="< cubething />" />
      <meta
        property="og:description"
        content="Personal home page of Ada Mandala. Posts about tech, art, philosophy. // Rust, Linux, WASM // Graphics, Games // Metaphysics, Aesthetics"
      />
      <meta property="og:image" content={CDN_URL + "/meta/preview.png"} />

      {/*<!-- Twitter -->*/}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://cubething.dev/" />
      <meta property="twitter:title" content="< cubething />" />
      <meta
        property="twitter:description"
        content="Personal home page of Ada Mandala. Posts about tech, art, philosophy. // Rust, Linux, WASM // Graphics, Games // Metaphysics, Aesthetics"
      />
      <meta property="twitter:image" content={CDN_URL + "/meta/preview.png"} />
    </Head>
  );
}
