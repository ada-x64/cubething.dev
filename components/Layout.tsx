import Nav from "@/components/Nav.tsx";
import { ComponentChildren } from "preact";

export default function Layout({ children }: { children: ComponentChildren }) {
  return (
    <main class="flex dark:bg-zinc-900 dark:text-zinc-100">
      <Nav />
      <article class="max-w-screen-md px-16 pt-8 md:mx-auto">
        {children}
      </article>
    </main>
  );
}
