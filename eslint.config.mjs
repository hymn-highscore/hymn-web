import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals.js";
import nextTs from "eslint-config-next/typescript.js";

export default defineConfig([
  // Next.js Core Web Vitals rules
  ...nextVitals,

  // Next.js + TypeScript rules
  ...nextTs,

  // Override / extend ignores
  globalIgnores([
    // Default ignores from eslint-config-next
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
