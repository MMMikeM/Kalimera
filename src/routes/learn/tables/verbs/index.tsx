import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/reference/verbs/")({
	beforeLoad: () => {
		throw redirect({ to: "/reference/verbs/$band", params: { band: "present" } });
	},
});
