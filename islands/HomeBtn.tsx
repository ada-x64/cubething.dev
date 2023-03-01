import Cube from "@/components/svg/Cube.svg.tsx";

export default function HomeBtn() {
  return (
    <a id="homeBtn" href="/" alt="Home" tabIndex={0}>
      <Cube />
    </a>
  );
}
