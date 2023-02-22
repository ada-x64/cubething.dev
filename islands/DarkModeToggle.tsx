import { signal } from "@preact/signals";
import AutoTheme from "@/components/svg/AutoTheme.svg.tsx";
import DarkTheme from "@/components/svg/DarkTheme.svg.tsx";
import LightTheme from "@/components/svg/LightTheme.svg.tsx";

enum ThemeState {
  auto,
  dark,
  light,
  LEN,
}

const ThemeIcons = [
  <AutoTheme size={48} />,
  <DarkTheme size={48} />,
  <LightTheme size={48} />,
];

const Theme = signal(ThemeState.auto);

export function setTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const addDark = () => {
    document.documentElement.classList.add("dark");
  };
  const rmDark = () => {
    document.documentElement.classList.remove("dark");
  };
  const checkAuto = () => {
    prefersDark ? addDark() : rmDark();
  };
  const checkManual = () => {
    Theme.value === ThemeState.dark ? addDark() : rmDark();
  };

  Theme.value = (Theme.value + 1) % ThemeState.LEN;
  Theme.value === ThemeState.auto ? checkAuto() : checkManual();
}

export default function DarkModeToggle() {
  const theme = Theme.value;

  return (
    <>
      <button onClick={setTheme}>{ThemeIcons[theme]}</button>
    </>
  );
}
