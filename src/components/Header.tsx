import { BarChart3, ChevronDown, Info, LogOut, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { SearchResults } from "@/components/SearchResults";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
} from "@/components/ui/popover";
import { useVocabularySearch } from "@/lib/use-vocabulary-search";

const NAV_ITEMS_AUTH = [
	{ id: "practice", label: "Practice", path: "/practice/speed", primary: true },
	{ id: "learn", label: "Learn", path: "/learn" },
	{ id: "reference", label: "Reference", path: "/reference" },
];

const NAV_ITEMS_UNAUTH = [
	{ id: "learn", label: "Learn", path: "/learn" },
	{ id: "reference", label: "Reference", path: "/reference" },
];

interface HeaderProps {
	isAuthenticated: boolean;
	currentSection?: string;
	onLogout?: () => void;
}

export const Header = ({
	isAuthenticated,
	currentSection = "",
	onLogout,
}: HeaderProps) => {
	const navItems = isAuthenticated ? NAV_ITEMS_AUTH : NAV_ITEMS_UNAUTH;
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const { searchTerm, setSearchTerm, results, isLoading } = useVocabularySearch(
		{
			enabled: isSearchOpen,
		},
	);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isSearchOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isSearchOpen]);

	const handleSearchFocus = () => {
		setIsSearchOpen(true);
	};

	const handleSearchBlur = () => {
		setTimeout(() => setIsSearchOpen(false), 150);
	};

	return (
		<header className="pt-8 pb-6">
			<div className="flex items-center justify-between gap-4">
				<Link to="/" className="flex items-baseline shrink-0">
					<span className="text-2xl font-serif text-terracotta">Kalimera</span>
				</Link>

				{/* Desktop search - Gmail style centered */}
				<div className="hidden md:block flex-1 max-w-md mx-4">
					<Popover open={isSearchOpen && searchTerm.length > 0}>
						<PopoverAnchor asChild>
							<div className="relative">
								<Search
									className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
									size={18}
								/>
								<input
									ref={inputRef}
									type="text"
									placeholder="Search Greek, English, or tags..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									onFocus={handleSearchFocus}
									onBlur={handleSearchBlur}
									className="w-full pl-10 pr-4 py-2 text-sm bg-stone-100 border border-transparent rounded-full focus:outline-none focus:bg-white focus:border-stone-300 focus:ring-2 focus:ring-terracotta-300 transition-all placeholder:text-stone-500"
								/>
							</div>
						</PopoverAnchor>
						<PopoverContent
							align="start"
							sideOffset={8}
							className="w-[var(--radix-popover-trigger-width)] p-0 max-h-[60vh] overflow-hidden"
							onOpenAutoFocus={(e) => e.preventDefault()}
						>
							<div className="p-3 overflow-y-auto max-h-[60vh]">
								{isLoading ? (
									<div className="text-center py-4 text-stone-400 text-sm">
										Loading...
									</div>
								) : (
									<SearchResults
										results={results}
										searchTerm={searchTerm}
										compact
									/>
								)}
							</div>
						</PopoverContent>
					</Popover>
				</div>

				{/* Desktop navigation */}
				<nav className="hidden md:flex items-center gap-1 shrink-0">
					{navItems.map((item) => {
						const isActive = currentSection === item.id;
						const isPrimary = "primary" in item && item.primary;

						return (
							<Link
								key={item.id}
								to={item.path}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
									isActive
										? "bg-stone-800 text-cream"
										: isPrimary
											? "text-terracotta hover:text-terracotta-dark hover:bg-terracotta/10"
											: "text-stone-600 hover:text-stone-800 hover:bg-stone-100"
								}`}
							>
								{item.label}
							</Link>
						);
					})}
					{isAuthenticated ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm text-stone-600 hover:text-stone-800 transition-colors rounded-lg hover:bg-stone-100">
								Account
								<ChevronDown size={16} strokeWidth={1.5} />
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<DropdownMenuItem asChild>
									<Link
										to="/progress"
										className="flex items-center gap-2 cursor-pointer"
									>
										<BarChart3 size={16} strokeWidth={1.5} />
										Progress
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										to="/support"
										className="flex items-center gap-2 cursor-pointer"
									>
										<Info size={16} strokeWidth={1.5} />
										About
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={onLogout}
									className="flex items-center gap-2 cursor-pointer"
								>
									<LogOut size={16} strokeWidth={1.5} />
									Sign Out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<>
							<Link
								to="/login"
								className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
							>
								Sign In
							</Link>
							<Link to="/try">
								<Button variant="primary" size="sm">
									Try a Drill
								</Button>
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};
