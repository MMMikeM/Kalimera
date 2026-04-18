import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

const IMPERATIVES: SimpleListItem[] = [
	// Tier A — 5 most frequent, drill first
	{ id: "ela", greek: "Έλα!", greeklish: "ela", english: "Come!", label: "imperative of έρχομαι", category: "tier-a" },
	{ id: "pes", greek: "Πες!", greeklish: "pes", english: "Say! / Tell me!", label: "imperative of λέω", category: "tier-a" },
	{ id: "dose", greek: "Δώσε!", greeklish: "dose", english: "Give!", label: "imperative of δίνω", category: "tier-a" },
	{ id: "fere", greek: "Φέρε!", greeklish: "fere", english: "Bring!", label: "imperative of φέρνω", category: "tier-a" },
	{ id: "kane", greek: "Κάνε!", greeklish: "kane", english: "Do it! / Make it!", label: "imperative of κάνω", category: "tier-a" },
	// Full set
	{ id: "pare", greek: "Πάρε!", greeklish: "pare", english: "Take! / Pick up!", label: "imperative of παίρνω", category: "full" },
	{ id: "fate", greek: "Φάε!", greeklish: "fae", english: "Eat!", label: "imperative of τρώω", category: "full" },
	{ id: "pies", greek: "Πιες!", greeklish: "pies", english: "Drink!", label: "imperative of πίνω", category: "full" },
	{ id: "koita", greek: "Κοίτα!", greeklish: "koita", english: "Look! / Watch!", label: "imperative of κοιτάζω", category: "full" },
	{ id: "perimene", greek: "Περίμενε!", greeklish: "perimene", english: "Wait!", label: "imperative of περιμένω", category: "full" },
	{ id: "grapso", greek: "Γράψε!", greeklish: "grapso", english: "Write!", label: "imperative of γράφω", category: "full" },
	{ id: "diavase", greek: "Διάβασε!", greeklish: "diavase", english: "Read!", label: "imperative of διαβάζω", category: "full" },
	{ id: "akouso", greek: "Άκουσε!", greeklish: "akouso", english: "Listen!", label: "imperative of ακούω", category: "full" },
	{ id: "pigaine", greek: "Πήγαινε!", greeklish: "pigaine", english: "Go!", label: "imperative of πηγαίνω", category: "full" },
	{ id: "vres", greek: "Βρες!", greeklish: "vres", english: "Find!", label: "imperative of βρίσκω", category: "full" },
];

const CATEGORIES = [
	{ id: "tier-a", label: "Tier A (5)" },
	{ id: "full", label: "All 15" },
];

export default function ImperativesDrill() {
	return (
		<SimpleListDrill
			drillId="verbs-imperatives"
			items={IMPERATIVES}
			title="Imperatives"
			subtitle="15 forms / timed"
			colorTheme="terracotta"
			forwardTimeLimit={4000}
			forwardDesc="English command → Greek imperative"
			reverseDesc="Greek imperative → English (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
