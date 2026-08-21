import type React from "react";

import type { NounRow as NounRowItem } from "@/lib/noun-rows";

import { NounRow } from "./noun-row";

/** Masculine/feminine counterparts worth seeing side by side. */
export const nounPairs: Record<string, Array<[string, string]>> = {
	people: [
		["πατέρας", "μητέρα"],
		["μπαμπάς", "μαμά"],
		["αγόρι", "κορίτσι"],
		["αδελφός", "αδελφή"],
		["παππούς", "γιαγιά"],
		["άντρας", "γυναίκα"],
		["γιος", "κόρη"],
		["θείος", "θεία"],
		["ξάδερφος", "ξαδέρφη"],
		["ανιψιός", "ανιψιά"],
		["εγγονός", "εγγονή"],
		["πεθερός", "πεθερά"],
		["γαμπρός", "νύφη"],
		["φίλος", "φίλη"],
	],
};

/** Hand-authored sub-groups inside a subject; anything unmatched falls to "More". */
export const nounSubgroups: Record<string, Array<{ title: string; words: string[] }>> = {
	people: [
		{ title: "Family", words: ["πατέρας", "μητέρα", "μαμά", "μπαμπάς", "αδελφός", "αδελφή", "γιος", "κόρη", "παιδί", "μωρό", "κορίτσι", "αγόρι", "οικογένεια"] },
		{ title: "Extended family", words: ["θείος", "θεία", "ξάδερφος", "ξαδέρφη", "ανιψιός", "ανιψιά", "εγγονός", "εγγονή"] },
		{ title: "In-laws", words: ["πεθερός", "πεθερά", "γαμπρός", "νύφη"] },
		{ title: "Partners & friends", words: ["άντρας", "γυναίκα", "φίλος", "φίλη", "σύζυγος"] },
		{ title: "People & pets", words: ["άνθρωπος", "κόσμος", "γείτονας", "γειτόνισσα", "νάνος", "σκύλος"] },
	],
	"time-calendar": [
		{ title: "Days", words: ["Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή", "Σαββατοκύριακο"] },
		{ title: "Months", words: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"] },
		{ title: "Seasons", words: ["άνοιξη", "καλοκαίρι", "φθινόπωρο", "χειμώνας"] },
		{ title: "Parts of the day", words: ["πρωί", "μεσημέρι", "απόγευμα", "βράδυ", "νύχτα", "μεσάνυχτα"] },
	],
	"work-study": [
		{ title: "Jobs", words: ["γιατρός", "δάσκαλος", "δασκάλα", "οδηγός", "ηθοποιός", "κηπουρός", "γεωργός", "βοσκός", "κυνηγός", "αρχηγός", "αρχιτέκτονας", "μηχανικός", "κομμωτής", "κομμώτρια", "κρεοπώλης", "κουρέας", "μπαρμπέρης", "γραμματέας", "ιατρός", "νοσοκόμα", "νοσοκόμος", "νοσηλευτής", "οδοντίατρος", "πωλητής", "προγραμματιστής", "υπάλληλος", "υπεύθυνος", "ξεναγός", "φύλακας", "μάστορας", "μπαρίστα", "μαθηματικός", "καλλιτέχνης", "βοηθός"] },
		{ title: "Study", words: ["μάθημα", "εκπαίδευση", "ερώτηση", "έρευνα", "παρουσίαση", "φοιτητής", "φοιτήτρια", "γλώσσα", "επίπεδο", "πίνακας"] },
	],
	shopping: [
		{ title: "Food & drink", words: ["καφές", "χυμός", "ντομάτα", "αγγούρι", "πορτοκάλι", "ψωμί"] },
		{ title: "At the shop", words: ["αντηλιακό", "μπουκάλι", "απόδειξη", "ψώνια"] },
	],
	summer: [
		{ title: "At the beach", words: ["θάλασσα", "παραλία", "ήλιος", "ξαπλώστρα", "μαγιό", "καπέλο"] },
		{ title: "Summer treats", words: ["καλοκαίρι", "ζέστη", "παγωτό", "καρπούζι"] },
	],
};

/** Takes rows, not nouns: the caller slices by row so a pair is never split. */
export const NounList: React.FC<{ rows: NounRowItem[] }> = ({ rows }) => (
	<div className="divide-y divide-stone-200/60">
		{rows.map((row) =>
			row.kind === "pair" ? (
				<div
					key={`${row.left.id}-${row.right.id}`}
					className="grid grid-cols-1 divide-y divide-stone-200/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0"
				>
					<NounRow noun={row.left} />
					<NounRow noun={row.right} />
				</div>
			) : (
				<NounRow key={row.noun.id} noun={row.noun} />
			),
		)}
	</div>
);
