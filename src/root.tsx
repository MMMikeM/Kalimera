import { BarChart3, BookOpen, FileText, Home, Info, LogOut, Search, User, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import {
	isRouteErrorResponse,
	Link,
	Links,
	Meta,
	Outlet,
	redirect,
	Scripts,
	ScrollRestoration,
	useLocation,
	useNavigate,
	useRouteError,
} from "react-router";
import type { LinksFunction } from "react-router";

import { GlobalSearch } from "@/components/GlobalSearch";
import { Header } from "@/components/Header";
import { LandingPage } from "@/components/LandingPage";

import "./index.css";
import {
	Popover,
	PopoverContent,
	PopoverPositioner,
	PopoverTrigger,
} from "@/components/ui/popover";
import { clearAuthCookie, getAuthSession } from "@/lib/auth-cookie";

import type { Route } from "./+types/root";

const AUTH_STORAGE_KEY = "greek-authenticated-user";

export const links: LinksFunction = () => [
	{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
	{ rel: "manifest", href: "/manifest.json" },
	{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
	const auth = getAuthSession(request);
	return { auth };
};

export type RootLoaderData = Awaited<ReturnType<typeof loader>>;

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const intent = formData.get("intent");

	if (intent === "logout") {
		const cookie = clearAuthCookie();
		return redirect("/login", {
			headers: { "Set-Cookie": cookie },
		});
	}

	return { success: false };
};

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
			<PopoverTrigger
				render={
					<button
						type="button"
						className={`rounded-lg p-2 shadow-none ring-0 outline-transparent transition-colors outline-none ${
							isOpen ? "bg-terracotta/10 text-terracotta" : "text-stone-500 hover:text-stone-700"
						}`}
					/>
				}
			>
				<User size={20} strokeWidth={1.5} />
			</PopoverTrigger>
			<PopoverPositioner align="end" sideOffset={8}>
				<PopoverContent className="w-48 p-1">
					<button
						type="button"
						onClick={() => handleNavigate("/progress")}
						className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-stone-100"
					>
						<BarChart3 size={16} strokeWidth={1.5} className="text-stone-500" />
						<span className="text-stone-800">Progress</span>
					</button>
					<button
						type="button"
						onClick={() => handleNavigate("/support")}
						className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-stone-100"
					>
						<Info size={16} strokeWidth={1.5} className="text-stone-500" />
						<span className="text-stone-800">About</span>
					</button>
					<div className="my-1 border-t border-stone-200" />
					<button
						type="button"
						onClick={handleLogoutClick}
						className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-stone-100"
					>
						<LogOut size={16} strokeWidth={1.5} className="text-stone-500" />
						<span className="text-stone-800">Sign Out</span>
					</button>
				</PopoverContent>
			</PopoverPositioner>
		</Popover>
	);
};

interface MobileHeaderProps {
	isAuthenticated: boolean;
	onLogout: () => void;
}

const MobileHeader = ({ isAuthenticated, onLogout }: MobileHeaderProps) => {
	return (
		<header className="flex items-center justify-between px-1 py-3 md:hidden">
			<Link to="/" className="flex items-baseline">
				<span className="font-serif text-xl text-terracotta">Kalimera</span>
			</Link>

			<div className="flex items-center gap-1">
				<GlobalSearch>
					{({ isActive }) => (
						<span
							className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
								isActive
									? "bg-terracotta/10 text-terracotta"
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
						className="px-3 py-1.5 text-sm font-medium text-stone-600 hover:text-stone-800"
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
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<meta name="theme-color" content="#4A7C8F" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
				<meta name="apple-mobile-web-app-title" content="καλημέρα" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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

export default function Root({ loaderData }: Route.ComponentProps) {
	const location = useLocation();
	const currentSection = location.pathname.split("/")[1] || "home";
	const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
	const isPublicRoute = PUBLIC_ROUTES.some((route) => location.pathname.startsWith(route));

	const isAuthenticated = loaderData.auth !== null;

	const handleLogout = () => {
		// Clear localStorage for backward compatibility
		localStorage.removeItem(AUTH_STORAGE_KEY);
		// Navigate to logout action which clears the cookie
		const form = document.createElement("form");
		form.method = "POST";
		form.action = "/";
		const input = document.createElement("input");
		input.type = "hidden";
		input.name = "intent";
		input.value = "logout";
		form.appendChild(input);
		document.body.appendChild(form);
		form.submit();
	};

	// Don't render full layout for auth pages
	if (isAuthPage) {
		return (
			<div className="app-shell bg-cream">
				<main className="app-main">
					<div className="mx-auto max-w-6xl px-6 md:px-8">
						<header className="pt-8 pb-6">
							<div className="flex items-center justify-center">
								<span className="font-serif text-2xl text-terracotta">καλημέρα</span>
							</div>
						</header>
						<Outlet />
					</div>
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
				<div className="mx-auto max-w-6xl px-6 md:px-8">
					{/* Mobile header */}
					<MobileHeader isAuthenticated={isAuthenticated} onLogout={handleLogout} />

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
					<footer className="mt-12 hidden border-t border-stone-200 py-12 md:block">
						<div className="flex items-center justify-between text-sm text-stone-600">
							<p>Patterns over memorization. Once you see the structure, the language clicks.</p>
							<p className="font-serif text-terracotta-text">Ελληνικά</p>
						</div>
					</footer>
				</div>
			</main>

			{/* Mobile Navigation - fixed bottom */}
			<nav className="safe-area-pb fixed right-0 bottom-0 left-0 z-50 border-t border-stone-200 bg-cream/95 px-4 py-2 backdrop-blur-sm md:hidden">
				<div className="mx-auto flex max-w-md items-center justify-around">
					{MOBILE_NAV_ITEMS.map((item) => {
						const Icon = item.icon;
						const isActive = currentSection === item.id;

						return (
							<Link
								key={item.id}
								to={item.path}
								className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all ${
									isActive ? "bg-terracotta/10 text-terracotta" : "text-stone-500"
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
				userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
				timestamp: new Date().toISOString(),
			}),
		}).catch(() => {
			// Silently fail - don't create more errors while handling an error
		});
	}, [error, errorMessage, errorStack]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-cream p-6">
			<div className="max-w-md text-center">
				<h1 className="mb-4 font-serif text-3xl text-terracotta">{title}</h1>
				<p className="mb-6 text-stone-600">{message}</p>
				<a
					href="/"
					className="inline-block rounded-xl bg-terracotta px-6 py-3 font-medium text-white transition-colors hover:bg-terracotta-dark"
				>
					Go Home
				</a>
			</div>
		</div>
	);
}
