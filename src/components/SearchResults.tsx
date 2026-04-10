import { SearchX } from "lucide-react";
import { MonoText } from "@/components/MonoText";
import type { SearchVocabItem } from "@/db.server/queries/vocabulary";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface SearchResultsProps {
	results: SearchVocabItem[];
	searchTerm: string;
	compact?: boolean;
}

export const SearchResults = ({
	results,
	searchTerm,
	compact = false,
}: SearchResultsProps) => {
	if (searchTerm && results.length === 0) {
		return (
			<div className="flex flex-col items-center py-8 text-stone-500">
				<SearchX size={24} className="text-stone-300 mb-2" />
				<p className="text-sm">No results for "{searchTerm}"</p>
				<p className="text-xs text-stone-400 mt-1">
					Try a different spelling or search term
				</p>
			</div>
		);
	}

	if (results.length === 0) {
		return null;
	}

	if (compact) {
		return (
			<div className="divide-y divide-stone-100">
				{results.map((result) => (
					<div
						key={result.id}
						className="py-2 px-1 flex items-center gap-2 hover:bg-stone-50 rounded transition-colors"
					>
						<MonoText
							variant="greek"
							size="sm"
							className="font-medium truncate max-w-[180px]"
						>
							{result.greek}
						</MonoText>
						<span className="text-stone-300">—</span>
						<span className="text-sm text-stone-600 flex-1 truncate">
							{result.english}
						</span>
						<span className="text-xs text-stone-400 shrink-0">
							{result.type}
						</span>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{results.map((result) => {
				const bgClass = cn(
					result.type === "verb" && "bg-ocean-50",
					result.type === "noun" && "bg-olive-50",
					result.type === "phrase" && "bg-terracotta-50",
					result.type === "adverb" && "bg-honey-50",
					!result.type && "bg-stone-50",
				);

				return (
					<div
						key={result.id}
						className={cn("rounded-lg p-4", bgClass)}
					>
						<div className="flex justify-between items-start gap-3">
							<div className="flex-1 min-w-0">
								<MonoText
									variant="greek"
									size="lg"
									className="font-medium block text-2xl mb-1"
								>
									{result.greek}
								</MonoText>
								<p className="text-stone-600">{result.english}</p>
							</div>
							<div className="flex gap-1.5 flex-wrap justify-end flex-shrink-0">
								{result.type && (
									<Badge variant="default" size="md">
										{result.type}
									</Badge>
								)}
								{result.family && (
									<Badge variant="primary" size="md">
										{result.family}
									</Badge>
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
				);
			})}
		</div>
	);
};
