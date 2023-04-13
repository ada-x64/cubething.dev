import GfxIframe from "@/components/pageComponent/GfxIframe.tsx";

export default function Test() {
  return (
    <GfxIframe
      src="/gfx-modules/model-import/index.html"
      title="gfx test"
      width={1024}
      height={768}
    >
    </GfxIframe>
  );
}
