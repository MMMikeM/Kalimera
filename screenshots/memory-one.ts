import { chromium } from "playwright";

import { loginWithCredentials } from "./login";

const base = process.env.BASE_URL || "http://localhost:5173";
const route = process.argv[2] || "/practice/memory/articles";
const out = process.argv[3] || "screenshots/memory/one.png";

const run = async () => {
	const b = await chromium.launch();
	const ctx = await b.newContext({ viewport: { width: 1280, height: 720 } });
	const p = await ctx.newPage();
	await loginWithCredentials(p, base);
	await p.goto(base + route, { waitUntil: "networkidle" });
	await p.screenshot({ path: out, fullPage: true });
	await b.close();
	console.log("✓ " + out);
};

run().catch((e) => {
	console.error(e);
	process.exit(1);
});
