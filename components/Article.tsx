import { ComponentChildren } from "preact/src/index";
import Title from "@/components/Title.tsx";
import { TwClass } from "@/deps/styles.ts";

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
        "px-4",
        "lg:px-16",
        "flex-auto",
        "flex",
        "flex-col",
        "scroll-smooth",
        "w-full",
        "md:max-w-screen-md",
      ])}
      tabIndex={0}
    >
      <Title title={title} />
      {children}
    </article>
  );
}
