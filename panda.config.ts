import { defineConfig } from "@pandacss/dev";
import { SerendiePreset } from "@serendie/ui";
import subBrandTokens from "@serendie/sub-brand-tokens/panda";

// PandaCSSのtokensとtextStylesが混在しているので分離する
const { textStyles, ...tokens } = subBrandTokens;
// 必要に応じてtokenの内容を拡張する
const extendedTokens = { ...tokens, sizes: tokens.spacing };

// 0.48以降Presetの定義が変更になっているため再構築
const mainPreset = {
  name: "main",
  theme: {
    extend: {
      tokens: SerendiePreset.theme?.tokens,
      textStyles: SerendiePreset.theme?.textStyles,
    },
  },
};

const subBrandPreset = {
  name: "subBrand",
  theme: {
    extend: {
      tokens: extendedTokens,
      textStyles,
    },
  },
};

export default defineConfig({
  jsxFramework: "react",
  presets: [mainPreset, subBrandPreset],
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",
});
