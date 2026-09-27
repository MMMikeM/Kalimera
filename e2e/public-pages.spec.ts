import { expect, type Page, test } from "@playwright/test";

// /try is anonymous and keeps its attempts client-side, so none of this needs an account.

const TRY_ANSWERS: ReadonlyArray<readonly [hint: string, greeklish: string]> = [
	["she sees me", "me"],
	["I see you", "se"],
	["your house", "sou"],
	["I see him", "ton"],
	["I see her", "tin"],
	["my house", "mou"],
	["I want", "thelo"],
	["I have", "exo"],
];

const startTryDrill = async (page: Page) => {
	// The Start button is server-rendered; clicking it before hydration does nothing.
	await page.goto("/try", { waitUntil: "networkidle" });
	await page.getByRole("button", { name: "Start" }).click();
	await expect(page.getByText("1 of 8")).toBeVisible();
};

const answerInput = (page: Page) => page.getByLabel("Your answer, in Latin letters");

test("Enter in the header search leaves the drill alone", async ({ page }) => {
	await startTryDrill(page);
	await page.getByPlaceholder("Search Greek, English, or tags...").fill("me");
	await page.keyboard.press("Enter");
	await page.waitForTimeout(300);
	await expect(page.getByText("Incorrect")).toHaveCount(0);
	await expect(page.getByText("1 of 8")).toBeVisible();
});

test("a blank Enter does not use up a card", async ({ page }) => {
	await startTryDrill(page);
	await answerInput(page).press("Enter");
	await page.waitForTimeout(300);
	await expect(page.getByText("Incorrect")).toHaveCount(0);
	await expect(page.getByText("1 of 8")).toBeVisible();
});

test("the /try drill is eight prompts and ends on the summary", async ({ page }) => {
	await startTryDrill(page);
	for (let card = 1; card <= 8; card++) {
		await expect(page.getByText(`${card} of 8`)).toBeVisible();
		const prompt = await page.locator("main").innerText();
		const answer = TRY_ANSWERS.find(([hint]) => prompt.includes(hint))?.[1] ?? "";
		await answerInput(page).fill(answer);
		await answerInput(page).press("Enter");
		await expect(page.getByText("Correct", { exact: true })).toBeVisible();
		await page.keyboard.press("Enter");
	}
	await expect(page.getByRole("heading", { level: 1, name: "8 of 8 correct" })).toBeVisible();
});

test("an unknown page is a 404 inside the app shell", async ({ page }) => {
	const response = await page.goto("/no-such-page");
	expect(response?.status()).toBe(404);
	await expect(page.getByRole("heading", { level: 1, name: "There's no page here." })).toBeVisible();
	await expect(page.getByRole("link", { name: "Reference" }).first()).toBeVisible();
});

test("an unknown reference tab is a 404", async ({ page }) => {
	const response = await page.goto("/reference/no-such-tab");
	expect(response?.status()).toBe(404);
});
