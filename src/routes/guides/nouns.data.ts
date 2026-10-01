import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

const JOB_DEFINITIONS = [
	"The Doer _does_ the action. Its form is the plain one you find in the dictionary.",
	"The Target is who or what the action is done to.",
	"The Owner is who something belongs to.",
];

export const NOUNS_GUIDE: Guide = {
	slug: "nouns",
	tone: "ocean",
	title: "Noun endings and plurals",
	greek: "Ουσιαστικά",
	description: "Endings by family, plurals, and the Owner",
	idea: "A noun's ending usually tells you its family, and the family gives you its other forms: its Target, its Owner and its plural.",
	sections: [
		{
			id: "families",
			title: "Masculine nouns in -ος",
			rule: [
				"Nouns fall into families by gender and ending. Each family has its own way of changing the plain form for the Target, the Owner and more than one.",
				"Masculines in -ος are the biggest family, and the one whose plural Target differs from its plural Doer.",
				"The table shows ο φίλος (friend) in each job:",
				JOB_DEFINITIONS,
			],
			table: {
				columns: [
					{ label: "Job" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("ο φίλος", "nominative", "masculine", false), markedCell("οι φίλοι", "nominative", "masculine", true)],
					["Target", markedCell("τον φίλο", "accusative", "masculine"), markedCell("τους φίλους", "accusative", "masculine", true)],
					["Owner", markedCell("του φίλου", "genitive", "masculine"), markedCell("των φίλων", "genitive", "masculine", true)],
				],
			},
			examples: [
				{
					greek: "Οι φίλοι μου έρχονται απόψε.",
					english: "My friends are coming tonight.",
					marks: [mark("Οι φίλοι", "nominative", "masculine", true)],
				},
				{
					greek: "Περιμένω τους φίλους μου.",
					english: "I'm waiting for my friends.",
					marks: [mark("τους φίλους", "accusative", "masculine", true)],
				},
			],
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-as-is",
			title: "Masculine nouns in -ας and -ης",
			rule: [
				"A masculine noun in -ας or -ης drops its -ς for the Target and the Owner of one. Its plural ends in -ες for the Doer and the Target alike.",
				"The table shows ο πατέρας (father) and ο μαθητής (pupil) in each job:",
				JOB_DEFINITIONS,
			],
			table: {
				columns: [
					{ label: "Job" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("ο πατέρας", "nominative", "masculine", false), markedCell("οι πατέρες", "nominative", "masculine", true)],
					["Target", markedCell("τον πατέρα", "accusative", "masculine", false), markedCell("τους πατέρες", "accusative", "masculine", true)],
					["Owner", markedCell("του πατέρα", "genitive", "masculine", false), markedCell("των πατέρων", "genitive", "masculine", true)],
					["Doer", markedCell("ο μαθητής", "nominative", "masculine", false), markedCell("οι μαθητές", "nominative", "masculine", true)],
					["Target", markedCell("τον μαθητή", "accusative", "masculine", false), markedCell("τους μαθητές", "accusative", "masculine", true)],
					["Owner", markedCell("του μαθητή", "genitive", "masculine", false), markedCell("των μαθητών", "genitive", "masculine", true)],
				],
			},
			examples: [
				{
					greek: "Περιμένω τον πατέρα μου.",
					english: "I'm waiting for my father.",
					marks: [mark("τον πατέρα", "accusative", "masculine")],
				},
				{
					greek: "Ο δάσκαλος βοηθάει τους μαθητές.",
					english: "The teacher helps the pupils.",
					marks: [mark("Ο δάσκαλος", "nominative", "masculine"), mark("τους μαθητές", "accusative", "masculine", true)],
				},
			],
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-a-i",
			title: "Feminine nouns in -α and -η",
			rule: [
				"A feminine noun in -α or -η changes its article for the Target and the Owner, but its ending only sometimes. For one, the Doer and the Target share a form, and the Owner adds -ς. The plural ends in -ες for the Doer and the Target alike.",
				"The table shows η γυναίκα (woman) and η ζωή (life) in each job:",
				JOB_DEFINITIONS,
			],
			table: {
				columns: [
					{ label: "Job" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("η γυναίκα", "nominative", "feminine", false), markedCell("οι γυναίκες", "nominative", "feminine", true)],
					["Target", markedCell("τη γυναίκα", "accusative", "feminine"), markedCell("τις γυναίκες", "accusative", "feminine", true)],
					["Owner", markedCell("της γυναίκας", "genitive", "feminine", false), markedCell("των γυναικών", "genitive", "feminine", true)],
					["Doer", markedCell("η ζωή", "nominative", "feminine", false), markedCell("οι ζωές", "nominative", "feminine", true)],
					["Target", markedCell("τη ζωή", "accusative", "feminine"), markedCell("τις ζωές", "accusative", "feminine", true)],
					["Owner", markedCell("της ζωής", "genitive", "feminine", false), markedCell("των ζωών", "genitive", "feminine", true)],
				],
			},
			examples: [
				{
					greek: "Η ζωή είναι ωραία.",
					english: "Life is beautiful.",
					marks: [mark("Η ζωή", "nominative", "feminine")],
				},
				{
					greek: "Αγαπάω τη ζωή.",
					english: "I love life.",
					marks: [mark("τη ζωή", "accusative", "feminine")],
				},
			],
			details: [
				{
					label: "Plurals in -εις",
					text: "A few feminines in -η take -εις in the plural instead of -ες.",
				},
			],
			confuse: {
				text: "η πόλη ends like η ζωή, but its plural is οι πόλεις.",
				section: "extra-syllable",
			},
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-o-i",
			title: "Neuter nouns in -ο and -ι",
			rule: [
				"A neuter noun in -ο or -ι uses one form for the Doer and the Target, one and more than one alike.",
				[
					"Nouns in -ο swap it for -α in the plural.",
					"Most nouns in -ι add -α.",
					"The Owner of one ends in -ου.",
				],
				"The table shows το βιβλίο (book) and το παιδί (child) in each job:",
				JOB_DEFINITIONS,
			],
			table: {
				columns: [
					{ label: "Job" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("το βιβλίο", "nominative", "neuter", false), markedCell("τα βιβλία", "nominative", "neuter", true)],
					["Target", markedCell("το βιβλίο", "accusative", "neuter"), markedCell("τα βιβλία", "accusative", "neuter", true)],
					["Owner", markedCell("του βιβλίου", "genitive", "neuter", false), markedCell("των βιβλίων", "genitive", "neuter", true)],
					["Doer", markedCell("το παιδί", "nominative", "neuter", false), markedCell("τα παιδιά", "nominative", "neuter", true)],
					["Target", markedCell("το παιδί", "accusative", "neuter"), markedCell("τα παιδιά", "accusative", "neuter", true)],
					["Owner", markedCell("του παιδιού", "genitive", "neuter", false), markedCell("των παιδιών", "genitive", "neuter", true)],
				],
			},
			examples: [
				{
					greek: "Το παιδί διαβάζει ένα βιβλίο.",
					english: "The child is reading a book.",
					marks: [mark("Το παιδί", "nominative", "neuter"), mark("ένα βιβλίο", "accusative", "neuter")],
				},
				{
					greek: "Αγοράζω βιβλία για τα παιδιά.",
					english: "I'm buying books for the children.",
					marks: [mark("βιβλία", "accusative", "neuter", true), mark("τα παιδιά", "accusative", "neuter", true)],
				},
			],
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-ma",
			title: "Neuter nouns in -μα",
			rule: [
				"A neuter noun in -μα keeps the -μα only for the Doer and the Target of one. Every other form adds -τ- before its ending.",
				"The table shows το όνομα (name) in each job:",
				JOB_DEFINITIONS,
			],
			table: {
				columns: [
					{ label: "Job" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("το όνομα", "nominative", "neuter", false), markedCell("τα ονόματα", "nominative", "neuter", true)],
					["Target", markedCell("το όνομα", "accusative", "neuter"), markedCell("τα ονόματα", "accusative", "neuter", true)],
					["Owner", markedCell("του ονόματος", "genitive", "neuter", false), markedCell("των ονομάτων", "genitive", "neuter", true)],
				],
			},
			examples: [
				{
					greek: "Τα μαθήματα αρχίζουν τον Σεπτέμβριο.",
					english: "Lessons start in September.",
					marks: [mark("Τα μαθήματα", "nominative", "neuter", true)],
				},
				{
					greek: "Δεν θυμάμαι ονόματα.",
					english: "I can't remember names.",
					marks: [mark("ονόματα", "accusative", "neuter", true)],
				},
			],
			details: [
				{
					label: "Where the stress goes",
					text: "When the stress sits three syllables from the end, it moves one syllable towards the end. When it sits two from the end, it stays where it is.",
					examples: [
						{
							greek: "το όνομα → τα ονόματα",
							english: "the name → the names",
							marks: [mark("το όνομα", "nominative", "neuter"), mark("τα ονόματα", "nominative", "neuter", true)],
						},
						{
							greek: "το χρώμα → τα χρώματα",
							english: "the colour → the colours",
							marks: [mark("το χρώμα", "nominative", "neuter"), mark("τα χρώματα", "nominative", "neuter", true)],
						},
					],
				},
			],
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "extra-syllable",
			title: "Plurals with a new ending, like καφέδες and πόλεις",
			rule: [
				"A few nouns make their plural, the form for more than one, with an ending you wouldn't guess from the form for one.",
				[
					"Some add -δ- and a syllable. Most of these end in -άς, -ά, -ές, -ούς or -τζής.",
					"A few feminines in -η take -εις instead of -ες.",
				],
				"The table shows the common ones.",
			],
			table: {
				columns: [
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο καφές", "nominative", "masculine"), markedCell("οι καφέδες", "nominative", "masculine", true), "coffee"],
					[markedCell("η γιαγιά", "nominative", "feminine"), markedCell("οι γιαγιάδες", "nominative", "feminine", true), "grandmother"],
					[markedCell("ο μπαμπάς", "nominative", "masculine"), markedCell("οι μπαμπάδες", "nominative", "masculine", true), "dad"],
					[markedCell("ο παππούς", "nominative", "masculine"), markedCell("οι παππούδες", "nominative", "masculine", true), "grandfather"],
					[markedCell("ο ταξιτζής", "nominative", "masculine"), markedCell("οι ταξιτζήδες", "nominative", "masculine", true), "taxi driver"],
					[markedCell("η πόλη", "nominative", "feminine"), markedCell("οι πόλεις", "nominative", "feminine", true), "city"],
				],
			},
			examples: [
				{
					greek: "Δύο καφέδες, παρακαλώ.",
					english: "Two coffees, please.",
					marks: [mark("Δύο καφέδες", "accusative", "masculine", true)],
				},
				{
					greek: "Η Αθήνα και η Θεσσαλονίκη είναι μεγάλες πόλεις.",
					english: "Athens and Thessaloniki are big cities.",
					marks: [mark("μεγάλες πόλεις", "nominative", "feminine", true)],
				},
			],
			details: [
				{
					label: "Which -η nouns take -εις",
					text: "Nothing in the ending tells you which feminines in -η take -εις: αγάπη gives αγάπες. Learn the plural with the noun.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-plural-extra-syllable",
					title: "Plurals with a new ending",
					greek: "καφέδες · γιαγιάδες · πόλεις",
					tests: "A card shows a noun with its article in the one form, and the plural in its plain form, with its article, counts as right.",
				},
			],
		},
		{
			id: "never-change",
			title: "Nouns that never change",
			rule: "Many words borrowed from other languages keep one form whatever their job in the sentence, one and more than one alike, and only the article changes: το πάρτι, τα πάρτι, του πάρτι. Most are neuter.",
			table: {
				columns: [
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("το σινεμά", "nominative", "neuter"), markedCell("τα σινεμά", "nominative", "neuter", true), "cinema"],
					[markedCell("το πάρτι", "nominative", "neuter"), markedCell("τα πάρτι", "nominative", "neuter", true), "party"],
					[markedCell("το χόμπι", "nominative", "neuter"), markedCell("τα χόμπι", "nominative", "neuter", true), "hobby"],
					[markedCell("το ραντεβού", "nominative", "neuter"), markedCell("τα ραντεβού", "nominative", "neuter", true), "appointment"],
					[markedCell("το σπορ", "nominative", "neuter"), markedCell("τα σπορ", "nominative", "neuter", true), "sport"],
					[markedCell("το βίντεο", "nominative", "neuter"), markedCell("τα βίντεο", "nominative", "neuter", true), "video"],
				],
			},
			examples: [
				{
					greek: "Έχω ραντεβού.",
					english: "I have an appointment.",
					marks: [mark("ραντεβού", "accusative", "neuter")],
				},
				{
					greek: "Βγάζω φωτογραφίες και βίντεο.",
					english: "I take photos and videos.",
					marks: [mark("φωτογραφίες", "accusative", "feminine", true), mark("βίντεο", "accusative", "neuter", true)],
				},
			],
			details: [
				{
					label: "Borrowed words that do change",
					text: "Not every borrowed word works this way: ο καφές becomes οι καφέδες.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-unchanging",
					title: "Nouns that never change",
					greek: "τα πάρτι · του σινεμά · τα βίντεο",
					tests: "A card asks for a borrowed noun in a given job and number; right is the article changed and the noun left as it is.",
				},
			],
		},
		{
			id: "plural-only",
			title: "Nouns used in the plural",
			rule: [
				"A few things English names as one, Greek names as more than one, so the article and any adjective go plural too: καλοκαιρινές διακοπές, a summer holiday.",
				"The table shows each in its plain form (the Doer form), the one in the dictionary, and as the Target, who or what the action is done to.",
			],
			table: {
				columns: [
					{ label: "Plain form", greek: true },
					{ label: "Target", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("οι διακοπές", "nominative", "feminine", true), markedCell("τις διακοπές", "accusative", "feminine", true), "holidays"],
					[markedCell("τα ψώνια", "nominative", "neuter", true), markedCell("τα ψώνια", "accusative", "neuter", true), "the shopping"],
					[markedCell("τα μεσάνυχτα", "nominative", "neuter", true), markedCell("τα μεσάνυχτα", "accusative", "neuter", true), "midnight"],
				],
			},
			examples: [
				{
					greek: "Κάνω διακοπές.",
					english: "I'm on holiday.",
					marks: [mark("διακοπές", "accusative", "feminine", true)],
				},
				{
					greek: "Κάνω τα ψώνια στο σούπερ μάρκετ.",
					english: "I do the shopping at the supermarket.",
					marks: [mark("τα ψώνια", "accusative", "neuter", true), mark("στο σούπερ μάρκετ", "accusative", "neuter")],
				},
			],
			details: [
				{
					label: "η διακοπή, the form for one",
					text: "η διακοπή does exist, but it means a break or an interruption.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-plural-only",
					title: "Nouns used in the plural",
					greek: "οι διακοπές · τα ψώνια · τα μεσάνυχτα",
					tests: "A card shows the English (holidays, midnight) and the Greek noun with its plural article counts as right.",
				},
			],
		},
		{
			id: "owner",
			title: "The Owner in every family",
			rule: [
				"The Owner is the form a noun takes when it is who something belongs to, like _of_ or _'s_ in English. Its ending depends on the noun's gender and ending.",
				[
					"Masculines in -ος and most neuters end in -ου.",
					"Masculines in -ας and -ης drop the -ς.",
					"Feminines add -ς.",
					"In the plural, every noun that changes ends in -ων.",
				],
				"The first column is the plain form (the Doer form), the one in the dictionary.",
			],
			table: {
				columns: [
					{ label: "Plain form", greek: true },
					{ label: "Owner", greek: true },
					{ label: "Owners", greek: true },
				],
				rows: [
					[
						markedCell("ο φίλος", "nominative", "masculine", false),
						markedCell("του φίλου", "genitive", "masculine"),
						markedCell("των φίλων", "genitive", "masculine", true),
					],
					[
						markedCell("ο πατέρας", "nominative", "masculine", false),
						markedCell("του πατέρα", "genitive", "masculine"),
						markedCell("των πατέρων", "genitive", "masculine", true),
					],
					[
						markedCell("η γυναίκα", "nominative", "feminine", false),
						markedCell("της γυναίκας", "genitive", "feminine"),
						markedCell("των γυναικών", "genitive", "feminine", true),
					],
					[
						markedCell("η πόλη", "nominative", "feminine", false),
						markedCell("της πόλης", "genitive", "feminine"),
						markedCell("των πόλεων", "genitive", "feminine", true),
					],
					[
						markedCell("το παιδί", "nominative", "neuter", false),
						markedCell("του παιδιού", "genitive", "neuter"),
						markedCell("των παιδιών", "genitive", "neuter", true),
					],
					[
						markedCell("το όνομα", "nominative", "neuter", false),
						markedCell("του ονόματος", "genitive", "neuter", false),
						markedCell("των ονομάτων", "genitive", "neuter", true),
					],
					[
						markedCell("το λάθος", "nominative", "neuter", false),
						markedCell("του λάθους", "genitive", "neuter", false),
						markedCell("των λαθών", "genitive", "neuter", true),
					],
				],
			},
			examples: [
				{
					greek: "Η μητέρα της Μαρίας είναι δασκάλα.",
					english: "Maria's mother is a teacher.",
					marks: [mark("Η μητέρα", "nominative", "feminine"), mark("της Μαρίας", "genitive", "feminine")],
				},
				{
					greek: "Τα παιχνίδια των παιδιών είναι παντού.",
					english: "The children's toys are everywhere.",
					marks: [mark("Τα παιχνίδια", "nominative", "neuter", true), mark("των παιδιών", "genitive", "neuter", true)],
				},
			],
			details: [
				{
					label: "Neuters in -μα and -ος",
					text: "Neuters in -μα take -ματος, and neuters in -ος take -ους.",
				},
				{
					label: "When the stress moves",
					text: "In some nouns the stress moves one syllable towards the end: ο οδοντίατρος, του οδοντιάτρου.",
				},
			],
			confuse: {
				text: "The Owner goes after the thing it owns: το σπίτι του Γιάννη.",
				section: "roles/owner",
			},
			drills: ["nominal-noun-owner", "nominal-all-nouns"],
		},
		{
			id: "owner-label",
			title: "The Owner as a label",
			rule: [
				"The Owner is the form a noun takes when it is who something belongs to: του οδοντιάτρου, the dentist's.",
				"On forms, signs and job titles, the Owner often drops its article. It then works like an English noun used as a label.",
			],
			table: {
				columns: [
					{ label: "Label", greek: true },
					{ label: "Meaning" },
					{ label: "Word for word" },
				],
				rows: [
					[cellWith("βοηθός οδοντιάτρου", mark("οδοντιάτρου", "genitive")), "dental assistant", "assistant of dentist"],
					[cellWith("τόπος κατοικίας", mark("κατοικίας", "genitive", "feminine")), "place of residence", "place of living"],
					[cellWith("ημερομηνία γέννησης", mark("γέννησης", "genitive", "feminine")), "date of birth", "date of birth"],
					[cellWith("χρώμα ματιών", mark("ματιών", "genitive", "neuter", true)), "eye colour", "colour of eyes"],
					[cellWith("καταστήματα ρούχων", mark("ρούχων", "genitive", "neuter", true)), "clothes shops", "shops of clothes"],
				],
			},
			examples: [
				{
					greek: "Δουλεύω ως βοηθός οδοντιάτρου.",
					english: "I work as a dental assistant.",
					marks: [mark("οδοντιάτρου", "genitive")],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-owner-label",
					title: "The Owner as a label",
					greek: "τόπος κατοικίας · χρώμα ματιών · καταστήματα ρούχων",
					tests: "A card shows a label with its second noun in the dictionary form, and the Owner form with no article counts as right.",
				},
			],
		},
		{
			id: "calling",
			title: "Calling someone",
			rule: [
				"To call someone by name or title, drop the article.",
				[
					"For one person, use the Target form, the one for who or what the action is done to: τον Γιάννη gives Γιάννη.",
					"For more than one, use the plain form (the Doer form), the one in the dictionary.",
				],
				"Masculines in -ος mostly differ, as the table shows.",
			],
			table: {
				columns: [
					{ label: "Plain form", greek: true },
					{ label: "Calling", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο Γιάννης", "nominative", "masculine"), markedCell("Γιάννη!", "vocative", "masculine"), "Yannis"],
					[markedCell("ο πατέρας", "nominative", "masculine"), markedCell("πατέρα!", "vocative", "masculine"), "father"],
					[markedCell("ο φίλος", "nominative", "masculine"), markedCell("φίλε!", "vocative", "masculine", false), "friend"],
					[markedCell("ο κύριος", "nominative", "masculine"), markedCell("κύριε!", "vocative", "masculine", false), "sir"],
					[markedCell("οι φίλοι", "nominative", "masculine", true), markedCell("φίλοι!", "vocative", "masculine", true), "friends"],
					[markedCell("τα παιδιά", "nominative", "neuter", true), markedCell("παιδιά!", "vocative", "neuter", true), "children"],
				],
			},
			examples: [
				{
					greek: "Γεια σου, Γιάννη!",
					english: "Hi, Yannis!",
					marks: [mark("Γιάννη", "vocative", "masculine")],
				},
				{
					greek: "Παιδιά, ελάτε να φάμε!",
					english: "Kids, come and eat!",
					marks: [mark("Παιδιά", "vocative", "neuter", true)],
				},
			],
			details: [
				{
					label: "Masculines in -ος",
					text: "Masculines in -ος usually end in -ε instead of the Target's -ο. Short first names in -ος keep -ο: Γιώργο, Νίκο.",
					examples: [
						{
							greek: "Τι κάνεις, φίλε;",
							english: "How are you doing, mate?",
							marks: [mark("φίλε", "vocative", "masculine")],
						},
					],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-calling",
					title: "Calling someone",
					greek: "Γιάννη! · πατέρα! · φίλε!",
					tests: "A card shows a noun in its plain form with its article, and the calling form with no article counts as right.",
				},
			],
		},
	],
	reference: [
		{ label: "Every noun pattern", href: "/reference/nouns" },
		{ label: "Articles", href: "/reference/articles" },
	],
};
