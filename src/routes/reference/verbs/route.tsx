import { createFileRoute, Outlet } from "@tanstack/react-router";

import { PracticeCTA } from "@/components/PracticeCta";
import { ReferenceHero } from "@/components/ReferenceHero";

import { ReferenceNav } from "../components/reference-nav";

export const Route = createFileRoute("/reference/verbs")({
	component: VerbsLayout,
});

function VerbsLayout() {
	return (
		<div className="space-y-4">
			<ReferenceNav activeTab="verbs" />

			<div className="space-y-8">
				<ReferenceHero
					eyebrow="Verbs"
					title="Three patterns, thousands of verbs."
					thesis="Greek verb endings show who's doing the action, so pronouns often disappear. Learn three ending families, and you can conjugate most verbs you meet."
				/>

				<Outlet />

				<PracticeCTA
					title="Practice verbs"
					description="Build fluency with timed retrieval drills on Greek verb conjugation."
					topic="verbs"
					drillHref="/practice#verbs"
					ctaLabel="Open verb drills"
				/>
			</div>
		</div>
	);
}
