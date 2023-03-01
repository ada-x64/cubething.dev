import { signal } from "@preact/signals";
import AutoTheme from "@/components/svg/AutoTheme.svg.tsx";
import DarkTheme from "@/components/svg/DarkTheme.svg.tsx";
import LightTheme from "@/components/svg/LightTheme.svg.tsx";
import { Head } from "$fresh/src/runtime/head.ts";

enum ThemeState {
  auto,
  light,
  dark,
  LEN,
}

const ThemeIcons = [<AutoTheme />, <LightTheme />, <DarkTheme />];

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
        {/* Detect color scheme FIRST THING */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.matchMedia("(prefers-color-scheme: dark)").matches
? document.documentElement.classList.add("dark")
: document.documentElement.classList.remove("dark");
        `,
          }}
        >
        </script>
      </Head>
      <button title={`Toggle Theme - Current: ${themeText}`} onClick={setTheme}>
        {ThemeIcons[theme]}
      </button>
    </>
  );
}
