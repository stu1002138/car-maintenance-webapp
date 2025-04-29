// uno.config.ts
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(), // 支援 `text-center` => `text="center"` 這種寫法（可選）
    presetIcons(),       // 如果你需要 icon（可選）
  ],
})