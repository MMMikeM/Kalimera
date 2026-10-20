import type { SimpleListItem } from "../../components/engines/deck";

/**
 * A position in English; the answer is the position word with its partner, σε or
 * από, and the place. μπροστά and απέναντι take either partner, so `acceptAlso`
 * holds the other, and their cards use places whose article has one spelling.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "dipla-spiti", label: "next to the house", greek: "δίπλα στο σπίτι" },
	{ id: "dipla-trapeza", label: "next to the bank", greek: "δίπλα στην τράπεζα" },
	{ id: "konta-poli", label: "near the town", greek: "κοντά στην πόλη" },
	{ id: "konta-thalassa", label: "near the sea", greek: "κοντά στη θάλασσα", acceptAlso: "κοντά στην θάλασσα" },
	{ id: "konta-stathmos", label: "near the station", greek: "κοντά στον σταθμό" },
	{ id: "pano-trapezi", label: "on the table", greek: "πάνω στο τραπέζι" },
	{ id: "pano-krevati", label: "on the bed", greek: "πάνω στο κρεβάτι" },
	{ id: "pano-apo-trapezi", label: "above the table", greek: "πάνω από το τραπέζι" },
	{ id: "anamesa-dentra", label: "between the trees", greek: "ανάμεσα στα δέντρα" },
	{ id: "mesa-spiti", label: "inside the house", greek: "μέσα στο σπίτι" },
	{ id: "pisw-toichos", label: "behind the wall", greek: "πίσω από τον τοίχο" },
	{ id: "pisw-scholeio", label: "behind the school", greek: "πίσω από το σχολείο" },
	{ id: "brosta-spiti", label: "in front of the house", greek: "μπροστά από το σπίτι", acceptAlso: "μπροστά στο σπίτι" },
	{ id: "brosta-farmakeio", label: "in front of the chemist's", greek: "μπροστά από το φαρμακείο", acceptAlso: "μπροστά στο φαρμακείο" },
	{ id: "makria-poli", label: "far from the town", greek: "μακριά από την πόλη" },
	{ id: "makria-thalassa", label: "far from the sea", greek: "μακριά από τη θάλασσα", acceptAlso: "μακριά από την θάλασσα" },
	{ id: "apenanti-ekklisia", label: "opposite the church", greek: "απέναντι από την εκκλησία", acceptAlso: "απέναντι στην εκκλησία" },
	{ id: "apenanti-parko", label: "opposite the park", greek: "απέναντι από το πάρκο", acceptAlso: "απέναντι στο πάρκο" },
	{ id: "kato-krevati", label: "under the bed", greek: "κάτω από το κρεβάτι" },
	{ id: "kato-kanapes", label: "under the sofa", greek: "κάτω από τον καναπέ" },
	{ id: "gyro-trapezi", label: "around the table", greek: "γύρω από το τραπέζι" },
	{ id: "exo-spiti", label: "outside the house", greek: "έξω από το σπίτι" },
];
