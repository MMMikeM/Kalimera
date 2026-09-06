import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { DRILL_REGISTRY } from "./drill-catalogue.data";

const PRACTICE_DIR = join(import.meta.dirname, ".");

const tsxFiles = (dir: string): string[] =>
	readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
		e.isDirectory()
			? tsxFiles(join(dir, e.name))
			: e.name.endsWith(".tsx")
				? [join(dir, e.name)]
				: [],
	);

/** Every `drillId="…"` a route under /practice hands to <Drill>. */
const routeDrillIds = (): Map<string, string> => {
	const found = new Map<string, string>();
	for (const file of tsxFiles(PRACTICE_DIR)) {
		for (const [, id] of readFileSync(file, "utf8").matchAll(/drillId="([^"]+)"/g)) {
			found.set(id!, file);
		}
	}
	return found;
};

describe("drill catalogue", () => {
	it("lists every drill that records attempts", () => {
		const missing = [...routeDrillIds()]
			.filter(([id]) => !DRILL_REGISTRY[id])
			.map(([id, file]) => `${id} (${file})`);

		// Review and the practice CTA both filter on the catalogue, so a drill
		// missing here still runs but can never resurface.
		expect(missing).toEqual([]);
	});

	it("has no entry for a drill that no longer exists", () => {
		const live = routeDrillIds();
		expect(Object.keys(DRILL_REGISTRY).filter((id) => !live.has(id))).toEqual([]);
	});

	it("points every entry at the route that runs it", () => {
		const live = routeDrillIds();
		for (const [id, entry] of Object.entries(DRILL_REGISTRY)) {
			// `/practice/verbs/ladder` → the route file .../verbs/ladder.tsx
			expect(live.get(id)?.endsWith(`${entry.to.replace("/practice", "")}.tsx`)).toBe(true);
		}
	});
});
