import { ComponentChild, ComponentChildren } from "preact";
import { TwClass } from "@/deps/styles.ts";
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
          "h-fit",
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
          "lg:flex",
          "hidden",
        ])}
        tabIndex={-1}
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
