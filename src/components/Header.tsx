import { Link } from "react-router";
import { BarChart3, ChevronDown, Info, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalSearch } from "@/components/GlobalSearch";

const NAV_ITEMS_AUTH = [
	{ id: "practice", label: "Practice", path: "/practice/speed", primary: true },
	{ id: "learn", label: "Learn", path: "/learn/conversations/arriving" },
	{ id: "reference", label: "Reference", path: "/reference/cases-pronouns" },
	{ id: "search", label: "Search", path: "/search" },
];

const NAV_ITEMS_UNAUTH = [
	{ id: "learn", label: "Learn", path: "/learn/conversations/arriving" },
	{ id: "reference", label: "Reference", path: "/reference/cases-pronouns" },
	{ id: "search", label: "Search", path: "/search" },
];

interface HeaderProps {
	isAuthenticated: boolean;
	currentSection?: string;
	onLogout?: () => void;
}

export const Header = ({ isAuthenticated, currentSection = "", onLogout }: HeaderProps) => {
	const navItems = isAuthenticated ? NAV_ITEMS_AUTH : NAV_ITEMS_UNAUTH;

	return (
		<header className="pt-8 pb-6">
			<div className="flex items-center justify-between">
				<Link to="/" className="flex items-baseline">
					<span className="text-2xl font-serif text-terracotta">Ellinika</span>
				</Link>

				{/* Desktop navigation */}
				<nav className="hidden md:flex items-center gap-1">
					{navItems.map((item) => {
						const isActive = currentSection === item.id;
						const isPrimary = "primary" in item && item.primary;

						// Search gets special treatment - opens popover instead of navigating
						if (item.id === "search") {
							return (
								<GlobalSearch key={item.id}>
									{({ isActive: isSearchActive }) => (
										<span
											className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
												isSearchActive
													? "bg-stone-800 text-cream"
													: "text-stone-600 hover:text-stone-800 hover:bg-stone-100"
											}`}
										>
											{item.label}
										</span>
									)}
								</GlobalSearch>
							);
						}

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
									<Link to="/progress" className="flex items-center gap-2 cursor-pointer">
										<BarChart3 size={16} strokeWidth={1.5} />
										Progress
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link to="/support" className="flex items-center gap-2 cursor-pointer">
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
