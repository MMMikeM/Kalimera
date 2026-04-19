import { chromium } from "playwright";

import { loginWithCredentials } from "./login";

const base = process.env.BASE_URL || "http://localhost:5173";
const route = process.argv[2] || "/practice/memory/articles";
const out = process.argv[3] || "screenshots/memory/drill-active.png";
const viewport = process.argv[4] === "mobile" ? { width: 375, height: 812 } : { width: 1280, height: 720 };

const run = async () => {
	const b = await chromium.launch();
	const ctx = await b.newContext({ viewport });
	const p = await ctx.newPage();
	await loginWithCredentials(p, base);
	await p.goto(base + route, { waitUntil: "networkidle" });
	await p.getByRole("button", { name: /begin/i }).click();
	await p.waitForTimeout(300);
	await p.screenshot({ path: out, fullPage: true });
	await b.close();
	console.log("✓ " + out);
};

run().catch((e) => {
	console.error(e);
	process.exit(1);
});
