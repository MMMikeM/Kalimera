import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: true,
  prerender: [
    "/",
    "/core-rules",
    "/advanced-cases",
    "/case-practice",
    "/present",
    "/other-tenses",
    "/vocabulary",
    "/search",
  ],
} satisfies Config;
