import type { SimpleListItem } from "../../components/engines/deck";

/**
 * A label's two nouns, the second with its article so its gender shows; the
 * answer is the label with the second noun in the Owner form and no article.
 * Typing the article fails, since only a leading one is forgiven.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "topos-katoikias", context: "τόπος + η κατοικία", label: "place of residence", greek: "τόπος κατοικίας" },
	{ id: "imerominia-gennisis", context: "ημερομηνία + η γέννηση", label: "date of birth", greek: "ημερομηνία γέννησης" },
	{ id: "topos-gennisis", context: "τόπος + η γέννηση", label: "place of birth", greek: "τόπος γέννησης" },
	{ id: "chroma-mation", context: "χρώμα + τα μάτια", label: "eye colour", greek: "χρώμα ματιών" },
	{ id: "chroma-mallion", context: "χρώμα + τα μαλλιά", label: "hair colour", greek: "χρώμα μαλλιών" },
	{ id: "katastimata-rouchon", context: "καταστήματα + τα ρούχα", label: "clothes shops", greek: "καταστήματα ρούχων" },
	{ id: "katastima-papoutsion", context: "κατάστημα + τα παπούτσια", label: "shoe shop", greek: "κατάστημα παπουτσιών" },
	{ id: "voithos-odontiatrou", context: "βοηθός + ο οδοντίατρος", label: "dental assistant", greek: "βοηθός οδοντιάτρου" },
	{ id: "foititis-panepistimiou", context: "φοιτητής + το πανεπιστήμιο", label: "university student", greek: "φοιτητής πανεπιστημίου" },
	{ id: "programmatistis-logismikou", context: "προγραμματιστής + το λογισμικό", label: "software developer", greek: "προγραμματιστής λογισμικού" },
	{ id: "kathigitria-mousikis", context: "καθηγήτρια + η μουσική", label: "music teacher", greek: "καθηγήτρια μουσικής" },
	{ id: "arithmos-tilefonou", context: "αριθμός + το τηλέφωνο", label: "phone number", greek: "αριθμός τηλεφώνου" },
	{ id: "arithmos-diavatiriou", context: "αριθμός + το διαβατήριο", label: "passport number", greek: "αριθμός διαβατηρίου" },
	{ id: "arithmos-taftotitas", context: "αριθμός + η ταυτότητα", label: "ID card number", greek: "αριθμός ταυτότητας" },
	{ id: "ora-anachorisis", context: "ώρα + η αναχώρηση", label: "departure time", greek: "ώρα αναχώρησης" },
	{ id: "ora-afixis", context: "ώρα + η άφιξη", label: "arrival time", greek: "ώρα άφιξης" },
	{ id: "ores-leitourgias", context: "ώρες + η λειτουργία", label: "opening hours", greek: "ώρες λειτουργίας" },
	{ id: "stasi-leoforeiou", context: "στάση + το λεωφορείο", label: "bus stop", greek: "στάση λεωφορείου" },
	{ id: "eisitirio-trenou", context: "εισιτήριο + το τρένο", label: "train ticket", greek: "εισιτήριο τρένου" },
	{ id: "domatio-xenodocheiou", context: "δωμάτιο + το ξενοδοχείο", label: "hotel room", greek: "δωμάτιο ξενοδοχείου" },
	{ id: "grafeio-tourismou", context: "γραφείο + ο τουρισμός", label: "tourist office", greek: "γραφείο τουρισμού" },
	{ id: "adeia-odigisis", context: "άδεια + η οδήγηση", label: "driving licence", greek: "άδεια οδήγησης" },
	{ id: "scholi-chorou", context: "σχολή + ο χορός", label: "dance school", greek: "σχολή χορού" },
];
