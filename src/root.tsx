import { useState, useEffect } from "react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	Link,
	useLocation,
	useNavigate,
} from "react-router";
import { BookOpen, FileText, Home, LogIn, Zap } from "lucide-react";
import { Header } from "@/components/Header";
import { LandingPage } from "@/components/LandingPage";
import "./index.css";
import type { LinksFunction } from "react-router";

const AUTH_STORAGE_KEY = "greek-authenticated-user";

export const links: LinksFunction = () => [
	{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
	{ rel: "manifest", href: "/manifest.json" },
	{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

const NAV_ITEMS = [
	{ id: "home", label: "Home", path: "/", icon: Home },
	{ id: "practice", label: "Practice", path: "/practice/speed", icon: Zap },
	{ id: "learn", label: "Learn", path: "/learn/conversations/arriving", icon: BookOpen },
	{ id: "reference", label: "Reference", path: "/reference/cases-pronouns", icon: FileText },
];

const PUBLIC_ROUTES = ["/reference", "/learn", "/search", "/support", "/try"];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<meta name="theme-color" content="#4A7C8F" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
	const location = useLocation();
	const navigate = useNavigate();
	const currentSection = location.pathname.split("/")[1] || "home";
	const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
	const isPublicRoute = PUBLIC_ROUTES.some((route) => location.pathname.startsWith(route));

	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem(AUTH_STORAGE_KEY);
		let isValid = false;

		if (stored) {
			try {
				const parsed = JSON.parse(stored) as { userId?: number; username?: string };
				isValid = typeof parsed.userId === "number" && !!parsed.username;
			} catch {
				localStorage.removeItem(AUTH_STORAGE_KEY);
			}
		}

		setIsAuthenticated(isValid);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem(AUTH_STORAGE_KEY);
		setIsAuthenticated(false);
		navigate("/login");
	};

	// Don't render full layout for auth pages
	if (isAuthPage) {
		return (
			<div className="app-shell bg-cream">
				<main className="app-main">
					<div className="max-w-6xl mx-auto px-6 md:px-8">
						<header className="pt-8 pb-6">
							<div className="flex items-center justify-center">
								<span className="text-2xl font-serif text-terracotta">
									καλημέρα
								</span>
							</div>
						</header>
						<Outlet />
					</div>
				</main>
			</div>
		);
	}

	// Show nothing while checking auth (prevents flash)
	if (isAuthenticated === null) {
		return (
			<div className="app-shell bg-cream">
				<main className="app-main flex items-center justify-center">
					<span className="text-2xl font-serif text-terracotta">καλημέρα</span>
				</main>
			</div>
		);
	}

	// Show landing page for unauthenticated users on non-public routes
	if (!isAuthenticated && !isPublicRoute) {
		return <LandingPage />;
	}

	return (
		<div className="app-shell bg-cream">
			{/* Scrollable main area */}
			<main className="app-main">
				<div className="max-w-6xl mx-auto px-6 md:px-8">
					<Header
						isAuthenticated={isAuthenticated}
						currentSection={currentSection}
						onLogout={handleLogout}
					/>

					{/* Page Content */}
					<div className="pb-24 md:pb-12">
						<Outlet />
					</div>

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
			</main>

			{/* Mobile Navigation - fixed bottom */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-t border-stone-200 px-4 py-2 safe-area-pb">
				<div className="flex justify-around items-center max-w-md mx-auto">
					{NAV_ITEMS.filter((item) => isAuthenticated || item.id !== "home").map((item) => {
						const Icon = item.icon;
						const isActive = currentSection === item.id;
						return (
							<Link
								key={item.id}
								to={item.path}
								className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
									isActive
										? "text-terracotta bg-terracotta/10"
										: "text-stone-500"
								}`}
							>
								<Icon size={22} strokeWidth={1.5} />
								<span className="text-xs font-medium">{item.label}</span>
							</Link>
						);
					})}
					{!isAuthenticated && (
						<Link
							to="/register"
							className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all text-terracotta bg-terracotta/10"
						>
							<LogIn size={22} strokeWidth={1.5} />
							<span className="text-xs font-medium">Sign Up</span>
						</Link>
					)}
				</div>
			</nav>
		</div>
	);
}
