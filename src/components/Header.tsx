import { Link } from "react-router";
import { BookOpen, FileText, Home, LogIn, LogOut, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
	{ id: "home", label: "Home", path: "/", icon: Home, authOnly: true },
	{ id: "practice", label: "Practice", path: "/practice/speed", icon: Zap, authOnly: true },
	{ id: "learn", label: "Learn", path: "/learn/conversations/arriving", icon: BookOpen },
	{ id: "reference", label: "Reference", path: "/reference/cases-pronouns", icon: FileText },
];

interface HeaderProps {
	isAuthenticated: boolean;
	currentSection?: string;
	onLogout?: () => void;
}

export const Header = ({ isAuthenticated, currentSection = "", onLogout }: HeaderProps) => {
	const visibleNavItems = NAV_ITEMS.filter((item) => !item.authOnly || isAuthenticated);

	return (
		<header className="pt-8 pb-6">
			<div className="flex items-center justify-between">
				<Link to="/" className="group flex items-baseline gap-3">
					<span className="text-2xl font-serif text-terracotta">Ellinika</span>
					<span className="text-sm text-stone-600 hidden sm:inline group-hover:text-stone-700 transition-colors">
						Greek Learning
					</span>
				</Link>

				{/* Mobile nav icons */}
				<div className="flex items-center gap-2 md:hidden">
					{visibleNavItems
						.filter((item) => item.id !== "home")
						.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.id}
									to={item.path}
									className="p-2 text-stone-500 hover:text-stone-700 transition-colors"
									aria-label={item.label}
								>
									<Icon size={20} strokeWidth={1.5} />
								</Link>
							);
						})}
					<Link
						to="/search"
						className="p-2 text-stone-500 hover:text-stone-700 transition-colors"
						aria-label="Search"
					>
						<Search size={20} strokeWidth={1.5} />
					</Link>
					{isAuthenticated ? (
						<button
							type="button"
							onClick={onLogout}
							className="p-2 text-stone-500 hover:text-stone-700 transition-colors"
							aria-label="Logout"
						>
							<LogOut size={20} strokeWidth={1.5} />
						</button>
					) : (
						<Link
							to="/login"
							className="p-2 text-stone-500 hover:text-stone-700 transition-colors"
							aria-label="Sign in"
						>
							<LogIn size={20} strokeWidth={1.5} />
						</Link>
					)}
				</div>

				{/* Desktop navigation */}
				<nav className="hidden md:flex items-center gap-1">
					{visibleNavItems.map((item) => {
						const isActive = currentSection === item.id;
						return (
							<Link
								key={item.id}
								to={item.path}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
									isActive
										? "bg-stone-800 text-cream"
										: "text-stone-600 hover:text-stone-800 hover:bg-stone-100"
								}`}
							>
								{item.label}
							</Link>
						);
					})}
					<Link
						to="/search"
						className="p-2 text-stone-500 hover:text-stone-700 transition-colors ml-2"
						aria-label="Search"
					>
						<Search size={18} strokeWidth={1.5} />
					</Link>
					{isAuthenticated ? (
						<button
							type="button"
							onClick={onLogout}
							className="p-2 text-stone-500 hover:text-stone-700 transition-colors"
							aria-label="Logout"
						>
							<LogOut size={18} strokeWidth={1.5} />
						</button>
					) : (
						<>
							<Link
								to="/login"
								className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
							>
								Sign In
							</Link>
							<Link to="/register">
								<Button variant="primary" size="sm">
									Start Learning
								</Button>
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};
