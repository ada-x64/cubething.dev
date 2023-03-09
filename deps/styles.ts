export function TwClass(
  params:
    | {
      light?: string[];
      dark?: string[];
    }
    | string[],
) {
  if (Array.isArray(params)) {
    return params.join(" ");
  } else {
    return [
      params.light?.join(" "),
      params.dark?.map((item) => `dark:${item}`).join(" "),
    ].join(" ");
  }
}

export const Palette = {
  text: "stone-900",
  bg: "stone-100",
  accent: "orange-500",
  link: "stone-400",
  border: "stone-400",

  dark: {
    text: "zinc-100",
    bg: "zinc-900",
    accent: "amber-500",
    link: "zinc-400",
    border: "zinc-700",
  },
};

export const BorderColor =
  `border-${Palette.border} dark:border-${Palette.dark.border}`;
export const AccentText =
  `text-${Palette.accent} dark:text-${Palette.dark.accent}`;

export const Link = TwClass([
  `text-${Palette.text}`,
  `dark:text-${Palette.dark.text}`,
  "font-bold",
  "transition",
  "ease-linear",
  "duration-100",
]);

export const OutboundIndicator = TwClass([
  "after:text-xs",
  "after:align-bottom",
  "after:content-['↗']",
]);

export const InboundIndicator = TwClass([
  "after:text-xs",
  "after:align-bottom",
  "after:content-['#']",
]);

export const OutboundLink = TwClass([
  Link,
  OutboundIndicator,
  `hover:text-${Palette.accent}`,
  `hover:dark:text-${Palette.dark.accent}`,
  `focus:text-${Palette.accent}`,
  `focus:dark:text-${Palette.dark.accent}`,
]);

export const LocalAction = TwClass([
  Link,
  `hover:text-${Palette.link}`,
  `hover:dark:text-${Palette.dark.link}`,
  `focus:text-${Palette.link}`,
  `focus:dark:text-${Palette.dark.link}`,
]);
export const InboundLink = TwClass([LocalAction, InboundIndicator]);

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
  BorderColor,
  "w-full",
  "text-4xl",
]);

export const TimeStyle = TwClass([
  "text-stone-500",
  "dark:text-zinc-500",
  "dark:font-bold",
]);
