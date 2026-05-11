import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	define: {
		"process.env.TSS_SERVER_FN_BASE": JSON.stringify("/_serverFn/"),
	},
	plugins: [
		tailwindcss(),
		nitro(),
		tanstackStart({
			serverFns: {
				base: "xyz",
			},
			router: {
				routeFileIgnorePattern:
					"(tabs|subtabs|components|engines|hooks\\.ts|drill-.*\\.ts|group-section\\.tsx|\\.content\\.llm|loader\\.ts|\\.loader\\.ts|with-push-post\\.ts)",
			},
		}),
	],
});
