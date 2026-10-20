import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Each μην comes before a vowel or a hard stop, where it keeps its -ν, so μη is
 * never also right. Everyday speech often drops the για, so bare να passes. The
 * για cards are the section's confuse note: before a noun, για alone.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "matho-ellinika", context: "Πάω στο σχολείο ___ μάθω ελληνικά.", label: "I go to school to learn Greek.", greek: "για να", acceptAlso: "να" },
	{ id: "apolausoun-ilio", context: "Οι τουρίστες έρχονται στην Ελλάδα ___ απολαύσουν τον ήλιο.", label: "Tourists come to Greece to enjoy the sun.", greek: "για να", acceptAlso: "να" },
	{ id: "agoraso-psomi", context: "Πάω στον φούρνο ___ αγοράσω ψωμί.", label: "I'm going to the bakery to buy bread.", greek: "για να", acceptAlso: "να" },
	{ id: "kleiso-trapezi", context: "Τηλεφωνώ ___ κλείσω τραπέζι.", label: "I'm phoning to book a table.", greek: "για να", acceptAlso: "να" },
	{ id: "me-dei", context: "Ήρθε ___ με δει.", label: "He came to see me.", greek: "για να", acceptAlso: "να" },
	{ id: "paro-farmaka", context: "Πάω στο φαρμακείο ___ πάρω φάρμακα.", label: "I'm going to the chemist's to get some medicine.", greek: "για να", acceptAlso: "να" },
	{ id: "milisoume", context: "Πάμε για καφέ ___ μιλήσουμε.", label: "Let's go for a coffee so that we can talk.", greek: "για να", acceptAlso: "να" },
	{ id: "min-kryonoume", context: "Τον χειμώνα φοράμε ζεστά ρούχα ___ κρυώνουμε.", label: "In winter we wear warm clothes so that we don't get cold.", greek: "για να μην", acceptAlso: "να μην" },
	{ id: "min-argiso", context: "Φεύγω νωρίς ___ αργήσω.", label: "I'm leaving early so that I'm not late.", greek: "για να μην", acceptAlso: "να μην" },
	{ id: "min-to-xexaso", context: "Το γράφω ___ το ξεχάσω.", label: "I'm writing it down so that I don't forget it.", greek: "για να μην", acceptAlso: "να μην" },
	{ id: "min-peinaso", context: "Τρώω τώρα ___ πεινάσω μετά.", label: "I'm eating now so that I'm not hungry later.", greek: "για να μην", acceptAlso: "να μην" },
	{ id: "min-xypnisei", context: "Μιλάμε σιγά ___ ξυπνήσει το μωρό.", label: "We talk quietly so that the baby doesn't wake up.", greek: "για να μην", acceptAlso: "να μην" },
	{ id: "min-argiseis", context: "Πάρε ταξί ___ αργήσεις.", label: "Take a taxi so that you're not late.", greek: "για να μην", acceptAlso: "να μην" },
	{ id: "gia-douleia", context: "Ήρθα στην Κύπρο ___ δουλειά.", label: "I came to Cyprus for work.", greek: "για" },
	{ id: "gia-kafe", context: "Πάμε ___ καφέ;", label: "Shall we go for a coffee?", greek: "για" },
	{ id: "gia-maria", context: "Αυτό το δώρο είναι ___ τη Μαρία.", label: "This present is for Maria.", greek: "για" },
	{ id: "gia-fagito", context: "Πάμε ___ φαγητό απόψε;", label: "Shall we go out to eat tonight?", greek: "για" },
];
