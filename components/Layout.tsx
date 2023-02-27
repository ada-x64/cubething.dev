import Nav from "@/islands/Nav.tsx";
import { ComponentChildren } from "preact";
import Controls from "@/islands/Controls.tsx";
import { Head } from "$fresh/src/runtime/head.ts";
import Title from "@/islands/Title.tsx";

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
      </Head>

      <main class="dark:bg-zinc-900 dark:text-zinc-100 ">
        <div class="mx-auto flex max-w-screen-lg min-h-screen">
          <Nav route={route} />
          <article
            id="article"
            class="max-w-screen-md px-16 md:mx-auto border-x border-zinc-700 flex flex-col"
          >
            <Title route={route} />
            {children}
          </article>
          <Controls />
        </div>
      </main>
    </>
  );
}
