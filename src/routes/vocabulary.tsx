import type React from "react";
import type { Route } from "./+types/vocabulary";
import { useSearchParams } from "react-router";
import { and, eq, inArray } from "drizzle-orm";
import { vocabulary, vocabularyTags, tags, verbDetails } from "../db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, MonoText, SectionHeading, KeyInsight, CollapsibleSection, QuickTest, CategoryCard, ParadigmTable } from "@/components";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package, Languages, MessageSquare, BookOpen, Users, ShoppingCart, Home, Car, Sun, Lightbulb, Clock, Hash, Palette, TrendingUp, MapPin, Link, Hand, Heart, DoorOpen, Utensils, ThumbsUp, UserCircle, Calendar } from "lucide-react";
import { VERB_PATTERNS, VERB_CONJUGATIONS } from "@/constants/verbs";

const VOCABULARY_TAGS = [
	"people",
	"time-of-day",
	"time-expression",
	"time-telling",
	"position",
	"expression",
	"discourse-filler",
	"social-phrase",
	"command",
	"question",
	"likes-singular",
	"likes-plural",
	"name-construction",
	"discourse-markers",
	"responses",
	"opinions",
	"conversation-arriving",
	"conversation-food",
	"conversation-smalltalk",
	"shopping",
	"household",
	"color",
	"number",
	"transport-vehicle",
	"transport-action",
	"frequency",
	"summer",
	"essential",
	"days-of-week",
	"months",
] as const;

type TagSlug = (typeof VOCABULARY_TAGS)[number];

interface VocabItem {
	id: number;
	greek: string;
	english: string;
	wordType: string | null;
	metadata: unknown;
	tagSlug: string;
}

const groupByTag = (items: VocabItem[]): Record<TagSlug, VocabItem[]> => {
	const result = {} as Record<TagSlug, VocabItem[]>;
	for (const tag of VOCABULARY_TAGS) {
		result[tag] = [];
	}
	for (const item of items) {
		const tag = item.tagSlug as TagSlug;
		if (result[tag]) {
			result[tag].push(item);
		}
	}
	return result;
};

const groupVerbsByPattern = (
	verbs: Array<{
		id: number;
		greek: string;
		english: string;
		pattern: string | null;
	}>
) => {
	const groups: Record<
		string,
		{ id: string; title: string; verbs: typeof verbs }
	> = {};

	for (const verb of verbs) {
		const pattern = verb.pattern || "unknown";
		if (!groups[pattern]) {
			groups[pattern] = {
				id: `verb-${pattern.toLowerCase().replace(/\s+/g, "-")}`,
				title: pattern,
				verbs: [],
			};
		}
		groups[pattern].verbs.push(verb);
	}

	return Object.values(groups);
};

export async function loader({ context }: Route.LoaderArgs) {
	const db = context?.db ?? (await import("../db")).db;

	const [allVocab, verbs] = await Promise.all([
		db
			.select({
				id: vocabulary.id,
				greek: vocabulary.greekText,
				english: vocabulary.englishTranslation,
				wordType: vocabulary.wordType,
				metadata: vocabulary.metadata,
				tagSlug: tags.slug,
			})
			.from(vocabulary)
			.innerJoin(vocabularyTags, eq(vocabularyTags.vocabularyId, vocabulary.id))
			.innerJoin(tags, eq(tags.id, vocabularyTags.tagId))
			.where(
				and(
					eq(vocabulary.status, "processed"),
					inArray(tags.slug, [...VOCABULARY_TAGS])
				)
			)
			.orderBy(vocabulary.greekText),

		db
			.select({
				id: vocabulary.id,
				greek: vocabulary.greekText,
				english: vocabulary.englishTranslation,
				pattern: verbDetails.conjugationFamily,
			})
			.from(vocabulary)
			.leftJoin(verbDetails, eq(verbDetails.vocabId, vocabulary.id))
			.where(and(eq(vocabulary.wordType, "verb"), eq(vocabulary.status, "processed"))),
	]);

	const byTag = groupByTag(allVocab);

	return {
		nouns: {
			people: byTag.people,
			shopping: byTag.shopping,
			household: byTag.household,
			vehicles: byTag["transport-vehicle"],
			summer: byTag.summer,
		},
		verbs: {
			categories: groupVerbsByPattern(verbs),
			transportActions: byTag["transport-action"],
		},
		phrases: {
			// Essential phrases first
			essential: byTag.essential,
			// Calendar
			daysOfWeek: byTag["days-of-week"],
			months: byTag.months,
			// Semantic expression groups
			discourseFillers: byTag["discourse-filler"],
			socialPhrases: byTag["social-phrase"],
			commands: byTag.command,
			questionWords: byTag.question,
			// Paradigm tables
			likesConstruction: {
				singular: byTag["likes-singular"],
				plural: byTag["likes-plural"],
			},
			nameConstruction: byTag["name-construction"],
			// Time
			timeTelling: byTag["time-telling"],
			// Conversational (from conversations.ts)
			discourseMarkers: byTag["discourse-markers"],
			responses: byTag.responses,
			opinions: byTag.opinions,
			arriving: byTag["conversation-arriving"],
			food: byTag["conversation-food"],
			smalltalk: byTag["conversation-smalltalk"],
		},
		reference: {
			timesOfDay: byTag["time-of-day"].map((t) => ({
				...t,
				timeRange: (t.metadata as Record<string, unknown> | null)?.timeRange as
					| string
					| undefined,
			})),
			numbers: byTag.number
			.map((n) => ({
				...n,
				numericValue: (n.metadata as Record<string, unknown> | null)?.numericValue as number | undefined,
			}))
			.sort((a, b) => (a.numericValue ?? 0) - (b.numericValue ?? 0)),
			colors: byTag.color,
			frequencyAdverbs: byTag.frequency,
			positionAdverbs: byTag.position,
		},
	};
}

export function meta() {
	return [
		{ title: "Vocabulary - Greek Word Reference" },
		{
			name: "description",
			content: "Essential Greek vocabulary organized by type",
		},
	];
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

// Vocabulary item display component
const VocabItem: React.FC<{ greek: string; english: string; variant?: "default" | "highlighted" }> = ({
	greek,
	english,
	variant = "default"
}) => (
	<div className="flex items-baseline gap-2">
		<MonoText variant={variant} size="md">{greek}</MonoText>
		<span className="text-stone-600 text-sm">{english}</span>
	</div>
);

// Section card with icon and color theme
const VocabSection: React.FC<{
	title: string;
	icon: React.ReactNode;
	colorScheme: "aegean" | "terracotta" | "olive" | "honey";
	children: React.ReactNode;
	columns?: 2 | 3;
}> = ({ title, icon, colorScheme, children, columns = 3 }) => {
	const colors = {
		aegean: { bg: "bg-aegean/5", border: "border-aegean/30", text: "text-aegean-text", iconBg: "bg-aegean/20" },
		terracotta: { bg: "bg-terracotta/5", border: "border-terracotta/30", text: "text-terracotta-text", iconBg: "bg-terracotta/20" },
		olive: { bg: "bg-olive/5", border: "border-olive/30", text: "text-olive-text", iconBg: "bg-olive/20" },
		honey: { bg: "bg-honey/5", border: "border-honey/30", text: "text-honey-text", iconBg: "bg-honey/20" },
	};
	const c = colors[colorScheme];
	const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

	return (
		<Card variant="bordered" padding="lg" className={`${c.bg} ${c.border}`}>
			<div className="flex items-center gap-3 mb-4">
				<div className={`p-2 rounded-lg ${c.iconBg}`}>
					<span className={c.text}>{icon}</span>
				</div>
				<h3 className={`text-lg font-bold ${c.text}`}>{title}</h3>
			</div>
			<div className={`grid ${gridCols} gap-3`}>
				{children}
			</div>
		</Card>
	);
};

// Nouns Tab Component
const NounsTab: React.FC<{ data: LoaderData["nouns"] }> = ({ data }) => (
	<div className="space-y-6">
		<VocabSection title="Family & People" icon={<Users size={20} />} colorScheme="terracotta">
			{data.people.map((person) => (
				<VocabItem key={person.id} greek={person.greek} english={person.english} variant="highlighted" />
			))}
		</VocabSection>

		<div className="grid md:grid-cols-2 gap-4">
			<VocabSection title="Shopping & Groceries" icon={<ShoppingCart size={20} />} colorScheme="olive" columns={2}>
				{data.shopping.map((item) => (
					<VocabItem key={item.id} greek={item.greek} english={item.english} />
				))}
			</VocabSection>

			<VocabSection title="Household & Home" icon={<Home size={20} />} colorScheme="aegean" columns={2}>
				{data.household.map((item) => (
					<VocabItem key={item.id} greek={item.greek} english={item.english} />
				))}
			</VocabSection>
		</div>

		<VocabSection title="Transportation" icon={<Car size={20} />} colorScheme="aegean">
			{data.vehicles.map((vehicle) => (
				<VocabItem key={vehicle.id} greek={vehicle.greek} english={vehicle.english} />
			))}
		</VocabSection>

		<VocabSection title="Summer & Beach" icon={<Sun size={20} />} colorScheme="honey">
			{data.summer.map((word) => (
				<VocabItem key={word.id} greek={word.greek} english={word.english} />
			))}
		</VocabSection>
	</div>
);

// Verb pattern badge colors
const getPatternColor = (pattern: string | null): "aegean" | "terracotta" | "olive" | "honey" => {
	const p = pattern?.toLowerCase() || "";
	if (p.includes("type a") || p.includes("regular")) return "aegean";
	if (p.includes("type b") || p.includes("contract")) return "terracotta";
	if (p.includes("irregular")) return "honey";
	return "olive";
};

// Map category titles to pattern keys and conjugation keys
const getPatternKey = (title: string): keyof typeof VERB_PATTERNS | null => {
	const t = title.toLowerCase();
	if (t.includes("type a") || t.includes("-ω verb") || t.includes("regular")) return "active";
	if (t.includes("type b") || t.includes("-άω") || t.includes("contract")) return "contracted";
	if (t.includes("-ομαι") || t.includes("-άμαι") || t.includes("deponent")) return "deponent";
	return null;
};

const getConjugationKey = (title: string): keyof typeof VERB_CONJUGATIONS | null => {
	const t = title.toLowerCase();
	if (t.includes("type a") || t.includes("-ω verb") || t.includes("regular")) return "kano";
	if (t.includes("type b") || t.includes("-άω") || t.includes("contract")) return "milao";
	if (t.includes("-ομαι")) return "erhomai";
	if (t.includes("-άμαι")) return "thymamai";
	return null;
};

// Verbs Tab Component - with paradigm tables
const VerbsTab: React.FC<{ data: LoaderData["verbs"] }> = ({ data }) => (
	<div className="space-y-6">
		<KeyInsight title="Verb conjugation patterns">
			Greek verbs follow predictable patterns. Learn one pattern and you can conjugate all verbs in that group.
			The endings change based on person (I, you, he/she) and number (singular, plural).
		</KeyInsight>

		{data.categories.map((category) => {
			const colorScheme = getPatternColor(category.title);
			const patternKey = getPatternKey(category.title);
			const conjugationKey = getConjugationKey(category.title);
			const pattern = patternKey ? VERB_PATTERNS[patternKey] : null;
			const conjugation = conjugationKey ? VERB_CONJUGATIONS[conjugationKey] : null;

			return (
				<CategoryCard
					key={category.id}
					title={category.title}
					subtitle={`${category.verbs.length} verbs`}
					colorScheme={colorScheme}
					priority={category.verbs.length > 20 ? "primary" : "secondary"}
				>
					{/* Show paradigm table for patterns we have data for */}
					{pattern && conjugation && (
						<div className="mb-4">
							<ParadigmTable
								infinitive={pattern.canonical.infinitive}
								meaning={pattern.canonical.meaning}
								forms={{
									sg1: conjugation[0].form,
									sg2: conjugation[1].form,
									sg3: conjugation[2].form,
									pl1: conjugation[3].form,
									pl2: conjugation[4].form,
									pl3: conjugation[5].form,
								}}
							/>
						</div>
					)}

					<CollapsibleSection
						title={`All ${category.title} verbs`}
						colorScheme={colorScheme}
						defaultOpen={category.verbs.length < 10}
					>
						<div className="grid md:grid-cols-2 gap-3">
							{category.verbs.map((verb) => (
								<div
									key={verb.id}
									className="flex justify-between items-center p-3 bg-stone-50 rounded-lg border border-stone-200"
								>
									<div className="flex items-baseline gap-2">
										<MonoText variant="greek" size="lg">{verb.greek}</MonoText>
										<span className="text-stone-600">{verb.english}</span>
									</div>
								</div>
							))}
						</div>
					</CollapsibleSection>
				</CategoryCard>
			);
		})}

		{data.transportActions.length > 0 && (
			<VocabSection title="Transport Actions" icon={<Car size={20} />} colorScheme="aegean">
				{data.transportActions.map((action) => (
					<VocabItem key={action.id} greek={action.greek} english={action.english} />
				))}
			</VocabSection>
		)}
	</div>
);

// Time-Telling Section Component
const TimeTellingSection: React.FC<{ items: VocabItem[] }> = ({ items }) => {
	const grouped = items.reduce(
		(acc, item) => {
			const meta = item.metadata as Record<string, unknown> | null;
			const cat = (meta?.category as string) || "other";
			if (!acc[cat]) acc[cat] = [];
			acc[cat].push(item);
			return acc;
		},
		{} as Record<string, VocabItem[]>
	);

	const categoryLabels: Record<string, string> = {
		basic: "Basic Time Structure",
		fractions: "Minutes & Fractions",
		"at-times": '"At" Times (στις)',
	};

	const categoryOrder = ["basic", "fractions", "at-times"];

	if (items.length === 0) return null;

	return (
		<Card variant="bordered" padding="lg" className="bg-aegean/5 border-aegean/30">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 rounded-lg bg-aegean/20">
					<Clock size={20} className="text-aegean-text" />
				</div>
				<div>
					<h3 className="text-lg font-bold text-aegean-text">Telling Time</h3>
					<p className="text-sm text-stone-600">Τι ώρα είναι;</p>
				</div>
			</div>
			<Alert variant="info" className="mb-4">
				<AlertDescription>
					<strong>Pattern:</strong> Είναι + time / Η ώρα είναι + time
				</AlertDescription>
			</Alert>
			<div className="grid md:grid-cols-2 gap-6">
				{categoryOrder.map((cat) => {
					const catItems = grouped[cat] || [];
					if (catItems.length === 0) return null;
					return (
						<div key={cat}>
							<h5 className="font-semibold text-aegean-text mb-3">{categoryLabels[cat]}</h5>
							<div className="space-y-2">
								{catItems.map((item) => {
									const meta = item.metadata as Record<string, unknown> | null;
									const note = meta?.note ? String(meta.note) : null;
									return (
										<div key={item.id} className="flex items-baseline gap-2">
											<MonoText variant="highlighted">{item.greek}</MonoText>
											<span className="text-stone-600 text-sm">{item.english}</span>
											{note && (
												<span className="text-stone-600 text-xs">({note})</span>
											)}
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</Card>
	);
};

// Paradigm Card Component - for grammatical patterns like Likes and Names
const ParadigmCard: React.FC<{
	title: string;
	subtitle: string;
	icon: React.ReactNode;
	patternNote: string;
	columns: { title: string; items: VocabItem[] }[];
	colorScheme: "aegean" | "terracotta" | "olive";
}> = ({ title, subtitle, icon, patternNote, columns, colorScheme }) => {
	const colors = {
		aegean: { bg: "bg-aegean/5", border: "border-aegean/30", text: "text-aegean-text", iconBg: "bg-aegean/20" },
		terracotta: { bg: "bg-terracotta/5", border: "border-terracotta/30", text: "text-terracotta-text", iconBg: "bg-terracotta/20" },
		olive: { bg: "bg-olive/5", border: "border-olive/30", text: "text-olive-text", iconBg: "bg-olive/20" },
	};
	const c = colors[colorScheme];

	return (
		<Card variant="bordered" padding="lg" className={`${c.bg} ${c.border}`}>
			<div className="flex items-center gap-3 mb-4">
				<div className={`p-2 rounded-lg ${c.iconBg}`}>
					<span className={c.text}>{icon}</span>
				</div>
				<div>
					<h3 className={`text-lg font-bold ${c.text}`}>{title}</h3>
					<p className="text-sm text-stone-600">{subtitle}</p>
				</div>
			</div>
			<Alert variant="info" className="mb-4">
				<AlertDescription>
					<strong>Pattern:</strong> {patternNote}
				</AlertDescription>
			</Alert>
			<div className={`grid md:grid-cols-${columns.length} gap-6`}>
				{columns.map((col) => (
					<div key={col.title}>
						<h5 className={`font-semibold ${c.text} mb-3`}>{col.title}</h5>
						<div className="space-y-2">
							{col.items.map((item) => (
								<VocabItem key={item.id} greek={item.greek} english={item.english} />
							))}
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};

// Phrases Tab Component - Redesigned with 3 colors and better organization
// Color scheme: terracotta (expressions/social), aegean (patterns/structure), olive (conversational)
const PhrasesTab: React.FC<{ data: LoaderData["phrases"] }> = ({ data }) => (
	<div className="space-y-6">
		{/* Section 0: Essential Phrases - First things to learn */}
		{data.essential.length > 0 && (
			<CategoryCard
				title="Essential Phrases"
				subtitle="Learn these first!"
				colorScheme="honey"
				priority="primary"
				badge="Start Here"
			>
				<div className="grid md:grid-cols-2 gap-3">
					{data.essential.map((phrase) => (
						<div key={phrase.id} className="flex items-baseline gap-2 p-2 bg-white/50 rounded">
							<MonoText variant="greek" size="lg">{phrase.greek}</MonoText>
							<span className="text-stone-600">{phrase.english}</span>
						</div>
					))}
				</div>
			</CategoryCard>
		)}

		{/* Calendar - Days and Months */}
		{(data.daysOfWeek.length > 0 || data.months.length > 0) && (
			<div className="grid md:grid-cols-2 gap-4">
				{data.daysOfWeek.length > 0 && (
					<VocabSection title="Days of the Week" icon={<Calendar size={20} />} colorScheme="aegean" columns={2}>
						{data.daysOfWeek.map((day) => (
							<VocabItem key={day.id} greek={day.greek} english={day.english} />
						))}
					</VocabSection>
				)}

				{data.months.length > 0 && (
					<CollapsibleSection title="Months of the Year" colorScheme="aegean" defaultOpen={false}>
						<div className="grid grid-cols-2 gap-2">
							{data.months.map((month) => (
								<VocabItem key={month.id} greek={month.greek} english={month.english} />
							))}
						</div>
					</CollapsibleSection>
				)}
			</div>
		)}

		{/* Section 1: Core Expressions (terracotta) */}
		<div className="grid md:grid-cols-2 gap-4">
			{data.discourseFillers.length > 0 && (
				<VocabSection title="Connectors & Fillers" icon={<Link size={20} />} colorScheme="terracotta" columns={2}>
					{data.discourseFillers.map((expr) => (
						<VocabItem key={expr.id} greek={expr.greek} english={expr.english} />
					))}
				</VocabSection>
			)}

			{data.socialPhrases.length > 0 && (
				<VocabSection title="Social Phrases" icon={<MessageSquare size={20} />} colorScheme="terracotta" columns={2}>
					{data.socialPhrases.map((expr) => (
						<VocabItem key={expr.id} greek={expr.greek} english={expr.english} />
					))}
				</VocabSection>
			)}
		</div>

		<div className="grid md:grid-cols-2 gap-4">
			<VocabSection title="Commands" icon={<Hand size={20} />} colorScheme="terracotta" columns={2}>
				{data.commands.map((cmd) => (
					<VocabItem key={cmd.id} greek={cmd.greek} english={cmd.english} />
				))}
			</VocabSection>

			<VocabSection title="Question Words" icon={<MessageSquare size={20} />} colorScheme="terracotta" columns={2}>
				{data.questionWords.map((q) => (
					<VocabItem key={q.id} greek={q.greek} english={q.english} variant="highlighted" />
				))}
			</VocabSection>
		</div>

		{/* Section 2: Grammatical Patterns (aegean) */}
		<ParadigmCard
			title="Likes Construction"
			subtitle="μου αρέσει / αρέσουν"
			icon={<Heart size={20} />}
			patternNote="[Person] αρέσει (one thing) / αρέσουν (many things) — the thing liked is the subject!"
			colorScheme="aegean"
			columns={[
				{ title: "One thing (αρέσει)", items: data.likesConstruction.singular },
				{ title: "Many things (αρέσουν)", items: data.likesConstruction.plural },
			]}
		/>

		<QuickTest
			title="αρέσει or αρέσουν?"
			intro="Choose the correct verb form based on what is liked."
			colorScheme="aegean"
			options={[
				{
					condition: "One thing is liked (singular subject)",
					answer: "αρέσει",
					examples: [
						{ greek: "Μου αρέσει ο καφές", english: "I like coffee" },
						{ greek: "Σου αρέσει η μουσική;", english: "Do you like the music?" },
					],
				},
				{
					condition: "Multiple things are liked (plural subject)",
					answer: "αρέσουν",
					examples: [
						{ greek: "Μου αρέσουν οι γάτες", english: "I like cats" },
						{ greek: "Τους αρέσουν τα βιβλία", english: "They like books" },
					],
				},
			]}
			summary={<>Remember: the thing liked is the <strong>subject</strong>, so the verb agrees with it!</>}
		/>

		{data.nameConstruction.length > 0 && (
			<Card variant="bordered" padding="lg" className="bg-aegean/5 border-aegean/30">
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-aegean/20">
						<UserCircle size={20} className="text-aegean-text" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-aegean-text">Name Construction</h3>
						<p className="text-sm text-stone-600">με λένε = my name is (lit. "they call me")</p>
					</div>
				</div>
				<Alert variant="info" className="mb-4">
					<AlertDescription>
						<strong>Pattern:</strong> [Pronoun] λένε + name — literally "they call me..."
					</AlertDescription>
				</Alert>
				<div className="grid md:grid-cols-2 gap-3">
					{data.nameConstruction.map((name) => (
						<VocabItem key={name.id} greek={name.greek} english={name.english} />
					))}
				</div>
			</Card>
		)}

		<TimeTellingSection items={data.timeTelling} />

		{/* Section 3: Conversational Phrases (olive) */}
		{(data.discourseMarkers.length > 0 || data.responses.length > 0) && (
			<div className="grid md:grid-cols-2 gap-4">
				{data.discourseMarkers.length > 0 && (
					<VocabSection title="Discourse Markers" icon={<Link size={20} />} colorScheme="olive" columns={2}>
						{data.discourseMarkers.map((phrase) => (
							<VocabItem key={phrase.id} greek={phrase.greek} english={phrase.english} />
						))}
					</VocabSection>
				)}

				{data.responses.length > 0 && (
					<VocabSection title="Common Responses" icon={<ThumbsUp size={20} />} colorScheme="olive" columns={2}>
						{data.responses.map((phrase) => (
							<VocabItem key={phrase.id} greek={phrase.greek} english={phrase.english} />
						))}
					</VocabSection>
				)}
			</div>
		)}

		{data.opinions.length > 0 && (
			<VocabSection title="Expressing Opinions" icon={<MessageSquare size={20} />} colorScheme="olive">
				{data.opinions.map((phrase) => (
					<VocabItem key={phrase.id} greek={phrase.greek} english={phrase.english} />
				))}
			</VocabSection>
		)}

		{/* Section 4: Situational Phrases (olive) */}
		{(data.arriving.length > 0 || data.food.length > 0) && (
			<div className="grid md:grid-cols-2 gap-4">
				{data.arriving.length > 0 && (
					<VocabSection title="Arriving & Leaving" icon={<DoorOpen size={20} />} colorScheme="olive" columns={2}>
						{data.arriving.map((phrase) => (
							<VocabItem key={phrase.id} greek={phrase.greek} english={phrase.english} />
						))}
					</VocabSection>
				)}

				{data.food.length > 0 && (
					<VocabSection title="Food & Hospitality" icon={<Utensils size={20} />} colorScheme="olive" columns={2}>
						{data.food.map((phrase) => (
							<VocabItem key={phrase.id} greek={phrase.greek} english={phrase.english} />
						))}
					</VocabSection>
				)}
			</div>
		)}

		{data.smalltalk.length > 0 && (
			<VocabSection title="Small Talk" icon={<MessageSquare size={20} />} colorScheme="olive">
				{data.smalltalk.map((phrase) => (
					<VocabItem key={phrase.id} greek={phrase.greek} english={phrase.english} />
				))}
			</VocabSection>
		)}
	</div>
);

// Time of day order (chronological)
const TIME_ORDER = ["morning", "midday", "afternoon", "evening", "night"];

// Position adverb pairs (opposites)
const POSITION_PAIRS = [
	["αριστερά", "δεξιά"],     // left / right
	["πάνω", "κάτω"],          // up / down
	["μέσα", "έξω"],           // inside / outside
	["μπροστά", "πίσω"],       // front / back
	["εδώ", "εκεί"],           // here / there
	["κοντά", "μακριά"],       // near / far
];

// Reference Tab Component
const ReferenceTab: React.FC<{ data: LoaderData["reference"] }> = ({ data }) => {
	// Sort times of day chronologically
	const sortedTimes = [...data.timesOfDay].sort((a, b) => {
		const aOrder = TIME_ORDER.indexOf(a.english.toLowerCase());
		const bOrder = TIME_ORDER.indexOf(b.english.toLowerCase());
		return (aOrder === -1 ? 999 : aOrder) - (bOrder === -1 ? 999 : bOrder);
	});

	// Group position adverbs by pairs
	const pairedAdverbs: Array<{ left: typeof data.positionAdverbs[0] | null; right: typeof data.positionAdverbs[0] | null }> = [];
	const usedIds = new Set<number>();

	for (const [leftGreek, rightGreek] of POSITION_PAIRS) {
		const left = data.positionAdverbs.find(a => a.greek === leftGreek) || null;
		const right = data.positionAdverbs.find(a => a.greek === rightGreek) || null;
		if (left || right) {
			pairedAdverbs.push({ left, right });
			if (left) usedIds.add(left.id);
			if (right) usedIds.add(right.id);
		}
	}

	// Add any remaining unpaired adverbs
	const unpaired = data.positionAdverbs.filter(a => !usedIds.has(a.id));

	return (
	<div className="space-y-6">
		{/* Times of Day - ordered chronologically */}
		<Card variant="bordered" padding="lg" className="bg-honey/5 border-honey/30">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 rounded-lg bg-honey/20">
					<Sun size={20} className="text-honey-text" />
				</div>
				<h3 className="text-lg font-bold text-honey-text">Times of Day</h3>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
				{sortedTimes.map((time) => (
					<div key={time.id} className="text-center p-3 bg-white rounded-lg border border-honey/20 shadow-sm">
						<MonoText variant="greek" size="lg" className="block mb-1">{time.greek}</MonoText>
						<div className="text-stone-600 text-sm">{time.english}</div>
						{time.timeRange && <div className="text-xs text-stone-600 mt-1">{time.timeRange}</div>}
					</div>
				))}
			</div>
		</Card>

		{/* Numbers - comprehensive grid */}
		<Card variant="bordered" padding="lg" className="bg-aegean/5 border-aegean/30">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 rounded-lg bg-aegean/20">
					<Hash size={20} className="text-aegean-text" />
				</div>
				<div>
					<h3 className="text-lg font-bold text-aegean-text">Numbers</h3>
					<p className="text-sm text-stone-600">Αριθμοί</p>
				</div>
			</div>
			<Alert variant="info" className="mb-4">
				<AlertDescription>
					<strong>Pattern:</strong> For 21-99, combine tens + units: τριάντα + δύο = τριάντα δύο (32)
				</AlertDescription>
			</Alert>
			<div className="grid md:grid-cols-3 gap-6">
				<div>
					<h5 className="font-semibold text-aegean-text mb-3">Units (0-9)</h5>
					<div className="space-y-2">
						{data.numbers
							.filter((n) => n.numericValue !== undefined && n.numericValue >= 0 && n.numericValue <= 9)
							.map((number) => (
								<div key={number.id} className="flex items-baseline gap-2">
									<MonoText>{number.greek}</MonoText>
									<span className="text-stone-600 text-sm">{number.english}</span>
								</div>
							))}
					</div>
				</div>
				<div>
					<h5 className="font-semibold text-aegean-text mb-3">Teens (10-19)</h5>
					<div className="space-y-2">
						{data.numbers
							.filter((n) => n.numericValue && n.numericValue >= 10 && n.numericValue <= 19)
							.map((number) => (
								<div key={number.id} className="flex items-baseline gap-2">
									<MonoText>{number.greek}</MonoText>
									<span className="text-stone-600 text-sm">{number.english}</span>
								</div>
							))}
					</div>
				</div>
				<div>
					<h5 className="font-semibold text-aegean-text mb-3">Tens (20-100)</h5>
					<div className="space-y-2">
						{data.numbers
							.filter((n) => n.numericValue && n.numericValue >= 20)
							.map((number) => (
								<div key={number.id} className="flex items-baseline gap-2">
									<MonoText>{number.greek}</MonoText>
									<span className="text-stone-600 text-sm">{number.english}</span>
								</div>
							))}
					</div>
				</div>
			</div>
		</Card>

		<VocabSection title="Colors" icon={<Palette size={20} />} colorScheme="terracotta">
			{data.colors.map((color) => (
				<VocabItem key={color.id} greek={color.greek} english={color.english} />
			))}
		</VocabSection>

		{/* Frequency Adverbs with special tip */}
		<Card variant="bordered" padding="lg" className="bg-olive/5 border-olive/30">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 rounded-lg bg-olive/20">
					<TrendingUp size={20} className="text-olive-text" />
				</div>
				<h3 className="text-lg font-bold text-olive-text">Adverbs of Frequency</h3>
			</div>
			<Alert variant="warning" className="mb-4">
				<Lightbulb size={16} />
				<AlertDescription>
					<strong>Remember:</strong> ποτέ = never, πότε = when (question) — accent changes meaning!
				</AlertDescription>
			</Alert>
			<div className="grid md:grid-cols-3 gap-3">
				{data.frequencyAdverbs.map((adverb) => (
					<VocabItem key={adverb.id} greek={adverb.greek} english={adverb.english} />
				))}
			</div>
		</Card>

		{/* Position Adverbs - grouped by opposites */}
		<Card variant="bordered" padding="lg" className="bg-aegean/5 border-aegean/30">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 rounded-lg bg-aegean/20">
					<MapPin size={20} className="text-aegean-text" />
				</div>
				<h3 className="text-lg font-bold text-aegean-text">Position & Direction</h3>
			</div>
			<Alert variant="info" className="mb-4">
				<AlertDescription>
					Essential for giving and understanding directions. Opposites are grouped together.
				</AlertDescription>
			</Alert>
			<div className="space-y-2">
				{pairedAdverbs.map((pair, idx) => (
					<div key={idx} className="grid grid-cols-2 gap-4 p-3 bg-white rounded-lg border border-aegean/20">
						{pair.left ? (
							<div className="flex items-baseline gap-2">
								<MonoText variant="greek" size="md">{pair.left.greek}</MonoText>
								<span className="text-stone-600 text-sm">{pair.left.english}</span>
							</div>
						) : <div />}
						{pair.right ? (
							<div className="flex items-baseline gap-2">
								<span className="text-stone-400 mr-1">↔</span>
								<MonoText variant="greek" size="md">{pair.right.greek}</MonoText>
								<span className="text-stone-600 text-sm">{pair.right.english}</span>
							</div>
						) : <div />}
					</div>
				))}
				{unpaired.length > 0 && (
					<div className="grid md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-aegean/20">
						{unpaired.map((adverb) => (
							<VocabItem key={adverb.id} greek={adverb.greek} english={adverb.english} />
						))}
					</div>
				)}
			</div>
		</Card>
	</div>
	);
};

export default function VocabularyRoute({ loaderData }: Route.ComponentProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab") || "nouns";

	const handleTabChange = (value: string) => {
		setSearchParams({ tab: value });
	};

	return (
		<div className="space-y-6">
			<SectionHeading
				title="Vocabulary"
				subtitle="Essential Greek vocabulary organized by type"
				level="h2"
			/>

			<Tabs value={activeTab} onValueChange={handleTabChange}>
				<TabsList className="flex-wrap h-auto gap-1">
					<TabsTrigger value="nouns" className="gap-1.5">
						<Package size={16} />
						<span>Nouns</span>
					</TabsTrigger>
					<TabsTrigger value="verbs" className="gap-1.5">
						<Languages size={16} />
						<span>Verbs</span>
					</TabsTrigger>
					<TabsTrigger value="phrases" className="gap-1.5">
						<MessageSquare size={16} />
						<span>Phrases</span>
					</TabsTrigger>
					<TabsTrigger value="reference" className="gap-1.5">
						<BookOpen size={16} />
						<span>Reference</span>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="nouns">
					<NounsTab data={loaderData.nouns} />
				</TabsContent>

				<TabsContent value="verbs">
					<VerbsTab data={loaderData.verbs} />
				</TabsContent>

				<TabsContent value="phrases">
					<PhrasesTab data={loaderData.phrases} />
				</TabsContent>

				<TabsContent value="reference">
					<ReferenceTab data={loaderData.reference} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
