import MainNav from "@/components/MainNav.tsx";
import { ComponentChildren } from "preact";
import ArticleNav from "@/components/ArticleNav.tsx";
import Article from "@/components/Article.tsx";
import Head from "@/components/Head.tsx";
import TwClass from "@/deps/tw-class.ts";

export default function Layout({
  route,
  title,
  children,
}: {
  route: string;
  title: string;
  children: ComponentChildren;
}) {
  return (
    <>
      <Head />
      <main
        class={TwClass([
          "bg-stone-100",
          "text-stone-900",
          "dark:bg-zinc-900",
          "dark:text-zinc-100",
        ])}
      >
        <div class={TwClass(["mx-auto", "flex", "min-h-screen"])}>
          <MainNav route={route} />
          <ArticleNav route={route} />
          <Article title={title.toLowerCase()} children={children} />
        </div>
      </main>
    </>
  );
}
