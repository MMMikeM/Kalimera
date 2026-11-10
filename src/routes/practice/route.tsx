import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/practice")({
	/** `step` opens a drill as a step on a practice path (`findStep`). */
	validateSearch: z.object({ step: z.string().optional() }),
	beforeLoad: async ({ context }) => {
		if (!context.auth?.userId) throw redirect({ to: "/" });
	},
	component: () => <Outlet />,
});
