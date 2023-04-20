import { ComponentChildren } from "preact/src/index";
import { TwClass } from "@/deps/styles.ts";

export default function ArticleBlurb({
  children,
}: {
  children: ComponentChildren;
}) {
  return <div class={TwClass(["text-center", "mx-1"])}>{children}</div>;
}
