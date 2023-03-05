import Prism from "@/deps/prismjs.ts";

//@deno-types="npm:/@types/markdown-it"
import MarkdownIt from "npm:/markdown-it";
const exp = MarkdownIt({
  html: true,
  highlight: (str: string, lang: string) => {
    return Prism.highlight(str, Prism.languages[lang], lang);
  },
});
export default exp;
