import { useOutlet } from "react-router";
import type { Drill } from "../group-section";
import { GroupSection } from "../group-section";

export const drills: Drill[] = [
	// Present
	{ id: "verbs-present", href: "/practice/verbs/present", title: "Basic verbs", greek: "λύω · θέλω · μπορώ", minutes: 2, phase: "Present" },
	{ id: "verbs-conjugation-endings", href: "/practice/verbs/conjugation-endings", title: "Conjugations", greek: "-ω · -εις · -ει · -ουμε · -ετε · -ουν", minutes: 1, phase: "Present" },
	{ id: "verbs-present-irregular", href: "/practice/verbs/present-irregular", title: "Irregular verbs", greek: "έχω · πάω · λέω · τρώω · ακούω", minutes: 2, phase: "Present" },
	{ id: "verbs-eimai-present", href: "/practice/verbs/eimai-present", title: "είμαι · present", greek: "είμαι · είσαι · είναι · είμαστε", minutes: 1, phase: "Present" },
	// Past
	{ id: "verbs-aorist-conjugation", href: "/practice/verbs/aorist-conjugation", title: "Conjugations", greek: "έκανα · έκανες · έκανε · κάναμε", minutes: 2, phase: "Past" },
	{ id: "verbs-aorist-stems", href: "/practice/verbs/aorist-stems", title: "Irregular verbs", greek: "τρώω → έφαγα · πίνω → ήπια", minutes: 1, phase: "Past" },
	{ id: "verbs-eimai-past", href: "/practice/verbs/eimai-past", title: "είμαι · past", greek: "ήμουν · ήσουν · ήταν · ήμασταν", minutes: 1, phase: "Past" },
	{ id: "verbs-aorist-formation", href: "/practice/verbs/aorist-formation", title: "Past ↔ present", greek: "γράφω → έγραψα · ανοίγω → άνοιξα", minutes: 1, phase: "Past" },
	// Future
	{ id: "verbs-future-conjugation", href: "/practice/verbs/future-conjugation", title: "Conjugations", greek: "θα γράψω · θα φάω · θα πάω", minutes: 2, phase: "Future" },
	// να-form
	{ id: "verbs-na-constructions", href: "/practice/verbs/na-constructions", title: "να-constructions", greek: "θέλω να φάω · πρέπει να πάω · μπορώ να έρθω", minutes: 2, phase: "να-form" },
	// Commands
	{ id: "verbs-imperatives", href: "/practice/verbs/imperatives", title: "Imperatives", greek: "Έλα! · Πες! · Δώσε! · Φέρε!", minutes: 1, phase: "Commands" },
];

export default function VerbsPage() {
	const outlet = useOutlet();
	if (outlet) return outlet;
	return (
		<div className="mx-auto max-w-2xl">
			<GroupSection title="Verbs" drills={drills} />
		</div>
	);
}
