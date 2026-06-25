import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

const sourceFiles = ["src/**/*.{ts,tsx}"];
const applyToSourceFiles = (config) => ({
  ...config,
  files: sourceFiles,
});

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "*.tsbuildinfo"],
  },
  {
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.app.json",
        },
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended.map(applyToSourceFiles),
  applyToSourceFiles(react.configs.flat.recommended),
  applyToSourceFiles(react.configs.flat["jsx-runtime"]),
  applyToSourceFiles(reactHooks.configs.flat["recommended-latest"]),
  applyToSourceFiles(importPlugin.flatConfigs.recommended),
  applyToSourceFiles(importPlugin.flatConfigs.typescript),
  {
    files: sourceFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          groups: ["builtin", "external", "internal", ["parent", "sibling"], "index", "type"],
          "newlines-between": "always",
        },
      ],
      "react/prop-types": "off",
    },
  },
  prettierConfig,
);
