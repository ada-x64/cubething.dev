import { TwClass } from "@/deps/styles.ts";

export default function GfxIframe({
  title,
  src,
  width,
  height,
}: {
  title: string;
  src: string;
  width: number;
  height: number;
}) {
  if (window.innerWidth < 1028) {
    return <p>"Sorry, this only works on desktop for now!"</p>;
  } else {
    return (
      <iframe
        id="gfx-iframe"
        title={title}
        width={width}
        height={height}
        src={src}
        class={TwClass(["m-8"])}
      >
      </iframe>
    );
  }
}
