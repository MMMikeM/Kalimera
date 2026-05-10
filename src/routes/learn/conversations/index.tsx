import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/learn/conversations/")({
	beforeLoad: () => {
		throw redirect({ to: "/learn/conversations/$tab", params: { tab: "arriving" } });
	},
	component: () => null,
});
