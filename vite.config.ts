import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

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
	],
});
