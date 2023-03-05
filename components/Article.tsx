import { ComponentChildren } from "preact/src/index";
import Title from "@/islands/Title.tsx";

export default function Article({
  route,
  children,
}: {
  route: string;
  children: ComponentChildren;
}) {
  return (
    <article
      id="article"
      class="order-2 max-w-screen-md px-16 md:mx-auto flex-auto flex flex-col"
      tabIndex={0}
    >
      <Title route={route} />
      {children}
    </article>
  );
}
