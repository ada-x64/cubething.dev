import MarkdownIt from "@/deps/markdown-it.ts";
import { Head } from "$fresh/src/runtime/head.ts";

export default function renderMarkdown({ content }: { content: string }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="style/code.css" />
      </Head>
      <div
        class="prose prose-zinc dark:prose-invert mb-8"
        dangerouslySetInnerHTML={{ __html: MarkdownIt().render(content) }}
      >
      </div>
    </>
  );
}
