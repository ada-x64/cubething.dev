import TwClass from "@/deps/tw-class.ts";

export const ItemSelectedStyle = TwClass(["line-through", "text-zinc-400"]);
export const ItemStyle = TwClass([
  "px-2",
  "py-1",
  "mb-1",
  "rounded-sm",
  "text-base",
  "text-center",
  "transition",
]);

export const ItemListStyle = TwClass(["flex", "flex-col"]);

export const ItemContainerStyle = TwClass([
  "flex",
  "flex-col",
  "flex-shrink-0",
  "items-center",
  "py-4",
  "border-b",
  "border-zinc-400",
  "dark:border-zinc-700",
  "w-full",
  "text-4xl",
]);
