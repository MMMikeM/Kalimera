import type React from "react";
import type { Route } from "./+types/vocabulary";
import { useSearchParams } from "react-router";
import { and, eq, inArray } from "drizzle-orm";
import { vocabulary, vocabularyTags, tags, verbDetails } from "../db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Languages, MessageSquare, BookOpen } from "lucide-react";

const VOCABULARY_TAGS = [
	"people",
	"time-of-day",
	"time-expression",
	"time-telling",
	"position",
	"expression",
	"command",
	"question",
	"likes-singular",
	"likes-plural",
	"shopping",
	"household",
	"color",
	"number",
	"transport-vehicle",
	"transport-action",
	"frequency",
	"summer",
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
			usefulExpressions: byTag.expression,
			commands: byTag.command,
			questionWords: byTag.question,
			likesConstruction: {
				singular: byTag["likes-singular"],
				plural: byTag["likes-plural"],
			},
			timeExpressions: byTag["time-expression"],
			timeTelling: byTag["time-telling"],
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

// Nouns Tab Component
const NounsTab: React.FC<{ data: LoaderData["nouns"] }> = ({ data }) => (
	<div className="space-y-6">
		<div className="border rounded-lg p-4">
			<h3 className="text-lg font-bold mb-3">Family & People</h3>
			<div className="grid md:grid-cols-3 gap-2 text-sm">
				{data.people.map((person) => (
					<div key={person.id}>
						<span className="font-mono">{person.greek}</span> - {person.english}
					</div>
				))}
			</div>
		</div>

		<div className="grid md:grid-cols-2 gap-4">
			<div className="border rounded-lg p-4">
				<h4 className="font-bold mb-2">Shopping & Groceries</h4>
				<div className="space-y-1 text-sm">
					{data.shopping.map((item) => (
						<div key={item.id}>
							<span className="font-mono">{item.greek}</span> - {item.english}
						</div>
					))}
				</div>
			</div>

			<div className="border rounded-lg p-4">
				<h4 className="font-bold mb-2">Household & Home</h4>
				<div className="space-y-1 text-sm">
					{data.household.map((item) => (
						<div key={item.id}>
							<span className="font-mono">{item.greek}</span> - {item.english}
						</div>
					))}
				</div>
			</div>
		</div>

		<div className="border rounded-lg p-4">
			<h4 className="font-bold mb-2">Transportation</h4>
			<div className="grid md:grid-cols-3 gap-2 text-sm">
				{data.vehicles.map((vehicle) => (
					<div key={vehicle.id}>
						<span className="font-mono">{vehicle.greek}</span> - {vehicle.english}
					</div>
				))}
			</div>
		</div>

		<div className="border rounded-lg p-4">
			<h4 className="font-bold mb-2">Summer & Beach</h4>
			<div className="grid md:grid-cols-3 gap-2 text-sm">
				{data.summer.map((word) => (
					<div key={word.id}>
						<span className="font-mono">{word.greek}</span> - {word.english}
					</div>
				))}
			</div>
		</div>
	</div>
);

// Verbs Tab Component
const VerbsTab: React.FC<{ data: LoaderData["verbs"] }> = ({ data }) => (
	<div className="space-y-6">
		{data.categories.map((category) => (
			<div key={category.id} className="border rounded-lg p-4">
				<h3 className="text-lg font-bold mb-3">{category.title}</h3>
				<div className="grid md:grid-cols-2 gap-4">
					{category.verbs.map((verb) => (
						<div
							key={verb.id}
							className="flex justify-between items-center p-2 bg-gray-50 rounded"
						>
							<div>
								<span className="font-mono text-lg">{verb.greek}</span>
								<span className="text-gray-600 ml-2">{verb.english}</span>
							</div>
							<span className="text-xs bg-blue-100 px-2 py-1 rounded">
								{verb.pattern}
							</span>
						</div>
					))}
				</div>
			</div>
		))}

		{data.transportActions.length > 0 && (
			<div className="border rounded-lg p-4">
				<h3 className="text-lg font-bold mb-3">Transport Actions</h3>
				<div className="grid md:grid-cols-2 gap-2 text-sm">
					{data.transportActions.map((action) => (
						<div key={action.id}>
							<span className="font-mono">{action.greek}</span> - {action.english}
						</div>
					))}
				</div>
			</div>
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
		<div className="border rounded-lg p-4">
			<h3 className="text-lg font-bold mb-3">Telling Time - Τι ώρα είναι;</h3>
			<div className="bg-blue-50 p-3 rounded mb-3">
				<p className="text-sm text-blue-700">
					<strong>Pattern:</strong> Είναι + time / Η ώρα είναι + time
				</p>
			</div>
			<div className="grid md:grid-cols-2 gap-4">
				{categoryOrder.map((cat) => {
					const catItems = grouped[cat] || [];
					if (catItems.length === 0) return null;
					return (
						<div key={cat}>
							<h5 className="font-semibold mb-2">{categoryLabels[cat]}</h5>
							<div className="space-y-1 text-sm">
								{catItems.map((item) => {
									const meta = item.metadata as Record<string, unknown> | null;
									const note = meta?.note ? String(meta.note) : null;
									return (
										<div key={item.id}>
											<span className="font-mono">{item.greek}</span> - {item.english}
											{note && (
												<span className="text-gray-500 text-xs ml-2">
													({note})
												</span>
											)}
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

// Phrases Tab Component
const PhrasesTab: React.FC<{ data: LoaderData["phrases"] }> = ({ data }) => (
	<div className="space-y-6">
		<div className="grid md:grid-cols-2 gap-4">
			<div className="border rounded-lg p-4">
				<h4 className="font-bold mb-2">Useful Expressions</h4>
				<div className="space-y-1 text-sm">
					{data.usefulExpressions.map((expr) => (
						<div key={expr.id}>
							<span className="font-mono">{expr.greek}</span> - {expr.english}
						</div>
					))}
				</div>
			</div>

			<div className="border rounded-lg p-4">
				<h4 className="font-bold mb-2">Commands</h4>
				<div className="space-y-1 text-sm">
					{data.commands.map((cmd) => (
						<div key={cmd.id}>
							<span className="font-mono">{cmd.greek}</span> - {cmd.english}
						</div>
					))}
				</div>
			</div>
		</div>

		<div className="border rounded-lg p-4">
			<h3 className="text-lg font-bold mb-3">Question Words</h3>
			<div className="grid md:grid-cols-3 gap-2 text-sm">
				{data.questionWords.map((q) => (
					<div key={q.id}>
						<span className="font-mono">{q.greek}</span> - {q.english}
					</div>
				))}
			</div>
		</div>

		<div className="border rounded-lg p-4">
			<h3 className="text-lg font-bold mb-3">Likes Construction - μου αρέσει/αρέσουν</h3>
			<div className="bg-blue-50 p-3 rounded mb-3">
				<p className="text-sm text-blue-700">
					<strong>Pattern:</strong> [Person] αρέσει (for one thing) / αρέσουν (for many things)
				</p>
			</div>
			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<h5 className="font-semibold mb-2">Single thing (αρέσει)</h5>
					<div className="space-y-1 text-sm">
						{data.likesConstruction.singular.map((like) => (
							<div key={like.id}>
								<span className="font-mono">{like.greek}</span> - {like.english}
							</div>
						))}
					</div>
				</div>
				<div>
					<h5 className="font-semibold mb-2">Multiple things (αρέσουν)</h5>
					<div className="space-y-1 text-sm">
						{data.likesConstruction.plural.map((like) => (
							<div key={like.id}>
								<span className="font-mono">{like.greek}</span> - {like.english}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>

		<TimeTellingSection items={data.timeTelling} />

		{data.timeExpressions.length > 0 && (
			<div className="border rounded-lg p-4">
				<h3 className="text-lg font-bold mb-3">Time Expressions</h3>
				<div className="grid md:grid-cols-3 gap-2 text-sm">
					{data.timeExpressions.map((expr) => (
						<div key={expr.id}>
							<span className="font-mono">{expr.greek}</span> - {expr.english}
						</div>
					))}
				</div>
			</div>
		)}
	</div>
);

// Reference Tab Component
const ReferenceTab: React.FC<{ data: LoaderData["reference"] }> = ({ data }) => (
	<div className="space-y-6">
		<div className="border rounded-lg p-4">
			<h3 className="text-lg font-bold mb-3">Times of Day</h3>
			<div className="grid md:grid-cols-5 gap-2 text-sm">
				{data.timesOfDay.map((time) => (
					<div key={time.id} className="text-center">
						<div className="font-mono text-lg">{time.greek}</div>
						<div className="text-gray-600">{time.english}</div>
						{time.timeRange && <div className="text-xs">{time.timeRange}</div>}
					</div>
				))}
			</div>
		</div>

		<div className="border rounded-lg p-4">
			<h3 className="text-lg font-bold mb-3">Numbers - Αριθμοί</h3>
			<div className="bg-blue-50 p-3 rounded mb-4">
				<p className="text-sm text-blue-700">
					<strong>Pattern:</strong> For 21-99, combine tens + units: τριάντα + δύο = τριάντα δύο (32)
				</p>
			</div>
			<div className="grid md:grid-cols-3 gap-4">
				<div>
					<h5 className="font-semibold mb-2 text-gray-600">Units (1-9)</h5>
					<div className="grid grid-cols-3 gap-1 text-sm">
						{data.numbers
							.filter((n) => n.numericValue && n.numericValue >= 1 && n.numericValue <= 9)
							.map((number) => (
								<div key={number.id} className="font-mono">
									<span className="text-gray-400 text-xs mr-1">{number.english}</span>
									{number.greek}
								</div>
							))}
					</div>
				</div>
				<div>
					<h5 className="font-semibold mb-2 text-gray-600">Teens (10-19)</h5>
					<div className="space-y-0.5 text-sm">
						{data.numbers
							.filter((n) => n.numericValue && n.numericValue >= 10 && n.numericValue <= 19)
							.map((number) => (
								<div key={number.id} className="font-mono">
									<span className="text-gray-400 text-xs mr-1">{number.english}</span>
									{number.greek}
								</div>
							))}
					</div>
				</div>
				<div>
					<h5 className="font-semibold mb-2 text-gray-600">Tens (20-100)</h5>
					<div className="space-y-0.5 text-sm">
						{data.numbers
							.filter((n) => n.numericValue && n.numericValue >= 20)
							.map((number) => (
								<div key={number.id} className="font-mono">
									<span className="text-gray-400 text-xs mr-1">{number.english}</span>
									{number.greek}
								</div>
							))}
					</div>
				</div>
			</div>
		</div>

		<div className="border rounded-lg p-4">
			<h4 className="font-bold mb-2">Colors</h4>
			<div className="grid md:grid-cols-3 gap-2 text-sm">
				{data.colors.map((color) => (
					<div key={color.id}>
						<span className="font-mono">{color.greek}</span> - {color.english}
					</div>
				))}
			</div>
		</div>

		<div className="border rounded-lg p-4">
			<h3 className="text-lg font-bold mb-3">Adverbs of Frequency</h3>
			<div className="bg-yellow-50 p-3 rounded mb-3">
				<p className="text-sm text-yellow-700">
					<strong>Remember:</strong> ποτέ = never, πότε = when (question)
				</p>
			</div>
			<div className="grid md:grid-cols-3 gap-2 text-sm">
				{data.frequencyAdverbs.map((adverb) => (
					<div key={adverb.id}>
						<span className="font-mono">{adverb.greek}</span> - {adverb.english}
					</div>
				))}
			</div>
		</div>

		<div className="border rounded-lg p-4">
			<h3 className="text-lg font-bold mb-3">Position & Direction</h3>
			<div className="bg-blue-50 p-3 rounded mb-3">
				<p className="text-sm text-blue-700">
					Essential for giving and understanding directions
				</p>
			</div>
			<div className="grid md:grid-cols-3 gap-2 text-sm">
				{data.positionAdverbs.map((adverb) => (
					<div key={adverb.id}>
						<span className="font-mono">{adverb.greek}</span> - {adverb.english}
					</div>
				))}
			</div>
		</div>
	</div>
);

export default function VocabularyRoute({ loaderData }: Route.ComponentProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const activeTab = searchParams.get("tab") || "nouns";

	const handleTabChange = (value: string) => {
		setSearchParams({ tab: value });
	};

	return (
		<div className="space-y-6">
			<div className="mb-2">
				<h2 className="text-2xl font-bold text-gray-800">Vocabulary</h2>
				<p className="text-gray-600 mt-1">Essential Greek vocabulary organized by type</p>
			</div>

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
