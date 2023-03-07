import { BorderColor, TwClass } from "@/deps/styles.ts";

export default function Title({ title }: { title: string }) {
  return (
    <h1
      id="header"
      class={TwClass({
        light: [
          "text-center",
          "py-4",
          "mb-4",
          "text-3xl",
          "font-bold",
          "font-header",
          "text-orange-500",
          "lowercase",
          "border-b",
          BorderColor,
          "w-full",
        ],
        dark: ["text-amber-500"],
      })}
      style={[
        "transition: 0.125s linear;",
        "transition-property: color, height, margin, padding, font-size;",
      ].join(" ")}
    >
      {`< ${title} />`}
    </h1>
  );
}
