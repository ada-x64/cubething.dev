//@deno-types="npm:/@types/prismjs@1.26.0"
import Prism from "npm:/prismjs";
import loadLanguages from "npm:/prismjs/components/index.js";
loadLanguages([
  "rust",
  "jsx",
  "tsx",
  "typescript",
  "bash",
  "nginx",
  "docker",
  "dockerfile",
]);

export default Prism;
