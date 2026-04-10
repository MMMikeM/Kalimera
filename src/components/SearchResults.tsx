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
				<SearchX size={24} className="mb-2 text-stone-300" />
				<p className="text-sm">No results for "{searchTerm}"</p>
				<p className="mt-1 text-xs text-stone-400">
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
						className="flex items-center gap-2 rounded px-1 py-2 transition-colors hover:bg-stone-50"
					>
						<MonoText
							variant="greek"
							size="sm"
							className="max-w-[180px] truncate font-medium"
						>
							{result.greek}
						</MonoText>
						<span className="text-stone-300">—</span>
						<span className="flex-1 truncate text-sm text-stone-600">
							{result.english}
						</span>
						<span className="shrink-0 text-xs text-stone-400">
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
					<div key={result.id} className={cn("rounded-lg p-4", bgClass)}>
						<div className="flex items-start justify-between gap-3">
							<div className="min-w-0 flex-1">
								<MonoText
									variant="greek"
									size="lg"
									className="mb-1 block text-2xl font-medium"
								>
									{result.greek}
								</MonoText>
								<p className="text-stone-600">{result.english}</p>
							</div>
							<div className="flex flex-shrink-0 flex-wrap justify-end gap-1.5">
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
							<div className="mt-2 flex flex-wrap gap-1">
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
