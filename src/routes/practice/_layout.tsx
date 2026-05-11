import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { getPracticeDataFn } from "@/server/fns";

export const Route = createFileRoute("/practice/_layout")({
	beforeLoad: async ({ context }) => {
		if (!context.auth?.userId) throw redirect({ to: "/" });
	},
	loader: async ({ location }) => {
		const limitParam = new URLSearchParams(location.search).get("limit");
		const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10), 1), 100) : 20;
		const pracData = await getPracticeDataFn({ data: { limit } });
		return pracData;
	},
	component: () => <Outlet />,
});
