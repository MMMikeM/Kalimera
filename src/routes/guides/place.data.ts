import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const PLACE_GUIDE: Guide = {
	slug: "place",
	tone: "ocean",
	title: "Place: σε, από, για",
	greek: "Πού",
	description: "Where things are, and where you go",
	idea: "Two small words do most of the work: σε for at, in and to, and από for from. σε joins onto the article after it; από never does.",
	sections: [
		{
			id: "se-contractions",
			title: "σε joins the article: στο, στη, στον",
			rule: "σε means at, in or to, and it merges with the article after it. Feminine στη keeps an extra -ν before a vowel and before sounds like κ, π and τ: στην Αθήνα, στην Πάφο, but στη Λεμεσό.",
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
			confuse: {
				text: "από never merges with the article: από τον, από την, από το.",
				section: "position",
			},
			drills: [],
			plannedDrills: [
				{
					id: "place-se-article",
					title: "σε + the article",
					greek: "στο · στη · στον · στους",
					tests: "Shows σε and a noun with its article; the answer is the joined form, such as στο σπίτι.",
				},
			],
		},
		{
			id: "position",
			title: "Next to, behind, far from",
			rule: "A position word needs a partner to link it to the place. Some take σε, like δίπλα στο σπίτι; others take από, like πίσω από τον τοίχο. Learn each with its partner.",
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
				],
			},
			examples: [
				{
					greek: "Ποια ταβέρνα είναι κοντά;",
					english: "Which taverna is near?",
					marks: [mark("Ποια ταβέρνα", "nominative", "feminine")],
				},
				{ greek: "Πόσο απέχει από εδώ;", english: "How far is it from here?" },
			],
			drills: [],
			plannedDrills: [
				{
					id: "place-position",
					title: "Next to, behind, far from",
					greek: "δίπλα στο · πίσω από το · μακριά από",
					tests: "Shows a position in English; the answer is the Greek phrase with σε or από and the article.",
				},
			],
		},
		{
			id: "purpose",
			title: "For, from, with: για, από, με",
			rule: "για gives the purpose: πάω για ψώνια, I go shopping. από gives where from. με gives how, or who with.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("πάω για ψώνια", mark("ψώνια", "accusative", "neuter", true)), "I go shopping"],
					[cellWith("πάω για ύπνο", mark("ύπνο", "accusative", "masculine")), "I go to sleep"],
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
			drills: [],
			plannedDrills: [
				{
					id: "place-for-from-with",
					title: "For, from, with",
					greek: "για · από · με",
					tests: "Shows an English sentence with one gap; the answer is για, από or με.",
				},
			],
		},
	],
	reference: [{ label: "Prepositions", href: "/reference/prepositions" }],
};
