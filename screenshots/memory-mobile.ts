import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { chromium } from "playwright";

import { loginWithCredentials } from "./login";

const base = process.env.BASE_URL || "http://localhost:5173";
const OUTPUT_DIR = join(process.cwd(), "screenshots", "memory", "mobile");

const ROUTES = ["articles", "pronouns", "possessives", "contractions"];

const run = async () => {
	await mkdir(OUTPUT_DIR, { recursive: true });
	const b = await chromium.launch();
	const ctx = await b.newContext({ viewport: { width: 375, height: 812 } });
	const p = await ctx.newPage();
	await loginWithCredentials(p, base);
	for (const slug of ROUTES) {
		await p.goto(`${base}/practice/memory/${slug}`, { waitUntil: "networkidle" });
		await p.screenshot({ path: join(OUTPUT_DIR, `${slug}.png`), fullPage: true });
		console.log(`✓ ${slug}.png`);
	}
	await b.close();
};

run().catch((e) => {
	console.error(e);
	process.exit(1);
});
