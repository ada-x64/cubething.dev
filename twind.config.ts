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
      extend: {
        "h2::before": {
          content: "<",
        },
        "h2::after": {
          content: "/>",
        },
        "h1, h2": {
          "text-transform": "lowercase",
          "font-family": "Chillax, sans",
          "text-align": "center",
        },
        h2: {
          "margin-top": 0,
        },
      },
    }),
  ],
  selfURL: import.meta.url,
  theme: {
    fontFamily: {
      mono: ["UbuntuMono Nerd Font", "UbuntuMono"],
      header: ["Chillax", "sans"],
      sans: ["Synonym", "sans"],
    },
  },
  darkMode: "class",
  safelist: ["text-3xl", "text-4xl", "text-5xl"],
} as Options;
