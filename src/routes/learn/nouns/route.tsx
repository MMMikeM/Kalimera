import { ChevronLeft, Package } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { ContentSection } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";
import { TabHero } from "@/components/TabHero";
import type { Route } from "./+types/route";
import type { CategoryData, NounWithGender } from "./loader.server";

export { loader } from "./loader.server";

type Gender = "masculine" | "feminine" | "neuter";

const genderStyles: Record<
	Gender,
	{ text: string; bg: string; ending: string }
> = {
	masculine: {
		text: "text-ocean-500",
		bg: "bg-ocean-100",
		ending: "text-ocean-500",
	},
	feminine: {
		text: "text-rose-700",
		bg: "bg-rose-100",
		ending: "text-rose-700",
	},
	neuter: {
		text: "text-olive-500",
		bg: "bg-olive-200",
		ending: "text-olive-500",
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

const parseGreekNoun = (
	greek: string,
): { article: string; noun: string; ending: string } => {
	const parts = greek.trim().split(" ");
	const article = parts[0] ?? "";
	const noun = parts.slice(1).join(" ");

	let ending = "";
	for (const e of NOUN_ENDINGS) {
		if (noun.endsWith(e)) {
			ending = e;
			break;
		}
	}

	return { article, noun, ending };
};

const NounDisplay: React.FC<{ noun: NounWithGender }> = ({ noun }) => {
	const styles = genderStyles[noun.gender];
	const { article, noun: nounWord, ending } = parseGreekNoun(noun.greek);
	const stem = ending ? nounWord.slice(0, -ending.length) : nounWord;

	return (
		<div className="py-2.5 px-3">
			<div className="flex items-baseline gap-2">
				<span
					className={`px-1.5 py-0.5 rounded text-sm font-bold ${styles.text} ${styles.bg}`}
				>
					{article}
				</span>
				<MonoText variant="greek" className="text-stone-900">
					{ending ? (
						<>
							{stem}
							<span className={styles.ending}>{ending}</span>
						</>
					) : (
						nounWord
					)}
				</MonoText>
			</div>
			<div className="text-xs text-stone-500 mt-0.5 ml-8">{noun.english}</div>
		</div>
	);
};

const nounPairs: Record<string, Array<[string, string]>> = {
	people: [
		["πατέρας", "μητέρα"],
		["αδερφός", "αδερφή"],
		["αδελφός", "αδελφή"],
		["παππούς", "γιαγιά"],
		["άντρας", "γυναίκα"],
		["γιος", "κόρη"],
		["θείος", "θεία"],
		["ξάδερφος", "ξαδέρφη"],
		["φίλος", "φίλη"],
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
		const word = noun.greek.split(" ").slice(1).join(" ").toLowerCase();
		nounMap.set(word, noun);
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

	const singles = nouns.filter((noun) => {
		const word = noun.greek.split(" ").slice(1).join(" ").toLowerCase();
		return !usedWords.has(word);
	});

	return { pairs, singles };
};

const categoryColors: Record<
	string,
	"terracotta" | "olive" | "ocean" | "honey"
> = {
	people: "terracotta",
	shopping: "olive",
	household: "ocean",
	vehicles: "ocean",
	summer: "honey",
};

const CategorySection: React.FC<{
	categoryKey: string;
	category: CategoryData;
}> = ({ categoryKey, category }) => {
	if (category.nouns.length === 0) return null;

	const { pairs, singles } = splitIntoPairsAndSingles(
		category.nouns,
		categoryKey,
	);
	const colorScheme = categoryColors[categoryKey] ?? "ocean";

	return (
		<ContentSection
			title={category.title}
			subtitle={`${category.total} nouns`}
			colorScheme={colorScheme}
		>
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
		</ContentSection>
	);
};

export default function NounsRefactorPage({
	loaderData,
}: Route.ComponentProps) {
	const { categories } = loaderData;

	return (
		<div className="space-y-6">
			<Link
				to="/learn"
				className="inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-800 transition-colors"
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
									<strong className="text-ocean-500">ο</strong> +{" "}
									<span className="text-ocean-500">-ος, -ης, -ας</span> =
									masculine
								</span>
								<span>
									<strong className="text-rose-600">η</strong> +{" "}
									<span className="text-rose-600">-η, -α</span> = feminine
								</span>
								<span>
									<strong className="text-stone-500">το</strong> +{" "}
									<span className="text-stone-500">-ο, -ι, -μα</span> = neuter
								</span>
							</div>
						</div>
					),
				}}
			>
				The words you'll use most, organised by situation. The{" "}
				<span className="text-ocean-500 font-medium">coloured article</span>{" "}
				shows gender at a glance.
			</TabHero>

			<div className="flex items-center gap-3 px-1 text-xs text-stone-500">
				<span className="font-medium">Gender:</span>
				<span className="flex items-center gap-1.5">
					<span className="px-1 py-0.5 rounded text-xs font-bold text-ocean-500 bg-ocean-100">
						ο
					</span>
					masculine
				</span>
				<span className="flex items-center gap-1.5">
					<span className="px-1 py-0.5 rounded text-xs font-bold text-rose-600 bg-rose-100">
						η
					</span>
					feminine
				</span>
				<span className="flex items-center gap-1.5">
					<span className="px-1 py-0.5 rounded text-xs font-bold text-stone-600 bg-stone-200">
						το
					</span>
					neuter
				</span>
			</div>

			<div className="space-y-4">
				<CategorySection categoryKey="people" category={categories.people} />
				<CategorySection
					categoryKey="shopping"
					category={categories.shopping}
				/>
				<CategorySection
					categoryKey="household"
					category={categories.household}
				/>
				<CategorySection
					categoryKey="vehicles"
					category={categories.vehicles}
				/>
				<CategorySection categoryKey="summer" category={categories.summer} />
			</div>
		</div>
	);
}
