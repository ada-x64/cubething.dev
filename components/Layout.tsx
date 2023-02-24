import Nav from "@/components/Nav.tsx";
import { ComponentChildren } from "preact";
import Controls from "@/components/Controls.tsx";
import { Head } from "$fresh/src/runtime/head.ts";

export default function Layout({
  route,
  children,
}: {
  route: string;
  children: ComponentChildren;
}) {
  function title() {
    const sliced = route.slice(1);
    const title = sliced.length > 0 ? sliced : "cubething";
    return (
      <h1 class="text-5xl text-center pb-8 font-bold font-header text-rose-500 dark:text-amber-500 lowercase">
        {`< ${title} />`}
      </h1>
    );
  }
  return (
    <>
      <Head>
        <link rel="stylesheet" href="style/svg.css" />
      </Head>

      <main class="dark:bg-zinc-900 dark:text-zinc-100 ">
        <div class="mx-auto flex max-w-screen-lg min-h-screen">
          <Nav route={route} />
          <article class="max-w-screen-md px-16 pt-8 md:mx-auto">
            {title()}
            {children}
          </article>
          <Controls />
        </div>
      </main>
    </>
  );
}
