import MarkdownIt, { CurrentArticle } from "@/deps/markdown-it.ts";

export default function renderMarkdown({
  content,
  title,
}: {
  content: string;
  title: string;
}) {
  CurrentArticle.value = title;
  return (
    <>
      <div
        class="prose prose-zinc dark:prose-invert mb-8"
        dangerouslySetInnerHTML={{ __html: MarkdownIt(content).body }}
      >
      </div>
    </>
  );
}
