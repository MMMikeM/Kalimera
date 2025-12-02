import type { Route } from "./+types/search";
import { useState } from "react";
import { sql, eq } from "drizzle-orm";
import { vocabulary, verbDetails } from "../db/schema";
import { Badge, InfoBox, MonoText, SearchInput } from "../components/ui";

interface VocabularyWithTags {
	id: number;
	greek: string;
	english: string;
	type: string | null;
	family: string | null;
	tags: string[];
}

export async function loader({ context }: Route.LoaderArgs) {
	// Use context.db in production, fallback to direct import for dev
	const db = context?.db ?? (await import("../db")).db;
	try {
		const vocabularyData = await db
			.select({
				id: vocabulary.id,
				greek: vocabulary.greekText,
				english: vocabulary.englishTranslation,
				type: vocabulary.wordType,
				family: verbDetails.conjugationFamily,
				tagNames: sql<string>`(
					SELECT group_concat(t.name, ', ')
					FROM vocabulary_tags vt
					JOIN tags t ON t.id = vt.tag_id
					WHERE vt.vocabulary_id = ${vocabulary.id}
				)`,
			})
			.from(vocabulary)
			.leftJoin(verbDetails, eq(verbDetails.vocabId, vocabulary.id))
			.where(eq(vocabulary.status, "processed"));

		const vocabularyWithTags: VocabularyWithTags[] = vocabularyData.map((v) => ({
			id: v.id,
			greek: v.greek,
			english: v.english,
			type: v.type,
			family: v.family,
			tags: v.tagNames ? v.tagNames.split(", ") : [],
		}));

		return { vocabulary: vocabularyWithTags };
	} catch (error) {
		console.error("Database error:", error);
		return { vocabulary: [] as VocabularyWithTags[] };
	}
}

export function meta() {
	return [
		{ title: "Quick Search - Greek Conjugation Reference" },
		{
			name: "description",
			content: "Search Greek vocabulary and grammar patterns",
		},
	];
}

export default function SearchRoute({ loaderData }: Route.ComponentProps) {
	const allWords = loaderData?.vocabulary ?? [];

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<typeof allWords>([]);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
		if (term.length > 0) {
			const lowerTerm = term.toLowerCase();
			const results = allWords.filter(
				(word) =>
					word.greek.toLowerCase().includes(lowerTerm) ||
					word.english.toLowerCase().includes(lowerTerm) ||
					word.tags.some((tag) => tag.toLowerCase().includes(lowerTerm))
			);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	};

	return (
		<div className="space-y-6">
			<InfoBox variant="purple" title="Quick Lookup">
				Search Greek or English words from your materials.
			</InfoBox>

			<SearchInput
				placeholder="Search Greek, English, or tags..."
				value={searchTerm}
				onChange={(e) => handleSearch(e.target.value)}
				onClear={() => handleSearch("")}
				autoFocus
			/>

			{searchResults.length > 0 && (
				<div className="space-y-2">
					<h4 className="font-bold">
						Search Results ({searchResults.length}):
					</h4>
					{searchResults.map((result) => (
						<div
							key={result.id}
							className="p-3 bg-gray-50 rounded-lg"
						>
							<div className="flex justify-between items-start">
								<div>
									<MonoText variant="primary" size="lg">
										{result.greek}
									</MonoText>
									<span className="text-gray-700 ml-3">{result.english}</span>
								</div>
								<div className="flex gap-2 flex-wrap justify-end">
									{result.type && (
										<Badge variant="default">{result.type}</Badge>
									)}
									{result.family && (
										<Badge variant="primary">{result.family}</Badge>
									)}
								</div>
							</div>
							{result.tags.length > 0 && (
								<div className="mt-2 flex gap-1 flex-wrap">
									{result.tags.map((tag) => (
										<Badge key={tag} variant="secondary" size="sm">
											{tag}
										</Badge>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			)}

			{searchTerm && searchResults.length === 0 && (
				<div className="text-center py-8 text-gray-500">
					No results found for "{searchTerm}"
				</div>
			)}

			<div className="bg-gray-50 p-4 rounded-lg">
				<h4 className="font-bold mb-2">Search Tips</h4>
				<ul className="text-sm text-gray-700 space-y-1">
					<li>• Type in Greek or English to find matches</li>
					<li>
						• Search will find partial matches (e.g., "καλ" finds "καλημέρα")
					</li>
					<li>• Search by tag name (e.g., "Summer" or "Frequency")</li>
					<li>• Look for the verb family tags to know conjugation patterns</li>
				</ul>
			</div>
		</div>
	);
}
