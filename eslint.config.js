const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const jestPlugin = require("eslint-plugin-jest");
const preferArrowPlugin = require("eslint-plugin-prefer-arrow");
const reactNativePlugin = require("eslint-plugin-react-native");

module.exports = defineConfig([
  expoConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        disallowAutomaticSingleRunInference: false
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "prefer-arrow": preferArrowPlugin,
      jest: jestPlugin,
      "react-native": reactNativePlugin
    },
    rules: {
      ...tsPlugin.configs["recommended-type-checked"].rules,
      ...tsPlugin.configs["stylistic-type-checked"].rules,
      ...jestPlugin.configs.recommended.rules,

      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-empty-interface": [
        "error",
        { allowSingleExtends: true }
      ],
      "react-hooks/exhaustive-deps": ["error"],
      "import/no-internal-modules": "off",
      "import/no-named-as-default-member": "off",
      "import/order": [
        "error",
        {
          groups: [
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object"
          ],
          pathGroups: [
            {
              pattern: "@up/**",
              group: "internal"
            }
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"]
        }
      ]
    }
  },

  {
    ignores: [
      "dist/*",
      "/.bin/",
      "/.caches/",
      "/.vscode/",
      "/apps/cohesia/android",
      "/apps/cohesia/ios",
      ".idea/",
      "*.js",
      "build",
      "node_modules",
      "commands"
    ]
  }
]);
