import MainNav from "@/components/MainNav.tsx";
import { ComponentChildren } from "preact";
import ArticleNav from "@/components/ArticleNav.tsx";
import Article from "@/components/Article.tsx";
import HeadComponent from "@/components/Head.tsx";
import { TwClass } from "@/deps/styles.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import MobileNav from "@/islands/MobileNav.tsx";

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
      <HeadComponent />
      <Head>
        <title>{`< ${title.toLowerCase()} />`}</title>
      </Head>
      <main class={TwClass(["mx-auto", "flex"])}>
        <MainNav route={route} />
        <ArticleNav route={route} />
        <Article title={title.toLowerCase()} children={children} />
        <MobileNav route={route} />
      </main>
    </>
  );
}
