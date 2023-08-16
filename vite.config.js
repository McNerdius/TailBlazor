console.log("vite config loaded");

import { defineConfig } from 'vite';
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
    build: {
        rollupOptions: {
            output: { externalLiveBindings: false },
        }
    },
    esbuild: {
        drop: ["console"],
        legalComments: "external",
    },
    plugins: [
        visualizer({ filename: "dist/bundle_stats.html", title: "Bundle Stats", gzipSize: true, brotliSize: true })
    ],
});
