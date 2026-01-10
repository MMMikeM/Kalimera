import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE_URL = "http://localhost:5173";
const OUTPUT_DIR = "scripts/mobile-audit-output";

const ROUTES = [
	{ path: "/", name: "home" },
	{ path: "/login", name: "login" },
	{ path: "/register", name: "register" },
	{ path: "/try", name: "try" },
	{ path: "/practice/speed", name: "practice-speed" },
	{ path: "/learn", name: "learn" },
	{ path: "/learn/conversations/arriving", name: "conversations-arriving" },
	{ path: "/learn/phrases/survival", name: "phrases-survival" },
	{ path: "/learn/vocabulary/nouns", name: "vocabulary-nouns" },
	{ path: "/learn/vocabulary/essentials", name: "vocabulary-essentials" },
	{ path: "/reference", name: "reference" },
	{ path: "/reference/cases", name: "reference-cases" },
	{ path: "/reference/pronouns", name: "reference-pronouns" },
	{ path: "/reference/patterns", name: "reference-patterns" },
	{ path: "/search", name: "search" },
	{ path: "/progress", name: "progress" },
	{ path: "/support", name: "support" },
];

const VIEWPORT = { width: 375, height: 812 }; // iPhone X

const run = async () => {
	const browser = await chromium.launch();
	const summary: string[] = [];

	const context = await browser.newContext({ viewport: VIEWPORT });
	const page = await context.newPage();

	const errors: string[] = [];
	page.on("console", (msg) => {
		if (msg.type() === "error") {
			errors.push(msg.text());
		}
	});

	for (const route of ROUTES) {
		const routeDir = `${OUTPUT_DIR}/${route.name}`;
		await mkdir(routeDir, { recursive: true });

		console.log(`Capturing ${route.name}...`);
		errors.length = 0;

		try {
			await page.goto(`${BASE_URL}${route.path}`, {
				waitUntil: "networkidle",
				timeout: 10000,
			});

			// App uses fixed shell - scroll container is .app-main
			const totalHeight = await page.evaluate(() => {
				const scrollContainer = document.querySelector(".app-main");
				return scrollContainer?.scrollHeight ?? document.body.scrollHeight;
			});
			const viewportHeight = VIEWPORT.height;
			const screenshots = Math.ceil(totalHeight / viewportHeight);

			// Scroll and capture each viewport
			for (let i = 0; i < screenshots; i++) {
				await page.evaluate((y) => {
					const scrollContainer = document.querySelector(".app-main");
					if (scrollContainer) {
						scrollContainer.scrollTo(0, y);
					} else {
						window.scrollTo(0, y);
					}
				}, i * viewportHeight);
				await page.waitForTimeout(100); // Let animations settle

				await page.screenshot({
					path: `${routeDir}/${i + 1}.png`,
				});
			}

			console.log(`  -> ${screenshots} screenshots`);

			if (errors.length > 0) {
				summary.push(`${route.name}: ${errors.length} console errors`);
			}
		} catch (err) {
			summary.push(`${route.name}: FAILED - ${err}`);
		}
	}

	await context.close();
	await browser.close();

	console.log("\n=== AUDIT COMPLETE ===");
	console.log(`Screenshots saved to: ${OUTPUT_DIR}/`);
	if (summary.length > 0) {
		console.log("\nIssues found:");
		for (const s of summary) {
			console.log(`  - ${s}`);
		}
	}
};

run().catch(console.error);
