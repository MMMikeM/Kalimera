import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { chromium } from "playwright";

import { loginWithCredentials } from "./login";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const OUTPUT_DIR = join(process.cwd(), "screenshots", process.env.OUT_DIR || "cases");
const ROUTE = "/reference/cases";

const VIEWPORTS = [
	{ name: "desktop", width: 1280, height: 720 },
	{ name: "mobile", width: 375, height: 812 },
];

// The app uses a fixed .app-shell with an internal scroll container (.app-main).
// Playwright's fullPage only captures the document scroll, so we flatten the
// shell first by overriding the fixed positioning and overflow constraints.
const FLATTEN_CSS = `
	.app-shell { position: static !important; inset: auto !important; height: auto !important; overflow: visible !important; }
	.app-main { overflow: visible !important; height: auto !important; flex: none !important; }
	html, body { overflow: visible !important; height: auto !important; }
	nav.fixed { display: none !important; }
`;

const run = async () => {
	await mkdir(OUTPUT_DIR, { recursive: true });
	const browser = await chromium.launch();

	try {
		for (const vp of VIEWPORTS) {
			const context = await browser.newContext({
				viewport: { width: vp.width, height: vp.height },
			});
			const page = await context.newPage();

			await loginWithCredentials(page, BASE_URL);
			await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: "networkidle" });
			await page.addStyleTag({ content: FLATTEN_CSS });
			// allow layout to settle after style override
			await page.waitForTimeout(300);

			const file = join(OUTPUT_DIR, `${vp.name}.png`);
			await page.screenshot({ path: file, fullPage: true });
			console.log(`\u2713 ${vp.name}.png (${vp.width}x${vp.height})`);

			await context.close();
		}
	} finally {
		await browser.close();
	}

	console.log(`\nSaved to ${OUTPUT_DIR}`);
};

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
