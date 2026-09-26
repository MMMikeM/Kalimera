import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { chromium } from "playwright";

import { loginWithCredentials } from "./login";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

const isMobile = process.argv.includes("--mobile");
const OUTPUT_DIR = join(process.cwd(), "screenshots", isMobile ? "mobile" : "desktop");
const VIEWPORT = isMobile ? { width: 375, height: 812 } : { width: 1280, height: 720 };

const tabs = (base: string, ids: string[]) =>
	ids.map((id) => ({ route: `${base}/${id}`, name: `${base.slice(1)}/${id}` }));

const ALL_PAGES = [
	{ route: "/", name: "homepage" },
	{ route: "/progress", name: "progress" },
	{ route: "/search", name: "search" },

	// Practice
	{ route: "/practice", name: "practice/index" },
	{ route: "/practice/review", name: "practice/review" },
	{ route: "/practice/cases", name: "practice/cases" },
	{ route: "/practice/verbs", name: "practice/verbs" },
	{ route: "/practice/pronouns", name: "practice/pronouns" },
	{ route: "/practice/blocks", name: "practice/blocks" },

	// Learn
	{ route: "/learn", name: "learn/index" },
	{ route: "/learn/verbs", name: "learn/verbs" },
	{ route: "/learn/nouns", name: "learn/nouns" },
	...tabs("/learn/conversations", ["arriving", "food", "smalltalk", "requests"]),
	...tabs("/learn/phrases", [
		"survival",
		"responses",
		"requests",
		"opinions",
		"connectors",
		"time",
	]),
	...tabs("/learn/essentials", ["numbers", "position", "time", "frequency", "colours"]),

	// Reference
	{ route: "/reference", name: "reference/index" },
	...tabs("/reference", [
		"cases",
		"pronouns",
		"articles",
		"nouns",
		"adjectives",
		"prepositions",
		"patterns",
	]),
	...tabs("/reference/verbs", ["present", "past", "past-continuous", "future"]),
];

// `--route /reference/cases` captures just that page instead of the full set.
const routeArg = process.argv[process.argv.indexOf("--route") + 1];
const PAGES =
	process.argv.includes("--route") && routeArg
		? [{ route: routeArg, name: routeArg.slice(1).replaceAll("/", "-") || "homepage" }]
		: ALL_PAGES;

// The app scrolls inside .app-main within a fixed .app-shell, so Playwright's
// fullPage only sees the viewport. Unpinning the shell lets the document grow
// to the content's height; the fixed mobile nav is hidden so it isn't stamped
// over the middle of the page.
const FLATTEN_CSS = `
	.app-shell { position: static !important; inset: auto !important; height: auto !important; overflow: visible !important; }
	.app-main { overflow: visible !important; height: auto !important; flex: none !important; }
	html, body { overflow: visible !important; height: auto !important; }
	nav.fixed { display: none !important; }
`;

const takeScreenshots = async () => {
	await mkdir(OUTPUT_DIR, { recursive: true });

	const browser = await chromium.launch();
	const context = await browser.newContext({ viewport: VIEWPORT });
	const page = await context.newPage();

	// Login with credentials before capturing screenshots
	try {
		await loginWithCredentials(page, BASE_URL);
	} catch (error) {
		console.error("Login failed:", error);
		await browser.close();
		throw error;
	}

	const mode = isMobile ? "mobile (375x812)" : "desktop (1280x720)";
	console.log(`Mode: ${mode}`);
	console.log(`Taking ${PAGES.length} screenshots...\n`);

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
			await page.addStyleTag({ content: FLATTEN_CSS });
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
