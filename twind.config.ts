import { defineConfig } from "@twind/core";
import presetAutoPrefix from "@twind/preset-autoprefix";
import presetTailWind from "@twind/preset-tailwind";
import presetTypography from "@twind/preset-typography";

export default defineConfig({
  presets: [
    presetAutoPrefix(),
    presetTailWind(),
    presetTypography({
      extend: {
        "h1, h2, h3, h4": {
          "text-transform": "lowercase",
          "font-family": "Chillax, sans",
          "text-align": "center",
        },
        "h2, h3, h4": {
          "margin-top": 0,
        },
        ".table-of-contents > ol": {
          width: "max-content",
          margin: "auto",
          "border-top": "1px solid var(--zinc-600)",
          "border-bottom": "1px solid var(--zinc-600)",
          "padding-top": "1em",
          "padding-bottom": "1em",
        },
      },
    }),
  ],
  theme: {
    fontFamily: {
      mono: [
        "Fira Code Nerd Font",
        "Ubuntu Mono Nerd Font",
        "Consolas",
        "mono",
      ],
      header: ["Chillax", "sans"],
      sans: ["Synonym", "sans"],
    },
    container: {
      center: true,
    },
  },
  darkMode: "class",
  // safelist: ["text-3xl", "text-4xl", "text-5xl", "visible", "collapsed"],
});

export const configUrl = import.meta.url;
