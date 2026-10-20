import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Words that agree, "An adjective without its noun". The answer keeps Θέλω in front: the
 * grader forgives a missing leading article, and τον κόκκινο and το κόκκινο differ only
 * in theirs.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "fakelos-kokkinos", context: "ο φάκελος · κόκκινος", label: "I want the red one.", greek: "Θέλω τον κόκκινο." },
	{ id: "tsanta-kokkini", context: "η τσάντα · κόκκινος", label: "I want the red one.", greek: "Θέλω την κόκκινη." },
	{ id: "forema-kokkino", context: "το φόρεμα · κόκκινος", label: "I want the red one.", greek: "Θέλω το κόκκινο." },
	{ id: "kafes-megalos", context: "ο καφές · μεγάλος", label: "I want the large one.", greek: "Θέλω τον μεγάλο." },
	{ id: "bira-megali", context: "η μπίρα · μεγάλος", label: "I want the large one.", greek: "Θέλω τη μεγάλη.", acceptAlso: "Θέλω την μεγάλη." },
	{ id: "potiri-megalo", context: "το ποτήρι · μεγάλος", label: "I want the large one.", greek: "Θέλω το μεγάλο." },
	{ id: "chymos-mikros", context: "ο χυμός · μικρός", label: "I want the small one.", greek: "Θέλω τον μικρό." },
	{ id: "pitsa-mikri", context: "η πίτσα · μικρός", label: "I want the small one.", greek: "Θέλω τη μικρή.", acceptAlso: "Θέλω την μικρή." },
	{ id: "domatio-mikro", context: "το δωμάτιο · μικρός", label: "I want the small one.", greek: "Θέλω το μικρό." },
	{ id: "skylos-mavros", context: "ο σκύλος · μαύρος", label: "I want the black one.", greek: "Θέλω τον μαύρο." },
	{ id: "gata-aspri", context: "η γάτα · άσπρος", label: "I want the white one.", greek: "Θέλω την άσπρη." },
	{ id: "aftokinito-aspro", context: "το αυτοκίνητο · άσπρος", label: "I want the white one.", greek: "Θέλω το άσπρο." },
	{ id: "kafes-ftinos", context: "ο καφές · φτηνός", label: "I want the cheap one.", greek: "Θέλω τον φτηνό." },
	{ id: "karekla-prasini", context: "η καρέκλα · πράσινος", label: "I want the green one.", greek: "Θέλω την πράσινη." },
	{ id: "blouza-kainourgia", context: "η μπλούζα · καινούργιος", label: "I want the new one.", greek: "Θέλω την καινούργια.", acceptAlso: "Θέλω την καινούρια." },
	{ id: "kinito-kainourgio", context: "το κινητό · καινούργιος", label: "I want the new one.", greek: "Θέλω το καινούργιο.", acceptAlso: "Θέλω το καινούριο." },
	{ id: "fakelos-mple", context: "ο φάκελος · μπλε", label: "I want the blue one.", greek: "Θέλω τον μπλε." },
	{ id: "papoutsia-mavra", context: "τα παπούτσια · μαύρος", label: "I want the black ones.", greek: "Θέλω τα μαύρα." },
	{ id: "fakeloi-prasinoi", context: "οι φάκελοι · πράσινος", label: "I want the green ones.", greek: "Θέλω τους πράσινους." },
	{ id: "tsantes-mikres", context: "οι τσάντες · μικρός", label: "I want the small ones.", greek: "Θέλω τις μικρές." },
];
