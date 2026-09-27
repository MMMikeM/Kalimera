import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
	useRouter,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsInProd } from "@tanstack/react-router-devtools";
/// <reference types="vite/client" />
import type { ReactNode } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

import { GreekText } from "@/components/GreekText";
import { Header } from "@/components/Header";
import { MobileHeader } from "@/components/MobileHeader";
import { MobileNav } from "@/components/MobileNav";
import { NotFound, RootError } from "@/components/StatusPage";
import { themeInitScript } from "@/lib/theme";
import { type RouterContext } from "@/router";
import type { AuthSession } from "@/server/auth/session";
import { getServerAuthFn, logoutFn } from "@/server/fns/auth";

import "@/index.css";

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
			// The app ships its own dark theme; stop the Dark Reader extension re-darkening it.
			{ name: "darkreader-lock" },
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
	shellComponent: RootDocument,
	component: () => (
		<>
			<TanStackRouterDevtoolsInProd />

			<RootBody />
		</>
	),
	errorComponent: RootError,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
				{/* After HeadContent so the theme-color meta exists when the script runs */}
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body className="font-sans text-stone-800 antialiased">
				{children}
				<Scripts />
			</body>
		</html>
	);
}

function RootBody() {
	useRegisterSW();

	const routerState = useRouterState();
	const pathname = routerState.location.pathname;
	const currentSection = pathname.split("/")[1] || "home";

	const router = useRouter();
	const { auth } = Route.useRouteContext();
	const isAuthenticated = auth !== null;

	const handleLogout = async () => {
		await logoutFn();
		await router.invalidate();
		router.navigate({ to: "/" });
	};

	const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");

	return (
		<div className="app-shell bg-cream">
			<main className="app-main">
				<div className="mx-auto max-w-6xl px-6 md:px-8">
					{isAuthRoute ? (
						<Outlet />
					) : (
						<>
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
						</>
					)}
					<footer className="mt-12 hidden border-t border-stone-200 py-12 md:block">
						<div className="flex items-center justify-between text-sm text-stone-600">
							<p>Patterns over memorisation. Once you see the structure, the language clicks.</p>
							<GreekText as="p" tone="accent" className="font-serif">
								Ελληνικά
							</GreekText>
						</div>
					</footer>
				</div>
			</main>
			<MobileNav />
		</div>
	);
}
