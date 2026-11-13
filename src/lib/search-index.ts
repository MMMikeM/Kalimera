import { type FuzzyResult, SCORES, createFuzzySearch } from "ekrina";

import { searchKey } from "@/lib/greek-transliteration";
import type { SearchEntry, SearchHit, SearchLink, SearchResult } from "@/lib/search-types";

/**
 * What the server sends per vocabulary row. `forms` pairs each inflected form
 * with the slot(s) it fills, joined by "+": verbs `pr.sg2` (tense code, person),
 * imperatives `im.i.s` (aspect, number), nouns `a.p` (case, number).
 */
export interface SearchWireItem {
	id: number;
	/** Nouns carry their article. */
	greek: string;
	english: string;
	type: string;
	rank: number | null;
	forms?: [form: string, slot: string][];
	parts?: { past?: string; future?: string };
	link?: SearchLink;
}

interface Item {
	entry: SearchEntry;
	rank: number;
	typeOrder: number;
}

interface Key {
	item: Item;
	text: string;
	/** Absent when the key is the dictionary word itself. */
	form?: { greek: string; slot: string };
}

const TYPE_ORDER: Record<string, number> = { noun: 0, verb: 1, pronoun: 2, adjective: 3, adverb: 4 };

const ARTICLES = new Set(["ο", "η", "το", "τον", "την", "τη", "του", "της", "οι", "τα", "τους", "τις", "των"]);

const stripArticle = (greek: string) => {
	const [first, ...rest] = greek.split(" ");
	return first && rest.length > 0 && ARTICLES.has(first) ? rest.join(" ") : greek;
};

const stripEnglishLead = (text: string) => text.replace(/^(?:i|to|the|a|an)\s+/i, "");

const stripQueryLead = (query: string) => {
	const stripped = stripEnglishLead(query);
	return stripped.length >= 2 ? stripped : query;
};

const glossAlternatives = (english: string) => [
	...new Set(
		english
			.split(/[/;,()]/)
			.map((part) => stripEnglishLead(part.trim()))
			.filter(Boolean),
	),
];

const PRONOUNS: Record<string, string> = {
	sg1: "I",
	sg2: "you",
	sg3: "he/she",
	pl1: "we",
	pl2: "you all",
	pl3: "they",
};

const BE: Record<string, string> = {
	sg1: "am",
	sg2: "are",
	sg3: "is",
	pl1: "are",
	pl2: "are",
	pl3: "are",
};

const MODALS = new Set(["can", "must", "will", "may", "should", "shall", "might"]);

const thirdPerson = (verb: string) => {
	if (MODALS.has(verb)) return verb;
	if (verb === "have") return "has";
	if (/(?:s|sh|ch|x|z|o)$/.test(verb)) return `${verb}es`;
	if (/[^aeiou]y$/.test(verb)) return `${verb.slice(0, -1)}ies`;
	return `${verb}s`;
};

const presentNote = (person: string, english: string) => {
	const pronoun = PRONOUNS[person] ?? person;
	const match = /^I ([a-z]+)((?: [a-z]+)*?)(?:[/,(].*)?$/.exec(english);
	if (!match?.[1]) return `now, ${pronoun}`;
	const [, verb, rest = ""] = match;
	const inflected = verb === "am" ? (BE[person] ?? verb) : person === "sg3" ? thirdPerson(verb) : verb;
	return `${pronoun} ${inflected}${rest}`;
};

const TENSE_NOTE: Record<string, string> = {
	pr: "now",
	ao: "past",
	pc: "past, ongoing",
	fu: "future",
};
const CASE_ROLE: Record<string, string> = { n: "Doer", a: "Target", g: "Owner" };

/** Plain English for a matched form, in the learner's words rather than grammar terms. */
const noteFor = (slot: string, english: string) => {
	const slots = slot.split("+");
	const [kind = "", second = "", third = ""] = (slots[0] ?? "").split(".");
	if (kind === "im") {
		return `command, ${second === "p" ? "once" : "ongoing"}${third === "p" ? ", to several people" : ""}`;
	}
	if (kind in TENSE_NOTE) {
		return kind === "pr"
			? presentNote(second, english)
			: `${TENSE_NOTE[kind]}, ${PRONOUNS[second] ?? second}`;
	}
	const roles = [...new Set(slots.map((s) => CASE_ROLE[s.charAt(0)]))].join(" or ");
	return second === "p" ? `${roles}, several` : roles;
};

const ELISION = /['\u2019\u02bc]\s*/;
const GREEK_SCRIPT = /[Ͱ-Ͽἀ-῿]/;
const QUESTION_MARKS = /[;;?]/g;

interface Hit {
	key: Key;
	bucket: number;
}

const bucketOf = (score: number) =>
	score <= SCORES.NORMALISED_EXACT ? 0 : score <= SCORES.PREFIX ? 1 : score <= SCORES.MULTI_WORD ? 2 : 3;

const toHit = (result: FuzzyResult<Key>): Hit => ({ key: result.item, bucket: bucketOf(result.score) });

const hitsUnder = (results: FuzzyResult<Key>[], maxScore: number) =>
	results.filter((r) => r.score <= maxScore).map(toHit);

/** Below this many characters a query only matches at the start of a word: anywhere else is noise. */
const SHORT_QUERY = 4;
const GREEKLISH_PREFIX_FROM = 4;

const maxScoreFor = (query: string) => (query.length < SHORT_QUERY ? SCORES.BOUNDARY : SCORES.CONTAINS);

const rank = (hits: Hit[]): SearchHit[] => {
	const best = new Map<Item, Hit>();
	for (const hit of hits) {
		const current = best.get(hit.key.item);
		const better =
			!current ||
			hit.bucket < current.bucket ||
			(hit.bucket === current.bucket && !hit.key.form && current.key.form);
		if (better) best.set(hit.key.item, hit);
	}
	return [...best.values()]
		.sort(
			(a, b) =>
				a.bucket - b.bucket ||
				a.key.item.rank - b.key.item.rank ||
				a.key.item.typeOrder - b.key.item.typeOrder ||
				a.key.item.entry.id - b.key.item.entry.id,
		)
		.map(({ key }): SearchHit => {
			const { entry } = key.item;
			return key.form
				? { entry, matchedForm: { greek: key.form.greek, note: noteFor(key.form.slot, entry.english) } }
				: { entry };
		});
};

const group = (hits: Hit[]): SearchResult => {
	const all = rank(hits);
	return {
		words: all.filter((h) => h.entry.kind === "word"),
		phrases: all.filter((h) => h.entry.kind === "phrase"),
	};
};

export const NO_RESULT: SearchResult = { words: [], phrases: [] };

interface Correction {
	fixed: string;
	score: number;
	results: FuzzyResult<Key>[];
}

const correctionOf = (results: FuzzyResult<Key>[]): Correction | undefined => {
	const field = results.flatMap((r) => r.fields).find((f) => f?.tier === "corrected");
	return field?.corrected === undefined
		? undefined
		: {
				fixed: field.corrected,
				score: field.score,
				results: results.filter((r) => r.fields.some((f) => f?.corrected === field.corrected)),
			};
};

const typoFix = (correction: Correction | undefined, label?: (hits: Hit[]) => string | undefined) => {
	if (!correction) return NO_RESULT;
	const hits = correction.results.map(toHit);
	return { corrected: label?.(hits) ?? correction.fixed, ...group(hits) };
};

/** A greeklish key corrects to a spelling nobody typed, so the learner is shown the Greek word instead. */
const asGreek = (hits: Hit[]) => {
	const key = hits[0]?.key;
	return key && (key.form?.greek ?? key.item.entry.greek);
};

export interface SearchIndex {
	search: (query: string) => SearchResult;
}

export const buildSearchIndex = (wire: readonly SearchWireItem[]): SearchIndex => {
	const greekKeys: Key[] = [];
	const greeklishKeys: Key[] = [];
	const englishKeys: Key[] = [];

	for (const w of wire) {
		const item: Item = {
			entry: {
				id: w.id,
				greek: w.greek,
				english: w.english,
				kind: w.type === "phrase" ? "phrase" : "word",
				...(w.parts && { principalParts: w.parts }),
				...(w.link && { link: w.link }),
			},
			rank: w.rank ?? Infinity,
			typeOrder: TYPE_ORDER[w.type] ?? 5,
		};
		const seen = new Map<string, Key[]>();
		const addGreek = (text: string, form?: Key["form"]) => {
			const texts = w.type === "noun" ? [text, stripArticle(text)] : [text];
			for (const t of texts) {
				const existing = seen.get(t);
				if (existing) {
					// Stripped of its article, one form can fill several slots (πατέρα is Target and Owner).
					const [first] = existing;
					if (first?.form && form && !first.form.slot.split("+").includes(form.slot)) {
						const merged = { greek: t, slot: `${first.form.slot}+${form.slot}` };
						for (const key of existing) key.form = merged;
					}
					continue;
				}
				const key = { item, text: t, form };
				const greeklish = [{ ...key, text: searchKey(t) }];
				// "μ' αρέσει" is typed both "m aresei" and "maresei".
				if (ELISION.test(t)) greeklish.push({ ...key, text: searchKey(t.replace(ELISION, "")) });
				seen.set(t, [key, ...greeklish]);
				greekKeys.push(key);
				greeklishKeys.push(...greeklish);
			}
		};
		addGreek(w.greek);
		for (const [form, slot] of w.forms ?? []) addGreek(form, { greek: form, slot });
		for (const text of glossAlternatives(w.english)) englishKeys.push({ item, text });
	}

	const searchGreek = createFuzzySearch(greekKeys, (k) => k.text);
	const searchGreeklish = createFuzzySearch(greeklishKeys, (k) => k.text);
	const searchEnglish = createFuzzySearch(englishKeys, (k) => k.text);

	return {
		search: (rawQuery) => {
			const query = rawQuery.trim().replace(/\s+/g, " ");
			if (query.length < 2) return NO_RESULT;
			if (GREEK_SCRIPT.test(query)) {
				const greek = query.replace(QUESTION_MARKS, "");
				const results = searchGreek(greek);
				const literal = hitsUnder(results, maxScoreFor(greek));
				return literal.length > 0 ? group(literal) : typoFix(correctionOf(results));
			}
			const typed = searchKey(query);
			const greeklishResults = searchGreeklish(typed);
			const greeklish = hitsUnder(
				greeklishResults,
				typed.length >= GREEKLISH_PREFIX_FROM ? SCORES.PREFIX : SCORES.NORMALISED_EXACT,
			);
			const english = stripQueryLead(query);
			const englishResults = searchEnglish(english);
			const literal = [...greeklish, ...hitsUnder(englishResults, maxScoreFor(english))];
			if (literal.length > 0) return group(literal);
			const asGreeklish = correctionOf(greeklishResults);
			const asEnglish = correctionOf(englishResults);
			return asGreeklish && (!asEnglish || asGreeklish.score <= asEnglish.score)
				? typoFix(asGreeklish, asGreek)
				: typoFix(asEnglish);
		},
	};
};
