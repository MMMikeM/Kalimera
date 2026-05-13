import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";


const SERVER_FN_BASE = "/_serverFn/";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		{
			name: "replace-tss-server-fn-base",
			transform(code, _id) {
				if (code.includes("process.env.TSS_SERVER_FN_BASE")) {
					return code.replace(/process\.env\.TSS_SERVER_FN_BASE/g, JSON.stringify(SERVER_FN_BASE));
				}
			},
		},
		tailwindcss(),
		nitro(),
		tanstackStart({
			router: {
				routeFileIgnorePattern: "(tabs|components)",
			},
		}),
		{
			name: "copy-sw-to-output",
			enforce: "post",
			closeBundle() {
				const src = resolve("dist/sw.js");
				if (!existsSync(src)) return;
				const dest = resolve(".output/public");
				mkdirSync(dest, { recursive: true });
				cpSync(src, resolve(dest, "sw.js"));
			},
		},
		VitePWA({
			strategies: "injectManifest",
			srcDir: "service-worker",
			filename: "sw.ts",
			registerType: "autoUpdate",
			includeAssets: ["favicon.svg", "apple-touch-icon.png", "icons/*.png"],
			manifest: false,
			injectManifest: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
			},
			devOptions: {
				enabled: false,
			},
		}),
	],
});
