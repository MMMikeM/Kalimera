import { createFileRoute } from "@tanstack/react-router";

import { DrillButton } from "../components/DrillButton";
import type { Drill } from "../components/group-section";
import { GroupSection } from "../components/group-section";
import { PhaseSection } from "../components/PhaseSection";

export const presentDrills: Drill[] = [
	// Present
	{
		id: "verbs-present",
		to: "/practice/verbs/present",
		title: "Basic verbs",
		greek: "λύω · θέλω · μπορώ",
		minutes: 2,
	},
	{
		id: "verbs-conjugation-endings",
		to: "/practice/verbs/present/conjugations",
		title: "Conjugations",
		greek: "-ω · -εις · -ει · -ουμε · -ετε · -ουν",
		minutes: 1,
	},
	{
		id: "verbs-present-irregular",
		to: "/practice/verbs/present/irregular",
		title: "Irregular verbs",
		greek: "έχω · πάω · λέω · τρώω · ακούω",
		minutes: 2,
	},
	{
		id: "verbs-eimai-present",
		to: "/practice/verbs/present/eimai",
		title: "είμαι · present",
		greek: "είμαι · είσαι · είναι · είμαστε",
		minutes: 1,
	},
];

const pastDrills: Drill[] = [
	// Past
	{
		id: "verbs-aorist-conjugation",
		to: "/practice/verbs/past/aorist-conjugation",
		title: "Conjugations",
		greek: "έκανα · έκανες · έκανε · κάναμε",
		minutes: 2,
	},
	{
		id: "verbs-aorist-stems",
		to: "/practice/verbs/past/aorist-stems",
		title: "Irregular verbs",
		greek: "τρώω → έφαγα · πίνω → ήπια",
		minutes: 1,
	},
	{
		id: "verbs-eimai-past",
		to: "/practice/verbs/past/eimai",
		title: "είμαι · past",
		greek: "ήμουν · ήσουν · ήταν · ήμασταν",
		minutes: 1,
	},
	{
		id: "verbs-aorist-formation",
		to: "/practice/verbs/past/aorist-formation",
		title: "Past ↔ present",
		greek: "γράφω → έγραψα · ανοίγω → άνοιξα",
		minutes: 1,
	},
];

const otherDrills: Drill[] = [
	// Future
	{
		id: "verbs-future-conjugation",
		to: "/practice/verbs/future-conjugation",
		title: "Conjugations",
		greek: "θα γράψω · θα φάω · θα πάω",
		minutes: 2,
	},
	// να-form
	{
		id: "verbs-na-constructions",
		to: "/practice/verbs/na-constructions",
		title: "να-constructions",
		greek: "θέλω να φάω · πρέπει να πάω · μπορώ να έρθω",
		minutes: 2,
	},
	// Commands
	{
		id: "verbs-imperatives",
		to: "/practice/verbs/imperatives",
		title: "Imperatives",
		greek: "Έλα! · Πες! · Δώσε! · Φέρε!",
		minutes: 1,
	},
];

const VerbsPage = () => (
	<div className="mx-auto max-w-2xl">
		<GroupSection title="Verbs">
			<PhaseSection phase="Present">
				{presentDrills.map((d) => (
					<DrillButton key={d.id} from={Route.fullPath} {...d} />
				))}
			</PhaseSection>
			<PhaseSection phase="Past">
				{pastDrills.map((d) => (
					<DrillButton key={d.id} from={Route.fullPath} {...d} />
				))}
			</PhaseSection>
			<PhaseSection phase="Other">
				{otherDrills.map((d) => (
					<DrillButton key={d.id} from={Route.fullPath} {...d} />
				))}
			</PhaseSection>
		</GroupSection>
	</div>
);

export const Route = createFileRoute("/practice/verbs/")({
	component: VerbsPage,
});
