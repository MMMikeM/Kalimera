import type { SimpleListItem } from "../../components/engines/deck";

/**
 * θα ήθελα with the thing in the Target form, or with να and a verb. Only masculine nouns
 * show the Target in sound (έναν καφέ, not ένας καφές), so most cards use one. ένα before
 * a masculine noun is the older spelling of έναν, so it is accepted too.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "kafe", label: "I'd like a coffee.", greek: "Θα ήθελα έναν καφέ.", acceptAlso: "Θα ήθελα ένα καφέ." },
	{
		id: "elliniko-kafe",
		label: "I'd like a Greek coffee.",
		greek: "Θα ήθελα έναν ελληνικό καφέ.",
		acceptAlso: "Θα ήθελα ένα ελληνικό καφέ.",
	},
	{
		id: "chymo",
		label: "I'd like an orange juice.",
		greek: "Θα ήθελα έναν χυμό πορτοκάλι.",
		acceptAlso: "Θα ήθελα ένα χυμό πορτοκάλι.",
	},
	{ id: "logariasmo", label: "I'd like the bill.", greek: "Θα ήθελα τον λογαριασμό.", acceptAlso: "Θα ήθελα το λογαριασμό." },
	{ id: "katalogo", label: "I'd like the menu.", greek: "Θα ήθελα τον κατάλογο." },
	{ id: "nero", label: "I'd like a glass of water.", greek: "Θα ήθελα ένα ποτήρι νερό." },
	{ id: "trapezi", label: "I'd like to book a table.", greek: "Θα ήθελα να κλείσω ένα τραπέζι." },
	{ id: "pao", label: "I'd like to go.", greek: "Θα ήθελα να πάω." },
	{ id: "domatio", label: "I'd like a room.", greek: "Θα ήθελα ένα δωμάτιο." },
	{ id: "eisitirio", label: "I'd like a ticket to Athens.", greek: "Θα ήθελα ένα εισιτήριο για την Αθήνα." },
	{ id: "bira", label: "I'd like a beer.", greek: "Θα ήθελα μια μπίρα." },
	{ id: "plirwso", label: "I'd like to pay.", greek: "Θα ήθελα να πληρώσω." },
	{ id: "ntomates", label: "I'd like a kilo of tomatoes.", greek: "Θα ήθελα ένα κιλό ντομάτες." },
	{
		id: "kapoutsino",
		label: "I'd like a cappuccino.",
		greek: "Θα ήθελα έναν καπουτσίνο.",
		acceptAlso: "Θα ήθελα ένα καπουτσίνο.",
	},
	{ id: "krasi", label: "I'd like a white wine.", greek: "Θα ήθελα ένα λευκό κρασί." },
	{ id: "salata", label: "I'd like a Greek salad.", greek: "Θα ήθελα μια χωριάτικη σαλάτα." },
	{ id: "tsai", label: "I'd like a tea.", greek: "Θα ήθελα ένα τσάι." },
	{ id: "frape", label: "I'd like a frappé.", greek: "Θα ήθελα έναν φραπέ.", acceptAlso: "Θα ήθελα ένα φραπέ." },
	{
		id: "kafe-zachari",
		label: "I'd like a coffee without sugar.",
		greek: "Θα ήθελα έναν καφέ χωρίς ζάχαρη.",
		acceptAlso: "Θα ήθελα ένα καφέ χωρίς ζάχαρη.",
	},
	{ id: "architektonas", label: "I wish I were an architect.", greek: "Θα ήθελα να ήμουν αρχιτέκτονας." },
];
