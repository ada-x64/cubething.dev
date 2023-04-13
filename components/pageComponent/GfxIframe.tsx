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
  return (
    <iframe
      id="gfx-iframe"
      title={title}
      width={width}
      height={height}
      src={src}
    >
    </iframe>
  );
}