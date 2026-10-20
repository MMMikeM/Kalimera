import type { SimpleListItem } from "../../components/engines/deck";

/**
 * Words that agree, "Adjectives in -α and -ύς". A few -η adjectives, όγδοος among them,
 * are mixed in, so the card asks which feminine to use and not only how to make -α.
 */
export const ITEMS: SimpleListItem[] = [
	{ id: "oraia-poli", context: "ωραίος · η πόλη", label: "a nice town", greek: "ωραία" },
	{ id: "oraia-mera", context: "ωραίος · η μέρα", label: "a lovely day", greek: "ωραία" },
	{ id: "palia-poli", context: "παλιός · η πόλη", label: "the old town", greek: "παλιά" },
	{ id: "palia-fotografia", context: "παλιός · η φωτογραφία", label: "an old photo", greek: "παλιά" },
	{ id: "nea-daskala", context: "νέος · η δασκάλα", label: "the new teacher", greek: "νέα" },
	{ id: "nea-douleia", context: "νέος · η δουλειά", label: "a new job", greek: "νέα" },
	{ id: "kainourgia-tsanta", context: "καινούργιος · η τσάντα", label: "a new bag", greek: "καινούργια", acceptAlso: "καινούρια" },
	{ id: "kainourgia-kouzina", context: "καινούργιος · η κουζίνα", label: "a new kitchen", greek: "καινούργια", acceptAlso: "καινούρια" },
	{ id: "krya-bira", context: "κρύος · η μπίρα", label: "a cold beer", greek: "κρύα" },
	{ id: "idia-ora", context: "ίδιος · η ώρα", label: "the same time", greek: "ίδια" },
	{ id: "adeia-thesi", context: "άδειος · η θέση", label: "an empty seat", greek: "άδεια" },
	{ id: "teleftaia-stasi", context: "τελευταίος · η στάση", label: "the last stop", greek: "τελευταία" },
	{ id: "plousia-oikogeneia", context: "πλούσιος · η οικογένεια", label: "a rich family", greek: "πλούσια" },
	{ id: "varia-tsanta", context: "βαρύς · η τσάντα", label: "a heavy bag", greek: "βαριά" },
	{ id: "varia-valitsa", context: "βαρύς · η βαλίτσα", label: "a heavy suitcase", greek: "βαριά" },
	{ id: "makria-fousta", context: "μακρύς · η φούστα", label: "a long skirt", greek: "μακριά" },
	{ id: "makria-oura", context: "μακρύς · η ουρά", label: "a long queue", greek: "μακριά" },
	{ id: "elafria-tsanta", context: "ελαφρύς · η τσάντα", label: "a light bag", greek: "ελαφριά", acceptAlso: "ελαφρά" },
	{ id: "ogdoi-thesi", context: "όγδοος · η θέση", label: "eighth place (the odd one out)", greek: "όγδοη" },
	{ id: "kali-mera", context: "καλός · η μέρα", label: "a good day", greek: "καλή" },
	{ id: "megali-poli", context: "μεγάλος · η πόλη", label: "a big city", greek: "μεγάλη" },
	{ id: "mikri-kouzina", context: "μικρός · η κουζίνα", label: "a small kitchen", greek: "μικρή" },
];
