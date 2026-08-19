/**
 * Guards the two Greek rendering conventions.
 *
 * There are two transliteration helpers with opposite jobs — one produces the
 * key used to grade answers, the other the gloss shown to learners — and for a
 * long time every rendered gloss used the wrong one. Components now own that
 * choice, so nothing else may reach past them.
 *
 * This is a grep, not an AST pass, and that is deliberate: it has to keep
 * working while the oxlint JS plugin API is still alpha, and it runs in CI
 * where editor tooling does not.
 *
 *   pnpm lint:greek
 */

import { execFileSync } from "node:child_process";

interface Violation {
	file: string;
	line: string;
	rule: string;
}

interface Rule {
	name: string;
	pattern: string;
	allow: RegExp;
	why: string;
}

const RULES: Rule[] = [
	{
		// Only the render helpers. matchPhonetic is the answer grader and is
		// imported freely — it never produces anything a learner sees.
		name: "no-transliteration-import",
		pattern: "greekTo(Phonetic|Pronunciation)",
		allow: /^(src\/components\/(GreekText|Pronunciation|GreekGloss)\.tsx|src\/lib\/greek-|scripts\/)/,
		why: "import the components instead — GreekText, Pronunciation, GreekGloss",
	},
	{
		name: "no-raw-lang-el",
		pattern: 'lang="el"',
		// index.css defines the [lang="el"] selector these components rely on
		allow: /^(src\/components\/GreekText\.tsx|src\/index\.css)/,
		why: "use <GreekText>, which owns the lang attribute",
	},
	{
		name: "no-raw-greek-text-class",
		pattern: "greek-text",
		allow: /^(src\/components\/GreekText\.tsx|src\/index\.css)/,
		why: "use <GreekText>, which owns the greek-text class",
	},
];

const search = (pattern: string): string[] => {
	try {
		return execFileSync("rg", ["-n", "--no-heading", "-e", pattern, "src"], { encoding: "utf-8" })
			.split("\n")
			.filter(Boolean);
	} catch {
		return []; // rg exits non-zero when nothing matches
	}
};

const violations: Violation[] = [];

for (const rule of RULES) {
	for (const hit of search(rule.pattern)) {
		const file = hit.slice(0, hit.indexOf(":"));
		if (rule.allow.test(file)) continue;
		if (file.endsWith(".test.ts") || file.endsWith(".test.tsx")) continue;
		if (file.endsWith(".llm")) continue; // prose docs, not markup
		violations.push({ file, line: hit, rule: rule.name });
	}
}

if (violations.length === 0) {
	console.log("greek conventions: clean");
	process.exit(0);
}

const byRule = new Map<string, Violation[]>();
for (const violation of violations) {
	byRule.set(violation.rule, [...(byRule.get(violation.rule) ?? []), violation]);
}

for (const [name, found] of byRule) {
	const rule = RULES.find((candidate) => candidate.name === name);
	console.log(`\n${name} — ${found.length} (${rule?.why})`);
	const files = new Map<string, number>();
	for (const violation of found) files.set(violation.file, (files.get(violation.file) ?? 0) + 1);
	for (const [file, count] of [...files].sort((a, b) => b[1] - a[1])) {
		console.log(`  ${count.toString().padStart(3)}  ${file}`);
	}
}

console.log(`\n${violations.length} violations across ${new Set(violations.map((v) => v.file)).size} files`);
process.exit(1);
