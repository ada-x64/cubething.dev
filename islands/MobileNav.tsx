import { TwClass } from "@/deps/styles.ts";
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

export const articleNav = [];

export const openMobileNav = () => {
  const nav = document.getElementById("mobile-nav");
  nav!.style.opacity = "1";
  nav!.style.zIndex = "100";
  document.body.style.overflow = "hidden";
};

export const closeMobileNav = () => {
  const nav = document.getElementById("mobile-nav");
  nav!.style.opacity = "0";
  nav!.style.zIndex = "-100";
  document.body.style.overflow = "auto";
};

export default function MobileNav({ route }: { route: string }) {
  const articleNav = route.includes("articles")
    ? (
      <div class={ItemContainerStyle}>
        <ArticleNavItems navigation={[]} route={route} />
      </div>
    )
    : null;
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
        onClick={openMobileNav}
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
        {articleNav}
        <div class={ItemContainerStyle}>
          <a class={ItemStyle} onClick={closeMobileNav}>
            close
          </a>
        </div>
      </nav>
    </>
  );
}
