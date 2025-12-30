import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ isSsrBuild, command }) => ({
	build: {
		rollupOptions: isSsrBuild
			? { input: "./src/entry.worker.ts" }
			: undefined,
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
				registerType: "prompt",
				includeAssets: [
					"favicon.svg",
					"apple-touch-icon.png",
					"icons/*.png",
				],
				manifest: false, // Using our own manifest.json in public/
				workbox: {
					globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
					navigateFallback: "/offline.html",
					navigateFallbackDenylist: [/^\/api\//],
					runtimeCaching: [
						{
							urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
							handler: "CacheFirst",
							options: {
								cacheName: "google-fonts-cache",
								expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
								cacheableResponse: { statuses: [0, 200] },
							},
						},
						{
							urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
							handler: "CacheFirst",
							options: {
								cacheName: "gstatic-fonts-cache",
								expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
								cacheableResponse: { statuses: [0, 200] },
							},
						},
					],
				},
				devOptions: {
					enabled: false, // Disable in dev to avoid conflicts
				},
			}),
	].filter(Boolean),
}));
