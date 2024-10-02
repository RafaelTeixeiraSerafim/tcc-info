import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/tcc-info/",
  server: {
    proxy: {
      "/api": {
        target: "http://tcc-info-backend.sa-east-1.elasticbeanstalk.com",
        changeOrigin: true,
      },
    },
  },
});
