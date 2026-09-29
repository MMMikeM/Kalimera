import type { Guide } from "@/types/guide";

export const PLACE_GUIDE: Guide = {
	slug: "place",
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
					["σε + τον → στον", "στον κρεοπώλη", "to the butcher"],
					["σε + τη → στη", "στη δουλειά", "at work"],
					["σε + την → στην", "στην Πάφο", "in Paphos"],
					["σε + το → στο", "στο γραφείο", "at the office"],
					["σε + τα → στα", "στα εστιατόρια", "to the restaurants"],
					["σε + τις → στις", "στις τρεις", "at three o'clock"],
				],
			},
			examples: [
				{ greek: "Μένω στην Πάφο.", english: "I live in Paphos." },
				{ greek: "Χθες έδωσα το βιβλίο στη Μαρία.", english: "Yesterday I gave the book to Maria." },
			],
			confuse: {
				text: "από never merges with the article: από τον, από την, από το.",
				section: "position",
			},
			drills: [],
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
					["δίπλα στο σπίτι", "next to the house"],
					["κοντά στην πόλη", "near the town"],
					["πίσω από τον τοίχο", "behind the wall"],
					["μπροστά από το σπίτι", "in front of the house"],
					["μακριά από την πόλη", "far from the town"],
					["απέναντι από την εκκλησία", "opposite the church"],
				],
			},
			examples: [
				{ greek: "Ποια ταβέρνα είναι κοντά;", english: "Which taverna is near?" },
				{ greek: "Πόσο απέχει από εδώ;", english: "How far is it from here?" },
			],
			drills: [],
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
					["πάω για ψώνια", "I go shopping"],
					["πάω για ύπνο", "I go to sleep"],
					["είμαι από τη Νότια Αφρική", "I'm from South Africa"],
					["δουλεύω από το σπίτι", "I work from home"],
					["με το αυτοκίνητο", "by car"],
					["με τους φίλους μου", "with my friends"],
				],
			},
			examples: [
				{ greek: "Για φαγητό πάμε στα εστιατόρια.", english: "For food we go to restaurants." },
				{
					greek: "Με ποιον πηγαίνεις στις συναυλίες;",
					english: "Who do you go to concerts with?",
				},
			],
			drills: [],
		},
	],
	reference: [{ label: "Prepositions", href: "/reference/prepositions" }],
};
