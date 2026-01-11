import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ isSsrBuild, command }) => ({
	build: {
		rollupOptions: isSsrBuild ? { input: "./src/entry.worker.ts" } : undefined,
	},
	ssr:
		command === "build"
			? {
					resolve: {
						conditions: ["workerd", "worker", "browser"],
					},
				}
			: undefined,
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	plugins: [
		tailwindcss(),
		reactRouter(),
		// Only include PWA plugin for client builds
		!isSsrBuild &&
			VitePWA({
				strategies: "injectManifest",
				srcDir: "service-worker",
				filename: "sw.ts",
				registerType: "prompt",
				includeAssets: ["favicon.svg", "apple-touch-icon.png", "icons/*.png"],
				manifest: false,
				injectManifest: {
					globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
				},
				devOptions: {
					enabled: false,
				},
			}),
	].filter(Boolean),
}));
