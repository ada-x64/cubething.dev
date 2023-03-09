import {
  AccentText,
  BorderColor,
  OutboundIndicator,
  TwClass,
} from "@/deps/styles.ts";

export default function Title({ title }: { title: string }) {
  return (
    <h1
      id="header"
      class={TwClass([
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
      ])}
    >
      <a
        href="/"
        title={`article: ${title} - click to go home`}
        class={TwClass([AccentText, OutboundIndicator])}
      >
        {`< ${title} />`}
      </a>
    </h1>
  );
}
