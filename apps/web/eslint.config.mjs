import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

eslintConfig.push(
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          "patterns": [
            {
              "group": ["apps/api/**", "apps/ai-worker/**"],
              "message": "Direct imports from backend packages/apps are forbidden in frontend. Use API boundaries instead."
            }
          ]
        }
      ]
    }
  }
);

export default eslintConfig;
