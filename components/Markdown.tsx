import Prism from "prismjs";
import "prismjs/components/prism-rust.js";
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-tsx.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-nginx.js";

import MarkdownIt from "markdown-it";
import { Head } from "$fresh/src/runtime/head.ts";

const md = MarkdownIt({
  highlight: (str: string, lang: string) => {
    return Prism.highlight(str, Prism.languages[lang], lang);
  },
});

export default function renderMarkdown({ content }: { content: string }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="style/code.css" />
      </Head>
      <div
        class="prose prose-zinc dark:prose-invert mb-8"
        dangerouslySetInnerHTML={{ __html: md.render(content) }}
      >
      </div>
    </>
  );
}
