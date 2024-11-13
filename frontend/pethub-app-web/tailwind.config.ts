import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.ts?(x)", "!./src/**/*.test.ts?(x)"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /./, // the "." means "everything"
    },
    { pattern: /^block/ },
    { pattern: /^col-(\w?)/ },
    { pattern: /^columns-/ },
    { pattern: /^flex/ },
    { pattern: /^shrink(\w?)/ },
    { pattern: /^grow(\w?)/ },
    { pattern: /^basis-/ },
    { pattern: /^gap-/ },
    { pattern: /^grid(\w?)/ },
    { pattern: /^order-/ },
    { pattern: /^hidden/ },
    { pattern: /^m(\w?)-/ },
    { pattern: /^-m(\w?)-/ },
    { pattern: /^p(\w?)-/ },
    { pattern: /^rounded-/ },
    { pattern: /^top-/ },
    { pattern: /^bg-surface-/ },
    { pattern: /^text-content-/ },
    { pattern: /^fill-content-/ },
    { pattern: /^col-span-/ },
    { pattern: /^col-start-/ },
    { pattern: /^row-start-/ },
    { pattern: /^(items|self)-/ },
    "w-screen",
    "h-screen",
    "container",
    "text-justify",
  ],

  plugins: [],
} satisfies Config;
