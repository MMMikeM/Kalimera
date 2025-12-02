import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: true,
  prerender: [
    "/",
    "/quick-reference",
    "/practice",
  ],
} satisfies Config;
