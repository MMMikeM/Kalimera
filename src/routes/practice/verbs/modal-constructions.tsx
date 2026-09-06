import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";

// Modal + να + subjunctive (perfective form). Highest-payoff sentence construction in casual Greek.
// Subjunctive form = aorist stem + present endings (same shape as future minus θα).

const ITEMS: SimpleListItem[] = [
	// θέλω να
	{
		id: "thelo-fao",
		greek: "θέλω να φάω",
		label: "I want to eat",
		category: "thelo",
	},
	{
		id: "thelei-piei-nero",
		greek: "θέλει να πιει νερό",
		label: "She wants to drink water",
		category: "thelo",
	},
	{
		id: "theloume-pame",
		greek: "θέλουμε να πάμε",
		label: "We want to go",
		category: "thelo",
	},
	{
		id: "den-thelo-fygo",
		greek: "δεν θέλω να φύγω",
		label: "I don't want to leave",
		category: "thelo",
	},
	{
		id: "thelei-vrei",
		greek: "θέλει να το βρει",
		label: "He wants to find it",
		category: "thelo",
	},
	{
		id: "theloun-mathoun",
		greek: "θέλουν να μάθουν ελληνικά",
		label: "They want to learn Greek",
		category: "thelo",
	},
	{
		id: "theleis-meineis",
		greek: "θέλεις να μείνεις;",
		label: "Do you want to stay?",
		category: "thelo",
	},
	{
		id: "den-thelo-grapso",
		greek: "δεν θέλω να το γράψω",
		label: "I don't want to write it",
		category: "thelo",
	},
	{
		id: "thelo-koimitho",
		greek: "θέλω να κοιμηθώ",
		label: "I want to sleep",
		category: "thelo",
	},
	{
		id: "theleis-pieis-kafe",
		greek: "θέλεις να πιεις καφέ;",
		label: "Do you want to drink coffee?",
		category: "thelo",
	},
	{
		id: "thelei-agorasei",
		greek: "θέλει να αγοράσει κάτι",
		label: "He wants to buy something",
		category: "thelo",
	},
	{
		id: "thelo-se-do",
		greek: "θέλω να σε δω",
		label: "I want to see you",
		category: "thelo",
	},
	{
		id: "den-thelo-perimeino",
		greek: "δεν θέλω να περιμένω",
		label: "I don't want to wait",
		category: "thelo",
	},
	{
		id: "theleis-akouseis",
		greek: "θέλεις να ακούσεις;",
		label: "Do you want to listen?",
		category: "thelo",
	},

	// πρέπει να
	{
		id: "prepei-pao",
		greek: "πρέπει να πάω",
		label: "I have to go",
		category: "prepei",
	},
	{
		id: "prepei-fas",
		greek: "πρέπει να φας",
		label: "You have to eat",
		category: "prepei",
	},
	{
		id: "prepei-diavasei",
		greek: "πρέπει να το διαβάσει",
		label: "She has to read it",
		category: "prepei",
	},
	{
		id: "prepei-steiloume",
		greek: "πρέπει να το στείλουμε",
		label: "We have to send it",
		category: "prepei",
	},
	{
		id: "den-prepei-ertheis",
		greek: "δεν πρέπει να έρθεις",
		label: "You don't have to come",
		category: "prepei",
	},
	{
		id: "prepei-katalavoun",
		greek: "πρέπει να καταλάβουν",
		label: "They have to understand",
		category: "prepei",
	},
	{
		id: "prepei-akouseis",
		greek: "πρέπει να ακούσεις",
		label: "You have to listen",
		category: "prepei",
	},
	{
		id: "prepei-vroume-tropo",
		greek: "πρέπει να βρούμε τρόπο",
		label: "We have to find a way",
		category: "prepei",
	},
	{
		id: "prepei-milisi-autous",
		greek: "πρέπει να μιλήσει με αυτούς",
		label: "She has to talk to them",
		category: "prepei",
	},
	{
		id: "prepei-fygoume-tora",
		greek: "πρέπει να φύγουμε τώρα",
		label: "We have to leave now",
		category: "prepei",
	},
	{
		id: "prepei-to-peis",
		greek: "πρέπει να το πεις",
		label: "You have to say it",
		category: "prepei",
	},
	{
		id: "prepei-grapseis",
		greek: "πρέπει να το γράψεις",
		label: "You have to write it",
		category: "prepei",
	},

	// μπορώ να
	{
		id: "boro-ertho",
		greek: "μπορώ να έρθω",
		label: "I can come",
		category: "boro",
	},
	{
		id: "boreis-deis",
		greek: "μπορείς να το δεις;",
		label: "Can you see it?",
		category: "boro",
	},
	{
		id: "den-boro-meino",
		greek: "δεν μπορώ να μείνω",
		label: "I can't stay",
		category: "boro",
	},
	{
		id: "borei-parei",
		greek: "μπορεί να το πάρει",
		label: "She can take it",
		category: "boro",
	},
	{
		id: "boroume-dosoume",
		greek: "μπορούμε να του το δώσουμε;",
		label: "Can we give it to him?",
		category: "boro",
	},
	{
		id: "den-boro-katalavo",
		greek: "δεν μπορώ να καταλάβω",
		label: "I can't understand",
		category: "boro",
	},
	{
		id: "boro-voithiso",
		greek: "μπορώ να βοηθήσω;",
		label: "Can I help?",
		category: "boro",
	},
	{
		id: "boreis-mou-eksigiseis",
		greek: "μπορείς να μου εξηγήσεις;",
		label: "Can you explain to me?",
		category: "boro",
	},
	{
		id: "den-borei-to-xerei",
		greek: "δεν μπορεί να το ξέρει",
		label: "She can't know it",
		category: "boro",
	},
	{
		id: "boroume-xekinisoume",
		greek: "μπορούμε να ξεκινήσουμε",
		label: "We can start",
		category: "boro",
	},
	{
		id: "den-boroun-erthoun",
		greek: "δεν μπορούν να έρθουν",
		label: "They can't come",
		category: "boro",
	},
	{
		id: "boreis-perimeneis",
		greek: "μπορείς να περιμένεις;",
		label: "Can you wait?",
		category: "boro",
	},

	// να μην — negation INSIDE the να-clause (not the matrix verb)
	{
		id: "min-thelo-na-min-erthei",
		greek: "θέλω να μην έρθει",
		label: "I want him not to come",
		category: "min",
	},
	{
		id: "min-prepei-na-min-fygeis",
		greek: "πρέπει να μην φύγεις",
		label: "You must not leave",
		category: "min",
	},
	{
		id: "min-boro-na-min-pao",
		greek: "μπορώ να μην πάω;",
		label: "Can I not go?",
		category: "min",
	},
	{
		id: "min-thelei-na-min-mathei",
		greek: "θέλει να μην μάθει",
		label: "He wants not to find out",
		category: "min",
	},
	{
		id: "min-prepei-na-min-mas-deis",
		greek: "πρέπει να μην μας δεις",
		label: "You must not see us",
		category: "min",
	},
	{
		id: "min-thelo-na-min-ksechasis",
		greek: "θέλω να μην ξεχάσεις",
		label: "I want you not to forget",
		category: "min",
	},
	{
		id: "min-boreis-na-min-to-peis",
		greek: "μπορείς να μην το πεις;",
		label: "Can you not say it?",
		category: "min",
	},
	{
		id: "min-prepei-na-min-argisei",
		greek: "πρέπει να μην αργήσει",
		label: "He must not be late",
		category: "min",
	},
];

const CATEGORIES = [
	{ id: "thelo", label: "θέλω να" },
	{ id: "prepei", label: "πρέπει να" },
	{ id: "boro", label: "μπορώ να" },
	{ id: "min", label: "να μην" },
];

export const Route = createFileRoute("/practice/verbs/modal-constructions")({
	component: ModalConstructionsDrill,
});

function ModalConstructionsDrill() {
	return (
		<Drill
			drillId="verbs-modal-constructions"
			items={ITEMS}
			subtitle="want to · have to · can"
			colorTheme="honey"
			forwardDesc="English → modal + να + verb"
			reverseDesc="Greek → English (self-assess)"
			categories={CATEGORIES}
			referenceHref="/reference/verbs#na-constructions"
			referenceLabel="Reference: modal verbs →"
		/>
	);
}
