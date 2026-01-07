import { useState, useEffect, useRef, type ReactNode } from "react";
import { Search } from "lucide-react";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { SearchInput } from "@/components/SearchInput";
import { SearchResults } from "@/components/SearchResults";
import { useVocabularySearch } from "@/lib/use-vocabulary-search";

interface GlobalSearchProps {
	/** Render prop for custom trigger - receives isActive state */
	children: (props: { isActive: boolean }) => ReactNode;
}

/**
 * Global search component that adapts to viewport:
 * - Mobile: Bottom drawer
 * - Desktop: Popover anchored to trigger
 */
export const GlobalSearch = ({ children }: GlobalSearchProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	if (isMobile) {
		return (
			<MobileSearch isOpen={isOpen} setIsOpen={setIsOpen}>
				{children}
			</MobileSearch>
		);
	}

	return (
		<DesktopSearch isOpen={isOpen} setIsOpen={setIsOpen}>
			{children}
		</DesktopSearch>
	);
};

interface SearchVariantProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	children: (props: { isActive: boolean }) => ReactNode;
}

const MobileSearch = ({ isOpen, setIsOpen, children }: SearchVariantProps) => {
	return (
		<>
			<button type="button" onClick={() => setIsOpen(true)}>
				{children({ isActive: isOpen })}
			</button>
			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerContent className="max-h-[85vh]">
					<DrawerHeader className="sr-only">
						<DrawerTitle>Search vocabulary</DrawerTitle>
					</DrawerHeader>
					<SearchContent compact />
				</DrawerContent>
			</Drawer>
		</>
	);
};

const DesktopSearch = ({ isOpen, setIsOpen, children }: SearchVariantProps) => {
	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<button type="button">{children({ isActive: isOpen })}</button>
			</PopoverTrigger>
			<PopoverContent
				align="end"
				sideOffset={8}
				className="w-[420px] p-0 max-h-[70vh] flex flex-col overflow-hidden"
			>
				<SearchContent />
			</PopoverContent>
		</Popover>
	);
};

interface SearchContentProps {
	compact?: boolean;
}

const SearchContent = ({ compact = false }: SearchContentProps) => {
	const { searchTerm, setSearchTerm, results, isLoading } = useVocabularySearch(
		{ enabled: true },
	);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// Focus input when content mounts
		const timer = setTimeout(() => inputRef.current?.focus(), 50);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="flex flex-col h-full">
			<div className="p-3 border-b border-stone-200">
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
			<div className="flex-1 overflow-y-auto p-3 min-h-0 max-h-[50vh]">
				{isLoading ? (
					<div className="text-center py-8 text-stone-400 text-sm">
						Loading...
					</div>
				) : (
					<SearchResults
						results={results}
						searchTerm={searchTerm}
						compact={compact}
					/>
				)}
			</div>
		</div>
	);
};
