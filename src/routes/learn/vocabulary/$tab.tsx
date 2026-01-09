import type React from "react";
import { useOutletContext, Link, Navigate } from "react-router";
import type { Route } from "./+types/$tab";
import {
	Users,
	ShoppingCart,
	Home,
	Car,
	Sun,
	ArrowRight,
	Lightbulb,
	Package,
	Languages,
	BookOpen,
} from "lucide-react";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ContentSection, TwoColumnList } from "@/components/ContentSection";
import { ParadigmTable } from "@/components/ParadigmTable";
import { TabHero } from "@/components/TabHero";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	VERB_PATTERNS,
	VERB_CONJUGATIONS,
	VERB_FAMILIES,
	IRREGULAR_VERBS,
} from "@/constants/verbs";
import {
	type VocabularyLoaderData,
	NounDisplay,
	type VocabItem,
} from "./shared";

const VALID_TABS = ["nouns", "verbs", "phrases", "reference"] as const;
type TabId = (typeof VALID_TABS)[number];

export function loader({ params }: Route.LoaderArgs) {
	const tab = params.tab as string;

	if (!VALID_TABS.includes(tab as TabId)) {
		throw new Response("Not Found", { status: 404 });
	}

	return { tab: tab as TabId };
}

// ─── Nouns Tab Components ──────────────────────────────────────────────────
const NounSection: React.FC<{
	title: string;
	subtitle?: string;
	icon: React.ReactNode;
	colorScheme: "ocean" | "terracotta" | "olive" | "honey" | "stone";
	nouns: VocabItem[];
	columns?: 2 | 3;
}> = ({ title, subtitle, icon, colorScheme, nouns, columns = 3 }) => {
	const colors = {
		ocean: {
			bg: "bg-ocean-50",
			border: "border-ocean-300",
			text: "text-ocean-text",
			iconBg: "bg-ocean-200",
		},
		terracotta: {
			bg: "bg-terracotta-50",
			border: "border-terracotta-300",
			text: "text-terracotta-text",
			iconBg: "bg-terracotta-200",
		},
		olive: {
			bg: "bg-olive-50",
			border: "border-olive-300",
			text: "text-olive-text",
			iconBg: "bg-olive-200",
		},
		honey: {
			bg: "bg-honey-50",
			border: "border-honey-300",
			text: "text-honey-text",
			iconBg: "bg-honey-200",
		},
		stone: {
			bg: "bg-stone",
			border: "border-stone-200",
			text: "text-stone-700",
			iconBg: "bg-stone-100",
		},
	};
	const c = colors[colorScheme];
	const gridCols =
		columns === 2
			? "grid-cols-1 md:grid-cols-2"
			: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

	return (
		<Card variant="bordered" padding="lg" className={`${c.bg} ${c.border}`}>
			<div className="flex items-center gap-3 mb-4">
				<div className={`p-2 rounded-lg ${c.iconBg}`}>
					<span className={c.text}>{icon}</span>
				</div>
				<div>
					<h3 className={`text-lg font-bold ${c.text}`}>{title}</h3>
					{subtitle && <p className="text-sm text-stone-600">{subtitle}</p>}
				</div>
			</div>
			<div className={`grid ${gridCols} gap-2`}>
				{nouns.map((noun) => (
					<NounDisplay
						key={noun.id}
						greek={noun.greek}
						english={noun.english}
						showGenderBadge
					/>
				))}
			</div>
		</Card>
	);
};

const NounsTab: React.FC<{ data: VocabularyLoaderData }> = ({ data }) => (
	<div className="space-y-6">
		<TabHero
			title="Everyday nouns"
			greekPhrase="ο / η / το"
			colorScheme="ocean"
			icon={<Package size={24} />}
			expandedExample={{
				label: "Endings hint at gender",
				content: (
					<p className="text-sm text-stone-600">
						Most nouns ending in <strong>-ος</strong> are masculine, <strong>-η/-α</strong> are feminine, and <strong>-ο/-ι/-μα</strong> are neuter. The article confirms it: ο (m), η (f), το (n).
					</p>
				),
			}}
		>
			The words you'll use most, organised by situation. Every noun includes its
			article so you learn the gender from the start.
		</TabHero>

		<Alert variant="info" className="bg-stone-50">
			<AlertDescription className="text-stone-700">
				<strong>Gender color key:</strong>{" "}
				<span className="inline-flex items-center gap-1">
					<span className="w-3 h-3 bg-ocean-600 rounded-sm" /> masculine (ο)
				</span>{" "}
				<span className="inline-flex items-center gap-1">
					<span className="w-3 h-3 bg-rose-400/60 rounded-sm" /> feminine (η)
				</span>{" "}
				<span className="inline-flex items-center gap-1">
					<span className="w-3 h-3 bg-stone-400/60 rounded-sm" /> neuter (το)
				</span>
			</AlertDescription>
		</Alert>

		<NounSection
			title="Family & People"
			subtitle={`${data.nouns.people.length} nouns`}
			icon={<Users size={20} />}
			colorScheme="terracotta"
			nouns={data.nouns.people}
		/>

		<NounSection
			title="Shopping & Groceries"
			subtitle={`${data.nouns.shopping.length} nouns`}
			icon={<ShoppingCart size={20} />}
			colorScheme="olive"
			nouns={data.nouns.shopping}
		/>

		<NounSection
			title="Household & Home"
			subtitle={`${data.nouns.household.length} nouns`}
			icon={<Home size={20} />}
			colorScheme="ocean"
			nouns={data.nouns.household}
		/>

		<NounSection
			title="Transportation"
			subtitle={`${data.nouns.vehicles.length} nouns`}
			icon={<Car size={20} />}
			colorScheme="ocean"
			nouns={data.nouns.vehicles}
		/>

		<NounSection
			title="Summer & Beach"
			subtitle={`${data.nouns.summer.length} nouns`}
			icon={<Sun size={20} />}
			colorScheme="honey"
			nouns={data.nouns.summer}
		/>
	</div>
);

// ─── Verbs Tab Components ──────────────────────────────────────────────────
const VerbList: React.FC<{
	verbs: Array<{ id: number; greek: string; english: string }>;
}> = ({ verbs }) => (
	<div className="grid md:grid-cols-2 gap-3">
		{verbs.map((verb) => (
			<div
				key={verb.id}
				className="flex justify-between items-center p-3 bg-stone-50 rounded-lg border border-stone-200"
			>
				<div className="flex items-baseline gap-2">
					<MonoText variant="greek" size="lg">
						{verb.greek}
					</MonoText>
					<span className="text-stone-600">{verb.english}</span>
				</div>
			</div>
		))}
	</div>
);

const VerbsTab: React.FC<{ data: VocabularyLoaderData }> = ({ data }) => (
	<div className="space-y-6">
		<TabHero
			title="Verbs by family"
			greekPhrase="κάνω, μιλάω, έρχομαι"
			colorScheme="olive"
			icon={<Languages size={18} />}
		>
			Learn one verb from each family and you can conjugate thousands. That's
			not an exaggeration.
		</TabHero>

		<div className="p-3 bg-ocean-100 rounded-lg border border-ocean-300 flex items-center justify-between">
			<span className="text-sm text-stone-700">
				For detailed conjugation patterns and usage examples
			</span>
			<Link
				to="/reference/verbs"
				className="inline-flex items-center gap-1.5 text-sm font-medium text-ocean-text hover:underline"
			>
				See full patterns <ArrowRight size={14} />
			</Link>
		</div>

		{data.verbs.categories.map((category) => {
			const familyConfig = VERB_FAMILIES[category.title];
			const colorScheme = familyConfig?.colorScheme ?? "olive";
			const displayTitle = familyConfig?.displayName ?? category.title;

			// Special handling for merged deponent category
			if (category.title === "deponent" && category.subCategories) {
				return (
					<ContentSection
						key={category.id}
						title={displayTitle}
						subtitle={`${category.verbs.length} verbs`}
						colorScheme={colorScheme}
					>
						<div className="p-3 space-y-4">
							<Alert variant="info">
								<AlertDescription>
									<strong>Pattern insight:</strong> Just like active verbs have -ω
									and -άω patterns, deponent verbs have -ομαι and -άμαι. Same
									vowel contraction!
								</AlertDescription>
							</Alert>

							<div className="grid md:grid-cols-2 gap-4">
								<div className="p-4 bg-olive-50 rounded-lg border border-olive-200">
									<h4 className="font-semibold text-olive-text mb-3">
										Type 1: -ομαι
									</h4>
									<ParadigmTable
										infinitive="έρχομαι"
										meaning="come"
										forms={{
											sg1: VERB_CONJUGATIONS.erhomai?.[0]?.form ?? "",
											sg2: VERB_CONJUGATIONS.erhomai?.[1]?.form ?? "",
											sg3: VERB_CONJUGATIONS.erhomai?.[2]?.form ?? "",
											pl1: VERB_CONJUGATIONS.erhomai?.[3]?.form ?? "",
											pl2: VERB_CONJUGATIONS.erhomai?.[4]?.form ?? "",
											pl3: VERB_CONJUGATIONS.erhomai?.[5]?.form ?? "",
										}}
									/>
								</div>

								<div className="p-4 bg-olive-50 rounded-lg border border-olive-200">
									<h4 className="font-semibold text-olive-text mb-3">
										Type 2: -άμαι
									</h4>
									<ParadigmTable
										infinitive="θυμάμαι"
										meaning="remember"
										forms={{
											sg1: VERB_CONJUGATIONS.thymamai?.[0]?.form ?? "",
											sg2: VERB_CONJUGATIONS.thymamai?.[1]?.form ?? "",
											sg3: VERB_CONJUGATIONS.thymamai?.[2]?.form ?? "",
											pl1: VERB_CONJUGATIONS.thymamai?.[3]?.form ?? "",
											pl2: VERB_CONJUGATIONS.thymamai?.[4]?.form ?? "",
											pl3: VERB_CONJUGATIONS.thymamai?.[5]?.form ?? "",
										}}
									/>
								</div>
							</div>

							<div className="space-y-3">
								{category.subCategories.map((sub) => (
									<CollapsibleSection
										key={sub.pattern}
										title={`${sub.title} (${sub.verbs.length} verbs)`}
										colorScheme="olive"
										defaultOpen={false}
									>
										<VerbList verbs={sub.verbs} />
									</CollapsibleSection>
								))}
							</div>
						</div>
					</ContentSection>
				);
			}

			// Special handling for irregular verbs
			if (category.title === "irregular") {
				return (
					<ContentSection
						key={category.id}
						title={displayTitle}
						subtitle={`${category.verbs.length} verbs`}
						colorScheme={colorScheme}
					>
						<div className="p-3">
							<div className="grid sm:grid-cols-2 gap-4">
								{IRREGULAR_VERBS.map((verb) => (
									<div
										key={verb.infinitive}
										className="p-4 bg-honey-50 rounded-lg border border-honey-200"
									>
										<ParadigmTable
											infinitive={verb.infinitive}
											meaning={verb.meaning}
											forms={verb.forms}
										/>
										{verb.note && (
											<p className="mt-2 text-sm text-stone-600 italic">
												{verb.note}
											</p>
										)}
									</div>
								))}
							</div>
						</div>
					</ContentSection>
				);
			}

			// Standard category handling
			const patternKey = familyConfig?.patternKey ?? null;
			const conjugationKey = familyConfig?.conjugationKey ?? null;
			const pattern = patternKey ? VERB_PATTERNS[patternKey] : null;
			const conjugation = conjugationKey
				? VERB_CONJUGATIONS[conjugationKey]
				: null;

			return (
				<ContentSection
					key={category.id}
					title={displayTitle}
					subtitle={`${category.verbs.length} verbs`}
					colorScheme={colorScheme}
				>
					<div className="p-3 space-y-4">
						{pattern && conjugation && (
							<ParadigmTable
								infinitive={pattern.canonical.infinitive}
								meaning={pattern.canonical.meaning}
								forms={{
									sg1: conjugation[0]?.form ?? "",
									sg2: conjugation[1]?.form ?? "",
									sg3: conjugation[2]?.form ?? "",
									pl1: conjugation[3]?.form ?? "",
									pl2: conjugation[4]?.form ?? "",
									pl3: conjugation[5]?.form ?? "",
								}}
							/>
						)}

						<CollapsibleSection
							title={`All ${familyConfig?.shortName ?? category.title}`}
							colorScheme={colorScheme}
							defaultOpen={false}
						>
							<VerbList verbs={category.verbs} />
						</CollapsibleSection>
					</div>
				</ContentSection>
			);
		})}
	</div>
);

// ─── Reference Tab ─────────────────────────────────────────────────────────
const TIME_ORDER = ["morning", "midday", "afternoon", "evening", "night"];

const POSITION_PAIRS = [
	["αριστερά", "δεξιά"],
	["πάνω", "κάτω"],
	["μέσα", "έξω"],
	["μπροστά", "πίσω"],
	["εδώ", "εκεί"],
	["κοντά", "μακριά"],
];

const ReferenceTab: React.FC<{ data: VocabularyLoaderData }> = ({ data }) => {
	const sortedTimes = [...data.reference.timesOfDay].sort((a, b) => {
		const aOrder = TIME_ORDER.indexOf(a.english.toLowerCase());
		const bOrder = TIME_ORDER.indexOf(b.english.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	const pairedAdverbs: Array<{
		left: (typeof data.reference.positionAdverbs)[0] | null;
		right: (typeof data.reference.positionAdverbs)[0] | null;
	}> = [];
	const usedIds = new Set<number>();

	for (const [leftGreek, rightGreek] of POSITION_PAIRS) {
		const left =
			data.reference.positionAdverbs.find((a) => a.greek === leftGreek) || null;
		const right =
			data.reference.positionAdverbs.find((a) => a.greek === rightGreek) ||
			null;
		if (left || right) {
			pairedAdverbs.push({ left, right });
			if (left) usedIds.add(left.id);
			if (right) usedIds.add(right.id);
		}
	}

	const unpaired = data.reference.positionAdverbs.filter(
		(a) => !usedIds.has(a.id),
	);

	return (
		<div className="space-y-6">
			<TabHero
				title="Quick reference essentials"
				greekPhrase="ένα, δύο, τρία..."
				colorScheme="honey"
				icon={<BookOpen size={18} />}
			>
				Numbers, colors, times, and position words — the building blocks you'll
				need constantly in everyday Greek.
			</TabHero>

			<Alert variant="info">
				<AlertDescription>
					For days of the week and months, see{" "}
					<Link
						to="/learn/phrases/time"
						className="underline font-medium text-ocean-text hover:text-ocean-700"
					>
						Time Expressions
					</Link>{" "}
					in Phrases.
				</AlertDescription>
			</Alert>

			<ContentSection title="Times of Day" colorScheme="honey">
				<TwoColumnList
					items={sortedTimes.map((t) => ({
						id: t.id,
						primary: t.greek,
						secondary: t.english,
						timeRange: t.timeRange,
					}))}
					renderPrimary={(item) => (
						<MonoText variant="greek" size="md" className="text-honey-800">
							{item.primary}
						</MonoText>
					)}
					renderSecondary={(item) => (
						<span>
							{item.secondary}
							{(item as { timeRange?: string }).timeRange && (
								<span className="text-stone-400 ml-2">
									({(item as { timeRange?: string }).timeRange})
								</span>
							)}
						</span>
					)}
				/>
			</ContentSection>

			<ContentSection title="Numbers" subtitle="Αριθμοί" colorScheme="ocean">
				<div className="px-3 pt-3">
					<Alert variant="info">
						<AlertDescription>
							<strong>Pattern:</strong> For 21-99, combine tens + units: τριάντα
							+ δύο = τριάντα δύο (32)
						</AlertDescription>
					</Alert>
				</div>
				<div className="grid md:grid-cols-3">
					<div className="border-r border-stone-200/60 last:border-r-0">
						<div className="px-3 py-2 text-xs font-semibold text-ocean-text uppercase tracking-wide">
							Units (0-9)
						</div>
						<TwoColumnList
							items={data.reference.numbers
								.filter(
									(n) =>
										n.numericValue !== undefined &&
										n.numericValue >= 0 &&
										n.numericValue <= 9,
								)
								.map((n) => ({ id: n.id, primary: n.greek, secondary: n.english }))}
							renderPrimary={(item) => (
								<MonoText variant="greek" size="md" className="text-ocean-800">
									{item.primary}
								</MonoText>
							)}
						/>
					</div>
					<div className="border-r border-stone-200/60 last:border-r-0">
						<div className="px-3 py-2 text-xs font-semibold text-ocean-text uppercase tracking-wide">
							Teens (10-19)
						</div>
						<TwoColumnList
							items={data.reference.numbers
								.filter(
									(n) =>
										n.numericValue &&
										n.numericValue >= 10 &&
										n.numericValue <= 19,
								)
								.map((n) => ({ id: n.id, primary: n.greek, secondary: n.english }))}
							renderPrimary={(item) => (
								<MonoText variant="greek" size="md" className="text-ocean-800">
									{item.primary}
								</MonoText>
							)}
						/>
					</div>
					<div className="border-r border-stone-200/60 last:border-r-0">
						<div className="px-3 py-2 text-xs font-semibold text-ocean-text uppercase tracking-wide">
							Tens (20-100)
						</div>
						<TwoColumnList
							items={data.reference.numbers
								.filter((n) => n.numericValue && n.numericValue >= 20)
								.map((n) => ({ id: n.id, primary: n.greek, secondary: n.english }))}
							renderPrimary={(item) => (
								<MonoText variant="greek" size="md" className="text-ocean-800">
									{item.primary}
								</MonoText>
							)}
						/>
					</div>
				</div>
			</ContentSection>

			<ContentSection title="Colours" colorScheme="terracotta">
				<TwoColumnList
					items={data.reference.colors.map((c) => ({
						id: c.id,
						primary: c.greek,
						secondary: c.english,
					}))}
					renderPrimary={(item) => (
						<MonoText variant="greek" size="md" className="text-terracotta-800">
							{item.primary}
						</MonoText>
					)}
				/>
			</ContentSection>

			<ContentSection title="Adverbs of Frequency" colorScheme="olive">
				<div className="px-3 pt-3">
					<Alert variant="warning">
						<Lightbulb size={16} />
						<AlertDescription>
							<strong>Remember:</strong> ποτέ = never, πότε = when (question) —
							accent changes meaning!
						</AlertDescription>
					</Alert>
				</div>
				<TwoColumnList
					items={data.reference.frequencyAdverbs.map((a) => ({
						id: a.id,
						primary: a.greek,
						secondary: a.english,
					}))}
					renderPrimary={(item) => (
						<MonoText variant="greek" size="md" className="text-olive-800">
							{item.primary}
						</MonoText>
					)}
				/>
			</ContentSection>

			<ContentSection title="Position & Direction" colorScheme="ocean">
				<div className="px-3 pt-3">
					<Alert variant="info">
						<AlertDescription>
							Essential for giving and understanding directions. Opposites are
							grouped together.
						</AlertDescription>
					</Alert>
				</div>
				<div className="divide-y divide-stone-200/60">
					{pairedAdverbs.map((pair) => (
						<div
							key={`${pair.left?.id ?? "empty"}-${pair.right?.id ?? "empty"}`}
							className="grid grid-cols-2 gap-4 py-2.5 px-3"
						>
							{pair.left ? (
								<div className="flex items-baseline gap-2">
									<MonoText variant="greek" size="md" className="text-ocean-800">
										{pair.left.greek}
									</MonoText>
									<span className="text-stone-500 text-sm">
										{pair.left.english}
									</span>
								</div>
							) : (
								<div />
							)}
							{pair.right ? (
								<div className="flex items-baseline gap-2">
									<span className="text-stone-400 mr-1">↔</span>
									<MonoText variant="greek" size="md" className="text-ocean-800">
										{pair.right.greek}
									</MonoText>
									<span className="text-stone-500 text-sm">
										{pair.right.english}
									</span>
								</div>
							) : (
								<div />
							)}
						</div>
					))}
				</div>
				{unpaired.length > 0 && (
					<TwoColumnList
						items={unpaired.map((a) => ({
							id: a.id,
							primary: a.greek,
							secondary: a.english,
						}))}
						renderPrimary={(item) => (
							<MonoText variant="greek" size="md" className="text-ocean-800">
								{item.primary}
							</MonoText>
						)}
					/>
				)}
			</ContentSection>

			<ContentSection
				title="Question Words"
				subtitle="Ερωτηματικές λέξεις"
				colorScheme="terracotta"
			>
				<TwoColumnList
					items={data.reference.questionWords.map((w) => ({
						id: w.id,
						primary: w.greek,
						secondary: w.english,
					}))}
					renderPrimary={(item) => (
						<MonoText variant="greek" size="md" className="text-terracotta-800">
							{item.primary}
						</MonoText>
					)}
				/>
			</ContentSection>
		</div>
	);
};

// ─── Main Component ────────────────────────────────────────────────────────
export default function TabRoute({ loaderData }: Route.ComponentProps) {
	const { tab } = loaderData;
	const data = useOutletContext<VocabularyLoaderData>();

	switch (tab) {
		case "nouns":
			return <NounsTab data={data} />;
		case "verbs":
			return <VerbsTab data={data} />;
		case "phrases":
			return <Navigate to="/learn/phrases" replace />;
		case "reference":
			return <ReferenceTab data={data} />;
		default:
			return null;
	}
}
