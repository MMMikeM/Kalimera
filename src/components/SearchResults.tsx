import { MonoText } from "@/components/MonoText";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SearchVocabItem } from "@/db.server/queries/vocabulary";

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
			<div className="text-center py-8 text-stone-500">
				No results for "{searchTerm}"
			</div>
		);
	}

	if (results.length === 0) {
		return (
			<div className="text-center py-8 text-stone-400">
				Start typing to search...
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{results.map((result) => {
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
						className={cn(
							"bg-stone-50 rounded-lg",
							borderClass,
							compact ? "p-3" : "p-4",
						)}
					>
						<div className="flex justify-between items-start gap-3">
							<div className="flex-1 min-w-0">
								<MonoText
									variant="greek"
									size={compact ? "md" : "lg"}
									className={cn(
										"font-medium block",
										compact ? "text-lg mb-0.5" : "text-2xl mb-1",
									)}
								>
									{result.greek}
								</MonoText>
								<p className={cn("text-stone-600", compact && "text-sm")}>
									{result.english}
								</p>
							</div>
							<div className="flex gap-1.5 flex-wrap justify-end flex-shrink-0">
								{result.type && (
									<Badge variant="default" size={compact ? "sm" : "md"}>
										{result.type}
									</Badge>
								)}
								{result.family && (
									<Badge variant="primary" size={compact ? "sm" : "md"}>
										{result.family}
									</Badge>
								)}
							</div>
						</div>
						{!compact && result.tags.length > 0 && (
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
