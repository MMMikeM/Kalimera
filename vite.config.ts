import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

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
	plugins: [tailwindcss(), reactRouter()],
}));
