import { Head } from "$fresh/src/runtime/head.ts";

export default function HeadComponent() {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" type="image/vnd.microsoft.icon" />
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link rel="stylesheet" href="/style/svg.css" />
      <link rel="stylesheet" href="/style/font.css" />
      <link rel="stylesheet" href="/style/toc.css" />
      <link rel="stylesheet" href="/style/global.css" />
      <link rel="stylesheet" href="/style/code.css" />
      <link
        href="https://api.fontshare.com/v2/css?f[]=chillax@600&f[]=synonym@400&display=swap"
        rel="stylesheet"
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
      <meta
        property="og:image"
        content="https://cubething.dev/meta/preview.png"
      />

      {/*<!-- Twitter -->*/}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://cubething.dev/" />
      <meta property="twitter:title" content="< cubething />" />
      <meta
        property="twitter:description"
        content="Personal home page of Ada Mandala. Posts about tech, art, philosophy. // Rust, Linux, WASM // Graphics, Games // Metaphysics, Aesthetics"
      />
      <meta
        property="twitter:image"
        content="https://cubething.dev/meta/preview.png"
      />
    </Head>
  );
}
