import path from "node:path";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import { VitePWA } from "vite-plugin-pwa";

const ReactCompilerConfig = {};

export default defineConfig(({ isSsrBuild, command }) => ({
	build: {
		rolldownOptions: isSsrBuild ? { input: "./src/entry.worker.ts" } : undefined,
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
		babel({
			filter: /\.[jt]sx?$/,
			babelConfig: {
				presets: ["@babel/preset-typescript"],
				plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
			},
		}),
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
