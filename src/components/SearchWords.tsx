import React, { useState } from "react";
import { ALL_WORDS } from "../constants/vocabulary";
import type { WordInfo } from "../types/greek-reference";
import { InfoBox, Badge, MonoText, SearchInput } from "./ui";

const SearchWords: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<WordInfo[]>([]);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
		if (term.length > 0) {
			const results = ALL_WORDS.filter(
				(word) =>
					word.greek.toLowerCase().includes(term.toLowerCase()) ||
					word.english.toLowerCase().includes(term.toLowerCase()),
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
				placeholder="Search Greek or English..."
				value={searchTerm}
				onChange={(e) => handleSearch(e.target.value)}
			/>

			{searchResults.length > 0 && (
				<div className="space-y-2">
					<h4 className="font-bold">Search Results:</h4>
					{searchResults.map((result) => (
						<div
							key={result.id}
							className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
						>
							<div>
								<MonoText variant="primary" size="lg">
									{result.greek}
								</MonoText>
								<span className="text-gray-700 ml-3">{result.english}</span>
							</div>
							<div className="flex gap-2">
								<Badge variant="default">{result.type}</Badge>
								{result.family && (
									<Badge variant="primary">{result.family}</Badge>
								)}
							</div>
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
				<h4 className="font-bold mb-2">💡 Search Tips</h4>
				<ul className="text-sm text-gray-700 space-y-1">
					<li>• Type in Greek or English to find matches</li>
					<li>
						• Search will find partial matches (e.g., "καλ" finds "καλημέρα")
					</li>
					<li>• Look for the verb family tags to know conjugation patterns</li>
				</ul>
			</div>
		</div>
	);
};

export default SearchWords;
