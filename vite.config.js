import { defineConfig } from "vite"

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "FlatpickrSundayHighlight",
      fileName: (format) =>
        format === "es"
          ? "flatpickr-sunday-highlight-plugin.js"
          : `flatpickr-sunday-highlight-plugin.${format}.js`,
      formats: ["es", "cjs", "umd"]
    },

    rolldownOptions: {
      external: ["flatpickr"],
      output: {
        globals: { flatpickr: "flatpickr" },
        assetFileNames: (asset) => {
          const n = asset?.name || "";

          if (n.endsWith(".css")) {
            return "flatpickr-elegant-theme.css";
          }

          return n || "asset-[hash][extname]";
        }
      }
    },

    cssCodeSplit: true,
    emptyOutDir: true
  },

  server: {
    root: "demo",
    open: true
  }
})
