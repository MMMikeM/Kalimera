import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";

// Where weak object pronouns sit. Tests 4 placement contexts:
//   1. Pre-verb (default declarative)
//   2. Post-imperative
//   3. Sandwiched between θα/να particle and verb
//   4. With δεν negation (still pre-verb, after δεν)

const ITEMS: SimpleListItem[] = [
	// Pre-verb (default)
	{
		id: "me-vlepei",
		greek: "Με βλέπει",
		english: "He sees me",
		label: "pre-verb",
		category: "pre-verb",
	},
	{
		id: "mas-kalei",
		greek: "Μας καλεί",
		english: "She calls us",
		label: "pre-verb",
		category: "pre-verb",
	},
	{
		id: "ton-xeroun",
		greek: "Τον ξέρουν",
		english: "They know him",
		label: "pre-verb",
		category: "pre-verb",
	},
	{
		id: "se-akouo",
		greek: "Σε ακούω",
		english: "I hear you",
		label: "pre-verb",
		category: "pre-verb",
	},
	{
		id: "tis-vlepoume",
		greek: "Τις βλέπουμε",
		english: "We see them (f)",
		label: "pre-verb",
		category: "pre-verb",
	},

	// Post-imperative
	{
		id: "koita-me",
		greek: "Κοίτα με!",
		english: "Look at me!",
		label: "post-imperative",
		category: "imperative",
	},
	{
		id: "kalese-mas",
		greek: "Κάλεσέ μας!",
		english: "Call us!",
		label: "post-imperative",
		category: "imperative",
	},
	{
		id: "vres-ton",
		greek: "Βρες τον!",
		english: "Find him!",
		label: "post-imperative",
		category: "imperative",
	},
	{
		id: "des-tin",
		greek: "Δες την!",
		english: "See her!",
		label: "post-imperative",
		category: "imperative",
	},
	{
		id: "pes-tous",
		greek: "Πες τους!",
		english: "Tell them (m)!",
		label: "post-imperative",
		category: "imperative",
	},

	// θα / να sandwich
	{
		id: "tha-me-dei",
		greek: "Θα με δει",
		english: "He will see me",
		label: "θα + clitic + verb",
		category: "particle",
	},
	{
		id: "tha-se-kalesei",
		greek: "Θα σε καλέσει",
		english: "She will call you",
		label: "θα + clitic + verb",
		category: "particle",
	},
	{
		id: "thelo-na-me-deis",
		greek: "Θέλω να με δεις",
		english: "I want you to see me",
		label: "να + clitic + verb",
		category: "particle",
	},
	{
		id: "tha-mas-vroun",
		greek: "Θα μας βρουν",
		english: "They will find us",
		label: "θα + clitic + verb",
		category: "particle",
	},
	{
		id: "thelo-na-ton-dei",
		greek: "Θέλω να τον δει",
		english: "I want her to see him",
		label: "να + clitic + verb",
		category: "particle",
	},
	{
		id: "tha-tous-akousei",
		greek: "Θα τους ακούσει",
		english: "She will hear them (m)",
		label: "θα + clitic + verb",
		category: "particle",
	},

	// Negation
	{
		id: "den-me-vlepei",
		greek: "Δεν με βλέπει",
		english: "He doesn't see me",
		label: "δεν + clitic + verb",
		category: "negation",
	},
	{
		id: "den-ton-xerei",
		greek: "Δεν τον ξέρει",
		english: "She doesn't know him",
		label: "δεν + clitic + verb",
		category: "negation",
	},
	{
		id: "den-se-akouo",
		greek: "Δεν σε ακούω",
		english: "I don't hear you",
		label: "δεν + clitic + verb",
		category: "negation",
	},
	{
		id: "den-mas-kaloun",
		greek: "Δεν μας καλούν",
		english: "They don't call us",
		label: "δεν + clitic + verb",
		category: "negation",
	},
];

const CATEGORIES = [
	{ id: "pre-verb", label: "Pre-verb" },
	{ id: "imperative", label: "Imperative" },
	{ id: "particle", label: "θα / να" },
	{ id: "negation", label: "Negation" },
];

export const Route = createFileRoute("/practice/pronouns/placement")({
	component: CliticPlacementDrill,
});

function CliticPlacementDrill() {
	return (
		<Drill
			drillId="pronouns-placement"
			items={ITEMS}
			title="Pronoun placement"
			subtitle="20 sentences / timed"
			colorTheme="terracotta"
			forwardDesc="English → Greek with pronoun in correct position"
			reverseDesc="Greek → English (self-assess)"
			categories={CATEGORIES}
			referenceHref="/reference/pronouns#clitic-placement"
			referenceLabel="Reference: pronoun placement →"
		/>
	);
}
