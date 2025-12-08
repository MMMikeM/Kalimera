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
	Hash,
	Palette,
	TrendingUp,
	MapPin,
	Lightbulb,
} from "lucide-react";
import {
	Card,
	MonoText,
	KeyInsight,
	CollapsibleSection,
	CategoryCard,
	ParadigmTable,
} from "@/components";
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
	VocabItemDisplay,
	VocabSection,
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
		<KeyInsight title="Verb conjugation patterns">
			Greek verbs follow predictable patterns. Learn one pattern and you can
			conjugate all verbs in that group. The endings change based on person (I,
			you, he/she) and number (singular, plural).
		</KeyInsight>

		<div className="p-3 bg-ocean-100 rounded-lg border border-ocean-300 flex items-center justify-between">
			<span className="text-sm text-stone-700">
				For detailed conjugation patterns and usage examples
			</span>
			<Link
				to="/quick-reference/verbs"
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
					<CategoryCard
						key={category.id}
						title={displayTitle}
						subtitle={`${category.verbs.length} verbs`}
						colorScheme={colorScheme}
					>
						<Alert variant="info" className="mb-4">
							<AlertDescription>
								<strong>Pattern insight:</strong> Just like active verbs have -ω
								and -άω patterns, deponent verbs have -ομαι and -άμαι. Same
								vowel contraction!
							</AlertDescription>
						</Alert>

						<div className="grid md:grid-cols-2 gap-4 mb-4">
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
					</CategoryCard>
				);
			}

			// Special handling for irregular verbs
			if (category.title === "irregular") {
				return (
					<CategoryCard
						key={category.id}
						title={displayTitle}
						subtitle={`${category.verbs.length} verbs`}
						colorScheme={colorScheme}
					>
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
					</CategoryCard>
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
				<CategoryCard
					key={category.id}
					title={displayTitle}
					subtitle={`${category.verbs.length} verbs`}
					colorScheme={colorScheme}
					priority={category.verbs.length > 20 ? "primary" : "secondary"}
				>
					{pattern && conjugation && (
						<div className="mb-4">
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
						</div>
					)}

					<CollapsibleSection
						title={`All ${familyConfig?.shortName ?? category.title}`}
						colorScheme={colorScheme}
						defaultOpen={false}
					>
						<VerbList verbs={category.verbs} />
					</CollapsibleSection>
				</CategoryCard>
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
			<Card
				variant="bordered"
				padding="lg"
				className="bg-honey-50 border-honey-300"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-honey-200">
						<Sun size={20} className="text-honey-text" />
					</div>
					<h3 className="text-lg font-bold text-honey-text">Times of Day</h3>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
					{sortedTimes.map((time) => (
						<div
							key={time.id}
							className="text-center p-3 bg-white rounded-lg border border-honey-200 shadow-sm"
						>
							<MonoText variant="greek" size="lg" className="block mb-1">
								{time.greek}
							</MonoText>
							<div className="text-stone-600 text-sm">{time.english}</div>
							{time.timeRange && (
								<div className="text-xs text-stone-600 mt-1">
									{time.timeRange}
								</div>
							)}
						</div>
					))}
				</div>
			</Card>

			<Card
				variant="bordered"
				padding="lg"
				className="bg-ocean-50 border-ocean-300"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-ocean-200">
						<Hash size={20} className="text-ocean-text" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-ocean-text">Numbers</h3>
						<p className="text-sm text-stone-600">Αριθμοί</p>
					</div>
				</div>
				<Alert variant="info" className="mb-4">
					<AlertDescription>
						<strong>Pattern:</strong> For 21-99, combine tens + units: τριάντα +
						δύο = τριάντα δύο (32)
					</AlertDescription>
				</Alert>
				<div className="grid md:grid-cols-3 gap-6">
					<div>
						<h5 className="font-semibold text-ocean-text mb-3">Units (0-9)</h5>
						<div className="space-y-2">
							{data.reference.numbers
								.filter(
									(n) =>
										n.numericValue !== undefined &&
										n.numericValue >= 0 &&
										n.numericValue <= 9,
								)
								.map((number) => (
									<div key={number.id} className="flex items-baseline gap-2">
										<MonoText>{number.greek}</MonoText>
										<span className="text-stone-600 text-sm">
											{number.english}
										</span>
									</div>
								))}
						</div>
					</div>
					<div>
						<h5 className="font-semibold text-ocean-text mb-3">
							Teens (10-19)
						</h5>
						<div className="space-y-2">
							{data.reference.numbers
								.filter(
									(n) =>
										n.numericValue &&
										n.numericValue >= 10 &&
										n.numericValue <= 19,
								)
								.map((number) => (
									<div key={number.id} className="flex items-baseline gap-2">
										<MonoText>{number.greek}</MonoText>
										<span className="text-stone-600 text-sm">
											{number.english}
										</span>
									</div>
								))}
						</div>
					</div>
					<div>
						<h5 className="font-semibold text-ocean-text mb-3">
							Tens (20-100)
						</h5>
						<div className="space-y-2">
							{data.reference.numbers
								.filter((n) => n.numericValue && n.numericValue >= 20)
								.map((number) => (
									<div key={number.id} className="flex items-baseline gap-2">
										<MonoText>{number.greek}</MonoText>
										<span className="text-stone-600 text-sm">
											{number.english}
										</span>
									</div>
								))}
						</div>
					</div>
				</div>
			</Card>

			<VocabSection
				title="Colors"
				icon={<Palette size={20} />}
				colorScheme="terracotta"
			>
				{data.reference.colors.map((color) => (
					<VocabItemDisplay
						key={color.id}
						greek={color.greek}
						english={color.english}
					/>
				))}
			</VocabSection>

			<Card
				variant="bordered"
				padding="lg"
				className="bg-olive-50 border-olive-300"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-olive-200">
						<TrendingUp size={20} className="text-olive-text" />
					</div>
					<h3 className="text-lg font-bold text-olive-text">
						Adverbs of Frequency
					</h3>
				</div>
				<Alert variant="warning" className="mb-4">
					<Lightbulb size={16} />
					<AlertDescription>
						<strong>Remember:</strong> ποτέ = never, πότε = when (question) —
						accent changes meaning!
					</AlertDescription>
				</Alert>
				<div className="grid md:grid-cols-3 gap-3">
					{data.reference.frequencyAdverbs.map((adverb) => (
						<VocabItemDisplay
							key={adverb.id}
							greek={adverb.greek}
							english={adverb.english}
						/>
					))}
				</div>
			</Card>

			<Card
				variant="bordered"
				padding="lg"
				className="bg-ocean-50 border-ocean-300"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-ocean-200">
						<MapPin size={20} className="text-ocean-text" />
					</div>
					<h3 className="text-lg font-bold text-ocean-text">
						Position & Direction
					</h3>
				</div>
				<Alert variant="info" className="mb-4">
					<AlertDescription>
						Essential for giving and understanding directions. Opposites are
						grouped together.
					</AlertDescription>
				</Alert>
				<div className="space-y-2">
					{pairedAdverbs.map((pair) => (
						<div
							key={`${pair.left?.id ?? "empty"}-${pair.right?.id ?? "empty"}`}
							className="grid grid-cols-2 gap-4 p-3 bg-white rounded-lg border border-ocean-200"
						>
							{pair.left ? (
								<div className="flex items-baseline gap-2">
									<MonoText variant="greek" size="md">
										{pair.left.greek}
									</MonoText>
									<span className="text-stone-600 text-sm">
										{pair.left.english}
									</span>
								</div>
							) : (
								<div />
							)}
							{pair.right ? (
								<div className="flex items-baseline gap-2">
									<span className="text-stone-400 mr-1">↔</span>
									<MonoText variant="greek" size="md">
										{pair.right.greek}
									</MonoText>
									<span className="text-stone-600 text-sm">
										{pair.right.english}
									</span>
								</div>
							) : (
								<div />
							)}
						</div>
					))}
					{unpaired.length > 0 && (
						<div className="grid md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-ocean-200">
							{unpaired.map((adverb) => (
								<VocabItemDisplay
									key={adverb.id}
									greek={adverb.greek}
									english={adverb.english}
								/>
							))}
						</div>
					)}
				</div>
			</Card>
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
			return <Navigate to="/phrases" replace />;
		case "reference":
			return <ReferenceTab data={data} />;
		default:
			return null;
	}
}
