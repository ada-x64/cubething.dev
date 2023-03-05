import { Options } from "twind_fresh_plugin/twind.ts";

// twind preset
import presetAutoPrefix from "@twind/preset-autoprefix";
import presetTailWind from "@twind/preset-tailwind";
import presetTypography from "@twind/preset-typography";

export default {
  presets: [
    presetAutoPrefix,
    presetTailWind,
    presetTypography({
      colors: {
        links: "rgb(244 63 94)", //rose-500
        body: "rgb(28 25 23)", //stone-900
        dark: {
          links: "rgb(245 158 11)", //amber-500
          body: "rgb(244 244 245)", //zinc-100
        },
      },
      extend: {
        "h1, h2, h3, h4": {
          "text-transform": "lowercase",
          "font-family": "Chillax, sans",
          "text-align": "center",
        },
        "h2, h3, h4": {
          "margin-top": 0,
        },
      },
    }),
  ],
  selfURL: import.meta.url,
  theme: {
    fontFamily: {
      mono: ["Ubuntu Mono Nerd Font", "Ubuntu Mono", "Consolas", "mono"],
      header: ["Chillax", "sans"],
      sans: ["Synonym", "sans"],
    },
  },
  darkMode: "class",
  safelist: ["text-3xl", "text-4xl", "text-5xl", "visible", "collapsed"],
} as Options;
