import { getArticle } from "@/lib/greek-grammar";
import type { SearchWireItem } from "@/lib/search-index";
import type { SearchLink } from "@/lib/search-types";
import { fetchVocabularyRowsForSearch, type SearchVocabularyRow } from "@/server/db/queries/vocabulary";

const TENSE_CODE: Record<string, string> = {
	present: "pr",
	aorist: "ao",
	future: "fu",
	past_continuous: "pc",
};
const TENSE_ORDER = Object.keys(TENSE_CODE);

const phrasesTab = (tab: string): SearchLink => ({ to: "/learn/phrases/$tab", params: { tab } });

/**
 * Learn phrases tab for each phrase tag, mirroring PHRASE_TABS in
 * routes/learn/phrases/$tab.tsx. Tags that no tab lists have no entry, so
 * their phrases get no link. `time-telling` lives under Essentials now.
 */
const PHRASE_TAG_LINK: Record<string, SearchLink> = {
	essential: phrasesTab("survival"),
	survival: phrasesTab("survival"),
	responses: phrasesTab("responses"),
	"social-phrase": phrasesTab("responses"),
	request: phrasesTab("requests"),
	command: phrasesTab("requests"),
	opinions: phrasesTab("opinions"),
	"discourse-markers": phrasesTab("connectors"),
	"discourse-filler": phrasesTab("connectors"),
	"time-telling": { to: "/learn/essentials/$subtab", params: { subtab: "time" } },
};

type Tag = NonNullable<SearchVocabularyRow["vocabularyTags"][number]["tag"]>;

const tagsOf = (row: SearchVocabularyRow, section: string): Tag[] =>
	row.vocabularyTags.flatMap((vt) => (vt.tag?.section === section ? [vt.tag] : []));

/**
 * A noun with several subjects links to the earliest in curriculum order: the
 * first group the noun browser lists it under.
 */
const nounSubject = (row: SearchVocabularyRow): string | undefined =>
	tagsOf(row, "nouns").sort(
		(a, b) => (a.sectionDisplayOrder ?? Infinity) - (b.sectionDisplayOrder ?? Infinity),
	)[0]?.slug;

const linkFor = (row: SearchVocabularyRow): SearchLink | undefined => {
	if (row.wordType === "verb") {
		return { to: "/learn/verbs/$verbId", params: { verbId: String(row.id) } };
	}
	if (row.wordType === "noun") {
		const subject = nounSubject(row);
		return subject ? { to: "/learn/nouns/$subject", params: { subject } } : undefined;
	}
	if (row.wordType === "phrase") {
		return tagsOf(row, "phrases")
			.map((tag) => PHRASE_TAG_LINK[tag.slug])
			.find(Boolean);
	}
	return undefined;
};

type Forms = Map<string, string[]>;

const addForm = (forms: Forms, form: string, slot: string) => {
	const slots = forms.get(form);
	if (slots) slots.push(slot);
	else forms.set(form, [slot]);
};

const wireForms = (forms: Forms): [string, string][] =>
	[...forms].map(([form, slots]) => [form, slots.join("+")]);

const withArticle = (article: string | null | undefined, form: string) =>
	article ? `${article} ${form}` : form;

const nounShape = (row: SearchVocabularyRow) => {
	const cell = (grammaticalCase: string, number: string) =>
		row.nominalForms.find((f) => f.grammaticalCase === grammaticalCase && f.number === number);
	const singular = cell("nominative", "singular");
	const plural = cell("nominative", "plural");
	const genitive = cell("genitive", "singular");

	// Nouns cited in the plural (ψώνια) carry invented singular cells in the table; they must not be searchable.
	const pluralOnly =
		singular && plural && singular.form === plural.form && genitive && genitive.form !== singular.form;
	const gender = row.nounDetails?.gender;
	const article = pluralOnly
		? plural.article
		: singular
			? singular.article
			: gender && getArticle(gender, "singular", "nominative");

	const greek = withArticle(article, row.greekText);
	const forms: Forms = new Map();
	for (const f of row.nominalForms) {
		if (pluralOnly && f.number === "singular") continue;
		const form = withArticle(f.article, f.form);
		if (form !== greek) addForm(forms, form, `${f.grammaticalCase[0]}.${f.number[0]}`);
	}
	return { greek, forms: wireForms(forms) };
};

const verbShape = (row: SearchVocabularyRow) => {
	const conjugations = [...row.verbConjugations].sort(
		(a, b) => TENSE_ORDER.indexOf(a.tense) - TENSE_ORDER.indexOf(b.tense),
	);
	const forms: Forms = new Map();
	for (const c of conjugations) {
		if (c.form === row.greekText) continue;
		addForm(forms, c.form, `${TENSE_CODE[c.tense]}.${c.person}`);
	}
	for (const i of row.verbImperatives) {
		addForm(forms, i.form, `im.${i.aspect[0]}.${i.number[0]}`);
	}
	const firstSingular = (tense: string) =>
		row.verbConjugations.find((c) => c.tense === tense && c.person === "sg1")?.form;
	return {
		greek: row.greekText,
		forms: wireForms(forms),
		parts: { past: firstSingular("aorist"), future: firstSingular("future") },
	};
};

const toWireItem = (row: SearchVocabularyRow): SearchWireItem => {
	const base = {
		id: row.id,
		english: row.englishTranslation,
		type: row.wordType,
		rank: row.frequencyRank,
		link: linkFor(row),
	};
	if (row.wordType === "noun") return { ...base, ...nounShape(row) };
	if (row.wordType === "verb") return { ...base, ...verbShape(row) };
	return { ...base, greek: row.greekText };
};

export const getSearchWire = async (): Promise<SearchWireItem[]> =>
	(await fetchVocabularyRowsForSearch()).map(toWireItem);
