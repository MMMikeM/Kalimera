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
			rule: "σε means at, in or to. Before the article, the word for “the”, σε drops its ε and joins onto it as one word.\n\nThe noun after σε takes the Target form, the one for what an action is done to. So σε joins τον and τη, never ο and η.",
			table: {
				columns: [
					{ label: "σε +", greek: true },
					{ label: "Example", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["τον → στον", markedCell("στον κρεοπώλη", "accusative", "masculine"), "to the butcher"],
					["τη → στη", markedCell("στη δουλειά", "accusative", "feminine"), "at work"],
					["την → στην", markedCell("στην Πάφο", "accusative", "feminine"), "in Paphos"],
					["το → στο", markedCell("στο γραφείο", "accusative", "neuter"), "at the office"],
					["τα → στα", markedCell("στα εστιατόρια", "accusative", "neuter", true), "to the restaurants"],
					["τις → στις", markedCell("στις τρεις", "accusative", "feminine", true), "at three o'clock"],
					["τους → στους", markedCell("στους δρόμους", "accusative", "masculine", true), "in the streets"],
					[{ text: "μια → σε μια", weight: "deviate" }, cellWith("σε μια λίμνη", mark("μια λίμνη", "accusative", "feminine")), "at a lake"],
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
					text: "στη becomes στην before a vowel, and before sounds like κ, π and τ: στην Αθήνα, στην Πάφο. Elsewhere it stays στη: στη Λεμεσό.",
				},
				{
					label: "Before μια, ένα or no article",
					text: "σε stays whole before μια or ένα, the words for “a”, and before a noun with no article. It stays whole in σε λίγο, in a bit, too.",
					examples: [
						{
							greek: "Μεγάλωσα σε μια μικρή πόλη.",
							english: "I grew up in a small town.",
							marks: [mark("μια μικρή πόλη", "accusative", "feminine")],
						},
						{
							greek: "Δουλεύω σε τράπεζα.",
							english: "I work in a bank.",
							marks: [mark("τράπεζα", "accusative", "feminine")],
						},
					],
				},
			],
			confuse: {
				text: "από never joins onto the article: από τον, από την, από το.",
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
			rule: "A position word says where something is, such as next to or behind.\n\nBefore a place, it needs a partner: σε or από. Each word has its own, so learn the two together. The table gives the common ones, the σε words first.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("δίπλα στο σπίτι", mark("στο σπίτι", "accusative", "neuter")), "next to the house"],
					[cellWith("κοντά στην πόλη", mark("στην πόλη", "accusative", "feminine")), "near the town"],
					[cellWith("πάνω στο τραπέζι", mark("στο τραπέζι", "accusative", "neuter")), "on the table"],
					[cellWith("ανάμεσα στα δέντρα", mark("στα δέντρα", "accusative", "neuter", true)), "between the trees"],
					[cellWith("πίσω από τον τοίχο", mark("τον τοίχο", "accusative", "masculine")), "behind the wall"],
					[cellWith("μπροστά από το σπίτι", mark("το σπίτι", "accusative", "neuter")), "in front of the house"],
					[cellWith("μακριά από την πόλη", mark("την πόλη", "accusative", "feminine")), "far from the town"],
					[cellWith("απέναντι από την εκκλησία", mark("την εκκλησία", "accusative", "feminine")), "opposite the church"],
					[cellWith("κάτω από το κρεβάτι", mark("το κρεβάτι", "accusative", "neuter")), "under the bed"],
					[cellWith("γύρω από το τραπέζι", mark("το τραπέζι", "accusative", "neuter")), "around the table"],
				],
			},
			examples: [
				{
					greek: "Το κινητό σου είναι κάτω από τον καναπέ.",
					english: "Your phone is under the sofa.",
					marks: [mark("Το κινητό", "nominative", "neuter"), mark("τον καναπέ", "accusative", "masculine")],
				},
				{
					greek: "Το φαρμακείο είναι δίπλα στην τράπεζα.",
					english: "The chemist's is next to the bank.",
					marks: [mark("Το φαρμακείο", "nominative", "neuter"), mark("στην τράπεζα", "accusative", "feminine")],
				},
			],
			details: [
				{
					label: "πάνω",
					text: "πάνω takes either partner, and the meaning changes. With σε it means on; with από, above.",
					examples: [
						{
							greek: "Τα κλειδιά είναι πάνω στο τραπέζι.",
							english: "The keys are on the table.",
							marks: [mark("Τα κλειδιά", "nominative", "neuter", true), mark("στο τραπέζι", "accusative", "neuter")],
						},
						{
							greek: "Η λάμπα κρέμεται πάνω από το τραπέζι.",
							english: "The lamp hangs above the table.",
							marks: [mark("Η λάμπα", "nominative", "feminine"), mark("το τραπέζι", "accusative", "neuter")],
						},
					],
				},
				{
					label: "Near and far, with no place after",
					text: "With no place after it, a position word needs no partner: κοντά alone means nearby.\n\nTo ask how far away something is, use απέχει, is distant, with από for the starting point.",
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
			rule: "Three small words link a noun into the sentence:\n\n- για gives the purpose.\n- από gives where from.\n- με gives how, or who with.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("πάω για ψώνια", mark("ψώνια", "accusative", "neuter", true)), "I go shopping"],
					[cellWith("πάω για ύπνο", mark("ύπνο", "accusative", "masculine")), "I'm off to bed"],
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
					text: "Before a length of time, για means for.",
					examples: [
						{
							greek: "Έμεινα στο Λονδίνο για δύο χρόνια.",
							english: "I stayed in London for two years.",
							marks: [mark("στο Λονδίνο", "accusative", "neuter"), mark("δύο χρόνια", "accusative", "neuter", true)],
						},
					],
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
			rule: "A position word says where something is, such as inside or left. Most come in pairs of opposites, so learn them in pairs.\n\nOn their own, they need nothing added.",
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
					text: "Before a place, a position word takes a partner: σε or από. Each word has its own.",
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
			rule: "Four more small words link a noun into the sentence, the way σε and από do:\n\n- χωρίς, without\n- μέχρι, until\n- προς, towards\n- σαν, like\n\nWith an article, the noun after them takes the Target form, the one for what an action is done to.",
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
				],
			},
			examples: [
				{
					greek: "Πίνω τον καφέ μου χωρίς ζάχαρη.",
					english: "I take my coffee without sugar.",
					marks: [mark("τον καφέ", "accusative", "masculine"), mark("ζάχαρη", "accusative", "feminine")],
				},
				{
					greek: "Ακούω τον σκύλο να τραγουδάει σαν τον λύκο.",
					english: "I hear the dog singing like the wolf.",
					marks: [mark("τον σκύλο", "accusative", "masculine"), mark("τον λύκο", "accusative", "masculine")],
				},
			],
			details: [
				{
					label: "μετά από, after",
					text: "Before a length of time, μετά από means after.",
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
