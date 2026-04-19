import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { chromium } from "playwright";

import { loginWithCredentials } from "./login";

const BASE_URL =
	process.env.BASE_URL || "https://greek-learning.mikem-tba.workers.dev";
const OUTPUT_DIR = join(process.cwd(), "screenshots", "memory");
const VIEWPORT = { width: 1280, height: 720 };

const ROUTES = [
	"",
	"articles",
	"aorist-stems",
	"chunks",
	"contractions",
	"days-of-week",
	"imperatives",
	"noun-genders",
	"numbers",
	"possessives",
	"pronouns",
];

const run = async () => {
	await mkdir(OUTPUT_DIR, { recursive: true });

	const browser = await chromium.launch();
	const context = await browser.newContext({ viewport: VIEWPORT });
	const page = await context.newPage();

	await loginWithCredentials(page, BASE_URL);

	for (const slug of ROUTES) {
		const route = slug
			? `/practice/memory/${slug}`
			: "/practice/memory";
		const name = slug || "index";
		const url = `${BASE_URL}${route}`;
		const filename = join(OUTPUT_DIR, `${name}.png`);
		try {
			await page.goto(url, { waitUntil: "networkidle" });
			await page.screenshot({ path: filename, fullPage: true });
			console.log(`✓ ${name}.png`);
		} catch (error) {
			console.error(`✗ ${name}.png - ${error}`);
		}
	}

	await browser.close();
	console.log(`\nSaved to ${OUTPUT_DIR}`);
};

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
