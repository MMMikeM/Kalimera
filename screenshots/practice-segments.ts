import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { chromium } from "playwright";

import { loginWithCredentials } from "./login";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const OUTPUT_DIR = join(process.cwd(), "screenshots", "practice");
const ROUTE = "/practice";
const VP = { width: 1280, height: 800 };
const OVERLAP = 60; // px overlap between segments to avoid losing content at split boundaries

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
		const context = await browser.newContext({ viewport: VP });
		const page = await context.newPage();

		await loginWithCredentials(page, BASE_URL);
		await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: "networkidle" });
		await page.addStyleTag({ content: FLATTEN_CSS });
		await page.waitForTimeout(300);

		const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
		console.log(`Total page height: ${totalHeight}px`);

		const step = VP.height - OVERLAP;
		const segments = Math.ceil(totalHeight / step);

		for (let i = 0; i < segments; i++) {
			const y = i * step;
			await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
			await page.waitForTimeout(150);

			const file = join(OUTPUT_DIR, `segment-${String(i + 1).padStart(2, "0")}.png`);
			await page.screenshot({ path: file, fullPage: false });
			console.log(`✓ segment-${i + 1} (y=${y})`);
		}

		// Also save full page for reference
		await page.evaluate(() => window.scrollTo(0, 0));
		await page.waitForTimeout(150);
		const fullFile = join(OUTPUT_DIR, "full.png");
		await page.screenshot({ path: fullFile, fullPage: true });
		console.log(`✓ full.png`);

		await context.close();
	} finally {
		await browser.close();
	}

	console.log(`\nSaved to ${OUTPUT_DIR}`);
};

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
