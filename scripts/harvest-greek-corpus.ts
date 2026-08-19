/**
 * Harvests real Greek strings from the app and snapshots what the CURRENT
 * `greekToPronunciation` renders for each.
 *
 * The resulting fixture is a regression harness for rewriting the transliteration
 * pipeline: a handful of hand-written tests cannot police a rewrite, because the
 * places it drifts silently (γγν, αυ/ευ voicing context, word-initial clusters)
 * are exactly the places nobody thinks to write a test for.
 *
 * Run BEFORE changing the engine, commit the output, then require the new
 * implementation to reproduce it byte for byte.
 *
 *   pnpm exec tsx scripts/harvest-greek-corpus.ts
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { greekToPronunciation } from "@/lib/greek-phonetic";

const SOURCE_DIRS = [
	"src/routes/practice/blocks",
	"src/routes/practice/cases",
	"src/routes/practice/verbs",
	"src/routes/practice/pronouns",
	"src/scripts/seed-data",
];

const OUTPUT = "src/lib/__fixtures__/pronunciation-corpus.json";

const GREEK_LETTER = /[Ͱ-Ͽἀ-῿]/;
const DOUBLE_QUOTED = /"([^"\\\n]+)"/g;

const listFiles = (dir: string): string[] => {
	if (!fs.existsSync(dir)) return [];
	return execFileSync("fd", ["-e", "ts", "-e", "tsx", ".", dir], { encoding: "utf-8" })
		.split("\n")
		.filter(Boolean);
};

const harvest = (): string[] => {
	const found = new Set<string>();

	for (const file of SOURCE_DIRS.flatMap(listFiles)) {
		const source = fs.readFileSync(file, "utf-8");
		for (const [, literal] of source.matchAll(DOUBLE_QUOTED)) {
			if (literal && GREEK_LETTER.test(literal)) found.add(literal);
		}
	}

	// Sorted so the fixture is stable across runs and diffs stay readable
	return [...found].sort();
};

const strings = harvest();
const corpus = Object.fromEntries(strings.map((greek) => [greek, greekToPronunciation(greek)]));

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, `${JSON.stringify(corpus, null, "\t")}\n`);

console.log(`Harvested ${strings.length} Greek strings → ${OUTPUT}`);
