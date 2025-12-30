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
  { route: "/practice/pronouns", name: "practice/pronouns" },
  { route: "/practice/articles", name: "practice/articles" },
  { route: "/practice/verbs", name: "practice/verbs" },
  { route: "/practice/vocabulary", name: "practice/vocabulary" },
  { route: "/practice/review", name: "practice/review" },

  // Explore - Conversations
  { route: "/explore/conversations", name: "explore/conversations/index" },
  { route: "/explore/conversations/arriving", name: "explore/conversations/arriving" },
  { route: "/explore/conversations/food", name: "explore/conversations/food" },
  { route: "/explore/conversations/smalltalk", name: "explore/conversations/smalltalk" },
  { route: "/explore/conversations/requests", name: "explore/conversations/requests" },

  // Explore - Phrases
  { route: "/explore/phrases", name: "explore/phrases/index" },
  { route: "/explore/phrases/survival", name: "explore/phrases/survival" },
  { route: "/explore/phrases/responses", name: "explore/phrases/responses" },
  { route: "/explore/phrases/requests", name: "explore/phrases/requests" },
  { route: "/explore/phrases/opinions", name: "explore/phrases/opinions" },
  { route: "/explore/phrases/connectors", name: "explore/phrases/connectors" },
  { route: "/explore/phrases/time", name: "explore/phrases/time" },
  { route: "/explore/phrases/constructions", name: "explore/phrases/constructions" },

  // Explore - Words (vocabulary)
  { route: "/explore/words", name: "explore/words/index" },
  { route: "/explore/words/nouns", name: "explore/words/nouns" },
  { route: "/explore/words/verbs", name: "explore/words/verbs" },
  { route: "/explore/words/reference", name: "explore/words/reference" },

  // Reference
  { route: "/reference/cases-pronouns", name: "reference/cases-pronouns" },
  { route: "/reference/nouns-articles", name: "reference/nouns-articles" },
  { route: "/reference/adjectives", name: "reference/adjectives" },
  { route: "/reference/prepositions", name: "reference/prepositions" },
  { route: "/reference/verbs", name: "reference/verbs" },

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
