import type { Page } from "playwright";

export async function loginWithCredentials(
	page: Page,
	baseUrl: string,
	username: string = "Mike",
	password: string = "12345",
): Promise<void> {
	// Navigate to login page
	await page.goto(`${baseUrl}/login`, { waitUntil: "domcontentloaded" });

	// Fill in the login form
	await page.fill('input[name="username"]', username);
	await page.fill('input[name="password"]', password);

	// Submit the form
	await page.click('button[type="submit"]');

	// Wait for navigation to complete (should redirect to home)
	await page.waitForURL("**/", { timeout: 10000 });

	// Ensure the page is fully loaded before returning
	await page.waitForLoadState("networkidle");
}
