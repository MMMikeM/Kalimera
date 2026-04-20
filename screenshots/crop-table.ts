import { chromium } from "playwright";

import { loginWithCredentials } from "./login";

const run = async () => {
	const browser = await chromium.launch();
	const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
	const page = await context.newPage();
	await loginWithCredentials(page, "http://localhost:5173");
	await page.goto("http://localhost:5173/reference/articles", { waitUntil: "networkidle" });
	await page.waitForTimeout(400);
	const loc = page.locator("section#articles > :nth-child(1)");
	await loc.screenshot({ path: "/home/ubuntu/dev/Kalimera/screenshots/articles/table.png" });
	console.log("saved table.png");
	await browser.close();
};
run();
