import { defineConfig } from 'vite';
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
    plugins: [
        visualizer({ filename: "bundle_stats.html", title: "Bundle Stats", brotliSize: true })
    ]
});
