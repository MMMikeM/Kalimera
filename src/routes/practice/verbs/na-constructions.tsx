import { createFileRoute } from "@tanstack/react-router";

import { SPEEDS } from "../components/drill-speeds";
import { SimpleListDrill, type SimpleListItem } from "../components/engines/simple-list-drill";

// Modal + να + subjunctive verb. Highest-payoff sentence construction in casual Greek.
// Slots: θέλω να, πρέπει να, μπορώ να, ξέρω να (skip πάω να + bare να — chunk territory).
// Subjunctive form = aorist stem + present endings (same shape as future minus θα).

const ITEMS: SimpleListItem[] = [
	// θέλω να
	{
		id: "thelo-fao",
		greek: "θέλω να φάω",
		greeklish: "thelo na fao",
		english: "I want to eat",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "thelei-piei-nero",
		greek: "θέλει να πιει νερό",
		greeklish: "thelei na piei nero",
		english: "She wants to drink water",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "theloume-pame",
		greek: "θέλουμε να πάμε",
		greeklish: "theloume na pame",
		english: "We want to go",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "den-thelo-fygo",
		greek: "δεν θέλω να φύγω",
		greeklish: "den thelo na fygo",
		english: "I don't want to leave",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "thelei-vrei",
		greek: "θέλει να το βρει",
		greeklish: "thelei na to vrei",
		english: "He wants to find it",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "theloun-mathoun",
		greek: "θέλουν να μάθουν ελληνικά",
		greeklish: "theloun na mathoun ellinika",
		english: "They want to learn Greek",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "theleis-meineis",
		greek: "θέλεις να μείνεις;",
		greeklish: "theleis na meineis",
		english: "Do you want to stay?",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "den-thelo-grapso",
		greek: "δεν θέλω να το γράψω",
		greeklish: "den thelo na to grapso",
		english: "I don't want to write it",
		label: "θέλω να",
		category: "thelo",
	},

	// πρέπει να
	{
		id: "prepei-pao",
		greek: "πρέπει να πάω",
		greeklish: "prepei na pao",
		english: "I have to go",
		label: "πρέπει να",
		category: "prepei",
	},
	{
		id: "prepei-fas",
		greek: "πρέπει να φας",
		greeklish: "prepei na fas",
		english: "You have to eat",
		label: "πρέπει να",
		category: "prepei",
	},
	{
		id: "prepei-diavasei",
		greek: "πρέπει να το διαβάσει",
		greeklish: "prepei na to diavasei",
		english: "She has to read it",
		label: "πρέπει να",
		category: "prepei",
	},
	{
		id: "prepei-steiloume",
		greek: "πρέπει να το στείλουμε",
		greeklish: "prepei na to steiloume",
		english: "We have to send it",
		label: "πρέπει να",
		category: "prepei",
	},
	{
		id: "den-prepei-ertheis",
		greek: "δεν πρέπει να έρθεις",
		greeklish: "den prepei na ertheis",
		english: "You don't have to come",
		label: "πρέπει να",
		category: "prepei",
	},
	{
		id: "prepei-katalavoun",
		greek: "πρέπει να καταλάβουν",
		greeklish: "prepei na katalavoun",
		english: "They have to understand",
		label: "πρέπει να",
		category: "prepei",
	},

	// μπορώ να
	{
		id: "boro-ertho",
		greek: "μπορώ να έρθω",
		greeklish: "boro na ertho",
		english: "I can come",
		label: "μπορώ να",
		category: "boro",
	},
	{
		id: "boreis-deis",
		greek: "μπορείς να το δεις;",
		greeklish: "boreis na to deis",
		english: "Can you see it?",
		label: "μπορώ να",
		category: "boro",
	},
	{
		id: "den-boro-meino",
		greek: "δεν μπορώ να μείνω",
		greeklish: "den boro na meino",
		english: "I can't stay",
		label: "μπορώ να",
		category: "boro",
	},
	{
		id: "borei-parei",
		greek: "μπορεί να το πάρει",
		greeklish: "borei na to parei",
		english: "She can take it",
		label: "μπορώ να",
		category: "boro",
	},
	{
		id: "boroume-dosoume",
		greek: "μπορούμε να του το δώσουμε;",
		greeklish: "boroume na tou to dosoume",
		english: "Can we give it to him?",
		label: "μπορώ να",
		category: "boro",
	},
	{
		id: "den-boro-katalavo",
		greek: "δεν μπορώ να καταλάβω",
		greeklish: "den boro na katalavo",
		english: "I can't understand",
		label: "μπορώ να",
		category: "boro",
	},

	// μην — negation INSIDE the να-clause (not the matrix verb)
	{
		id: "min-thelo-na-min-erthei",
		greek: "θέλω να μην έρθει",
		greeklish: "thelo na min erthei",
		english: "I want him not to come",
		label: "να μην",
		category: "min",
	},
	{
		id: "min-prepei-na-min-fygeis",
		greek: "πρέπει να μην φύγεις",
		greeklish: "prepei na min fygeis",
		english: "You must not leave",
		label: "να μην",
		category: "min",
	},
	{
		id: "min-boro-na-min-pao",
		greek: "μπορώ να μην πάω;",
		greeklish: "boro na min pao",
		english: "Can I not go?",
		label: "να μην",
		category: "min",
	},
	{
		id: "min-thelei-na-min-mathei",
		greek: "θέλει να μην μάθει",
		greeklish: "thelei na min mathei",
		english: "He wants not to find out",
		label: "να μην",
		category: "min",
	},
	{
		id: "min-prepei-na-min-mas-deis",
		greek: "πρέπει να μην μας δεις",
		greeklish: "prepei na min mas deis",
		english: "You must not see us",
		label: "να μην",
		category: "min",
	},
];

const CATEGORIES = [
	{ id: "thelo", label: "θέλω να" },
	{ id: "prepei", label: "πρέπει να" },
	{ id: "boro", label: "μπορώ να" },
	{ id: "min", label: "να μην" },
];

export const Route = createFileRoute("/practice/verbs/na-constructions")({
	component: NaConstructionsDrill,
});

function NaConstructionsDrill() {
	return (
		<SimpleListDrill
			drillId="verbs-na-constructions"
			items={ITEMS}
			title="να-constructions"
			subtitle="25 modal + subjunctive sentences / timed"
			colorTheme="honey"
			speeds={SPEEDS}
			forwardDesc="English → modal + να + verb"
			reverseDesc="Greek → English (self-assess)"
			categories={CATEGORIES}
			referenceHref="/reference/verbs#na-constructions"
			referenceLabel="Reference: να-constructions →"
		/>
	);
}
