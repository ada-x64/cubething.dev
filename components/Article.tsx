import { ComponentChildren } from "preact/src/index";
import Title from "@/components/Title.tsx";
import TwClass from "@/deps/tw-class.ts";

export default function Article({
  title,
  children,
}: {
  title: string;
  children: ComponentChildren;
}) {
  return (
    <article
      id="article"
      class={TwClass([
        "order-2",
        "max-w-screen-md",
        "px-4",
        "md:px-16",
        "flex-auto",
        "flex",
        "flex-col",
        "scroll-smooth",
        "container",
      ])}
      tabIndex={0}
    >
      <Title title={title} />
      {children}
    </article>
  );
}
