import Prism from "prismjs";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";

import MarkdownIt from "markdown-it";
const md = MarkdownIt({
  highlight: (str: string, lang: string) => {
    return Prism.highlight(str, Prism.languages[lang], lang);
  },
});

export default function renderMarkdown({ content }: { content: string }) {
  return (
    <div
      class="prose prose-zinc dark:prose-invert mb-8"
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
    >
    </div>
  );
}
