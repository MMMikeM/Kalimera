import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/practice")({
	beforeLoad: async ({ context }) => {
		if (!context.auth?.userId) throw redirect({ to: "/" });
	},
	component: () => <Outlet />,
});
