import { createFileRoute, Outlet } from "@tanstack/react-router";

import { ReferenceNav } from "../components/reference-nav";

export const Route = createFileRoute("/reference/verbs")({
	component: VerbsLayout,
});

function VerbsLayout() {
	return (
		<div className="space-y-4">
			<ReferenceNav activeTab="verbs" />
			<Outlet />
		</div>
	);
}
