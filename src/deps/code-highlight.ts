import {
  createStarryNight,
  common,
} from "https://esm.sh/@wooorm/starry-night@1";
import { toHtml } from "https://esm.sh/hast-util-to-html@8";

const starryNight = await createStarryNight(common);

export default function HighlightCode(value: string, lang: string): string {
  const scope = starryNight.flagToScope(lang);

  return toHtml({
    type: "element",
    tagName: "pre",
    properties: {
      className: scope
        ? [
            "highlight",
            "highlight-" + scope.replace(/^source\./, "").replace(/\./g, "-"),
          ]
        : undefined,
    },
    children: scope
      ? starryNight.highlight(value, scope).children
      : [{ type: "text", value }],
  });
}
