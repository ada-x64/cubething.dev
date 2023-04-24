import { TwClass } from "@/deps/styles.ts";
import MobileNav, { toggleMobileNav } from "@/islands/MobileNav.tsx";
import Cube from "@/components/svg/Cube.svg.tsx";
import { computed, signal } from "@preact/signals";

const ButtonStyle = TwClass([
  "flex",
  "justify-center",
  "align-center",
  "fixed",
  "bottom-4",
  "right-4",
  "text-5xl",
  "lg:right-[20%]",
]);

export const navSignal = signal(false);

export default function NavBtn({ route }: { route: string }) {
  return (
    <nav class={TwClass(["flex", "justify-end", "lg:hidden"])}>
      <button
        id="mobile-nav-button"
        title="toggle navigation modal"
        class={ButtonStyle}
        onClick={toggleMobileNav}
      >
        <Cube />
      </button>
      <MobileNav route={route} />
    </nav>
  );
}
