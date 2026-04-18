import { SimpleListDrill, type SimpleListItem } from "../../engines/simple-list-drill";

// Forward: "eat (τρώω)" → type aorist sg1 in greeklish → "efaga"
// Reverse: show "έφαγα" → recall "τρώω → έφαγα" (self-assess)
const AORIST_STEMS: SimpleListItem[] = [
	// Suppletive — completely different stems, must memorise cold
	{ id: "troo", greek: "έφαγα", greeklish: "efaga", english: "eat (τρώω)", label: "τρώω → έφαγα", category: "suppletive" },
	{ id: "pino", greek: "ήπια", greeklish: "ipia", english: "drink (πίνω)", label: "πίνω → ήπια", category: "suppletive" },
	{ id: "vlepo", greek: "είδα", greeklish: "eida", english: "see (βλέπω)", label: "βλέπω → είδα", category: "suppletive" },
	{ id: "pao", greek: "πήγα", greeklish: "piga", english: "go (πηγαίνω/πάω)", label: "πηγαίνω → πήγα", category: "suppletive" },
	{ id: "leo", greek: "είπα", greeklish: "eipa", english: "say (λέω)", label: "λέω → είπα", category: "suppletive" },
	// Irregular — derivable but non-obvious, drill for speed
	{ id: "erchomai", greek: "ήρθα", greeklish: "irtha", english: "come (έρχομαι)", label: "έρχομαι → ήρθα", category: "irregular" },
	{ id: "kano", greek: "έκανα", greeklish: "ekana", english: "do / make (κάνω)", label: "κάνω → έκανα", category: "irregular" },
	{ id: "perno", greek: "πήρα", greeklish: "pira", english: "take / get (παίρνω)", label: "παίρνω → πήρα", category: "irregular" },
	{ id: "fevgo", greek: "έφυγα", greeklish: "efiga", english: "leave (φεύγω)", label: "φεύγω → έφυγα", category: "irregular" },
	{ id: "vrisko", greek: "βρήκα", greeklish: "vrika", english: "find (βρίσκω)", label: "βρίσκω → βρήκα", category: "irregular" },
	{ id: "dino", greek: "έδωσα", greeklish: "edosa", english: "give (δίνω)", label: "δίνω → έδωσα", category: "irregular" },
	{ id: "mathaino", greek: "έμαθα", greeklish: "ematha", english: "learn (μαθαίνω)", label: "μαθαίνω → έμαθα", category: "irregular" },
	{ id: "grapho", greek: "έγραψα", greeklish: "egrapsa", english: "write (γράφω)", label: "γράφω → έγραψα", category: "irregular" },
	{ id: "diavazo", greek: "διάβασα", greeklish: "diavasa", english: "read (διαβάζω)", label: "διαβάζω → διάβασα", category: "irregular" },
	{ id: "agorazo", greek: "αγόρασα", greeklish: "agorasa", english: "buy (αγοράζω)", label: "αγοράζω → αγόρασα", category: "irregular" },
];

const CATEGORIES = [
	{ id: "suppletive", label: "Suppletive" },
	{ id: "irregular", label: "Irregular" },
];

export default function AoristStemsDrill() {
	return (
		<SimpleListDrill
			drillId="verbs-aorist-stems"
			items={AORIST_STEMS}
			title="Aorist Stems"
			subtitle="15 forms / timed"
			colorTheme="terracotta"
			forwardTimeLimit={5000}
			forwardDesc="Present (English) → aorist sg1"
			reverseDesc="Aorist form → present verb (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
