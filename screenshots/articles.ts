import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { chromium } from "playwright";

import { loginWithCredentials } from "./login";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const OUTPUT_DIR = join(process.cwd(), "screenshots", process.env.OUT_DIR || "articles");
const ROUTE = "/reference/articles";

const VIEWPORTS = [
	{ name: "desktop", width: 1280, height: 720 },
	{ name: "mobile", width: 375, height: 812 },
];

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
			const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
			const page = await context.newPage();
			await loginWithCredentials(page, BASE_URL);
			await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: "networkidle" });
			await page.addStyleTag({ content: FLATTEN_CSS });
			await page.waitForTimeout(300);
			const file = join(OUTPUT_DIR, `${vp.name}.png`);
			await page.screenshot({ path: file, fullPage: true });
			console.log(`\u2713 ${vp.name}.png`);
			await context.close();
		}
	} finally {
		await browser.close();
	}
	console.log(`Saved to ${OUTPUT_DIR}`);
};

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
