import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
	component: AuthLayout,
});

function AuthLayout() {
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
