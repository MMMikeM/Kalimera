import { createFuzzySearch } from "@mmmike/mikrofuzz";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { MonoText } from "@/components/MonoText";
import { SearchInput } from "@/components/SearchInput";
import { TabHero } from "@/components/TabHero";
import { Badge } from "@/components/ui/badge";
import {
	fetchVocabularyRowsForSearch,
	type VocabularySearchGraphRow,
} from "@/db.server/queries/vocabulary-search";
import { cn } from "@/lib/utils";

import type { Route } from "./+types/search";

export async function loader() {
	try {
		const vocabulary = await fetchVocabularyRowsForSearch();
		return { vocabulary };
	} catch (error) {
		console.error("Database error:", error);
		return { vocabulary: [] as VocabularySearchGraphRow[] };
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
	const allWords = loaderData.vocabulary;

	const [searchTerm, setSearchTerm] = useState("");

	// Create fuzzy search function - memoized to avoid recreating on every render
	const fuzzySearch = useMemo(
		() =>
			createFuzzySearch(allWords, {
				getText: (item) => {
					const row = item as VocabularySearchGraphRow;
					return [
						row.greekText,
						row.englishTranslation,
						...row.vocabularyTags.flatMap((vt) => (vt.tag?.name ? [vt.tag.name] : [])),
					];
				},
			}),
		[allWords],
	);

	// Perform fuzzy search and extract items (already sorted by score)
	const searchResults = useMemo(() => {
		if (searchTerm.length === 0) return [];
		return fuzzySearch(searchTerm).map((result) => result.item);
	}, [fuzzySearch, searchTerm]);

	return (
		<div className="space-y-6">
			<TabHero
				title="Quick Lookup"
				greekPhrase="Ψάξε!"
				colorScheme="ocean"
				icon={<Search size={18} />}
			>
				Search Greek or English words from your vocabulary. Find what you need fast — type in either
				language to find matches.
			</TabHero>

			<SearchInput
				placeholder="Search Greek, English, or tags..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onClear={() => setSearchTerm("")}
				autoFocus
			/>

			{searchResults.length > 0 && (
				<div className="space-y-2">
					<h4 className="font-bold" aria-live="polite">
						Search Results ({searchResults.length}):
					</h4>
					{searchResults.map((result) => {
						const tagNames = result.vocabularyTags
							.map((vt) => vt.tag?.name)
							.filter(Boolean) as string[];
						const family = result.verbDetails?.conjugationFamily;
						// Word-type visual differentiation with coloured left borders
						const borderClass = cn(
							"border-l-4",
							result.wordType === "verb" && "border-ocean-500",
							result.wordType === "noun" && "border-olive-500",
							result.wordType === "phrase" && "border-terracotta-500",
							result.wordType === "adverb" && "border-honey-500",
							!result.wordType && "border-stone-300",
						);

						return (
							<div key={result.id} className={cn("p-4 bg-stone-50 rounded-lg", borderClass)}>
								<div className="flex items-start justify-between gap-4">
									<div className="min-w-0 flex-1">
										{/* Greek text prominently displayed */}
										<MonoText variant="greek" size="lg" className="mb-1 block text-2xl font-medium">
											{result.greekText}
										</MonoText>
										<p className="text-stone-600">{result.englishTranslation}</p>
									</div>
									<div className="flex flex-shrink-0 flex-wrap justify-end gap-2">
										{result.wordType && <Badge variant="default">{result.wordType}</Badge>}
										{family && <Badge variant="primary">{family}</Badge>}
									</div>
								</div>
								{tagNames.length > 0 && (
									<div className="mt-3 flex flex-wrap gap-1">
										{tagNames.map((tag) => (
											<Badge key={tag} variant="secondary" size="sm">
												{tag}
											</Badge>
										))}
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}

			{searchTerm && searchResults.length === 0 && (
				<div className="py-8 text-center text-stone-600">No results found for "{searchTerm}"</div>
			)}

			<div className="rounded-lg bg-stone-50 p-4">
				<h4 className="mb-2 font-bold">Search Tips</h4>
				<ul className="space-y-1 text-sm text-stone-700">
					<li>• Type in Greek or English to find matches</li>
					<li>• Fuzzy matching finds close matches even with typos</li>
					<li>• Results are ranked by relevance (best matches first)</li>
					<li>• Search by tag name (e.g., "Summer" or "Frequency")</li>
				</ul>
			</div>
		</div>
	);
}
