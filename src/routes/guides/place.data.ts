import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const PLACE_GUIDE: Guide = {
	slug: "place",
	tone: "ocean",
	title: "Place with σε, από and για",
	greek: "Πού",
	description: "Position and direction with σε and από",
	idea: "Two small words do most of the work: σε for at, in and to, and από for from. σε joins onto the article after it; από never does.",
	sections: [
		{
			id: "se-contractions",
			title: "σε joined to the article",
			rule: "σε means at, in or to. Before the article, the word for “the”, it loses its ε and merges with it: σε + το → στο. The noun after σε takes the Target form, the one used for what an action is done to, so σε merges with τον and τη rather than ο and η. The table shows every joined form.",
			table: {
				columns: [
					{ label: "Joins", greek: true },
					{ label: "Example", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["σε + τον → στον", markedCell("στον κρεοπώλη", "accusative", "masculine"), "to the butcher"],
					["σε + τη → στη", markedCell("στη δουλειά", "accusative", "feminine"), "at work"],
					["σε + την → στην", markedCell("στην Πάφο", "accusative", "feminine"), "in Paphos"],
					["σε + το → στο", markedCell("στο γραφείο", "accusative", "neuter"), "at the office"],
					["σε + τα → στα", markedCell("στα εστιατόρια", "accusative", "neuter", true), "to the restaurants"],
					["σε + τις → στις", markedCell("στις τρεις", "accusative", "feminine", true), "at three o'clock"],
					["σε + τους → στους", markedCell("στους δρόμους", "accusative", "masculine", true), "in the streets"],
					[{ text: "σε + μια → σε μια", weight: "deviate" }, cellWith("σε μια λίμνη", mark("μια λίμνη", "accusative", "feminine")), "at a lake"],
				],
			},
			examples: [
				{
					greek: "Μένω στην Πάφο.",
					english: "I live in Paphos.",
					marks: [mark("στην Πάφο", "accusative", "feminine")],
				},
				{
					greek: "Χθες έδωσα το βιβλίο στη Μαρία.",
					english: "Yesterday I gave the book to Maria.",
					marks: [mark("το βιβλίο", "accusative", "neuter"), mark("στη Μαρία", "accusative", "feminine")],
				},
			],
			details: [
				{
					label: "στη or στην",
					text: "στη becomes στην before a vowel and before sounds like κ, π and τ: στην Αθήνα, στην Πάφο, but στη Λεμεσό.",
				},
				{
					label: "Before μια, ένα or no article",
					text: "Before μια or ένα, meaning a, or a word with no article, σε stays whole: σε μια λίμνη, σε λίγο, in a bit.",
					examples: [
						{
							greek: "Μεγάλωσα σε μια μικρή πόλη.",
							english: "I grew up in a small town.",
							marks: [mark("μια μικρή πόλη", "accusative", "feminine")],
						},
					],
				},
			],
			confuse: {
				text: "από never merges with the article: από τον, από την, από το.",
				section: "position",
			},
			drills: [],
			plannedDrills: [
				{
					id: "place-se-article",
					title: "σε + the article",
					greek: "στο · στη · στον · στους · σε μια",
					tests: "Shows σε and a noun with its article; the answer is the joined form, such as στο σπίτι, or σε left whole before μια or no article.",
				},
			],
		},
		{
			id: "position",
			title: "Next to, behind, far from",
			rule: "A position word says where something is: δίπλα, next to; πίσω, behind. Before a place, it needs a partner: σε, as in δίπλα στο σπίτι, or από, as in πίσω από τον τοίχο. Learn each with its partner; the table gives the common ones.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("δίπλα στο σπίτι", mark("στο σπίτι", "accusative", "neuter")), "next to the house"],
					[cellWith("κοντά στην πόλη", mark("στην πόλη", "accusative", "feminine")), "near the town"],
					[cellWith("πίσω από τον τοίχο", mark("τον τοίχο", "accusative", "masculine")), "behind the wall"],
					[cellWith("μπροστά από το σπίτι", mark("το σπίτι", "accusative", "neuter")), "in front of the house"],
					[cellWith("μακριά από την πόλη", mark("την πόλη", "accusative", "feminine")), "far from the town"],
					[cellWith("απέναντι από την εκκλησία", mark("την εκκλησία", "accusative", "feminine")), "opposite the church"],
					[cellWith("πάνω στο τραπέζι", mark("στο τραπέζι", "accusative", "neuter")), "on the table"],
					[cellWith("κάτω από το κρεβάτι", mark("το κρεβάτι", "accusative", "neuter")), "under the bed"],
					[cellWith("ανάμεσα στα δέντρα", mark("στα δέντρα", "accusative", "neuter", true)), "between the trees"],
					[cellWith("γύρω από το τραπέζι", mark("το τραπέζι", "accusative", "neuter")), "around the table"],
				],
			},
			examples: [
				{
					greek: "Το κινητό σου είναι κάτω από τον καναπέ.",
					english: "Your phone is under the sofa.",
					marks: [mark("Το κινητό", "nominative", "neuter"), mark("τον καναπέ", "accusative", "masculine")],
				},
			],
			details: [
				{
					label: "πάνω",
					text: "πάνω takes either partner, and the meaning changes: πάνω στο τραπέζι is on the table, πάνω από το τραπέζι above it.",
					examples: [
						{
							greek: "πάνω στο τραπέζι",
							english: "on the table",
							marks: [mark("στο τραπέζι", "accusative", "neuter")],
						},
						{
							greek: "πάνω από το τραπέζι",
							english: "above the table",
							marks: [mark("το τραπέζι", "accusative", "neuter")],
						},
					],
				},
				{
					label: "Near and far, with no place after",
					text: "With no place after it, a position word needs no partner: κοντά alone means nearby. To ask how far away something is, use πόσο απέχει, with από for the starting point.",
					examples: [
						{
							greek: "Ποια ταβέρνα είναι κοντά;",
							english: "Which taverna is nearby?",
							marks: [mark("Ποια ταβέρνα", "nominative", "feminine")],
						},
						{ greek: "Πόσο απέχει από εδώ;", english: "How far is it from here?" },
					],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "place-position",
					title: "Next to, behind, far from",
					greek: "δίπλα στο · πίσω από το · πάνω στο · κάτω από το",
					tests: "Shows a position in English; the answer is the Greek phrase with σε or από and the article.",
				},
			],
		},
		{
			id: "purpose",
			title: "για, από and με",
			rule: "Three small words link a noun into the sentence. για gives the purpose: πάω για ψώνια, I go shopping. από gives where from. με gives how, or who with.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("πάω για ψώνια", mark("ψώνια", "accusative", "neuter", true)), "I go shopping"],
					[cellWith("πάω για ύπνο", mark("ύπνο", "accusative", "masculine")), "I'm off to bed"],
					[cellWith("για δύο χρόνια", mark("δύο χρόνια", "accusative", "neuter", true)), "for two years"],
					[cellWith("είμαι από τη Νότια Αφρική", mark("τη Νότια Αφρική", "accusative", "feminine")), "I'm from South Africa"],
					[cellWith("δουλεύω από το σπίτι", mark("το σπίτι", "accusative", "neuter")), "I work from home"],
					[cellWith("με το αυτοκίνητο", mark("το αυτοκίνητο", "accusative", "neuter")), "by car"],
					[cellWith("με τους φίλους μου", mark("τους φίλους", "accusative", "masculine", true)), "with my friends"],
				],
			},
			examples: [
				{
					greek: "Για φαγητό πάμε στα εστιατόρια.",
					english: "For food we go to restaurants.",
					marks: [mark("φαγητό", "accusative", "neuter"), mark("στα εστιατόρια", "accusative", "neuter", true)],
				},
				{
					greek: "Με ποιον πηγαίνεις στις συναυλίες;",
					english: "Who do you go to concerts with?",
					marks: [mark("ποιον", "accusative", "masculine"), mark("στις συναυλίες", "accusative", "feminine", true)],
				},
			],
			details: [
				{
					label: "For a length of time",
					text: "Before a length of time, για means for: για δύο χρόνια.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "place-for-from-with",
					title: "For, from, with",
					greek: "για · από · με · για δύο χρόνια",
					tests: "Shows an English sentence with one gap; the answer is για, από or με, with για also for a length of time.",
				},
			],
		},
		{
			id: "position-pairs",
			title: "Inside and outside, left and right",
			rule: "A position word says where something is: μέσα, inside; αριστερά, left. Most come in pairs of opposites, so learn them in pairs. On their own they need nothing added: έλα μέσα, στρίψε αριστερά.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Opposite", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["μέσα", "έξω", "inside · outside"],
					["πάνω", "κάτω", "up · down"],
					["μπροστά", "πίσω", "in front · behind"],
					["κοντά", "μακριά", "near · far"],
					["αριστερά", "δεξιά", "left · right"],
					["εδώ", "εκεί", "here · there"],
				],
			},
			examples: [
				{ greek: "Στρίψε αριστερά.", english: "Turn left." },
				{ greek: "Έλα μέσα.", english: "Come inside." },
			],
			details: [
				{
					label: "Before a place",
					text: "Before a place, a position word takes a partner, σε or από: μέσα στη λάσπη, but έξω από το σπίτι.",
					examples: [
						{
							greek: "Εσύ είσαι μέσα στη λάσπη.",
							english: "You are in the mud.",
							marks: [mark("στη λάσπη", "accusative", "feminine")],
						},
						{
							greek: "Γι' αυτό δεν βγαίνω έξω από το σπίτι.",
							english: "That's why I don't leave the house.",
							marks: [mark("το σπίτι", "accusative", "neuter")],
						},
					],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "place-position-pairs",
					title: "Inside and outside",
					greek: "μέσα · έξω · αριστερά · δεξιά",
					tests: "Shows a position word in Greek; the answer is its opposite, such as έξω for μέσα.",
				},
			],
		},
		{
			id: "without-until",
			title: "Without, until, towards, like",
			rule: "Four more small words link a noun into the sentence, the way σε and από do: χωρίς, without; μέχρι, until; προς, towards; σαν, like. With an article, the noun after them takes the Target form, the one used for what an action is done to: προς τον σταθμό, towards the station.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("χωρίς ζάχαρη", mark("ζάχαρη", "accusative", "feminine")), "without sugar"],
					[cellWith("μέχρι τις πέντε", mark("τις πέντε", "accusative", "feminine", true)), "until five"],
					[cellWith("από τις δύο μέχρι τις πέντε", mark("τις δύο", "accusative", "feminine", true), mark("τις πέντε", "accusative", "feminine", true)), "from two until five"],
					[cellWith("προς τον σταθμό", mark("τον σταθμό", "accusative", "masculine")), "towards the station"],
					[cellWith("σαν τον λύκο", mark("τον λύκο", "accusative", "masculine")), "like the wolf"],
					[cellWith("μετά από δύο χρόνια", mark("δύο χρόνια", "accusative", "neuter", true)), "after two years"],
				],
			},
			examples: [
				{
					greek: "Ακούω τον σκύλο να τραγουδάει σαν τον λύκο.",
					english: "I hear the dog singing like the wolf.",
					marks: [mark("τον σκύλο", "accusative", "masculine"), mark("τον λύκο", "accusative", "masculine")],
				},
			],
			details: [
				{
					label: "μετά από, after",
					text: "Before a length of time, μετά από means after: μετά από δύο χρόνια.",
					examples: [
						{
							greek: "Το βρήκα μετά από δύο χρόνια.",
							english: "I found it after two years.",
							marks: [mark("Το", "accusative", "neuter"), mark("δύο χρόνια", "accusative", "neuter", true)],
						},
					],
				},
			],
			confuse: {
				text: "σαν says two things are alike; πιο … από says one is more.",
				section: "scales/comparing",
			},
			drills: [],
			plannedDrills: [
				{
					id: "place-without-until",
					title: "Without, until, towards, like",
					greek: "χωρίς ζάχαρη · μέχρι τις πέντε · προς τον σταθμό · σαν τον λύκο",
					tests: "Shows an English phrase with without, until, towards, like or after; the answer is the Greek with χωρίς, μέχρι, προς, σαν or μετά από and the noun in the Target form.",
				},
			],
		},
	],
	reference: [{ label: "Prepositions", href: "/reference/prepositions" }],
};
