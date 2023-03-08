import AutoTheme from "@/components/svg/AutoTheme.svg.tsx";
import DarkTheme from "@/components/svg/DarkTheme.svg.tsx";
import LightTheme from "@/components/svg/LightTheme.svg.tsx";
import { focusMobileNav } from "@/islands/MobileNav.tsx";
import { signal } from "@preact/signals";

enum ThemeState {
  auto,
  light,
  dark,
  LEN,
}

const ThemeIcons = [<AutoTheme />, <LightTheme />, <DarkTheme />];

function getTheme() {
  return parseInt(localStorage.getItem("theme") ?? "0");
}

const ThemeSignal = signal(getTheme());

export function setTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let theme = getTheme();

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
    theme === ThemeState.dark ? addDark() : rmDark();
  };

  theme = (theme + 1) % ThemeState.LEN;
  localStorage.setItem("theme", theme.toString());
  ThemeSignal.value = theme;
  theme === ThemeState.auto ? checkAuto() : checkManual();
  focusMobileNav();
}

export default function DarkModeToggle() {
  const theme = ThemeSignal.value;
  const themeText = theme === ThemeState.auto
    ? "auto"
    : theme === ThemeState.light
    ? "light"
    : theme === ThemeState.dark
    ? "dark"
    : "ERROR";

  // Color scheme is detected on load.
  // See @/static/scripts/detectColorScheme.js
  return (
    <button title={`toggle theme - current: ${themeText}`} onClick={setTheme}>
      {ThemeIcons[theme]}
    </button>
  );
}
