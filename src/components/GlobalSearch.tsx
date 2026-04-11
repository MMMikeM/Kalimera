import { Search, Sparkles } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { SearchInput } from "@/components/SearchInput";
import { SearchResults } from "@/components/SearchResults";
import {
	Popover,
	PopoverContent,
	PopoverPositioner,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useVocabularySearch } from "@/lib/use-vocabulary-search";

const QUICK_SEARCHES = [
	{ greek: "θελω", english: "I want" },
	{ greek: "ειμαι", english: "I am" },
	{ greek: "εχω", english: "I have" },
	{ greek: "μου", english: "my/me" },
] as const;

interface GlobalSearchProps {
	/** Render prop for custom trigger - receives isActive state */
	children: (props: { isActive: boolean }) => ReactNode;
}

export const GlobalSearch = ({ children }: GlobalSearchProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger
				render={
					<button
						type="button"
						className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-terracotta-300"
					/>
				}
			>
				{children({ isActive: isOpen })}
			</PopoverTrigger>
			<PopoverPositioner align="end" sideOffset={8}>
				<PopoverContent className="flex max-h-[70vh] w-[min(420px,calc(100vw-1rem))] flex-col overflow-hidden rounded-xl border-stone-200 bg-cream p-0 shadow-lg">
					<SearchContent />
				</PopoverContent>
			</PopoverPositioner>
		</Popover>
	);
};

const SearchContent = () => {
	const { searchTerm, setSearchTerm, results, isLoading } = useVocabularySearch({ enabled: true });
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const timer = setTimeout(() => inputRef.current?.focus(), 50);
		return () => clearTimeout(timer);
	}, []);

	const handleQuickSearch = (term: string) => {
		setSearchTerm(term);
		inputRef.current?.focus();
	};

	const showEmptyState = !searchTerm && results.length === 0;

	return (
		<div className="flex h-full flex-col">
			<div className="bg-cream-100/50 p-3">
				<SearchInput
					ref={inputRef}
					placeholder="Search Greek, English, or tags..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onClear={() => setSearchTerm("")}
					size="sm"
					icon={<Search size={16} />}
				/>
			</div>
			<div className="max-h-[50vh] min-h-0 flex-1 overflow-y-auto bg-cream-dark p-3">
				{isLoading ? (
					<div className="py-8 text-center text-sm text-stone-400">Loading...</div>
				) : showEmptyState ? (
					<SearchEmptyState onQuickSearch={handleQuickSearch} />
				) : (
					<SearchResults results={results} searchTerm={searchTerm} compact />
				)}
			</div>
		</div>
	);
};

interface SearchEmptyStateProps {
	onQuickSearch: (term: string) => void;
}

const SearchEmptyState = ({ onQuickSearch }: SearchEmptyStateProps) => (
	<div className="py-4">
		<div className="mb-4 flex items-center justify-center gap-2 text-stone-400">
			<Sparkles size={16} className="text-honey-400" />
			<span className="text-sm">Try searching for</span>
		</div>
		<div className="grid grid-cols-2 gap-2">
			{QUICK_SEARCHES.map((item) => (
				<button
					key={item.greek}
					type="button"
					onClick={() => onQuickSearch(item.greek)}
					className="flex min-h-[52px] flex-col items-start rounded-lg border border-stone-200 bg-cream-50 p-3 text-left transition-colors hover:border-terracotta-300 hover:bg-cream-100"
				>
					<span className="greek-text text-base font-medium text-stone-900">{item.greek}</span>
					<span className="text-xs text-stone-500">{item.english}</span>
				</button>
			))}
		</div>
		<p className="mt-4 text-center text-xs text-stone-400">
			Search by Greek, English, or tags like "food" or "travel"
		</p>
	</div>
);
