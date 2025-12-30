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

  // Conversations
  { route: "/conversations", name: "conversations/index" },
  { route: "/conversations/arriving", name: "conversations/arriving" },
  { route: "/conversations/food", name: "conversations/food" },
  { route: "/conversations/smalltalk", name: "conversations/smalltalk" },
  { route: "/conversations/requests", name: "conversations/requests" },
  { route: "/conversations/discourse", name: "conversations/discourse" },

  // Phrases
  { route: "/phrases", name: "phrases/index" },
  { route: "/phrases/survival", name: "phrases/survival" },
  { route: "/phrases/responses", name: "phrases/responses" },
  { route: "/phrases/requests", name: "phrases/requests" },
  { route: "/phrases/opinions", name: "phrases/opinions" },
  { route: "/phrases/connectors", name: "phrases/connectors" },
  { route: "/phrases/time", name: "phrases/time" },
  { route: "/phrases/constructions", name: "phrases/constructions" },

  // Quick Reference
  { route: "/quick-reference/cases-pronouns", name: "quick-reference/cases-pronouns" },
  { route: "/quick-reference/nouns-articles", name: "quick-reference/nouns-articles" },
  { route: "/quick-reference/adjectives", name: "quick-reference/adjectives" },
  { route: "/quick-reference/prepositions", name: "quick-reference/prepositions" },
  { route: "/quick-reference/verbs", name: "quick-reference/verbs" },

  // Practice
  { route: "/practice/speed", name: "practice/speed" },
  { route: "/practice/pronouns", name: "practice/pronouns" },
  { route: "/practice/articles", name: "practice/articles" },
  { route: "/practice/verbs", name: "practice/verbs" },
  { route: "/practice/vocabulary", name: "practice/vocabulary" },
  { route: "/practice/review", name: "practice/review" },

  // Vocabulary
  { route: "/vocabulary", name: "vocabulary/index" },
  { route: "/vocabulary/nouns", name: "vocabulary/nouns" },
  { route: "/vocabulary/verbs", name: "vocabulary/verbs" },
  { route: "/vocabulary/phrases", name: "vocabulary/phrases" },
  { route: "/vocabulary/reference", name: "vocabulary/reference" },

  // Search
  { route: "/search", name: "search" },
];

const takeScreenshots = async () => {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  // Set localStorage to use the "mike" user before navigating to any pages
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.evaluate((userId) => {
    localStorage.setItem("greek-practice-user", userId);
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
