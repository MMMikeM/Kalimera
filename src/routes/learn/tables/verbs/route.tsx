import { createFileRoute, Outlet } from "@tanstack/react-router";

import { BackLink } from "@/components/BackLink";

import { TablesNav } from "../components/tables-nav";

export const Route = createFileRoute("/learn/tables/verbs")({
	component: VerbsLayout,
});

function VerbsLayout() {
	return (
		<div className="space-y-4">
			<BackLink to="/learn">Learn</BackLink>
			<TablesNav activeTab="verbs" />
			<Outlet />
		</div>
	);
}
