import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const USER_ID = process.env.USER_ID || "1";

const isMobile = process.argv.includes("--mobile");
const OUTPUT_DIR = join(process.cwd(), "screenshots", isMobile ? "mobile" : "desktop");
const VIEWPORT = isMobile ? { width: 375, height: 812 } : { width: 1280, height: 720 };

const PAGES = [
  { route: "/", name: "homepage" },

  // Practice
  { route: "/practice/speed", name: "practice/speed" },
  { route: "/practice/vocabulary", name: "practice/vocabulary" },
  { route: "/practice/review", name: "practice/review" },

  // Learn - Landing
  { route: "/learn", name: "learn/index" },

  // Learn - Conversations
  { route: "/learn/conversations/arriving", name: "learn/conversations/arriving" },
  { route: "/learn/conversations/food", name: "learn/conversations/food" },
  { route: "/learn/conversations/smalltalk", name: "learn/conversations/smalltalk" },
  { route: "/learn/conversations/requests", name: "learn/conversations/requests" },

  // Learn - Phrases
  { route: "/learn/phrases/survival", name: "learn/phrases/survival" },
  { route: "/learn/phrases/responses", name: "learn/phrases/responses" },
  { route: "/learn/phrases/requests", name: "learn/phrases/requests" },
  { route: "/learn/phrases/opinions", name: "learn/phrases/opinions" },
  { route: "/learn/phrases/connectors", name: "learn/phrases/connectors" },
  { route: "/learn/phrases/time", name: "learn/phrases/time" },

  // Learn - Vocabulary
  { route: "/learn/vocabulary/nouns", name: "learn/vocabulary/nouns" },
  { route: "/learn/vocabulary/verbs", name: "learn/vocabulary/verbs" },
  { route: "/learn/vocabulary/essentials", name: "learn/vocabulary/essentials" },

  // Reference - Landing
  { route: "/reference", name: "reference/index" },

  // Reference - Tabs
  { route: "/reference/cases", name: "reference/cases" },
  { route: "/reference/pronouns", name: "reference/pronouns" },
  { route: "/reference/articles", name: "reference/articles" },
  { route: "/reference/adjectives", name: "reference/adjectives" },
  { route: "/reference/prepositions", name: "reference/prepositions" },
  { route: "/reference/verbs", name: "reference/verbs" },
  { route: "/reference/patterns", name: "reference/patterns" },

  // Search
  { route: "/search", name: "search" },
];

const takeScreenshots = async () => {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  // Set localStorage to authenticate before navigating to any pages
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.evaluate((userId) => {
    localStorage.setItem("greek-authenticated-user", JSON.stringify({ userId: Number(userId), username: "demo" }));
  }, USER_ID);

  const mode = isMobile ? "mobile (375x812)" : "desktop (1280x720)";
  console.log(`Mode: ${mode}`);
  console.log(`Taking ${PAGES.length} screenshots as user ${USER_ID}...\n`);

  for (const { route, name } of PAGES) {
    const url = `${BASE_URL}${route}`;
    const filename = join(OUTPUT_DIR, `${name}.png`);

    // Create subdirectory if needed
    const dir = join(OUTPUT_DIR, name.split("/").slice(0, -1).join("/"));
    if (dir !== OUTPUT_DIR) {
      await mkdir(dir, { recursive: true });
    }

    try {
      await page.goto(url, { waitUntil: "networkidle" });
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`✓ ${name}.png`);
    } catch (error) {
      console.error(`✗ ${name}.png - ${error}`);
    }
  }

  await browser.close();
  console.log(`\nScreenshots saved to ${OUTPUT_DIR}`);
};

takeScreenshots().catch(console.error);
