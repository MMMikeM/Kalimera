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
	{
		id: "thelo-koimitho",
		greek: "θέλω να κοιμηθώ",
		greeklish: "thelo na koimithow",
		english: "I want to sleep",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "theleis-pieis-kafe",
		greek: "θέλεις να πιεις καφέ;",
		greeklish: "theleis na pieis kafe",
		english: "Do you want to drink coffee?",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "thelei-agorasei",
		greek: "θέλει να αγοράσει κάτι",
		greeklish: "thelei na agorasei kati",
		english: "He wants to buy something",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "thelo-se-do",
		greek: "θέλω να σε δω",
		greeklish: "thelo na se do",
		english: "I want to see you",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "den-thelo-perimeino",
		greek: "δεν θέλω να περιμένω",
		greeklish: "den thelo na perimenow",
		english: "I don't want to wait",
		label: "θέλω να",
		category: "thelo",
	},
	{
		id: "theleis-akouseis",
		greek: "θέλεις να ακούσεις;",
		greeklish: "theleis na akouseis",
		english: "Do you want to listen?",
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
	{
		id: "prepei-akouseis",
		greek: "πρέπει να ακούσεις",
		greeklish: "prepei na akouseis",
		english: "You have to listen",
		label: "πρέπει να",
		category: "prepei",
	},
	{
		id: "prepei-vroume-tropo",
		greek: "πρέπει να βρούμε τρόπο",
		greeklish: "prepei na vroume tropo",
		english: "We have to find a way",
		label: "πρέπει να",
		category: "prepei",
	},
	{
		id: "prepei-milisi-autous",
		greek: "πρέπει να μιλήσει με αυτούς",
		greeklish: "prepei na milisi me autous",
		english: "She has to talk to them",
		label: "πρέπει να",
		category: "prepei",
	},
	{
		id: "prepei-fygoume-tora",
		greek: "πρέπει να φύγουμε τώρα",
		greeklish: "prepei na fygoume tora",
		english: "We have to leave now",
		label: "πρέπει να",
		category: "prepei",
	},
	{
		id: "prepei-to-peis",
		greek: "πρέπει να το πεις",
		greeklish: "prepei na to peis",
		english: "You have to say it",
		label: "πρέπει να",
		category: "prepei",
	},
	{
		id: "prepei-grapseis",
		greek: "πρέπει να το γράψεις",
		greeklish: "prepei na to grapseis",
		english: "You have to write it",
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
	{
		id: "boro-voithiso",
		greek: "μπορώ να βοηθήσω;",
		greeklish: "boro na voithiso",
		english: "Can I help?",
		label: "μπορώ να",
		category: "boro",
	},
	{
		id: "boreis-mou-eksigiseis",
		greek: "μπορείς να μου εξηγήσεις;",
		greeklish: "boreis na mou eksigiseis",
		english: "Can you explain to me?",
		label: "μπορώ να",
		category: "boro",
	},
	{
		id: "den-borei-to-xerei",
		greek: "δεν μπορεί να το ξέρει",
		greeklish: "den borei na to xerei",
		english: "She can't know it",
		label: "μπορώ να",
		category: "boro",
	},
	{
		id: "boroume-xekinisoume",
		greek: "μπορούμε να ξεκινήσουμε",
		greeklish: "boroume na xekinisoume",
		english: "We can start",
		label: "μπορώ να",
		category: "boro",
	},
	{
		id: "den-boroun-erthoun",
		greek: "δεν μπορούν να έρθουν",
		greeklish: "den boroun na erthoun",
		english: "They can't come",
		label: "μπορώ να",
		category: "boro",
	},
	{
		id: "boreis-perimeneis",
		greek: "μπορείς να περιμένεις;",
		greeklish: "boreis na perimeneis",
		english: "Can you wait?",
		label: "μπορώ να",
		category: "boro",
	},

	// να μην — negation INSIDE the να-clause (not the matrix verb)
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
	{
		id: "min-thelo-na-min-ksechasis",
		greek: "θέλω να μην ξεχάσεις",
		greeklish: "thelo na min ksechaseis",
		english: "I want you not to forget",
		label: "να μην",
		category: "min",
	},
	{
		id: "min-boreis-na-min-to-peis",
		greek: "μπορείς να μην το πεις;",
		greeklish: "boreis na min to peis",
		english: "Can you not say it?",
		label: "να μην",
		category: "min",
	},
	{
		id: "min-prepei-na-min-argisei",
		greek: "πρέπει να μην αργήσει",
		greeklish: "prepei na min argisi",
		english: "He must not be late",
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

export const Route = createFileRoute("/practice/verbs/modal-constructions")({
	component: ModalConstructionsDrill,
});

function ModalConstructionsDrill() {
	return (
		<Drill
			drillId="verbs-modal-constructions"
			items={ITEMS}
			title="Modal verbs"
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
