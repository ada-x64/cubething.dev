import AutoTheme from "@/components/svg/AutoTheme.svg.tsx";
import DarkTheme from "@/components/svg/DarkTheme.svg.tsx";
import LightTheme from "@/components/svg/LightTheme.svg.tsx";
import { Head } from "$fresh/src/runtime/head.ts";
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
}

export default function DarkModeToggle() {
  const theme = ThemeSignal.value;
  const themeText = theme === ThemeState.auto
    ? "Auto"
    : theme === ThemeState.light
    ? "Light"
    : theme === ThemeState.dark
    ? "Dark"
    : "ERROR";

  return (
    <>
      <Head>
        {/* Detect color scheme immediately to avoid FOUC */}
        <script src="/script/detectTheme.js"></script>
      </Head>
      <button title={`Toggle Theme - Current: ${themeText}`} onClick={setTheme}>
        {ThemeIcons[theme]}
      </button>
    </>
  );
}
