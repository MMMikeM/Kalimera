import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ChevronLeft, Package } from "lucide-react";
import type React from "react";

import { ContentSection } from "@/components/ContentSection";
import { TabHero } from "@/components/TabHero";
import { getArticle } from "@/lib/greek-grammar";
import { typedEntries } from "@/lib/object";
import { getVocabBySlug } from "@/server/db/queries/vocabulary";
import type { Gender } from "@/server/db/schema";
import type { Vocabulary } from "@/server/db/types";
import { GreekText } from "@/components/GreekText";

export type NounWithGender = Vocabulary & { gender: Gender };

const parseNoun = (
	item: Vocabulary & { nounDetails: { gender: Gender } | null },
): NounWithGender => ({
	...item,
	gender: item.nounDetails?.gender ?? "neuter",
});

export type CategoryData = {
	title: string;
	nouns: NounWithGender[];
	total: number;
};

type CategoryKey = "people" | "shopping" | "household" | "vehicles" | "summer";
type CategoriesMap = Record<CategoryKey, CategoryData>;

const nounsLoader = createServerFn().handler(async () => {
	const tags = await getVocabBySlug("nouns", ["noun"]);
	const bySlug = Object.fromEntries(
		tags.map((t) => [
			t.slug,
			t.vocabularyTags.map((vt) => vt.vocabulary).filter((v) => v !== null),
		]),
	);

	const buildCategory = (title: string, tagKey: string): CategoryData => {
		const items = (bySlug[tagKey] ?? []).map(parseNoun);
		return { title, nouns: items, total: items.length };
	};

	const categories: CategoriesMap = {
		people: buildCategory("Family & People", "people"),
		shopping: buildCategory("Shopping & Groceries", "shopping"),
		household: buildCategory("Household & Home", "household"),
		vehicles: buildCategory("Transportation", "transport-vehicle"),
		summer: buildCategory("Summer & Beach", "summer"),
	};

	return { categories };
});

export const Route = createFileRoute("/learn/nouns")({
	loader: () => nounsLoader(),
	component: NounsRefactorPage,
});

const genderStyles: Record<Gender, { text: string; bg: string; ending: string; border: string }> = {
	masculine: {
		text: "text-gender-masculine-text",
		bg: "bg-gender-masculine-100",
		ending: "text-gender-masculine-text",
		border: "border-gender-masculine-500",
	},
	feminine: {
		text: "text-gender-feminine-text",
		bg: "bg-gender-feminine-100",
		ending: "text-gender-feminine-text",
		border: "border-gender-feminine-500",
	},
	neuter: {
		text: "text-gender-neuter-text",
		bg: "bg-gender-neuter-100",
		ending: "text-gender-neuter-text",
		border: "border-gender-neuter-500",
	},
};

const NOUN_ENDINGS = [
	// Longer endings first (so -μα matches before -α)
	"μα",
	// Two-character (with and without accent)
	"ος",
	"ός",
	"ας",
	"άς",
	"ης",
	"ής",
	// One-character (with and without accent/diaeresis)
	"α",
	"ά",
	"η",
	"ή",
	"ο",
	"ό",
	"ι",
	"ί",
	"ϊ",
];

const parseGreekNoun = (lemma: string): { noun: string; ending: string } => {
	let ending = "";
	for (const e of NOUN_ENDINGS) {
		if (lemma.endsWith(e)) {
			ending = e;
			break;
		}
	}
	return { noun: lemma, ending };
};

const NounDisplay: React.FC<{ noun: NounWithGender }> = ({ noun }) => {
	const styles = genderStyles[noun.gender];
	const article = getArticle(noun.gender);
	const { noun: nounWord, ending } = parseGreekNoun(noun.greekText);
	const stem = ending ? nounWord.slice(0, -ending.length) : nounWord;

	return (
		<div className={`border-l-4 px-3 py-2.5 ${styles.border}`}>
			<div className="flex items-baseline gap-2">
				<span className={`rounded px-1.5 py-0.5 text-sm font-bold ${styles.text} ${styles.bg}`}>
					{article}
				</span>
				<GreekText tone="accent" size="lg" className="text-stone-900">
					{ending ? (
						<>
							{stem}
							<span className={styles.ending}>{ending}</span>
						</>
					) : (
						nounWord
					)}
				</GreekText>
			</div>
			<div className="mt-0.5 ml-8 text-xs text-stone-500">{noun.englishTranslation}</div>
		</div>
	);
};

const nounPairs: Record<string, Array<[string, string]>> = {
	people: [
		["πατέρας", "μητέρα"],
		["αδελφός", "αδελφή"],
		["παππούς", "γιαγιά"],
		["άντρας", "γυναίκα"],
		["γιος", "κόρη"],
		["θείος", "θεία"],
		["ξάδερφος", "ξαδέρφη"],
		["ανιψιός", "ανιψιά"],
		["εγγονός", "εγγονή"],
		["πεθερός", "πεθερά"],
		["γαμπρός", "νύφη"],
		["φίλος", "φίλη"],
	],
};

const nounSubgroups: Record<string, Array<{ title: string; words: string[] }>> = {
	people: [
		{ title: "Family", words: ["πατέρας", "μητέρα", "αδελφός", "αδελφή", "γιος", "κόρη", "παιδί", "οικογένεια"] },
		{ title: "Extended family", words: ["θείος", "θεία", "ξάδερφος", "ξαδέρφη", "ανιψιός", "ανιψιά", "εγγονός", "εγγονή"] },
		{ title: "In-laws", words: ["πεθερός", "πεθερά", "γαμπρός", "νύφη"] },
		{ title: "Partners & friends", words: ["άντρας", "γυναίκα", "φίλος", "φίλη", "σύζυγος"] },
		{ title: "Jobs", words: ["γιατρός", "δάσκαλος", "οδηγός", "ηθοποιός", "κηπουρός", "γεωργός", "βοσκός", "κυνηγός", "αρχηγός"] },
		{ title: "People & pets", words: ["άνθρωπος", "αγόρι", "νάνος", "σκύλος"] },
	],
	shopping: [
		{ title: "Food & drink", words: ["καφές", "χυμός", "ντομάτα", "αγγούρι", "πορτοκάλι", "ψωμί"] },
		{ title: "At the shop", words: ["αντηλιακό", "μπουκάλι", "απόδειξη", "ψώνια"] },
	],
	summer: [
		{ title: "At the beach", words: ["θάλασσα", "παραλία", "ήλιος", "ξαπλώστρα", "μαγιό", "καπέλο"] },
		{ title: "Summer treats", words: ["καλοκαίρι", "ζέστη", "παγωτό", "καρπούζι"] },
	],
};

const splitIntoPairsAndSingles = (
	nouns: NounWithGender[],
	categoryKey: string,
): {
	pairs: Array<[NounWithGender, NounWithGender]>;
	singles: NounWithGender[];
} => {
	const pairDefs = nounPairs[categoryKey] ?? [];
	const nounMap = new Map<string, NounWithGender>();

	for (const noun of nouns) {
		nounMap.set(noun.greekText.toLowerCase(), noun);
	}

	const pairs: Array<[NounWithGender, NounWithGender]> = [];
	const usedWords = new Set<string>();

	for (const [leftWord, rightWord] of pairDefs) {
		const left = nounMap.get(leftWord);
		const right = nounMap.get(rightWord);

		if (left && right) {
			pairs.push([left, right]);
			usedWords.add(leftWord);
			usedWords.add(rightWord);
		}
	}

	const singles = nouns.filter((noun) => !usedWords.has(noun.greekText.toLowerCase()));

	return { pairs, singles };
};

const categoryColors: Record<string, "stone"> = {
	people: "stone",
	shopping: "stone",
	household: "stone",
	vehicles: "stone",
	summer: "stone",
};

const NounList: React.FC<{
	nouns: NounWithGender[];
	categoryKey: string;
}> = ({ nouns, categoryKey }) => {
	const { pairs, singles } = splitIntoPairsAndSingles(nouns, categoryKey);

	return (
		<>
			{/* Paired nouns */}
			{pairs.length > 0 && (
				<div className="divide-y divide-stone-200/60">
					{pairs.map(([left, right]) => (
						<div
							key={`${left.id}-${right.id}`}
							className="grid grid-cols-2 divide-x divide-stone-200/60"
						>
							<NounDisplay noun={left} />
							<NounDisplay noun={right} />
						</div>
					))}
				</div>
			)}

			{/* Single nouns */}
			{singles.length > 0 && (
				<div
					className={`divide-y divide-stone-200/60 ${pairs.length > 0 ? "border-t border-stone-200/60" : ""}`}
				>
					{singles.map((noun) => (
						<NounDisplay key={noun.id} noun={noun} />
					))}
				</div>
			)}
		</>
	);
};

const CategorySection: React.FC<{
	categoryKey: string;
	category: CategoryData;
}> = ({ categoryKey, category }) => {
	if (category.nouns.length === 0) return null;

	const colorScheme = categoryColors[categoryKey] ?? "stone";
	const subgroups = nounSubgroups[categoryKey];

	if (!subgroups) {
		return (
			<ContentSection
				title={category.title}
				subtitle={`${category.total} nouns`}
				colorScheme={colorScheme}
			>
				<NounList nouns={category.nouns} categoryKey={categoryKey} />
			</ContentSection>
		);
	}

	const seenIds = new Set<string | number>();
	const groups: Array<{ title: string; nouns: NounWithGender[] }> = [];

	for (const sub of subgroups) {
		const wordSet = new Set(sub.words.map((w) => w.toLowerCase()));
		const matched = category.nouns.filter(
			(noun) => !seenIds.has(noun.id) && wordSet.has(noun.greekText.toLowerCase()),
		);
		for (const n of matched) seenIds.add(n.id);
		if (matched.length > 0) {
			groups.push({ title: sub.title, nouns: matched });
		}
	}

	// Fallback so nouns not covered by hand-authored sub-groups are not silently dropped
	const unmatched = category.nouns.filter((noun) => !seenIds.has(noun.id));
	if (unmatched.length > 0) {
		groups.push({ title: "More", nouns: unmatched });
	}

	return (
		<ContentSection
			title={category.title}
			subtitle={`${category.total} nouns`}
			colorScheme={colorScheme}
		>
			{groups.map((group) => (
				<div key={group.title}>
					<h4 className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
						{group.title}
					</h4>
					<NounList nouns={group.nouns} categoryKey={categoryKey} />
				</div>
			))}
		</ContentSection>
	);
};

function NounsRefactorPage() {
	const { categories } = Route.useLoaderData();

	return (
		<div className="space-y-6">
			<Link
				to="/learn"
				className="inline-flex items-center gap-1 text-sm text-stone-600 transition-colors hover:text-stone-800"
			>
				<ChevronLeft size={16} />
				<span>Learn</span>
			</Link>

			<TabHero
				title="Everyday nouns"
				greekPhrase="ο / η / το"
				colorScheme="ocean"
				icon={<Package size={24} />}
				expandedExample={{
					label: "Endings hint at gender",
					content: (
						<div className="space-y-2">
							<p className="text-sm text-stone-600">
								Noun endings often predict gender. The article confirms it:
							</p>
							<div className="flex flex-wrap gap-3 text-sm">
								<span>
									<strong className="text-gender-masculine-text">ο</strong> +{" "}
									<span className="text-gender-masculine-text">-ος, -ης, -ας</span> = masculine
								</span>
								<span>
									<strong className="text-gender-feminine-text">η</strong> +{" "}
									<span className="text-gender-feminine-text">-η, -α</span> = feminine
								</span>
								<span>
									<strong className="text-gender-neuter-text">το</strong> +{" "}
									<span className="text-gender-neuter-text">-ο, -ι, -μα</span> = neuter
								</span>
							</div>
						</div>
					),
				}}
			>
				The words you'll use most, organised by situation. The{" "}
				<span className="font-medium text-stone-700">coloured article</span> shows gender at a
				glance.
			</TabHero>

			<div className="flex items-center gap-3 px-1 text-xs text-stone-500">
				<span className="font-medium">Gender:</span>
				<span className="flex items-center gap-1.5">
					<span className="rounded bg-gender-masculine-100 px-1 py-0.5 text-xs font-bold text-gender-masculine-text">
						ο
					</span>
					masculine
				</span>
				<span className="flex items-center gap-1.5">
					<span className="rounded bg-gender-feminine-100 px-1 py-0.5 text-xs font-bold text-gender-feminine-text">
						η
					</span>
					feminine
				</span>
				<span className="flex items-center gap-1.5">
					<span className="rounded bg-gender-neuter-100 px-1 py-0.5 text-xs font-bold text-gender-neuter-text">
						το
					</span>
					neuter
				</span>
			</div>

			<div className="space-y-4">
				{typedEntries(categories).map(([cName, cData]) => (
					<CategorySection categoryKey={cName} category={cData} key={cName} />
				))}
			</div>
		</div>
	);
}
