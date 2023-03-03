import Prism from "@/deps/prismjs.ts";
import MarkdownIt from "@/deps/markdown-it.ts";
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
