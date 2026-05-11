import {
	HeadContent,
	Link,
	Outlet,
	Scripts,
	createRootRouteWithContext,
	useNavigate,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsInProd } from "@tanstack/react-router-devtools";
import { BarChart3, BookOpen, FileText, Home, Info, LogOut, Search, User, Zap } from "lucide-react";
/// <reference types="vite/client" />
import { useState } from "react";

import { GlobalSearch } from "@/components/GlobalSearch";
import { Header } from "@/components/Header";
import { LandingPage } from "@/components/LandingPage";
import {
	Popover,
	PopoverContent,
	PopoverPositioner,
	PopoverTrigger,
} from "@/components/ui/popover";
import { type RouterContext } from "@/router";
import type { AuthSession } from "@/server/auth-cookie";
import { getServerAuthFn, logoutFn } from "@/server/fns/auth";

import "@/index.css";

const MOBILE_NAV_ITEMS = [
	{ id: "home", label: "Home", path: "/", icon: Home },
	{ id: "practice", label: "Practice", path: "/practice/vocab", icon: Zap },
	{ id: "learn", label: "Learn", path: "/learn", icon: BookOpen },
	{ id: "reference", label: "Reference", path: "/reference", icon: FileText },
];

const PUBLIC_ROUTES = ["/reference", "/learn", "/search", "/support", "/try"];

export const Route = createRootRouteWithContext<RouterContext>()({
	beforeLoad: async () => {
		const auth = await getServerAuthFn();
		return { auth } satisfies { auth: AuthSession | null };
	},
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
			{ name: "theme-color", content: "#4A7C8F" },
			{ name: "mobile-web-app-capable", content: "yes" },
			{ name: "apple-mobile-web-app-capable", content: "yes" },
			{ name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
			{ name: "apple-mobile-web-app-title", content: "καλημέρα" },
			{ title: "Kalimera" },
		],
		links: [
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "manifest", href: "/manifest.json" },
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
			},
		],
	}),
	component: () => (
		<>
			<TanStackRouterDevtoolsInProd />

			<RootComponent />
		</>
	),
	errorComponent: ErrorBoundary,
	notFoundComponent: () => <p>notfound</p>,
});

function RootComponent() {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="font-sans text-stone-800 antialiased">
				<RootBody />
				<Scripts />
			</body>
		</html>
	);
}

function RootBody() {
	const routerState = useRouterState();
	const pathname = routerState.location.pathname;
	const currentSection = pathname.split("/")[1] || "home";
	const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

	const { auth } = Route.useRouteContext();
	const isAuthenticated = auth !== null;

	const handleLogout = async () => {
		await logoutFn();
	};

	if (!isAuthenticated && !isPublicRoute) {
		return <LandingPage />;
	}

	return (
		<div className="app-shell bg-cream">
			<main className="app-main">
				<div className="mx-auto max-w-6xl px-6 md:px-8">
					<MobileHeader isAuthenticated={isAuthenticated} onLogout={handleLogout} />
					<div className="hidden md:block">
						<Header
							isAuthenticated={isAuthenticated}
							currentSection={currentSection}
							onLogout={handleLogout}
						/>
					</div>
					<div className="pb-24 md:pb-12">
						<Outlet />
					</div>
					<footer className="mt-12 hidden border-t border-stone-200 py-12 md:block">
						<div className="flex items-center justify-between text-sm text-stone-600">
							<p>Patterns over memorisation. Once you see the structure, the language clicks.</p>
							<p className="font-serif text-terracotta-text">Ελληνικά</p>
						</div>
					</footer>
				</div>
			</main>
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

function MobileHeader({
	isAuthenticated,
	onLogout,
}: {
	isAuthenticated: boolean;
	onLogout: () => void;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

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
				{isAuthenticated && (
					<Popover open={isOpen} onOpenChange={setIsOpen}>
						<PopoverTrigger
							render={
								<button
									type="button"
									className={`rounded-lg p-2 shadow-none ring-0 outline-transparent transition-colors outline-none ${
										isOpen
											? "bg-terracotta/10 text-terracotta"
											: "text-stone-500 hover:text-stone-700"
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
									onClick={() => {
										setIsOpen(false);
										navigate({ to: "/progress" });
									}}
									className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-stone-100"
								>
									<BarChart3 size={16} strokeWidth={1.5} className="text-stone-500" />
									<span className="text-stone-800">Progress</span>
								</button>
								<button
									type="button"
									onClick={() => {
										setIsOpen(false);
										navigate({ to: "/support" });
									}}
									className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-stone-100"
								>
									<Info size={16} strokeWidth={1.5} className="text-stone-500" />
									<span className="text-stone-800">About</span>
								</button>
								<div className="my-1 border-t border-stone-200" />
								<button
									type="button"
									onClick={() => {
										setIsOpen(false);
										onLogout();
									}}
									className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-stone-100"
								>
									<LogOut size={16} strokeWidth={1.5} className="text-stone-500" />
									<span className="text-stone-800">Sign Out</span>
								</button>
							</PopoverContent>
						</PopoverPositioner>
					</Popover>
				)}
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
}

function ErrorBoundary({ error }: { error: Error }) {
	const errorMessage = error instanceof Error ? error.message : "Unknown error";

	return (
		<div className="flex min-h-screen items-center justify-center bg-cream p-6">
			<div className="max-w-md text-center">
				<h1 className="mb-4 font-serif text-3xl text-terracotta">Something went wrong</h1>
				<p className="mb-6 text-stone-600">{errorMessage}</p>
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
