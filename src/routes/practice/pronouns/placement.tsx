import { createFileRoute } from "@tanstack/react-router";

import { SPEEDS } from "../components/drill-speeds";
import { SimpleListDrill, type SimpleListItem } from "../components/engines/simple-list-drill";

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
		greeklish: "me vlepei",
		english: "He sees me",
		label: "pre-verb",
		category: "pre-verb",
	},
	{
		id: "mas-kalei",
		greek: "Μας καλεί",
		greeklish: "mas kalei",
		english: "She calls us",
		label: "pre-verb",
		category: "pre-verb",
	},
	{
		id: "ton-xeroun",
		greek: "Τον ξέρουν",
		greeklish: "ton xeroun",
		english: "They know him",
		label: "pre-verb",
		category: "pre-verb",
	},
	{
		id: "se-akouo",
		greek: "Σε ακούω",
		greeklish: "se akouo",
		english: "I hear you",
		label: "pre-verb",
		category: "pre-verb",
	},
	{
		id: "tis-vlepoume",
		greek: "Τις βλέπουμε",
		greeklish: "tis vlepoume",
		english: "We see them (f)",
		label: "pre-verb",
		category: "pre-verb",
	},

	// Post-imperative
	{
		id: "koita-me",
		greek: "Κοίτα με!",
		greeklish: "koita me",
		english: "Look at me!",
		label: "post-imperative",
		category: "imperative",
	},
	{
		id: "kalese-mas",
		greek: "Κάλεσέ μας!",
		greeklish: "kalese mas",
		english: "Call us!",
		label: "post-imperative",
		category: "imperative",
	},
	{
		id: "vres-ton",
		greek: "Βρες τον!",
		greeklish: "vres ton",
		english: "Find him!",
		label: "post-imperative",
		category: "imperative",
	},
	{
		id: "des-tin",
		greek: "Δες την!",
		greeklish: "des tin",
		english: "See her!",
		label: "post-imperative",
		category: "imperative",
	},
	{
		id: "pes-tous",
		greek: "Πες τους!",
		greeklish: "pes tous",
		english: "Tell them (m)!",
		label: "post-imperative",
		category: "imperative",
	},

	// θα / να sandwich
	{
		id: "tha-me-dei",
		greek: "Θα με δει",
		greeklish: "tha me dei",
		english: "He will see me",
		label: "θα + clitic + verb",
		category: "particle",
	},
	{
		id: "tha-se-kalesei",
		greek: "Θα σε καλέσει",
		greeklish: "tha se kalesei",
		english: "She will call you",
		label: "θα + clitic + verb",
		category: "particle",
	},
	{
		id: "thelo-na-me-deis",
		greek: "Θέλω να με δεις",
		greeklish: "thelo na me deis",
		english: "I want you to see me",
		label: "να + clitic + verb",
		category: "particle",
	},
	{
		id: "tha-mas-vroun",
		greek: "Θα μας βρουν",
		greeklish: "tha mas vroun",
		english: "They will find us",
		label: "θα + clitic + verb",
		category: "particle",
	},
	{
		id: "thelo-na-ton-dei",
		greek: "Θέλω να τον δει",
		greeklish: "thelo na ton dei",
		english: "I want her to see him",
		label: "να + clitic + verb",
		category: "particle",
	},
	{
		id: "tha-tous-akousei",
		greek: "Θα τους ακούσει",
		greeklish: "tha tous akousei",
		english: "She will hear them (m)",
		label: "θα + clitic + verb",
		category: "particle",
	},

	// Negation
	{
		id: "den-me-vlepei",
		greek: "Δεν με βλέπει",
		greeklish: "den me vlepei",
		english: "He doesn't see me",
		label: "δεν + clitic + verb",
		category: "negation",
	},
	{
		id: "den-ton-xerei",
		greek: "Δεν τον ξέρει",
		greeklish: "den ton xerei",
		english: "She doesn't know him",
		label: "δεν + clitic + verb",
		category: "negation",
	},
	{
		id: "den-se-akouo",
		greek: "Δεν σε ακούω",
		greeklish: "den se akouo",
		english: "I don't hear you",
		label: "δεν + clitic + verb",
		category: "negation",
	},
	{
		id: "den-mas-kaloun",
		greek: "Δεν μας καλούν",
		greeklish: "den mas kaloun",
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
		<SimpleListDrill
			drillId="pronouns-placement"
			items={ITEMS}
			title="Pronoun placement"
			subtitle="20 sentences / timed"
			colorTheme="terracotta"
			speeds={SPEEDS}
			forwardDesc="English → Greek with pronoun in correct position"
			reverseDesc="Greek → English (self-assess)"
			categories={CATEGORIES}
			referenceHref="/reference/pronouns#clitic-placement"
			referenceLabel="Reference: pronoun placement →"
		/>
	);
}
