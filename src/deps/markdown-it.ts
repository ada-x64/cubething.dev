import HighlightCode from "./code-highlight.ts";
import { signal } from "https://esm.sh/v110/@preact/signals-core@1.0.1/X-ZS8q/dist/signals-core";
const Articles = signal<{ [index: string]: { toc: string; body: string } }>({});
const CurrentArticle = signal<string>("");
export { Articles, CurrentArticle };

import MarkdownItAnchor from "npm:/markdown-it-anchor";
import MarkdownItToc from "npm:/markdown-it-toc-done-right";

//@deno-types="npm:/@types/markdown-it"
import MarkdownIt from "npm:/markdown-it";
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
  console.log(Articles.value);
  return Articles.value[CurrentArticle.value];
};
export default exp;
