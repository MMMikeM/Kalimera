import type { Route } from "./+types/search";
import { useState } from "react";
import { sql } from "kysely";
import { db } from "../db";
import { Badge, InfoBox, MonoText, SearchInput } from "../components/ui";

interface VocabularyWithTags {
	id: number;
	greek: string;
	english: string;
	type: string | null;
	family: string | null;
	tags: string[];
}

// Loader to fetch vocabulary from database with tags
export async function loader(_args: Route.LoaderArgs) {
	try {
		// Fetch vocabulary with aggregated tags using a subquery
		const vocabulary = await db
			.selectFrom("vocabulary")
			.leftJoin("verb_details", "verb_details.vocab_id", "vocabulary.id")
			.select([
				"vocabulary.id",
				"vocabulary.greek_text as greek",
				"vocabulary.english_translation as english",
				"vocabulary.word_type as type",
				"verb_details.conjugation_family as family",
				// Subquery to get comma-separated tags
				sql<string>`(
					SELECT string_agg(t.name, ', ' ORDER BY t.display_order)
					FROM vocabulary_tags vt
					JOIN tags t ON t.id = vt.tag_id
					WHERE vt.vocabulary_id = vocabulary.id
				)`.as("tag_names"),
			])
			.where("vocabulary.status", "=", "processed")
			.execute();

		// Transform to include tags array
		const vocabularyWithTags: VocabularyWithTags[] = vocabulary.map((v) => ({
			id: v.id,
			greek: v.greek,
			english: v.english,
			type: v.type,
			family: v.family,
			tags: v.tag_names ? v.tag_names.split(", ") : [],
		}));

		return { vocabulary: vocabularyWithTags };
	} catch (error) {
		console.error("Database error:", error);
		// Fall back to empty array if database fails
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
