import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

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
			rule: "Nouns fall into families by gender and ending, and each family changes its forms in its own way. A masculine noun in -ος, like ο φίλος (friend), changes its article and ending for each job it does: the Doer does the action, the Target is what the action is done to, and the Owner is who something belongs to. The table shows all three, for one and for more than one. Masculines in -ος are the biggest family, and the one whose plural Target differs from its plural Doer: οι φίλοι, but τους φίλους.",
			table: {
				columns: [
					{ label: "Job" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("ο φίλος", "nominative", "masculine", false, "anchor"), markedCell("οι φίλοι", "nominative", "masculine", true)],
					["Target", markedCell("τον φίλο", "accusative", "masculine"), markedCell("τους φίλους", "accusative", "masculine", true, "deviate")],
					["Owner", markedCell("του φίλου", "genitive", "masculine"), markedCell("των φίλων", "genitive", "masculine", true)],
				],
			},
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-as-is",
			title: "Masculine nouns in -ας and -ης",
			rule: "A masculine noun in -ας or -ης, like ο πατέρας (father) or ο μαθητής (pupil), changes its ending for each job it does (Doer: who acts; Target: what the action is done to; Owner: whose). For one, it drops the -ς for the Target and the Owner: τον πατέρα, του πατέρα. Its plural ends in -ες for the Doer and the Target alike: οι πατέρες, τους πατέρες.",
			table: {
				columns: [
					{ label: "Job" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("ο πατέρας", "nominative", "masculine", false, "anchor"), markedCell("οι πατέρες", "nominative", "masculine", true)],
					["Target", markedCell("τον πατέρα", "accusative", "masculine", false, "deviate"), markedCell("τους πατέρες", "accusative", "masculine", true)],
					["Owner", markedCell("του πατέρα", "genitive", "masculine", false, "deviate"), markedCell("των πατέρων", "genitive", "masculine", true)],
					["Doer", markedCell("ο μαθητής", "nominative", "masculine", false, "anchor"), markedCell("οι μαθητές", "nominative", "masculine", true)],
					["Target", markedCell("τον μαθητή", "accusative", "masculine", false, "deviate"), markedCell("τους μαθητές", "accusative", "masculine", true)],
					["Owner", markedCell("του μαθητή", "genitive", "masculine", false, "deviate"), markedCell("των μαθητών", "genitive", "masculine", true)],
				],
			},
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-a-i",
			title: "Feminine nouns in -α and -η",
			rule: "A feminine noun in -α or -η, like η γυναίκα (woman) or η ζωή (life), changes its article, and sometimes its ending, for each job it does (Doer: who acts; Target: what the action is done to; Owner: whose). For one, the Doer and the Target share a form, and the Owner adds -ς: της γυναίκας. The plural ends in -ες for the Doer and the Target alike: οι γυναίκες, τις γυναίκες.",
			table: {
				columns: [
					{ label: "Job" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("η γυναίκα", "nominative", "feminine", false, "anchor"), markedCell("οι γυναίκες", "nominative", "feminine", true)],
					["Target", markedCell("τη γυναίκα", "accusative", "feminine"), markedCell("τις γυναίκες", "accusative", "feminine", true)],
					["Owner", markedCell("της γυναίκας", "genitive", "feminine", false, "deviate"), markedCell("των γυναικών", "genitive", "feminine", true)],
					["Doer", markedCell("η ζωή", "nominative", "feminine", false, "anchor"), markedCell("οι ζωές", "nominative", "feminine", true)],
					["Target", markedCell("τη ζωή", "accusative", "feminine"), markedCell("τις ζωές", "accusative", "feminine", true)],
					["Owner", markedCell("της ζωής", "genitive", "feminine", false, "deviate"), markedCell("των ζωών", "genitive", "feminine", true)],
				],
			},
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
			rule: "A neuter noun in -ο or -ι, like το βιβλίο (book) or το παιδί (child), changes its ending for some of the jobs it does (Doer: who acts; Target: what the action is done to; Owner: whose). Neuters use one form for the Doer and the Target, one and more than one alike. Nouns in -ο swap it for -α in the plural: τα βιβλία. Most nouns in -ι add -α: τα παιδιά. The Owner of one ends in -ου: του βιβλίου, του παιδιού.",
			table: {
				columns: [
					{ label: "Job" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("το βιβλίο", "nominative", "neuter", false, "anchor"), markedCell("τα βιβλία", "nominative", "neuter", true)],
					["Target", markedCell("το βιβλίο", "accusative", "neuter"), markedCell("τα βιβλία", "accusative", "neuter", true)],
					["Owner", markedCell("του βιβλίου", "genitive", "neuter", false, "deviate"), markedCell("των βιβλίων", "genitive", "neuter", true)],
					["Doer", markedCell("το παιδί", "nominative", "neuter", false, "anchor"), markedCell("τα παιδιά", "nominative", "neuter", true)],
					["Target", markedCell("το παιδί", "accusative", "neuter"), markedCell("τα παιδιά", "accusative", "neuter", true)],
					["Owner", markedCell("του παιδιού", "genitive", "neuter", false, "deviate"), markedCell("των παιδιών", "genitive", "neuter", true)],
				],
			},
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-ma",
			title: "Neuter nouns in -μα",
			rule: "A neuter noun in -μα, like το όνομα (name), changes its ending for some of the jobs it does (Doer: who acts; Target: what the action is done to; Owner: whose). The Doer and Target of one keep the -μα. Every other form adds -τ- before its ending: τα ονόματα, του ονόματος, των ονομάτων.",
			table: {
				columns: [
					{ label: "Job" },
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
				],
				rows: [
					["Doer", markedCell("το όνομα", "nominative", "neuter", false, "anchor"), markedCell("τα ονόματα", "nominative", "neuter", true, "deviate")],
					["Target", markedCell("το όνομα", "accusative", "neuter"), markedCell("τα ονόματα", "accusative", "neuter", true, "deviate")],
					["Owner", markedCell("του ονόματος", "genitive", "neuter", false, "deviate"), markedCell("των ονομάτων", "genitive", "neuter", true, "deviate")],
				],
			},
			details: [
				{
					label: "Where the stress goes",
					text: "When the stress sits three syllables from the end, as in όνομα, it moves one syllable towards the end. χρώμα, stressed two from the end, keeps its stress where it is.",
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
			rule: "A few nouns make their plural (the form for more than one) with an ending you wouldn't guess from the form for one. Some nouns, mostly in -άς, -ά, -ές, -ούς and -τζής, add -δ- and a syllable in the plural: ο καφές, οι καφέδες. A few feminines in -η, such as πόλη, take -εις instead of -ες: η πόλη, οι πόλεις. The table shows the common ones.",
			table: {
				columns: [
					{ label: "One", greek: true },
					{ label: "More than one", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο καφές", "nominative", "masculine"), markedCell("οι καφέδες", "nominative", "masculine", true, "deviate"), "coffee"],
					[markedCell("η γιαγιά", "nominative", "feminine"), markedCell("οι γιαγιάδες", "nominative", "feminine", true, "deviate"), "grandmother"],
					[markedCell("ο μπαμπάς", "nominative", "masculine"), markedCell("οι μπαμπάδες", "nominative", "masculine", true, "deviate"), "dad"],
					[markedCell("ο παππούς", "nominative", "masculine"), markedCell("οι παππούδες", "nominative", "masculine", true, "deviate"), "grandfather"],
					[markedCell("ο ταξιτζής", "nominative", "masculine"), markedCell("οι ταξιτζήδες", "nominative", "masculine", true, "deviate"), "taxi driver"],
					[markedCell("η πόλη", "nominative", "feminine"), markedCell("οι πόλεις", "nominative", "feminine", true, "deviate"), "city"],
				],
			},
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
					tests: "A card shows a noun with its article in the one form, and the plural Doer with its article counts as right.",
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
					greek: "έχω ραντεβού",
					english: "I have an appointment",
					marks: [mark("ραντεβού", "accusative", "neuter")],
				},
				{
					greek: "βγάζω φωτογραφίες και βίντεο",
					english: "I take photos and videos",
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
			rule: "A few things English names as one, Greek names as more than one, so the article and any adjective go plural too: καλοκαιρινές διακοπές, a summer holiday.",
			table: {
				columns: [
					{ label: "Doer", greek: true },
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
					greek: "κάνω διακοπές",
					english: "I'm on holiday",
					marks: [mark("διακοπές", "accusative", "feminine", true)],
				},
				{
					greek: "κάνω τα ψώνια στο σούπερ μάρκετ",
					english: "I do the shopping at the supermarket",
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
			rule: "The Owner is the form a noun takes when it is who something belongs to, like of or 's in English. Its ending depends on the noun's gender and ending. Masculines in -ος and most neuters end in -ου: του φίλου, του παιδιού. Masculines in -ας and -ης drop the -ς: του πατέρα. Feminines add -ς: της γυναίκας, της πόλης. In the plural every noun that changes ends in -ων: των φίλων, των γυναικών.",
			table: {
				columns: [
					{ label: "Doer", greek: true },
					{ label: "Owner", greek: true },
					{ label: "Owners", greek: true },
				],
				rows: [
					[
						markedCell("ο φίλος", "nominative", "masculine", false, "anchor"),
						markedCell("του φίλου", "genitive", "masculine"),
						markedCell("των φίλων", "genitive", "masculine", true),
					],
					[
						markedCell("ο πατέρας", "nominative", "masculine", false, "anchor"),
						markedCell("του πατέρα", "genitive", "masculine"),
						markedCell("των πατέρων", "genitive", "masculine", true),
					],
					[
						markedCell("η γυναίκα", "nominative", "feminine", false, "anchor"),
						markedCell("της γυναίκας", "genitive", "feminine"),
						markedCell("των γυναικών", "genitive", "feminine", true),
					],
					[
						markedCell("η πόλη", "nominative", "feminine", false, "anchor"),
						markedCell("της πόλης", "genitive", "feminine"),
						markedCell("των πόλεων", "genitive", "feminine", true),
					],
					[
						markedCell("το παιδί", "nominative", "neuter", false, "anchor"),
						markedCell("του παιδιού", "genitive", "neuter"),
						markedCell("των παιδιών", "genitive", "neuter", true),
					],
					[
						markedCell("το όνομα", "nominative", "neuter", false, "anchor"),
						markedCell("του ονόματος", "genitive", "neuter", false, "deviate"),
						markedCell("των ονομάτων", "genitive", "neuter", true),
					],
					[
						markedCell("το λάθος", "nominative", "neuter", false, "anchor"),
						markedCell("του λάθους", "genitive", "neuter", false, "deviate"),
						markedCell("των λαθών", "genitive", "neuter", true),
					],
				],
			},
			examples: [
				{
					greek: "η μητέρα της Μαρίας",
					english: "Maria's mother",
					marks: [mark("η μητέρα", "nominative", "feminine"), mark("της Μαρίας", "genitive", "feminine")],
				},
			],
			details: [
				{
					label: "Neuters in -μα and -ος",
					text: "Neuters in -μα take -ματος (του ονόματος), and neuters in -ος take -ους (του λάθους).",
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
			rule: "The Owner is the form a noun takes when it is who something belongs to: του οδοντιάτρου, the dentist's. On forms, signs and job titles the Owner often drops its article and works like an English noun used as a label: βοηθός οδοντιάτρου, a dental assistant.",
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
			rule: "To call someone by name or title, drop the article. To call one person, use the Target form, the one for what the action is done to: τον Γιάννη gives Γιάννη, τον πατέρα gives πατέρα. Masculines in -ος mostly differ, as the table shows. To call more than one, use the Doer form, the one for who does the action: οι φίλοι gives φίλοι, τα παιδιά gives παιδιά.",
			table: {
				columns: [
					{ label: "Doer", greek: true },
					{ label: "Calling", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("ο Γιάννης", "nominative", "masculine"), markedCell("Γιάννη!", "vocative", "masculine"), "Yannis"],
					[markedCell("ο πατέρας", "nominative", "masculine"), markedCell("πατέρα!", "vocative", "masculine"), "father"],
					[markedCell("ο φίλος", "nominative", "masculine"), markedCell("φίλε!", "vocative", "masculine", false, "deviate"), "friend"],
					[markedCell("ο κύριος", "nominative", "masculine"), markedCell("κύριε!", "vocative", "masculine", false, "deviate"), "sir"],
					[markedCell("τα παιδιά", "nominative", "neuter", true), markedCell("παιδιά!", "vocative", "neuter", true), "children"],
				],
			},
			examples: [
				{
					greek: "Γεια σου, Γιάννη!",
					english: "Hi, Yannis!",
					marks: [mark("Γιάννη", "vocative", "masculine")],
				},
			],
			details: [
				{
					label: "Masculines in -ος",
					text: "Masculines in -ος usually end in -ε instead of the Target's -ο: φίλε, κύριε. Short first names in -ος keep -ο: Γιώργο, Νίκο.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "nouns-calling",
					title: "Calling someone",
					greek: "Γιάννη! · πατέρα! · φίλε!",
					tests: "A card shows a noun with its Doer article, and the calling form with no article counts as right.",
				},
			],
		},
	],
	reference: [
		{ label: "Every noun pattern", href: "/reference/nouns" },
		{ label: "Articles", href: "/reference/articles" },
	],
};
