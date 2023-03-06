import Cube from "@/components/svg/Cube.svg.tsx";

export default function HomeBtn() {
  return (
    <a id="homeBtn" href="/" title="home" tabIndex={0}>
      <Cube />
    </a>
  );
}
