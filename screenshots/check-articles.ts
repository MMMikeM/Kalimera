import { chromium } from "playwright";

import { loginWithCredentials } from "./login";

const run = async () => {
	const browser = await chromium.launch();
	const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
	const page = await context.newPage();
	await loginWithCredentials(page, "http://localhost:5173");
	await page.goto("http://localhost:5173/reference/articles", { waitUntil: "networkidle" });
	await page.waitForTimeout(500);
	const info = await page.evaluate(() => {
		const cells = document.querySelectorAll("table tbody tr td");
		const results: Array<{ i: number; text: string; classes: string; color: string }> = [];
		cells.forEach((el, i) => {
			if (i > 12) return;
			const span = el.querySelector("span");
			if (!span) return;
			results.push({
				i,
				text: span.textContent ?? "",
				classes: span.className,
				color: getComputedStyle(span).color,
			});
		});
		return results;
	});
	console.log(JSON.stringify(info, null, 2));
	await browser.close();
};
run();
