import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { chromium } from "playwright";

import { loginWithCredentials } from "./login";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const OUTPUT_DIR = join(process.cwd(), "screenshots", "practice");
const VP = { width: 1280, height: 800 };

const FLATTEN_CSS = `
	.app-shell { position: static !important; inset: auto !important; height: auto !important; overflow: visible !important; }
	.app-main { overflow: visible !important; height: auto !important; flex: none !important; }
	html, body { overflow: visible !important; height: auto !important; }
	nav.fixed { display: none !important; }
`;

const PAGES = [
	{ path: "/practice", name: "index" },
	{ path: "/practice/cases", name: "cases" },
	{ path: "/practice/pronouns", name: "pronouns" },
	{ path: "/practice/verbs", name: "verbs" },
	{ path: "/practice/blocks", name: "blocks" },
];

const run = async () => {
	await mkdir(OUTPUT_DIR, { recursive: true });
	const browser = await chromium.launch();

	try {
		const context = await browser.newContext({ viewport: VP });
		const page = await context.newPage();

		await loginWithCredentials(page, BASE_URL);

		for (const p of PAGES) {
			await page.goto(`${BASE_URL}${p.path}`, { waitUntil: "networkidle" });
			await page.addStyleTag({ content: FLATTEN_CSS });
			await page.waitForTimeout(300);

			const file = join(OUTPUT_DIR, `group-${p.name}.png`);
			await page.screenshot({ path: file, fullPage: true });
			console.log(`✓ ${p.name} (${p.path})`);
		}

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
