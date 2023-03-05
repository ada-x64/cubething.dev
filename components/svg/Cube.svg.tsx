export default function f({ size }: { size?: string | number }) {
  return (
    <svg
      width={size ?? "1em"}
      height={size ?? "1em"}
      viewBox="-10 -10 110 110"
      xmlns="http://www.w3.org/2000/svg"
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
  );
}
