import { ComponentChild, ComponentChildren } from "preact";
import TwClass from "@/deps/tw-class.ts";

export const ItemSelectedStyle = TwClass(["text-sky-600", "font-semibold"]);
export const ItemSelectableStyle = TwClass({
  light: ["text-zinc-900", "hover:text-sky-600"],
  dark: ["text-zinc-300", "hover:text-sky-600"],
});
export const ItemStyle = TwClass([
  "px-2",
  "py-1",
  "mb-1",
  "rounded-sm",
  "text-sm",
  "font-medium",
  "text-center",
  "transition",
]);

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
          "flex",
          "flex-auto",
          "px-4",
          "text-xl",
          "font-sans",
          "sticky",
          "top-0",
          "self-start",
          `order-${order}`,
          "opacity-100",
          "transition-all",
          "ease-linear",
          "hover:opacity-100",
          `justify-${justify}`,
          "focus:opacity-100",
        ])}
        tabIndex={0}
        id={id}
      >
        <div class="w-24">
          <div
            class={TwClass([
              "flex",
              "flex-col",
              "flex-shrink-0",
              "items-center",
              "py-4",
              "mb-4",
              "border-b",
              "border-zinc-400",
              "dark:border-zinc-700",
              "w-full",
              "text-4xl",
            ])}
          >
            {icon}
          </div>
          <div class="flex flex-col">{children}</div>
        </div>
        {" "}
      </nav>
    </>
  );
}
