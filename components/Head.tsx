import { Head } from "$fresh/src/runtime/head.ts";

export default function HeadComponent() {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" href="/style/svg.css" />
      <link rel="stylesheet" href="/style/font.css" />
      <link rel="stylesheet" href="/style/toc.css" />
      <link rel="stylesheet" href="/style/global.css" />
      <link rel="stylesheet" href="/style/code.css" />
      <script src="/scripts/onScroll.js" />
      <script src="/scripts/detectTheme.js"></script>
    </Head>
  );
}
