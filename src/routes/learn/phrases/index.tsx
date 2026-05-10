import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/learn/phrases/")({
	beforeLoad: () => {
		throw redirect({ to: "/learn/phrases/$tab", params: { tab: "survival" } });
	},
	component: () => null,
});
