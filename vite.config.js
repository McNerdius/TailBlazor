console.log("vite config loaded");

import { defineConfig } from 'vite';
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
    plugins: [
        visualizer({ filename: "dist/bundle_stats.html", title: "Bundle Stats", gzipSize: true, brotliSize: true })
    ],
    build: {
        
        rollupOptions: {
            output: {
                preserveModules: true,
            },
            preserveEntrySignatures: true,
        }
    }
});
