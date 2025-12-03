import type React from "react";
import type { Route } from "./+types/vocabulary";
import { and, eq, inArray } from "drizzle-orm";
import { vocabulary, vocabularyTags, tags, verbDetails } from "../db/schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const VOCABULARY_TAGS = [
	"people",
	"time-of-day",
	"time-expression",
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
		verbCategories: groupVerbsByPattern(verbs),
		people: byTag.people,
		timesOfDay: byTag["time-of-day"].map((t) => ({
			...t,
			timeRange: (t.metadata as Record<string, unknown> | null)?.timeRange as
				| string
				| undefined,
		})),
		timeExpressions: byTag["time-expression"],
		positionAdverbs: byTag.position,
		usefulExpressions: byTag.expression,
		commands: byTag.command,
		questionWords: byTag.question,
		likesConstruction: {
			singular: byTag["likes-singular"],
			plural: byTag["likes-plural"],
		},
		shopping: byTag.shopping,
		household: byTag.household,
		colors: byTag.color,
		numbers: byTag.number,
		transportation: {
			vehicles: byTag["transport-vehicle"],
			actions: byTag["transport-action"],
		},
		frequencyAdverbs: byTag.frequency,
		summerVocabulary: byTag.summer,
	};
}

export function meta() {
	return [
		{ title: "Vocabulary - Greek Word Reference" },
		{
			name: "description",
			content: "Essential Greek vocabulary organized by situational relevance",
		},
	];
}

const EssentialWords: React.FC<{ loaderData: Route.ComponentProps["loaderData"] }> = ({
	loaderData,
}) => {
	return (
		<div className="space-y-6">
			<Alert variant="success">
				<AlertTitle>Situationally Organized Vocabulary</AlertTitle>
				<AlertDescription>
					Essential Greek words organized by how often you'll use them in daily life.
				</AlertDescription>
			</Alert>

			<div className="border rounded-lg p-4">
				<h3 className="text-lg font-bold mb-3">Family & Relationships</h3>
				<div className="grid md:grid-cols-3 gap-2 text-sm">
					{loaderData.people.map((person) => (
						<div key={person.id}>
							<span className="font-mono">{person.greek}</span> - {person.english}
						</div>
					))}
				</div>
			</div>

			<div className="border rounded-lg p-4">
				<h3 className="text-lg font-bold mb-3">Telling Time - Τι ώρα είναι;</h3>
				<div className="bg-blue-50 p-3 rounded mb-3">
					<p className="text-sm text-blue-700">
						<strong>Pattern:</strong> Είναι + time / Η ώρα είναι + time
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-4">
					<div>
						<h5 className="font-semibold mb-2">Basic Time Structure</h5>
						<div className="space-y-1 text-sm">
							<div>
								<span className="font-mono">είναι μία</span> - it's one o'clock
							</div>
							<div>
								<span className="font-mono">είναι δύο</span> - it's two o'clock
							</div>
							<div>
								<span className="font-mono">είναι μία ακριβώς</span> - it's exactly one
							</div>
							<div>
								<span className="font-mono">τι ώρα είναι;</span> - what time is it?
							</div>
						</div>
					</div>
					<div>
						<h5 className="font-semibold mb-2">Minutes & Fractions</h5>
						<div className="space-y-1 text-sm">
							<div>
								<span className="font-mono">και τέταρτο</span> - quarter past
							</div>
							<div>
								<span className="font-mono">και μισή</span> - half past
							</div>
							<div>
								<span className="font-mono">παρά τέταρτο</span> - quarter to
							</div>
							<div>
								<span className="font-mono">παρά πέντε</span> - five to
							</div>
							<div>
								<span className="font-mono">και είκοσι πέντε</span> - twenty-five past
							</div>
						</div>
					</div>
				</div>
				<div className="bg-green-50 p-3 rounded mt-3">
					<p className="text-sm text-green-700">
						<strong>"At" times:</strong> στη μία (at one), στις τρεις (at three), στις τέσσερις (at four)
					</p>
				</div>
			</div>

			<div className="border rounded-lg p-4">
				<h3 className="text-lg font-bold mb-3">Times of Day</h3>
				<div className="grid md:grid-cols-5 gap-2 text-sm">
					{loaderData.timesOfDay.map((time) => (
						<div key={time.id} className="text-center">
							<div className="font-mono text-lg">{time.greek}</div>
							<div className="text-gray-600">{time.english}</div>
							<div className="text-xs">{time.timeRange}</div>
						</div>
					))}
				</div>
			</div>

			<div className="border rounded-lg p-4">
				<h3 className="text-lg font-bold mb-3">Time Expressions</h3>
				<div className="grid md:grid-cols-3 gap-2 text-sm">
					{loaderData.timeExpressions.map((expr) => (
						<div key={expr.id}>
							<span className="font-mono">{expr.greek}</span> - {expr.english}
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
					{loaderData.positionAdverbs.map((adverb) => (
						<div key={adverb.id}>
							<span className="font-mono">{adverb.greek}</span> - {adverb.english}
						</div>
					))}
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Useful Expressions</h4>
					<div className="space-y-1 text-sm">
						{loaderData.usefulExpressions.map((expr) => (
							<div key={expr.id}>
								<span className="font-mono">{expr.greek}</span> - {expr.english}
							</div>
						))}
					</div>
				</div>

				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Commands</h4>
					<div className="space-y-1 text-sm">
						{loaderData.commands.map((cmd) => (
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
					{loaderData.questionWords.map((q) => (
						<div key={q.id}>
							<span className="font-mono">{q.greek}</span> - {q.english}
						</div>
					))}
				</div>
			</div>

			<div className="border rounded-lg p-4">
				<h3 className="text-lg font-bold mb-3">
					Likes Construction - μου αρέσει/αρέσουν
				</h3>
				<div className="bg-blue-50 p-3 rounded mb-3">
					<p className="text-sm text-blue-700">
						<strong>Pattern:</strong> [Person] αρέσει (for one thing) / αρέσουν (for many things)
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-4">
					<div>
						<h5 className="font-semibold mb-2">Single thing (αρέσει)</h5>
						<div className="space-y-1 text-sm">
							{loaderData.likesConstruction.singular.map((like) => (
								<div key={like.id}>
									<span className="font-mono">{like.greek}</span> - {like.english}
								</div>
							))}
						</div>
					</div>
					<div>
						<h5 className="font-semibold mb-2">Multiple things (αρέσουν)</h5>
						<div className="space-y-1 text-sm">
							{loaderData.likesConstruction.plural.map((like) => (
								<div key={like.id}>
									<span className="font-mono">{like.greek}</span> - {like.english}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Shopping & Groceries</h4>
					<div className="space-y-1 text-sm">
						{loaderData.shopping.map((item) => (
							<div key={item.id}>
								<span className="font-mono">{item.greek}</span> - {item.english}
							</div>
						))}
					</div>
				</div>

				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Household & Home</h4>
					<div className="space-y-1 text-sm">
						{loaderData.household.map((item) => (
							<div key={item.id}>
								<span className="font-mono">{item.greek}</span> - {item.english}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-3 gap-4">
				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Colors</h4>
					<div className="space-y-1 text-sm">
						{loaderData.colors.map((color) => (
							<div key={color.id}>
								{color.greek} ({color.english})
							</div>
						))}
					</div>
				</div>

				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Numbers (1-10)</h4>
					<div className="space-y-1 text-sm">
						{loaderData.numbers.map((number) => (
							<div key={number.id}>
								{number.greek} ({number.english})
							</div>
						))}
					</div>
				</div>

				<div className="border rounded-lg p-4">
					<h4 className="font-bold mb-2">Transportation</h4>
					<div className="space-y-1 text-sm">
						{loaderData.transportation.vehicles.map((vehicle) => (
							<div key={vehicle.id}>
								<span className="font-mono">{vehicle.greek}</span> - {vehicle.english}
							</div>
						))}
					</div>
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
					{loaderData.frequencyAdverbs.map((adverb) => (
						<div key={adverb.id}>
							<span className="font-mono">{adverb.greek}</span> - {adverb.english}
						</div>
					))}
				</div>
			</div>

			<div className="border rounded-lg p-4">
				<h4 className="font-bold mb-2">Summer & Beach Vocabulary</h4>
				<div className="grid md:grid-cols-3 gap-2 text-sm">
					{loaderData.summerVocabulary.map((word) => (
						<div key={word.id}>
							<span className="font-mono">{word.greek}</span> - {word.english}
						</div>
					))}
				</div>
			</div>

			{loaderData.verbCategories.map((category) => (
				<div key={category.id} className="border rounded-lg p-4">
					<h3 className="text-lg font-bold mb-3">Verbs - {category.title}</h3>
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
		</div>
	);
};

export default function VocabularyRoute({
	loaderData,
}: Route.ComponentProps) {
	return <EssentialWords loaderData={loaderData} />;
}
