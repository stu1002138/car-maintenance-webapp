import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {},
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off", // ✅ 關閉 JSX 要求 React 在作用域的規則
    },
    settings: {
      react: {
        version: "detect", // ✅ 自動偵測 React 版本
      },
    },
  },
]);