import { BarChart3, ChevronDown, Info, LogOut, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { SearchResults } from "@/components/SearchResults";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPositioner,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
				<Link to="/" className="flex shrink-0 items-baseline">
					<span className="font-serif text-2xl text-terracotta">Kalimera</span>
				</Link>

				{/* Desktop search - Gmail style centered */}
				<div className="mx-4 hidden max-w-md flex-1 md:block">
					<div className="relative">
						<Search
							className="absolute top-1/2 left-3 -translate-y-1/2 text-stone-400"
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
							className="w-full rounded-full border border-transparent bg-stone-100 py-2 pr-4 pl-10 text-sm transition-all placeholder:text-stone-500 focus:border-stone-300 focus:bg-white focus:ring-2 focus:ring-terracotta-300 focus:outline-none"
						/>
						{isSearchOpen && searchTerm.length > 0 && (
							<div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-[60vh] overflow-hidden rounded-md border bg-popover p-0 text-popover-foreground shadow-md">
								<div className="max-h-[60vh] overflow-y-auto p-3">
									{isLoading ? (
										<div className="py-4 text-center text-sm text-stone-400">
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
							</div>
						)}
					</div>
				</div>

				{/* Desktop navigation */}
				<nav className="hidden shrink-0 items-center gap-1 md:flex">
					{navItems.map((item) => {
						const isActive = currentSection === item.id;
						const isPrimary = "primary" in item && item.primary;

						return (
							<Link
								key={item.id}
								to={item.path}
								className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
									isActive
										? "bg-stone-800 text-cream"
										: isPrimary
											? "text-terracotta hover:bg-terracotta/10 hover:text-terracotta-dark"
											: "text-stone-600 hover:bg-stone-100 hover:text-stone-800"
								}`}
							>
								{item.label}
							</Link>
						);
					})}
					{isAuthenticated ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
								Account
								<ChevronDown size={16} strokeWidth={1.5} />
							</DropdownMenuTrigger>
							<DropdownMenuPositioner align="end">
								<DropdownMenuContent className="w-48">
									<DropdownMenuItem
										render={
											<Link
												to="/progress"
												className="flex cursor-pointer items-center gap-2"
											/>
										}
									>
										<BarChart3 size={16} strokeWidth={1.5} />
										Progress
									</DropdownMenuItem>
									<DropdownMenuItem
										render={
											<Link
												to="/support"
												className="flex cursor-pointer items-center gap-2"
											/>
										}
									>
										<Info size={16} strokeWidth={1.5} />
										About
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={onLogout}
										className="flex cursor-pointer items-center gap-2"
									>
										<LogOut size={16} strokeWidth={1.5} />
										Sign Out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenuPositioner>
						</DropdownMenu>
					) : (
						<>
							<Link
								to="/login"
								className="px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-800"
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
