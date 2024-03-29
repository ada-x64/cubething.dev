import { GfxModuleMetadata } from "@/cdn/gfx-module.ts";
import { BorderColor, OutboundLink, TwClass } from "@/deps/styles.ts";
import CdnTime from "@/components/layout/CdnTime.tsx";

export default function GfxCard({
  module,
  index,
}: {
  module: GfxModuleMetadata;
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
          <div class={TwClass(["order-2", "sm:max-w-[50%]", textAlign])}>
            <h3 class={"text-lg font-header font-bold"}>{module.title}</h3>
            <CdnTime
              inline={true}
              publishedAt={module.publishedAt}
              lastCommit={module.lastCommit}
            />
            <div class="mt-4 font-normal">{module.snippet}</div>
          </div>
          <img
            class={TwClass([
              "border-1",
              "rounded",
              BorderColor,
              imgOrder,
              "mx-0.5",
              "h-fit",
              "self-center",
            ])}
            src={module.previewPath.toString()}
            alt={module.title}
            width={156} // 4 * 3 * 14 -> closest to 150
            height={117} // 156 / 4
          />
        </div>
      </a>
    </div>
  );
}
