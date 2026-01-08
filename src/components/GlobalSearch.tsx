import { useState, useEffect, useRef, type ReactNode } from "react";
import { Search, Sparkles } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { SearchInput } from "@/components/SearchInput";
import { SearchResults } from "@/components/SearchResults";
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
			<PopoverTrigger asChild>
				<button
					type="button"
					className="outline-none outline-transparent ring-0 border-none shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
				>
					{children({ isActive: isOpen })}
				</button>
			</PopoverTrigger>
			<PopoverContent
				align="end"
				sideOffset={8}
				className="w-[min(420px,calc(100vw-1rem))] p-0 max-h-[70vh] flex flex-col overflow-hidden rounded-xl bg-cream shadow-lg border-stone-200"
			>
				<SearchContent />
			</PopoverContent>
		</Popover>
	);
};

const SearchContent = () => {
	const { searchTerm, setSearchTerm, results, isLoading } = useVocabularySearch(
		{ enabled: true },
	);
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
		<div className="flex flex-col h-full">
			<div className="p-3 bg-cream-100/50">
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
			<div className="flex-1 overflow-y-auto p-3 min-h-0 max-h-[50vh] bg-white">
				{isLoading ? (
					<div className="text-center py-8 text-stone-400 text-sm">
						Loading...
					</div>
				) : showEmptyState ? (
					<SearchEmptyState onQuickSearch={handleQuickSearch} />
				) : (
					<SearchResults
						results={results}
						searchTerm={searchTerm}
						compact
					/>
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
		<div className="flex items-center justify-center gap-2 text-stone-400 mb-4">
			<Sparkles size={16} className="text-honey-400" />
			<span className="text-sm">Try searching for</span>
		</div>
		<div className="grid grid-cols-2 gap-2">
			{QUICK_SEARCHES.map((item) => (
				<button
					key={item.greek}
					type="button"
					onClick={() => onQuickSearch(item.greek)}
					className="flex flex-col items-start p-3 rounded-lg bg-cream-50 hover:bg-cream-100 border border-stone-200 hover:border-terracotta-300 transition-colors text-left min-h-[52px]"
				>
					<span className="text-base font-medium text-stone-900 greek-text">
						{item.greek}
					</span>
					<span className="text-xs text-stone-500">{item.english}</span>
				</button>
			))}
		</div>
		<p className="text-center text-xs text-stone-400 mt-4">
			Search by Greek, English, or tags like "food" or "travel"
		</p>
	</div>
);
