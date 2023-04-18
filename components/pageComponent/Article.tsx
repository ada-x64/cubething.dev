import { ComponentChildren } from "preact/src/index";
import Title from "@/components/pageComponent/Title.tsx";
import { TwClass } from "@/deps/styles.ts";
import MainContent from "@/components/pageComponent/MainContent.tsx";

export default function Article({
  title,
  route,
  children,
}: {
  title: string;
  route: string;
  children: ComponentChildren;
}) {
  return (
    <MainContent
      id="article"
      twClass={TwClass([
        "px-4",
        "lg:px-16",
        "flex-auto",
        "flex",
        "flex-col",
        "scroll-smooth",
        "w-full",
        "md:max-w-screen-md",
      ])}
    >
      <Title title={title} route={route} />
      {children}
    </MainContent>
  );
}
