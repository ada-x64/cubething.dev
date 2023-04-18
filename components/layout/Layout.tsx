import { ComponentChildren } from "preact";
import Article from "@/components/pageComponent/Article.tsx";
import HeadComponent from "@/components/layout/Head.tsx";
import { TwClass } from "@/deps/styles.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import NavBtn from "@/islands/NavBtn.tsx";
import MainNav from "@/components/nav/MainNav.tsx";
import ArticleNav from "@/components/nav/ArticleNav.tsx";

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
        <title>{`cubething.dev → ${title.toLowerCase()}`}</title>
      </Head>
      <NavBtn route={route} />
      <main class={TwClass(["flex", "justify-center"])}>
        <MainNav route={route} />
        <ArticleNav route={route} />
        <Article
          title={title.toLowerCase()}
          children={children}
          route={route}
        />
      </main>
    </>
  );
}
