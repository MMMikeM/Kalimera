import { Link } from "@tanstack/react-router";
import { BarChart3, ChevronDown, Info, LogOut } from "lucide-react";

import { SearchPanel } from "@/components/SearchPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ButtonLink } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPositioner,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_ITEMS_AUTH = [
	{ id: "practice", label: "Practice", path: "/practice", primary: true },
	{ id: "lessons", label: "Lessons", path: "/lessons" },
	{ id: "learn", label: "Learn", path: "/learn" },
	{ id: "guides", label: "Guides", path: "/guides" },
];

const NAV_ITEMS_UNAUTH = [
	{ id: "learn", label: "Learn", path: "/learn" },
	{ id: "guides", label: "Guides", path: "/guides" },
];

interface HeaderProps {
	isAuthenticated: boolean;
	showLessons: boolean;
	currentSection?: string;
	onLogout?: () => void;
}

export const Header = ({ isAuthenticated, showLessons, currentSection = "", onLogout }: HeaderProps) => {
	const navItems = isAuthenticated
		? NAV_ITEMS_AUTH.filter((item) => showLessons || item.id !== "lessons")
		: NAV_ITEMS_UNAUTH;

	return (
		<header className="pt-8 pb-6">
			<div className="flex items-center justify-between gap-4">
				<Link to="/" className="flex shrink-0 items-baseline">
					<span className="font-serif text-2xl text-terracotta">Kalimera</span>
				</Link>

				<div className="mx-4 hidden max-w-md flex-1 md:block">
					<SearchPanel variant="dropdown" />
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
					<ThemeToggle />
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
											<Link to="/progress" className="flex cursor-pointer items-center gap-2" />
										}
									>
										<BarChart3 size={16} strokeWidth={1.5} />
										Progress
									</DropdownMenuItem>
									<DropdownMenuItem
										render={
											<Link to="/support" className="flex cursor-pointer items-center gap-2" />
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
										Sign out
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
								Sign in
							</Link>
							{currentSection !== "try" && (
								<ButtonLink to="/try" size="sm">
									Try a drill
								</ButtonLink>
							)}
						</>
					)}
				</nav>
			</div>
		</header>
	);
};
