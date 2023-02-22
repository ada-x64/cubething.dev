export default function SvgCube({ size }: { size: number }) {
  return (
    <>
      <svg
        viewBox="-3 -3 106 106"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <polygon
          points="50,50 10,25 50,0 90,25"
          stroke-width="2"
          stroke="white"
          stroke-linejoin="round"
        >
        </polygon>
        <polygon
          points="50,50 10,25 10,75 50,100"
          stroke-width="2"
          stroke="white"
          class=""
          stroke-linejoin="round"
        >
        </polygon>
        <polygon
          points="50,50 90,25 90,75 50,100"
          stroke-width="2"
          stroke="white"
          stroke-linejoin="round"
        >
        </polygon>
      </svg>
    </>
  );
}
