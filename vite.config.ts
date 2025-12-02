import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ isSsrBuild }) => ({
	build: {
		rollupOptions: isSsrBuild
			? { input: "./src/entry.worker.ts" }
			: undefined,
	},
	plugins: [
		tailwindcss(),
		reactRouter({
			async getLoadContext() {
				const { db } = await import("./src/db");
				return { db };
			},
		}),
	],
}));
