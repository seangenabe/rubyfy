import mitosis from "@builder.io/mitosis"
import { FlatCompat } from "@eslint/eslintrc"
import path from "node:path"
import { fileURLToPath } from "node:url"
import tseslint from "typescript-eslint"

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default tseslint.config([
  ...compat.extends("plugin:@builder.io/mitosis/recommended"),
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    plugins: { mitosis },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {},
  },
])
