import type { Guide } from "@/types/guide";

export const LITTLE_WORDS_GUIDE: Guide = {
	slug: "little-words",
	title: "The little words: μου, σου, του",
	greek: "Μικρές λέξεις",
	description: "One set of short words doing three jobs",
	idea: "The short words μου, σου, του and the rest do three jobs: my, to me, and the one who likes. After a noun they say whose it is; before a verb they say who it is for.",
	sections: [
		{
			id: "forms",
			title: "One set of forms, three jobs",
			rule: "Learn the forms once. After a noun they mean my, your, his. Before a verb they mean to me, to you, to him. With αρέσει they name who likes it.",
			table: {
				columns: [
					{ label: "Form", greek: true },
					{ label: "After a noun", greek: true },
					{ label: "Before a verb", greek: true },
					{ label: "Who" },
				],
				rows: [
					[{ text: "μου", weight: "anchor" }, "το σπίτι μου", "μου μιλάς", "I, me"],
					["σου", "το σπίτι σου", "σου μιλάω", "you"],
					["του", "το σπίτι του", "του μιλάει", "he, him"],
					["της", "το σπίτι της", "της μιλάει", "she, her"],
					["μας", "το σπίτι μας", "μας μιλάει", "we, us"],
					["σας", "το σπίτι σας", "σας μιλάω", "you all"],
					["τους", "το σπίτι τους", "τους μιλάει", "they, them"],
				],
			},
			examples: [
				{ greek: "Δώσε μου.", english: "Give me." },
				{ greek: "Σου μιλάω.", english: "I'm talking to you." },
				{ greek: "Μου λείπεις.", english: "I miss you. (literally: you are missing to me)" },
			],
			drills: ["pronouns-possessives"],
		},
		{
			id: "likes",
			title: "Liking works backwards: μου αρέσει",
			rule: "In Greek the thing you like does the pleasing, and you are the one it pleases. So the verb agrees with the thing: αρέσει for one thing, αρέσουν for several, αρέσεις when the thing is you.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[{ text: "μου αρέσει ο καφές", weight: "anchor" }, "I like coffee"],
					[{ text: "μου αρέσουν τα πάρκα", weight: "deviate" }, "I like the parks"],
					["σου αρέσει;", "do you like it?"],
					["δεν μου αρέσει", "I don't like it"],
					[{ text: "μου αρέσεις", weight: "deviate" }, "I like you"],
				],
			},
			examples: [
				{ greek: "Μου αρέσουν τα παλιά τραγούδια.", english: "I like old songs." },
				{ greek: "Σου αρέσει η δουλειά σου;", english: "Do you like your job?" },
				{ greek: "Δεν του αρέσει να κάνει μπάνιο.", english: "He doesn't like having a bath." },
			],
			drills: [],
		},
		{
			id: "objects",
			title: "Him, her, it: τον, την, το",
			rule: "Once a person or thing has been mentioned, a short Target word stands in for it before the verb: με for me, σε for you, τον for him, την for her, το for it, τους for them.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["με βλέπεις;", "can you see me?"],
					["τον ξυπνάω", "I wake him up"],
					["την ξέρω", "I know her"],
					["το θέλω", "I want it"],
					["τους βλέπω", "I see them"],
					["πώς τον λένε;", "what's his name?"],
				],
			},
			examples: [
				{ greek: "Τον ξυπνάω και τον ταΐζω.", english: "I wake him up and feed him." },
				{ greek: "Πώς το λένε στα ελληνικά;", english: "What's it called in Greek?" },
			],
			confuse: {
				text: "Before a verb τον means him: τον βλέπω, I see him. Before a noun it is the article: τον φίλο, the friend.",
				section: "roles/articles",
			},
			drills: ["pronouns-object", "pronouns-placement"],
		},
		{
			id: "own-alone",
			title: "Mine, and by myself",
			rule: "For emphasis, δικός goes before the short word: ο δικός μου καφές, my own coffee; είναι δικό μου, it's mine. δικός takes the gender of the thing owned. μόνος with the short word means by myself, and takes the gender of the person.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["είναι δικό μου", "it's mine"],
					["η δική σου τσάντα", "your own bag"],
					["μόνος μου", "by myself (a man)"],
					["μόνη μου", "by myself (a woman)"],
					["μόνοι μας", "by ourselves"],
				],
			},
			examples: [
				{ greek: "Δουλεύω μόνος μου.", english: "I work by myself." },
				{ greek: "Δουλεύει μόνη της.", english: "She works by herself." },
			],
			drills: [],
		},
	],
	reference: [{ label: "Pronouns", href: "/reference/pronouns" }],
};
