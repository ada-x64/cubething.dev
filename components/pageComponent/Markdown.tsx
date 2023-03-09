import MarkdownIt, { CurrentArticle } from "@/deps/markdown-it.ts";
import { TwClass } from "@/deps/styles.ts";

export default function renderMarkdown({
  content,
  title,
}: {
  content: string;
  title: string;
}) {
  CurrentArticle.value = title;
  return (
    <div
      class={TwClass(["prose", "prose-zinc", "dark:prose-invert", "mb-8"])}
      dangerouslySetInnerHTML={{ __html: MarkdownIt(content).body }}
    >
    </div>
  );
}
