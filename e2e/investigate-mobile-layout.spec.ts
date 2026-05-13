/**
 * Mobile layout investigation script.
 * Run: npx playwright test e2e/investigate-mobile-layout.spec.ts
 * Results written to e2e/screenshots/layout-report.json
 */
import { writeFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

// Fake auth cookie — matches createAuthCookie() format (plain JSON, no signing)
const AUTH_COOKIE = {
	name: "auth",
	value: encodeURIComponent(JSON.stringify({ userId: 1, username: "testuser" })),
	path: "/",
	httpOnly: true,
	sameSite: "Lax" as const,
};

const IPHONE_VIEWPORT = { width: 390, height: 844 };

test.use({ viewport: IPHONE_VIEWPORT });

test("practice index mobile layout — screenshot + measurements", async ({ page }) => {
	await page.context().addCookies([{ ...AUTH_COOKIE, domain: "localhost" }]);
	await page.goto("/practice");
	await page.waitForLoadState("networkidle");

	// Screenshot
	await page.screenshot({ path: "e2e/screenshots/practice-mobile.png", fullPage: false });

	const report: Record<string, unknown> = {};

	const measure = async (label: string, locator: ReturnType<typeof page.locator>) => {
		const box = await locator.boundingBox();
		report[label] = box ?? "NOT FOUND";
		return box;
	};

	const shell = page.locator(".app-shell");
	const main = page.locator(".app-main");
	const header = page.locator("header").first();

	await measure("app-shell", shell);
	await measure("app-main", main);
	await measure("header (MobileHeader)", header);

	// Inspect all children of the max-w-6xl container
	const children = page.locator(".app-main > div > *");
	const count = await children.count();
	const childData: unknown[] = [];
	for (let i = 0; i < count; i++) {
		const child = children.nth(i);
		const tag = await child.evaluate((el) => el.tagName.toLowerCase());
		const cls = await child.getAttribute("class");
		const box = await child.boundingBox();
		childData.push({ i, tag, cls, box });
	}
	report["children_of_max-w-6xl"] = childData;

	// Computed styles
	report["app-shell_computed"] = await shell.evaluate((el) => {
		const s = window.getComputedStyle(el);
		return { position: s.position, height: s.height, minHeight: s.minHeight, display: s.display, flexDirection: s.flexDirection, justifyContent: s.justifyContent, overflow: s.overflow };
	});

	report["app-main_computed"] = await main.evaluate((el) => {
		const s = window.getComputedStyle(el);
		return { position: s.position, height: s.height, minHeight: s.minHeight, flex: s.flex, overflowY: s.overflowY, scrollTop: (el as HTMLElement).scrollTop };
	});

	// MobileNav
	await measure("MobileNav", page.locator("nav").first());

	writeFileSync("e2e/screenshots/layout-report.json", JSON.stringify(report, null, 2));

	await expect(page.locator("text=The case system")).toBeVisible();
});
