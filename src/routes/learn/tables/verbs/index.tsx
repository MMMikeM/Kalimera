import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/learn/tables/verbs/")({
	beforeLoad: () => {
		throw redirect({ to: "/learn/tables/verbs/$band", params: { band: "present" } });
	},
});
