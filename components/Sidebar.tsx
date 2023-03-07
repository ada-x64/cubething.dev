import { ComponentChild, ComponentChildren } from "preact";
import TwClass from "@/deps/tw-class.ts";
import { ItemContainerStyle } from "@/deps/styles.ts";

export default function Sidebar({
  icon,
  order,
  ariaLabel,
  id,
  children,
  justify,
}: {
  icon: ComponentChild;
  order: number;
  ariaLabel: string;
  id: string;
  children: ComponentChildren;
  justify: "left" | "right";
}) {
  return (
    <>
      <nav
        aria-label={ariaLabel}
        class={TwClass([
          "h-screen",
          "flex-auto",
          "px-4",
          "text-xl",
          "font-sans",
          "sticky",
          "top-0",
          `order-${order}`,
          "opacity-100",
          "transition-all",
          "ease-linear",
          "hover:opacity-100",
          `justify-${justify}`,
          "focus:opacity-100",
          "md:flex",
          "hidden",
        ])}
        tabIndex={0}
        id={id}
      >
        <div class="w-24">
          <div class={ItemContainerStyle.concat(" mb-4")}>{icon}</div>
          {children}
        </div>
      </nav>
    </>
  );
}
