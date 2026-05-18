import { createFileRoute } from "@tanstack/react-router";

import { DrillButton } from "../components/DrillButton";
import type { Drill } from "../components/group-section";
import { GroupSection } from "../components/group-section";
import { PhaseSection } from "../components/PhaseSection";

export const presentDrills: Drill[] = [
	{
		id: "verbs-vocabulary-sg1",
		to: "/practice/verbs/present/vocabulary",
		title: "Verb vocabulary",
		greek: "γράφω · τρώω · μιλάω · θέλω",
		minutes: 2,
	},
	{
		id: "verbs-conjugation-endings",
		to: "/practice/verbs/present/conjugations",
		title: "Conjugation endings",
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
	{
		id: "verbs-present",
		to: "/practice/verbs/present",
		title: "Full conjugations",
		greek: "γράφω · γράφεις · γράφει · γράφουμε",
		minutes: 2,
	},
];

const pastDrills: Drill[] = [
	{
		id: "verbs-aorist-sg1",
		to: "/practice/verbs/past/aorist-vocabulary",
		title: "Verb vocabulary · past",
		greek: "έφαγα · πήγα · είπα · έκανα",
		minutes: 2,
	},
	{
		id: "verbs-aorist-stems",
		to: "/practice/verbs/past/aorist-stems",
		title: "Irregular stems",
		greek: "τρώω → έφαγα · πίνω → ήπια",
		minutes: 1,
	},
	{
		id: "verbs-aorist-formation",
		to: "/practice/verbs/past/aorist-formation",
		title: "Past ↔ present",
		greek: "γράφω → έγραψα · ανοίγω → άνοιξα",
		minutes: 1,
	},
	{
		id: "verbs-conjugation-endings",
		to: "/practice/verbs/present/conjugations",
		title: "Conjugation endings",
		greek: "έκανα · -ες · -ε · -αμε · -ατε · -αν",
		minutes: 1,
	},
	{
		id: "verbs-imperfect-stative",
		to: "/practice/verbs/past/imperfect-stative",
		title: "Stative verbs · past",
		greek: "ήμουν · είχα · ήθελα · ήξερα · μπορούσα",
		minutes: 2,
	},
	{
		id: "verbs-aorist-conjugation",
		to: "/practice/verbs/past/aorist-conjugation",
		title: "Full conjugations",
		greek: "έκανα · έκανες · έκανε · κάναμε",
		minutes: 2,
	},
];

const futureAndModalDrills: Drill[] = [
	{
		id: "verbs-future-conjugation",
		to: "/practice/verbs/future-conjugation",
		title: "Conjugations",
		greek: "θα γράψω · θα φάω · θα πάω",
		minutes: 2,
	},
	{
		id: "verbs-modal-constructions",
		to: "/practice/verbs/modal-constructions",
		title: "Modal verbs",
		greek: "θέλω να φάω · πρέπει να πάω · μπορώ να έρθω",
		minutes: 2,
	},
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
			<PhaseSection phase="Future & Modal">
				{futureAndModalDrills.map((d) => (
					<DrillButton key={d.id} from={Route.fullPath} {...d} />
				))}
			</PhaseSection>
		</GroupSection>
	</div>
);

export const Route = createFileRoute("/practice/verbs/")({
	component: VerbsPage,
});
