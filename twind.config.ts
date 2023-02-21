import { Options } from "twind_fresh_plugin/twind.ts";

// twind preset
import presetAutoPrefix from "twind-preset-autoprefix";
import presetTailWind from "twind-preset-tailwind";

export default {
  presets: [presetAutoPrefix, presetTailWind],
  selfURL: import.meta.url,
  theme: {
    fontFamily: {
      mono: ["UbuntuMono Nerd Font"],
      sans: ["Quicksand"],
    },
  },
} as Options;
