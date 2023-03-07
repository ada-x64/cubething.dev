import TwClass from "@/deps/tw-class.ts";
import Cube from "@/components/svg/Cube.svg.tsx";
import { ItemContainerStyle, ItemStyle } from "@/deps/styles.ts";
import DarkModeToggle from "@/islands/DarkModeToggle.tsx";
import { MainNavItems } from "@/components/MainNavItems.tsx";
import { ArticleNavItems } from "@/components/ArticleNavItems.tsx";

export const mainNav = [
  { name: "home", href: "/" },
  {
    name: "about",
    href: "/about",
  },
  {
    name: "archive",
    href: "/archive",
  },
];

export const articleNav = [
  {
    name: "top",
    href: "#",
  },
];

export default function MobileNav({ route }: { route: string }) {
  const openNav = () => {
    const nav = document.getElementById("mobile-nav");
    nav!.style.opacity = "1";
    nav!.style.zIndex = "100";
    document.body.style.overflow = "hidden";
  };

  const closeNav = () => {
    const nav = document.getElementById("mobile-nav");
    nav!.style.opacity = "0";
    nav!.style.zIndex = "-100";
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <button
        class={TwClass([
          "flex",
          "justify-center",
          "align-center",
          "md:hidden",
          "fixed",
          "right-2",
          "bottom-2",
          "text-5xl",
        ])}
        onClick={openNav}
      >
        <Cube />
      </button>
      <nav
        id="mobile-nav"
        class={TwClass([
          "fixed",
          "container",
          "w-full",
          "h-full",
          "transition-all",
          "ease-linear",
          "flex",
          "flex-col",
          "bg-stone-100",
          "dark:bg-zinc-900",
        ])}
        style="opacity: 0; z-index: -100"
      >
        <div class={ItemContainerStyle}>
          <DarkModeToggle />
        </div>
        <div class={ItemContainerStyle}>
          <MainNavItems navigation={mainNav} route={route} />
        </div>
        <div class={ItemContainerStyle}>
          <ArticleNavItems navigation={articleNav} />
        </div>
        <div class={ItemContainerStyle}>
          <a class={ItemStyle} onClick={closeNav}>
            close
          </a>
        </div>
      </nav>
    </>
  );
}
