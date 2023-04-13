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
    return "Sorry, this only works on desktop!";
  } else {
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
}
