import { ComponentChildren } from "preact/src/index";
import { TwClass } from "@/deps/styles.ts";

export default function MainContent({
  twClass,
  children,
  id,
}: {
  twClass?: string;
  children: ComponentChildren;
  id?: string;
}) {
  return (
    <article id={id} class={TwClass([twClass ?? "", "order-2"])} tabIndex={0}>
      {children}
    </article>
  );
}
