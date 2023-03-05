import Prism from "@/deps/prismjs.ts";

//@deno-types="npm:/@types/markdown-it"
import MarkdownIt from "npm:/markdown-it";
MarkdownIt({
  html: true,
  highlight: (str: string, lang: string) => {
    return Prism.highlight(str, Prism.languages[lang], lang);
  },
});
export default MarkdownIt;
