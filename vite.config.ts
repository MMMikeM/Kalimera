import path from "node:path";

import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const patchTssClientRpc = (): import("vite").Plugin => ({
	name: "patch-tss-client-rpc",
	transform(code, id) {
		if (id.includes("createClientRpc") && code.includes("process.env.TSS_SERVER_FN_BASE")) {
			return code.replace(/process\.env\.TSS_SERVER_FN_BASE/g, '"/_serverFn/"');
		}
	},
});

export default defineConfig({
	define: {
		"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "development"),
	},

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
		dedupe: ["react", "react-dom"],
	},
	plugins: [
		patchTssClientRpc(),
		tanstackStart({
			router: {
				routeFileIgnorePattern:
					"(tabs|subtabs|components|engines|hooks\\.ts|drill-.*\\.ts|group-section\\.tsx|drill-lookup\\.ts|\\.content\\.llm|\\.server\\.ts|loader\\.ts|\\.loader\\.ts|with-push-post\\.ts)",
			},
		}),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
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
	],
});
