import type { SimpleListItem } from "../../components/engines/deck";

/**
 * είναι on its own with the -ο form. The section allows the -α form too, so δύσκολα,
 * εύκολα and ωραία are accepted beside their -ο form. Where a να clause follows, the cue
 * gives it, so only the adjective can go wrong.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "dyskolo", label: "It's hard.", greek: "Είναι δύσκολο.", acceptAlso: "Είναι δύσκολα." },
	{ id: "efkolo", label: "It's easy.", greek: "Είναι εύκολο.", acceptAlso: "Είναι εύκολα." },
	{ id: "trelo", label: "It's crazy!", greek: "Είναι τρελό!" },
	{
		id: "douleia",
		context: "… να βρίσκεις δουλειά",
		label: "It's hard to find work.",
		greek: "Είναι δύσκολο να βρίσκεις δουλειά.",
		acceptAlso: "Είναι δύσκολα να βρίσκεις δουλειά.",
	},
	{
		id: "ellinika",
		context: "… να μάθεις ελληνικά",
		label: "It isn't easy to learn Greek.",
		greek: "Δεν είναι εύκολο να μάθεις ελληνικά.",
		acceptAlso: "Δεν είναι εύκολα να μάθεις ελληνικά.",
	},
	{ id: "itan-oraia", label: "It was very nice!", greek: "Ήταν πολύ ωραία!", acceptAlso: "Ήταν πολύ ωραίο!" },
	{ id: "oraia-edo", label: "It's nice here.", greek: "Είναι ωραία εδώ.", acceptAlso: "Είναι ωραίο εδώ." },
	{ id: "simantiko", label: "It's important.", greek: "Είναι σημαντικό." },
	{ id: "periergo", label: "It's strange.", greek: "Είναι περίεργο." },
	{ id: "asteio", label: "It's funny.", greek: "Είναι αστείο." },
	{ id: "itan-dyskolo", label: "It was hard.", greek: "Ήταν δύσκολο.", acceptAlso: "Ήταν δύσκολα." },
	{ id: "itan-trelo", label: "It was crazy!", greek: "Ήταν τρελό!" },
	{
		id: "nero",
		context: "… να πίνεις νερό",
		label: "It's important to drink water.",
		greek: "Είναι σημαντικό να πίνεις νερό.",
	},
	{
		id: "taxidi",
		context: "… να ταξιδεύεις",
		label: "It's nice to travel.",
		greek: "Είναι ωραίο να ταξιδεύεις.",
		acceptAlso: "Είναι ωραία να ταξιδεύεις.",
	},
	{ id: "adynato", label: "It's impossible.", greek: "Είναι αδύνατο." },
	{ id: "logiko", label: "It makes sense.", greek: "Είναι λογικό." },
	{ id: "yperocho", label: "It's wonderful!", greek: "Είναι υπέροχο!" },
	{
		id: "xypnas",
		context: "… να ξυπνάς νωρίς",
		label: "It's hard to wake up early.",
		greek: "Είναι δύσκολο να ξυπνάς νωρίς.",
		acceptAlso: "Είναι δύσκολα να ξυπνάς νωρίς.",
	},
	{ id: "dyskolo-q", label: "Is it hard?", greek: "Είναι δύσκολο;", acceptAlso: "Είναι δύσκολα;" },
	{ id: "aparaitito", label: "It's necessary.", greek: "Είναι απαραίτητο." },
	{ id: "vareto", label: "It's boring.", greek: "Είναι βαρετό." },
];
