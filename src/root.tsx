import {
	BarChart3,
	BookOpen,
	FileText,
	Home,
	Info,
	LogOut,
	Search,
	User,
	Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
	isRouteErrorResponse,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
	useNavigate,
	useRouteError,
} from "react-router";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Header } from "@/components/Header";
import { LandingPage } from "@/components/LandingPage";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import "./index.css";
import type { LinksFunction } from "react-router";

const AUTH_STORAGE_KEY = "greek-authenticated-user";

export const links: LinksFunction = () => [
	{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
	{ rel: "manifest", href: "/manifest.json" },
	{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

const MOBILE_NAV_ITEMS = [
	{ id: "home", label: "Home", path: "/", icon: Home },
	{ id: "practice", label: "Practice", path: "/practice/speed", icon: Zap },
	{ id: "learn", label: "Learn", path: "/learn", icon: BookOpen },
	{ id: "reference", label: "Reference", path: "/reference", icon: FileText },
];

const PUBLIC_ROUTES = ["/reference", "/learn", "/search", "/support", "/try"];

interface MobileAccountPopoverProps {
	onLogout: () => void;
}

const MobileAccountPopover = ({ onLogout }: MobileAccountPopoverProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleNavigate = (path: string) => {
		setIsOpen(false);
		navigate(path);
	};

	const handleLogoutClick = () => {
		setIsOpen(false);
		onLogout();
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					className={`p-2 rounded-lg transition-colors outline-none outline-transparent ring-0 shadow-none ${
						isOpen
							? "text-terracotta bg-terracotta/10"
							: "text-stone-500 hover:text-stone-700"
					}`}
				>
					<User size={20} strokeWidth={1.5} />
				</button>
			</PopoverTrigger>
			<PopoverContent align="end" sideOffset={8} className="w-48 p-1">
				<button
					type="button"
					onClick={() => handleNavigate("/progress")}
					className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm rounded-md hover:bg-stone-100 transition-colors"
				>
					<BarChart3 size={16} strokeWidth={1.5} className="text-stone-500" />
					<span className="text-stone-800">Progress</span>
				</button>
				<button
					type="button"
					onClick={() => handleNavigate("/support")}
					className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm rounded-md hover:bg-stone-100 transition-colors"
				>
					<Info size={16} strokeWidth={1.5} className="text-stone-500" />
					<span className="text-stone-800">About</span>
				</button>
				<div className="border-t border-stone-200 my-1" />
				<button
					type="button"
					onClick={handleLogoutClick}
					className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm rounded-md hover:bg-stone-100 transition-colors"
				>
					<LogOut size={16} strokeWidth={1.5} className="text-stone-500" />
					<span className="text-stone-800">Sign Out</span>
				</button>
			</PopoverContent>
		</Popover>
	);
};

interface MobileHeaderProps {
	isAuthenticated: boolean;
	onLogout: () => void;
}

const MobileHeader = ({ isAuthenticated, onLogout }: MobileHeaderProps) => {
	return (
		<header className="md:hidden flex items-center justify-between py-3 px-1">
			<Link to="/" className="flex items-baseline">
				<span className="text-xl font-serif text-terracotta">Kalimera</span>
			</Link>

			<div className="flex items-center gap-1">
				<GlobalSearch>
					{({ isActive }) => (
						<span
							className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
								isActive
									? "text-terracotta bg-terracotta/10"
									: "text-stone-500 hover:text-stone-700"
							}`}
						>
							<Search size={20} strokeWidth={1.5} />
						</span>
					)}
				</GlobalSearch>

				{isAuthenticated && <MobileAccountPopover onLogout={onLogout} />}

				{!isAuthenticated && (
					<Link
						to="/login"
						className="text-sm font-medium text-stone-600 hover:text-stone-800 px-3 py-1.5"
					>
						Sign In
					</Link>
				)}
			</div>
		</header>
	);
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>
				<meta name="theme-color" content="#4A7C8F" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
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
	const isAuthPage =
		location.pathname === "/login" || location.pathname === "/register";
	const isPublicRoute = PUBLIC_ROUTES.some((route) =>
		location.pathname.startsWith(route),
	);

	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem(AUTH_STORAGE_KEY);
		let isValid = false;

		if (stored) {
			try {
				const parsed = JSON.parse(stored) as {
					userId?: number;
					username?: string;
				};
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
					{/* Mobile header */}
					<MobileHeader
						isAuthenticated={isAuthenticated}
						onLogout={handleLogout}
					/>

					{/* Desktop header */}
					<div className="hidden md:block">
						<Header
							isAuthenticated={isAuthenticated}
							currentSection={currentSection}
							onLogout={handleLogout}
						/>
					</div>

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
					{MOBILE_NAV_ITEMS.map((item) => {
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
				</div>
			</nav>
		</div>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	let title = "Something went wrong";
	let message = "An unexpected error occurred. Please try again.";
	let errorMessage = "Unknown error";
	let errorStack: string | undefined;

	if (isRouteErrorResponse(error)) {
		title = error.status === 404 ? "Page not found" : `Error ${error.status}`;
		message = error.statusText || message;
		errorMessage = `${error.status}: ${error.statusText}`;
	} else if (error instanceof Error) {
		errorMessage = error.message;
		errorStack = error.stack;
	}

	// Log error to backend (fire and forget, don't block render)
	useEffect(() => {
		// Skip 404s - not worth logging
		if (isRouteErrorResponse(error) && error.status === 404) {
			return;
		}

		fetch("/api/errors", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				message: errorMessage,
				stack: errorStack,
				url: typeof window !== "undefined" ? window.location.href : undefined,
				userAgent:
					typeof navigator !== "undefined" ? navigator.userAgent : undefined,
				timestamp: new Date().toISOString(),
			}),
		}).catch(() => {
			// Silently fail - don't create more errors while handling an error
		});
	}, [error, errorMessage, errorStack]);

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>
				<title>{title}</title>
				<Links />
			</head>
			<body className="font-sans text-stone-800 antialiased bg-cream">
				<div className="min-h-screen flex items-center justify-center p-6">
					<div className="text-center max-w-md">
						<h1 className="text-3xl font-serif text-terracotta mb-4">
							{title}
						</h1>
						<p className="text-stone-600 mb-6">{message}</p>
						<a
							href="/"
							className="inline-block px-6 py-3 bg-terracotta text-white rounded-xl font-medium hover:bg-terracotta-dark transition-colors"
						>
							Go Home
						</a>
					</div>
				</div>
				<Scripts />
			</body>
		</html>
	);
}
