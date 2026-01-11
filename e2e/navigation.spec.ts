import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

test.describe("Navigation", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(BASE_URL);
		await page.evaluate(() => {
			localStorage.setItem("greek-practice-user", "1");
		});
	});

	test("homepage loads", async ({ page }) => {
		await page.goto(BASE_URL);
		await expect(page.locator("text=καλημέρα")).toBeVisible();
	});

	test("Practice nav link works", async ({ page }) => {
		await page.goto(BASE_URL);
		await page.click("text=Practice");
		await expect(page).toHaveURL(/\/practice\/speed/);
		await expect(
			page.getByRole("heading", { name: "Speed Drill" }),
		).toBeVisible();
	});

	test("Explore nav link works", async ({ page }) => {
		await page.goto(BASE_URL);
		await page.click("text=Explore");
		await expect(page).toHaveURL(/\/explore\/conversations\/arriving/);
		await expect(page.getByRole("heading", { name: "Explore" })).toBeVisible();
	});

	test("Reference nav link works", async ({ page }) => {
		await page.goto(BASE_URL);
		await page.click("text=Reference");
		await expect(page).toHaveURL(/\/reference\/cases-pronouns/);
		await expect(
			page.getByRole("heading", { name: "Quick Reference" }),
		).toBeVisible();
	});

	test("Explore subsection tabs work", async ({ page }) => {
		await page.goto(`${BASE_URL}/explore/conversations/arriving`);

		// Click Phrases tab
		await page.click("text=Phrases");
		await expect(page).toHaveURL(/\/explore\/phrases\/survival/);

		// Click Words tab
		await page.click("text=Vocabulary");
		await expect(page).toHaveURL(/\/explore\/words\/nouns/);

		// Click back to Conversations
		await page.click("text=Conversations");
		await expect(page).toHaveURL(/\/explore\/conversations\/arriving/);
	});

	test("Reference tabs work", async ({ page }) => {
		await page.goto(`${BASE_URL}/reference/cases-pronouns`);

		// Click Nouns tab
		await page.getByRole("link", { name: /Nouns/ }).click();
		await expect(page).toHaveURL(/\/reference\/nouns-articles/);

		// Click Adjectives tab
		await page.getByRole("link", { name: /Adjectives/ }).click();
		await expect(page).toHaveURL(/\/reference\/adjectives/);

		// Click Verbs tab
		await page.getByRole("link", { name: /Verbs/ }).click();
		await expect(page).toHaveURL(/\/reference\/verbs/);
	});

	test("Practice tabs work", async ({ page }) => {
		await page.goto(`${BASE_URL}/practice/speed`);

		await page.click("text=Pronouns");
		await expect(page).toHaveURL(/\/practice\/pronouns/);

		await page.click("text=Articles");
		await expect(page).toHaveURL(/\/practice\/articles/);
	});
});
