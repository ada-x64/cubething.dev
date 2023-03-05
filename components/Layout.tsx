import MainNav from "@/components/MainNav.tsx";
import { ComponentChildren } from "preact";
import ArticleNav from "@/components/ArticleNav.tsx";
import { Head } from "$fresh/src/runtime/head.ts";
import Article from "@/components/Article.tsx";

export default function Layout({
  route,
  children,
}: {
  route: string;
  children: ComponentChildren;
}) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="style/svg.css" />
        <link rel="stylesheet" href="style/font.css" />
        <script src="scripts/onScroll.js" />
      </Head>

      <main class="dark:bg-zinc-900 dark:text-zinc-100 ">
        <div class="mx-auto flex min-h-screen">
          <MainNav route={route} />
          <ArticleNav />
          <Article route={route} children={children} />
        </div>
      </main>
    </>
  );
}
