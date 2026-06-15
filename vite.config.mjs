import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default defineConfig({
  base: "/",

  build: {
    outDir: "dist",
  },

  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,

    proxy: {
      "/api": {
        target: "http://192.168.1.10:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  plugins: [
    react(),
    nxViteTsPaths(),
  ],
});