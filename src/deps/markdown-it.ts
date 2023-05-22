import HighlightCode from "@/deps/code-highlight.ts";
import { signal } from "https://esm.sh/v110/@preact/signals-core@1.0.1/X-ZS8q/dist/signals-core";
const Articles = signal<{ [index: string]: { toc: string; body: string } }>({});
const CurrentArticle = signal<string>("");
export { Articles, CurrentArticle };

import MarkdownItAnchor from "https://cdn.jsdelivr.net/npm/markdown-it-anchor@8.6.7/+esm";
import MarkdownItToc from "https://cdn.jsdelivr.net/npm/markdown-it-toc-done-right@4.2.0/+esm";

//@deno-types="https://cdn.jsdelivr.net/npm/@types/markdown-it@12.2.3/+esm"
import MarkdownIt from "https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/+esm";
const exp = (content: string) => {
  if (Articles.value[CurrentArticle.value]) {
    return Articles.value[CurrentArticle.value];
  }
  let toc = "";
  const body = MarkdownIt({
    html: true,
    highlight: (str: string, lang: string) => {
      return HighlightCode(str, lang);
    },
  })
    .use(MarkdownItAnchor, {
      permalink: MarkdownItAnchor.permalink.headerLink(),
    })
    .use(MarkdownItToc, {
      callback: (html) => {
        toc = html;
      },
    })
    .render(content);
  Articles.value = {
    ...Articles.value,
    [CurrentArticle.value]: { toc, body },
  };
  return Articles.value[CurrentArticle.value];
};
export default exp;
