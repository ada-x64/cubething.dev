import { GfxModule } from "@/deps/gfx-module.ts";
import {
  BorderColor,
  OutboundLink,
  TimeStyle,
  TwClass,
} from "@/deps/styles.ts";
import { getTime } from "@/deps/time.ts";

export default function GfxCard({
  module,
  index,
}: {
  module: GfxModule;
  index: number;
}) {
  const hoverStyle = OutboundLink.split(" ")
    .map((s) =>
      s.startsWith("hover:")
        ? `hover:[&_h3]:${s.replace("hover:", "")}`
        : `[&_h3]:${s}`
    )
    .join(" ");

  const imgOrder = index % 2 == 0 ? "order-3" : "order-1";
  const textAlign = index % 2 == 0 ? "text-left" : "text-right";

  return (
    <div class={TwClass(["mt-4", "pt-4", "border-t", BorderColor])}>
      <a href={`/gfx/${module.slug}`}>
        <div
          class={TwClass([hoverStyle, "flex", "justify-between"])}
          tabIndex={0}
        >
          <div class={TwClass(["order-2", textAlign])}>
            <h3 class={"text-lg font-header font-bold"}>{module.title}</h3>
            <time class={TwClass([TimeStyle, "text-sm"])}>
              {getTime(module.mtime)}
            </time>
            <div class="mt-4 font-normal">{module.snippet}</div>
          </div>
          <img
            class={TwClass([
              "border-1",
              "rounded",
              BorderColor,
              imgOrder,
              "w-[150px]",
              "mx-0.5",
            ])}
            src={`/gfx-modules/${module.slug}/preview.png`}
            alt={module.title}
          />
        </div>
      </a>
    </div>
  );
}
