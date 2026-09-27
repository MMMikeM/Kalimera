// Screenshot and repro harness for the Impeccable UI review (see ../README.md).
//
//   pnpm exec tsx wip/impeccable-review/scripts/review-capture.ts [pages|drill|repro|all]
//
// BASE_URL      defaults to http://127.0.0.1:5173 (a running dev server)
// OUT_DIR       defaults to screenshots/review/ (gitignored)
// CHROMIUM_PATH optional, for sandboxes with a pre-installed Chromium
//
// Public pages only: no login. The drill states use /try, which is anonymous and
// keeps its attempts client-side.

import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { chromium, type Browser, type Page } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:5173";
const OUT_DIR = process.env.OUT_DIR || join(process.cwd(), "screenshots", "review");
const MODE = process.argv[2] ?? "all";

const VIEWPORTS = [
	{ label: "desktop", size: { width: 1280, height: 900 } },
	{ label: "mobile", size: { width: 375, height: 812 } },
] as const;

const PAGES = [
	{ name: "home", route: "/" },
	{ name: "try-intro", route: "/try" },
	{ name: "reference-cases", route: "/reference/cases" },
	{ name: "learn-essentials", route: "/learn/essentials" },
	// Needs the database; renders the root error boundary without one.
	{ name: "essentials-numbers", route: "/learn/essentials/numbers" },
];

// The /try deck is shuffled, so the answer is looked up from the visible prompt.
const TRY_ANSWERS: ReadonlyArray<readonly [prompt: string, greeklish: string]> = [
	["you (object", "se"],
	["me (object", "me"],
	["your (singular)", "sou"],
	["him", "ton"],
	["her", "tin"],
	["my", "mou"],
	["I want", "thelw"],
	["I have", "exw"],
];

const HIDE_DEVTOOLS_CSS = ".TanStackRouterDevtools { display: none !important; }";
const DRILL_INPUT = 'input[placeholder="greeklish..."]';
const SEARCH_INPUT = 'input[placeholder="Search Greek, English, or tags..."]';

const shot = (page: Page, file: string) => page.screenshot({ path: join(OUT_DIR, `${file}.png`) });

const mainText = async (page: Page) =>
	(await page.locator("main").innerText()).replace(/\s+/g, " ").trim();

const answerFor = (prompt: string) =>
	TRY_ANSWERS.find(([key]) => prompt.includes(key))?.[1] ?? "thelw";

const openPage = async (page: Page, route: string) => {
	await page.goto(BASE_URL + route, { waitUntil: "networkidle" }).catch(() => undefined);
	await page.addStyleTag({ content: HIDE_DEVTOOLS_CSS }).catch(() => undefined);
	await page.waitForTimeout(1000);
};

const startTryDrill = async (page: Page) => {
	await openPage(page, "/try");
	await page.getByRole("button", { name: /start drill/i }).click();
	await page.waitForTimeout(500);
};

// The app scrolls inside .app-main, and a full-page capture of the flattened shell
// does not paint below the fold in headless Chromium, so step through viewports.
const capturePages = async (browser: Browser) => {
	for (const { label, size } of VIEWPORTS) {
		const page = await browser.newPage({ viewport: size });
		for (const { name, route } of PAGES) {
			await openPage(page, route);
			const total = await page.evaluate(
				() => document.querySelector(".app-main")?.scrollHeight ?? 0,
			);
			const step = size.height - 120;
			const frames = Math.max(1, Math.min(6, Math.ceil(total / step)));
			for (let i = 0; i < frames; i++) {
				await page.evaluate(
					(top) => document.querySelector(".app-main")?.scrollTo(0, top),
					i * step,
				);
				await page.waitForTimeout(350);
				await shot(page, `${label}-${name}-${i}`);
			}
			console.log(`pages  ${label} ${route} (${frames} frame${frames === 1 ? "" : "s"})`);
		}
		await page.close();
	}
};

const captureDrill = async (browser: Browser) => {
	for (const { label, size } of VIEWPORTS) {
		const page = await browser.newPage({ viewport: size });
		await startTryDrill(page);
		await shot(page, `${label}-try-question`);

		const drillInput = page.locator(DRILL_INPUT);
		await drillInput.fill(answerFor(await mainText(page)));
		await page.keyboard.press("Enter");
		await page.waitForTimeout(500);
		await shot(page, `${label}-try-correct`);

		// A correct answer auto-advances after 1200ms.
		await page.waitForTimeout(1500);
		await drillInput.fill("xyz");
		await page.keyboard.press("Enter");
		await page.waitForTimeout(500);
		await shot(page, `${label}-try-wrong`);
		console.log(`drill  ${label} question, correct and wrong states`);
		await page.close();
	}
};

// Enter pressed in the header search must not submit the drill answer.
// drill-hooks.ts useForwardKeyboard listens on window without checking e.target.
const reproEnterInSearch = async (browser: Browser) => {
	const page = await browser.newPage({ viewport: VIEWPORTS[0].size });
	await startTryDrill(page);
	const search = page.locator(SEARCH_INPUT);
	await search.click();
	await search.fill("me");
	await page.keyboard.press("Enter");
	await page.waitForTimeout(400);
	const after = await mainText(page);
	const leaked = after.includes("Incorrect") || after.includes("remediation");
	console.log(
		leaked
			? "repro  FAIL: Enter in the header search submitted a blank drill answer"
			: "repro  PASS: Enter in the header search left the drill alone",
	);
	await shot(page, "desktop-repro-enter-in-search");
	await page.close();
	return leaked;
};

const run = async () => {
	await mkdir(OUT_DIR, { recursive: true });
	const browser = await chromium.launch(
		process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
	);
	try {
		if (MODE === "pages" || MODE === "all") await capturePages(browser);
		if (MODE === "drill" || MODE === "all") await captureDrill(browser);
		const leaked = MODE === "repro" || MODE === "all" ? await reproEnterInSearch(browser) : false;
		console.log(`\nSaved to ${OUT_DIR}`);
		process.exitCode = leaked ? 1 : 0;
	} finally {
		await browser.close();
	}
};

run();
