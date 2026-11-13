import { readdirSync } from "node:fs";
import { join, relative } from "node:path";

import { describe, expect, it } from "vite-plus/test";

import { GUIDES } from "./guides/guides.data";
import { REFERENCE_REDIRECTS } from "./reference/redirects.data";

const ROUTES_DIR = join(import.meta.dirname);
/** The router's own ignore pattern (vite.config.ts): these files are not routes. */
const NOT_A_ROUTE = /(tabs|components|\.test\.|\.data\.)/;

const routeFiles = (dir: string): string[] =>
	readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return NOT_A_ROUTE.test(entry.name) ? [] : routeFiles(path);
		return entry.name.endsWith(".tsx") && !NOT_A_ROUTE.test(entry.name) ? [path] : [];
	});

/** Each route file as a pattern its URLs match: `$param` and `$` match any segment(s). */
const ROUTE_PATTERNS = routeFiles(ROUTES_DIR).map((file) => {
	const segments = relative(ROUTES_DIR, file)
		.replace(/\.tsx$/, "")
		.split("/")
		.filter((segment) => !/^(index|route|__root|\(.*\))$/.test(segment));
	const pattern = segments
		.map((segment) => (segment === "$" ? ".+" : segment.startsWith("$") ? "[^/]+" : segment))
		.join("/");
	return new RegExp(`^/${pattern}/?$`);
});

const isRoute = (href: string) => {
	const path = href.split("#")[0]!.split("?")[0]!;
	return ROUTE_PATTERNS.some((pattern) => pattern.test(path));
};

describe("links to tables", () => {
	const links = GUIDES.flatMap((guide) => guide.reference.map((ref) => ({ guide: guide.slug, href: ref.href })));

	it.each(links)("$guide links to a page that exists: $href", ({ href }) => {
		expect(isRoute(href)).toBe(true);
	});

	it("never links to the old /reference addresses", () => {
		expect(links.filter(({ href }) => href.startsWith("/reference"))).toEqual([]);
	});
});

describe("old /reference addresses", () => {
	it.each(Object.entries(REFERENCE_REDIRECTS))("/reference/%s lands on a page that exists", (_, target) => {
		expect(isRoute(target)).toBe(true);
		expect(target.startsWith("/reference")).toBe(false);
	});
});
