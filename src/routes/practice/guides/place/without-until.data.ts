import type { SimpleListItem } from "../../components/engines/deck";

/**
 * An English phrase; the answer is the Greek with χωρίς, μέχρι, προς, σαν or μετά
 * από. σαν appears only with an article, since without one it takes the plain
 * form. `acceptAlso` takes the common alternative: ως for μέχρι, όπως for σαν,
 * ύστερα από for μετά από.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "zachari", label: "without sugar", greek: "χωρίς ζάχαρη" },
	{ id: "gala", label: "without milk", greek: "χωρίς γάλα" },
	{ id: "lefta", label: "without money", greek: "χωρίς λεφτά", acceptAlso: "χωρίς χρήματα" },
	{ id: "eisitirio", label: "without a ticket", greek: "χωρίς εισιτήριο" },
	{ id: "skylos", label: "without the dog", greek: "χωρίς τον σκύλο" },
	{ id: "maria", label: "without Maria", greek: "χωρίς τη Μαρία", acceptAlso: "χωρίς την Μαρία" },
	{ id: "pente", label: "until five o'clock", greek: "μέχρι τις πέντε", acceptAlso: "ως τις πέντε" },
	{ id: "dyo-pente", label: "from two until five o'clock", greek: "από τις δύο μέχρι τις πέντε", acceptAlso: "από τις δύο ως τις πέντε" },
	{ id: "paraskevi", label: "until Friday", greek: "μέχρι την Παρασκευή", acceptAlso: "ως την Παρασκευή" },
	{ id: "telos", label: "until the end", greek: "μέχρι το τέλος", acceptAlso: "ως το τέλος" },
	{ id: "stathmos-mechri", label: "as far as the station", greek: "μέχρι τον σταθμό", acceptAlso: "ως τον σταθμό" },
	{ id: "stathmos", label: "towards the station", greek: "προς τον σταθμό" },
	{ id: "thalassa", label: "towards the sea", greek: "προς τη θάλασσα", acceptAlso: "προς την θάλασσα" },
	{ id: "kentro", label: "towards the centre", greek: "προς το κέντρο" },
	{ id: "aerodromio", label: "towards the airport", greek: "προς το αεροδρόμιο" },
	{ id: "athina", label: "towards Athens", greek: "προς την Αθήνα" },
	{ id: "lykos", label: "like the wolf", greek: "σαν τον λύκο", acceptAlso: "όπως ο λύκος" },
	{ id: "pateras", label: "like my father", greek: "σαν τον πατέρα μου", acceptAlso: "όπως ο πατέρας μου" },
	{ id: "giannis", label: "like Yannis", greek: "σαν τον Γιάννη", acceptAlso: "όπως ο Γιάννης" },
	{ id: "eleni", label: "like Eleni", greek: "σαν την Ελένη", acceptAlso: "όπως η Ελένη" },
	{ id: "dyo-chronia", label: "after two years", greek: "μετά από δύο χρόνια", acceptAlso: "ύστερα από δύο χρόνια" },
	{ id: "mia-ora", label: "after an hour", greek: "μετά από μια ώρα", acceptAlso: "ύστερα από μια ώρα" },
	{ id: "treis-meres", label: "after three days", greek: "μετά από τρεις μέρες", acceptAlso: "ύστερα από τρεις μέρες" },
	{ id: "deka-lepta", label: "after ten minutes", greek: "μετά από δέκα λεπτά", acceptAlso: "ύστερα από δέκα λεπτά" },
];
