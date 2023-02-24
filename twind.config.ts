import { Options } from "twind_fresh_plugin/twind.ts";

// twind preset
import presetAutoPrefix from "@twind/preset-autoprefix";
import presetTailWind from "@twind/preset-tailwind";
import presetTypography from "@twind/preset-typography";

export default {
  presets: [presetAutoPrefix, presetTailWind, presetTypography],
  selfURL: import.meta.url,
  theme: {
    fontFamily: {
      mono: ["UbuntuMono Nerd Font", "UbuntuMono"],
      header: ["Chillax", "sans"],
      sans: ["Synonym", "sans"],
    },
  },
  darkMode: "class",
} as Options;
