// uno.config.ts
import { defineConfig, presetAttributify, presetUno, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetAttributify({ /* preset options */}),
    presetUno(),
    presetIcons({
      extraProperties: {
      },
      collections: {
        carbon: () => import("@iconify-json/carbon/icons.json").then(i => i.default)
      }
    }),
  ],
});
