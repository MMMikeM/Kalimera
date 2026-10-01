import { expect, type Page, test } from "@playwright/test";

// The specimen page at /specimens/grammar-mark renders every case, gender and
// number plus the layouts that break marks: short words, long phrases, narrow
// columns, big text, punctuation. Screenshots catch drawing regressions; the
// DOM checks pin down the rules a screenshot can pass by accident.

const SECTIONS = [
	"filled-one",
	"filled-many",
	"outlined-one",
	"outlined-many",
	"neutral",
	"short",
	"sizes",
	"long",
	"wrapping",
	"overflow",
	"sentence",
] as const;

test.use({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });

// One page load per test, one test at a time: twenty parallel loads of the same
// page overwhelm the dev server, which drops requests and leaves a test waiting
// on a page that never rendered.
test.describe.configure({ mode: "default" });

const openSpecimens = async (page: Page) => {
	await page.goto("/specimens/grammar-mark", { waitUntil: "networkidle" });
	await page.evaluate(() => document.fonts.ready);
	// The router devtools badge is fixed to the viewport and would land in some screenshots
	await page.addStyleTag({ content: ".TanStackRouterDevtools { display: none !important; }" });
};

test.describe("grammar mark, drawn", () => {
	test("every specimen, light theme", async ({ page }) => {
		await openSpecimens(page);
		for (const id of SECTIONS) {
			await expect.soft(page.getByTestId(id), id).toHaveScreenshot(`${id}.png`);
		}
	});

	test("filled-many, dark theme", async ({ page }) => {
		await page.emulateMedia({ colorScheme: "dark" });
		await openSpecimens(page);
		await expect(page.getByTestId("filled-many")).toHaveScreenshot("filled-many-dark.png");
	});
});

test.describe("grammar mark, rules", () => {
	test("never splits a marked phrase across lines", async ({ page }) => {
		await openSpecimens(page);
		const split = await page.evaluate(() =>
			[...document.querySelectorAll<HTMLElement>("[data-grammar-mark]")]
				.filter((mark) => {
					const greek = mark.querySelector("[lang=el]");
					return mark.getClientRects().length !== 1 || !greek || greek.getClientRects().length !== 1;
				})
				.map((mark) => mark.textContent),
		);
		expect(split).toEqual([]);
	});

	test("moves whole phrases to the next line in a narrow column", async ({ page }) => {
		await openSpecimens(page);
		const tops = await page
			.getByTestId("wrapping")
			.locator("[data-grammar-mark]")
			.evaluateAll((marks) => marks.map((m) => Math.round(m.getBoundingClientRect().top)));
		// The column is narrow enough that the four phrases need more than one line
		expect(new Set(tops).size).toBeGreaterThan(1);
	});

	test("overflows a container narrower than the phrase instead of wrapping", async ({ page }) => {
		await openSpecimens(page);
		const { mark, box } = await page.getByTestId("overflow").evaluate((section) => {
			const m = section.querySelector("[data-grammar-mark]")!;
			return {
				mark: { width: m.getBoundingClientRect().width, rects: m.getClientRects().length },
				box: m.parentElement!.getBoundingClientRect().width,
			};
		});
		expect(mark.rects).toBe(1);
		expect(mark.width).toBeGreaterThan(box);
	});

	test("stretches the mark to the phrase, and never below 30px", async ({ page }) => {
		await openSpecimens(page);
		const sizes = await page.evaluate(() =>
			[...document.querySelectorAll<HTMLElement>("[data-grammar-mark]")].map((mark) => ({
				text: mark.textContent,
				mark: mark.getBoundingClientRect().width,
				svg: mark.querySelector("svg")!.getBoundingClientRect().width,
				greek: mark.querySelector("[lang=el]")!.getBoundingClientRect().width,
			})),
		);
		for (const s of sizes) {
			expect(s.mark, s.text ?? "").toBeGreaterThanOrEqual(Math.max(30, s.greek) - 0.5);
			// Inset 2px at each end so neighbouring marks keep a gap
			expect(s.svg, s.text ?? "").toBeCloseTo(s.mark - 4, 0);
		}
	});

	test("draws two mirrored lines for more than one, and one line otherwise", async ({ page }) => {
		await openSpecimens(page);
		const marks = await page.evaluate(() =>
			[...document.querySelectorAll<HTMLElement>("[data-grammar-mark]")].map((mark) => ({
				plural: mark.dataset.plural === "true",
				ys: [...mark.querySelectorAll("line")].map((l) => Number(l.getAttribute("y1"))),
			})),
		);
		for (const m of marks) {
			if (!m.plural) {
				expect(m.ys).toEqual([4.5]);
				continue;
			}
			expect(m.ys).toHaveLength(2);
			expect(4.5 - m.ys[0]!).toBeCloseTo(m.ys[1]! - 4.5);
		}
	});

	test("draws every end shape 9px tall, bar the vocative's hanging dot", async ({ page }) => {
		await openSpecimens(page);
		const heights = await page.getByTestId("filled-one").evaluate((section) =>
			[...section.querySelectorAll<HTMLElement>("[data-grammar-mark]:not([data-case=vocative])")].map((mark) => {
				const shape = mark.querySelector("svg > polygon, svg > circle")!;
				return Math.round(shape.getBoundingClientRect().height * 2) / 2;
			}),
		);
		expect(heights.length).toBe(9);
		expect(new Set(heights)).toEqual(new Set([9]));
	});

	test("tells a screen reader the form, gender and number", async ({ page }) => {
		await openSpecimens(page);
		const section = page.getByTestId("filled-many");
		await expect(section.getByText("Target form, feminine, more than one", { exact: true })).toHaveCount(1);
		await expect(page.getByTestId("neutral").getByText("Owner form", { exact: true })).toHaveCount(1);
	});

	test("hides the mark itself from assistive technology", async ({ page }) => {
		await openSpecimens(page);
		const exposed = await page.evaluate(
			() => [...document.querySelectorAll("[data-grammar-mark] svg")].filter((svg) => !svg.closest("[aria-hidden=true]")).length,
		);
		expect(exposed).toBe(0);
	});
});
