import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	NavLink,
	Link,
} from "react-router";
import {
	BookOpen,
	FileText,
	Lightbulb,
	Search,
	MessageCircle,
	Home,
	Quote,
} from "lucide-react";
import "./index.css";
import type { LinksFunction } from "react-router";

export const links: LinksFunction = () => [
	{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
	{ rel: "manifest", href: "/manifest.json" },
	{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

const NAV_ITEMS = [
	{ id: "home", label: "Home", path: "/", icon: Home },
	{ id: "practice", label: "Practice", path: "/practice", icon: Lightbulb },
	{
		id: "conversations",
		label: "Conversations",
		path: "/conversations",
		icon: MessageCircle,
	},
	{
		id: "quick-reference",
		label: "Reference",
		path: "/quick-reference",
		icon: FileText,
	},
	{
		id: "vocabulary",
		label: "Vocabulary",
		path: "/vocabulary",
		icon: BookOpen,
	},
	{
		id: "phrases",
		label: "Phrases",
		path: "/phrases",
		icon: Quote,
	},
	{ id: "search", label: "Search", path: "/search", icon: Search },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#4A7C8F" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="καλημέρα" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
					rel="stylesheet"
				/>
				<Meta />
				<Links />
			</head>
			<body className="font-sans text-stone-800 antialiased">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function Root() {
	return (
		<div className="min-h-screen bg-cream">
			<div className="relative max-w-6xl mx-auto px-6 md:px-8">
				{/* Header */}
				<header className="pt-8 pb-6">
					<div className="flex items-center justify-between">
						<Link to="/" className="group flex items-baseline gap-3">
							<span className="text-2xl font-serif text-terracotta">
								καλημέρα
							</span>
							<span className="text-sm text-stone-600 hidden sm:inline group-hover:text-stone-700 transition-colors">
								Greek Learning
							</span>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex items-center gap-1">
							{NAV_ITEMS.slice(1).map((item) => (
								<NavLink
									key={item.id}
									to={item.path}
									className={({ isActive }) =>
										`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
											isActive
												? "bg-stone-800 text-cream"
												: "text-stone-600 hover:text-stone-800 hover:bg-stone-100"
										}`
									}
								>
									{item.label}
								</NavLink>
							))}
						</nav>
					</div>
				</header>

				{/* Mobile Navigation - fixed bottom */}
				<nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-t border-stone-200 px-2 py-2 safe-area-pb">
					<div className="flex justify-around items-center">
						{NAV_ITEMS.map((item) => {
							const Icon = item.icon;
							return (
								<NavLink
									key={item.id}
									to={item.path}
									end={item.path === "/"}
									className={({ isActive }) =>
										`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
											isActive ? "text-terracotta" : "text-stone-600"
										}`
									}
								>
									<Icon size={20} strokeWidth={1.5} />
									<span className="text-[10px] font-medium">{item.label}</span>
								</NavLink>
							);
						})}
					</div>
				</nav>

				{/* Main Content */}
				<main className="pb-24 md:pb-12">
					<Outlet />
				</main>

				{/* Footer - desktop only */}
				<footer className="hidden md:block py-12 border-t border-stone-200 mt-12">
					<div className="flex items-center justify-between text-sm text-stone-600">
						<p>
							Patterns over memorization. Once you see the structure, the
							language clicks.
						</p>
						<p className="font-serif text-terracotta-text">Ελληνικά</p>
					</div>
				</footer>
			</div>
		</div>
	);
}
