import type { Route } from "./+types/search";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { createFuzzySearch } from "@mmmike/mikrofuzz";
import { MonoText } from "@/components/MonoText";
import { SearchInput } from "@/components/SearchInput";
import { TabHero } from "@/components/TabHero";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	searchVocabulary,
	type SearchVocabItem,
} from "@/db/queries/vocabulary";

export async function loader() {
	try {
		const vocabulary = await searchVocabulary();
		return { vocabulary };
	} catch (error) {
		console.error("Database error:", error);
		return { vocabulary: [] as SearchVocabItem[] };
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

	// Create fuzzy search function - memoized to avoid recreating on every render
	const fuzzySearch = useMemo(
		() =>
			createFuzzySearch<SearchVocabItem>(allWords, {
				getText: (item) => {
					const word = item as SearchVocabItem;
					return [word.greek, word.english, ...word.tags];
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
				Search Greek or English words from your vocabulary. Find what you need
				fast — type in either language to find matches.
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
						// Word-type visual differentiation with colored left borders
						const borderClass = cn(
							"border-l-4",
							result.type === "verb" && "border-ocean-500",
							result.type === "noun" && "border-olive-500",
							result.type === "phrase" && "border-terracotta-500",
							result.type === "adverb" && "border-honey-500",
							!result.type && "border-stone-300",
						);

						return (
							<div
								key={result.id}
								className={cn("p-4 bg-stone-50 rounded-lg", borderClass)}
							>
								<div className="flex justify-between items-start gap-4">
									<div className="flex-1 min-w-0">
										{/* Greek text prominently displayed */}
										<MonoText
											variant="greek"
											size="lg"
											className="text-2xl font-medium block mb-1"
										>
											{result.greek}
										</MonoText>
										<p className="text-stone-600">{result.english}</p>
									</div>
									<div className="flex gap-2 flex-wrap justify-end flex-shrink-0">
										{result.type && (
											<Badge variant="default">{result.type}</Badge>
										)}
										{result.family && (
											<Badge variant="primary">{result.family}</Badge>
										)}
									</div>
								</div>
								{result.tags.length > 0 && (
									<div className="mt-3 flex gap-1 flex-wrap">
										{result.tags.map((tag) => (
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
				<div className="text-center py-8 text-stone-600">
					No results found for "{searchTerm}"
				</div>
			)}

			<div className="bg-stone-50 p-4 rounded-lg">
				<h4 className="font-bold mb-2">Search Tips</h4>
				<ul className="text-sm text-stone-700 space-y-1">
					<li>• Type in Greek or English to find matches</li>
					<li>• Fuzzy matching finds close matches even with typos</li>
					<li>• Results are ranked by relevance (best matches first)</li>
					<li>• Search by tag name (e.g., "Summer" or "Frequency")</li>
				</ul>
			</div>
		</div>
	);
}
