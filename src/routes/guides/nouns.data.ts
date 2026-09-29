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
			rule: "Masculines in -ος are the biggest family, and the one whose plural Target differs from its plural Doer: οι φίλοι, but τους φίλους.",
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
			rule: "Masculines in -ας and -ης drop the -ς for the Target and the Owner of one. Their plural ends in -ες for the Doer and the Target alike.",
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
			rule: "Feminines use one form for the Doer and the Target, and add -ς for the Owner of one. Their plural ends in -ες for the Doer and the Target alike. A few in -η take -εις instead.",
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
			confuse: {
				text: "η πόλη ends like η ζωή, but its plural is οι πόλεις.",
				section: "extra-syllable",
			},
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "families-o-i",
			title: "Neuter nouns in -ο and -ι",
			rule: "Neuters use one form for the Doer and the Target, one and more than one alike. Nouns in -ο swap it for -α in the plural, and most nouns in -ι add -α: τα παιδιά. The Owner of one ends in -ου.",
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
			rule: "Neuters in -μα add -τ- to every form except the Doer and Target of one. When the stress sits three syllables from the end, it moves one syllable towards the end: το όνομα, τα ονόματα, but το χρώμα, τα χρώματα.",
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
			drills: ["nominative-nouns", "nominal-all-nouns"],
		},
		{
			id: "extra-syllable",
			title: "Plurals with a new ending, like καφέδες and πόλεις",
			rule: "Some nouns, mostly in -άς, -ά, -ές, -ούς and -τζής, add -δ- and a syllable in the plural. A few feminines in -η, such as πόλη, take -εις instead of -ες. Nothing in the ending tells you which: αγάπη gives αγάπες.",
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
			rule: "Many borrowed words keep one form for every job, one and more than one alike, and only the article changes. Most are neuter. Not every borrowed word works this way: ο καφές becomes οι καφέδες.",
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
			rule: "A few things English names as one, Greek names as more than one, so the article and any adjective go plural too: καλοκαιρινές διακοπές. η διακοπή does exist, but it means a break or an interruption.",
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
			rule: "Masculines in -ος and most neuters end in -ου: του φίλου, του παιδιού. Masculines in -ας and -ης drop the -ς: του πατέρα. Feminines add -ς: της γυναίκας, της πόλης. Neuters in -μα take -ματος (του ονόματος), and neuters in -ος take -ους (του λάθους). In the plural every noun that changes ends in -ων. In some nouns the stress moves one syllable towards the end: ο οδοντίατρος, του οδοντιάτρου.",
			table: {
				columns: [
					{ label: "Doer", greek: true },
					{ label: "Owner", greek: true },
					{ label: "Owners", greek: true },
				],
				rows: [
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
				],
			},
			examples: [
				{
					greek: "η μητέρα της Μαρίας",
					english: "Maria's mother",
					marks: [mark("η μητέρα", "nominative", "feminine"), mark("της Μαρίας", "genitive", "feminine")],
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
			rule: "On forms, signs and job titles the Owner often drops its article and works like an English noun used as a label: βοηθός οδοντιάτρου, a dental assistant.",
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
			rule: "To call one person, use the Target form without its article: Γιάννη, πατέρα. Masculines in -ος usually end in -ε instead: φίλε, κύριε. Short first names in -ος keep -ο: Γιώργο, Νίκο. To call more than one, use the Doer form without its article: φίλοι, παιδιά.",
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
