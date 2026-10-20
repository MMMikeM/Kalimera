import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Where a gap opens the second idea, όμως fits as well as αλλά, so it is accepted.
 * The όμως cards put it after the first phrase, where αλλά can't go. και also
 * means also, so it passes beside επίσης.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "alla-vivliothiki", context: "Υπάρχει ένα βιβλιοπωλείο, ___ δεν υπάρχει βιβλιοθήκη.", label: "There's a bookshop, but there isn't a library.", greek: "αλλά", acceptAlso: "όμως" },
	{ id: "alla-perimeno", context: "Περίμενα πολύ, ___ θα περιμένω κι άλλο.", label: "I waited a long time, but I'll wait some more.", greek: "αλλά", acceptAlso: "όμως" },
	{ id: "alla-kypro", context: "Είμαι από τη Νότια Αφρική, ___ τώρα μένω στην Κύπρο.", label: "I'm from South Africa, but now I live in Cyprus.", greek: "αλλά", acceptAlso: "όμως" },
	{ id: "alla-atm", context: "Στο χωριό μου δεν υπάρχουν τράπεζες, ___ έχουμε μερικά ΑΤΜ.", label: "There are no banks in my village, but we have a few cash machines.", greek: "αλλά", acceptAlso: "όμως" },
	{ id: "alla-kafes", context: "Μου αρέσει ο καφές, ___ δεν πίνω πολύ.", label: "I like coffee, but I don't drink much.", greek: "αλλά", acceptAlso: "όμως" },
	{ id: "alla-akrivo", context: "Είναι ακριβό, ___ είναι καλό.", label: "It's expensive, but it's good.", greek: "αλλά", acceptAlso: "όμως" },
	{ id: "omos-xeimonas", context: "Στην Ελλάδα ___ ο χειμώνας είναι λίγο πιο ήπιος.", label: "In Greece, though, the winter is a little milder.", greek: "όμως" },
	{ id: "omos-adelfos", context: "Ο αδελφός μου ___ μένει στην Αθήνα.", label: "My brother, though, lives in Athens.", greek: "όμως" },
	{ id: "omos-simera", context: "Σήμερα ___ βρέχει.", label: "Today, though, it's raining.", greek: "όμως" },
	{ id: "omos-ego", context: "Εγώ ___ δεν θέλω.", label: "I, though, don't want to.", greek: "όμως" },
	{ id: "omos-fagito", context: "Το φαγητό ___ ήταν κρύο.", label: "The food, though, was cold.", greek: "όμως" },
	{ id: "loipon-fame", context: "___, τι θα φάμε;", label: "So, what shall we eat?", greek: "λοιπόν" },
	{ id: "loipon-pame", context: "___, πάμε;", label: "So, shall we go?", greek: "λοιπόν" },
	{ id: "loipon-les", context: "Τι λες ___;", label: "So what do you say?", greek: "λοιπόν" },
	{ id: "loipon-diakopes", context: "___, πώς ήταν οι διακοπές;", label: "So, how was the holiday?", greek: "λοιπόν" },
	{ id: "episis-ellinika", context: "Μιλάω ___ λίγα ελληνικά.", label: "I also speak a little Greek.", greek: "επίσης", acceptAlso: "και" },
	{ id: "episis-nero", context: "Θέλω ___ ένα νερό.", label: "I'd also like a water.", greek: "επίσης", acceptAlso: "και" },
	{ id: "episis-nikos", context: "Ο Νίκος μιλάει ___ αγγλικά.", label: "Nikos speaks English as well.", greek: "επίσης", acceptAlso: "και" },
	{ id: "episis-mera", context: "Καλή σου μέρα! ___!", label: "Have a good day! You too!", greek: "επίσης" },
	{ id: "episis-savvatokyriako", context: "Καλό Σαββατοκύριακο! ___!", label: "Have a good weekend! You too!", greek: "επίσης" },
];
