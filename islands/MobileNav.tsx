import { LocalAction, TwClass } from "@/deps/styles.ts";
import { ItemContainerStyle, ItemStyle } from "@/deps/styles.ts";
import DarkModeToggle from "@/islands/DarkModeToggle.tsx";
import { MainNavItems } from "@/components/nav/MainNavItems.tsx";
import { ArticleNavItems } from "@/components/nav/ArticleNavItems.tsx";
import { navSignal } from "@/islands/NavBtn.tsx";

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

export const getMobileNav = () => {
  return {
    wrapper: document.getElementById("mobile-nav-wrapper"),
    nav: document.getElementById("mobile-nav"),
  };
};

export const focusMobileNav = () => {
  setTimeout(() => {
    getMobileNav().nav!.focus();
  }, 100);
};

export const toggleMobileNav = () => {
  navSignal.value ? closeMobileNav() : openMobileNav();
};

export const openMobileNav = () => {
  navSignal.value = true;
  //timeout - wait for redraw
  setTimeout(() => {
    const { wrapper, nav } = getMobileNav();
    wrapper!.style.opacity = "1";
    nav!.focus();
  }, 100);
};

export const closeMobileNav = () => {
  const { wrapper } = getMobileNav();
  wrapper!.style.opacity = "0";
  setTimeout(() => {
    navSignal.value = false;
  }, 100);
};

export const onBlur = () => {
  setTimeout(() => {
    const { nav } = getMobileNav();
    if (nav!.contains(document.activeElement) === false) {
      closeMobileNav();
    }
  }, 100);
};

const WrapperStyle = TwClass([
  "fixed",
  "transition-all",
  "ease-linear",
  "top-0",
  "w-screen",
  "h-screen",
  "flex",
  "justify-center",
  "items-center",
  "z-50",
]);

const NavStyle = TwClass([
  "flex",
  "flex-col",
  "bg-stone-100",
  "dark:bg-zinc-900",
  "w-80",
  "min-h-1/2",
  "top-1/4",
  "border-2",
  "border-stone-900",
  "dark:border-zinc-100",
  "rounded-md",
]);

export default function MobileNav({ route }: { route: string }) {
  return !navSignal.value ? null : (
    <div
      id="mobile-nav-wrapper"
      class={WrapperStyle}
      style="opacity:0"
      tabIndex={-1}
    >
      <nav id="mobile-nav" class={NavStyle} onBlur={onBlur} tabIndex={-1}>
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
          <button
            class={TwClass([LocalAction, ItemStyle])}
            title="close this navigation modal"
            onClick={closeMobileNav}
          >
            close
          </button>
        </div>
      </nav>
    </div>
  );
}
