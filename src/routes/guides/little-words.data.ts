import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const LITTLE_WORDS_GUIDE: Guide = {
	slug: "little-words",
	tone: "honey",
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
					[markedCell("μου", "genitive", undefined, false, "anchor"), "το σπίτι μου", "μου μιλάς", "I, me"],
					[markedCell("σου", "genitive"), "το σπίτι σου", "σου μιλάω", "you"],
					[markedCell("του", "genitive"), "το σπίτι του", "του μιλάει", "he, him"],
					[markedCell("της", "genitive", "feminine"), "το σπίτι της", "της μιλάει", "she, her"],
					[markedCell("μας", "genitive", undefined, true), "το σπίτι μας", "μας μιλάει", "we, us"],
					[markedCell("σας", "genitive", undefined, true), "το σπίτι σας", "σας μιλάω", "you all"],
					[markedCell("τους", "genitive", undefined, true), "το σπίτι τους", "τους μιλάει", "they, them"],
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
					[
						{
							text: "μου αρέσει ο καφές",
							weight: "anchor",
							marks: [mark("μου", "genitive"), mark("ο καφές", "nominative", "masculine")],
						},
						"I like coffee",
					],
					[
						{
							text: "μου αρέσουν τα πάρκα",
							weight: "deviate",
							marks: [mark("μου", "genitive"), mark("τα πάρκα", "nominative", "neuter", true)],
						},
						"I like the parks",
					],
					[cellWith("σου αρέσει;", mark("σου", "genitive")), "do you like it?"],
					[cellWith("δεν μου αρέσει", mark("μου", "genitive")), "I don't like it"],
					[{ text: "μου αρέσεις", weight: "deviate", marks: [mark("μου", "genitive")] }, "I like you"],
				],
			},
			examples: [
				{
					greek: "Μου αρέσουν τα παλιά τραγούδια.",
					english: "I like old songs.",
					marks: [mark("Μου", "genitive"), mark("τα παλιά τραγούδια", "nominative", "neuter", true)],
				},
				{
					greek: "Σου αρέσει η δουλειά σου;",
					english: "Do you like your job?",
					marks: [mark("Σου", "genitive"), mark("η δουλειά", "nominative", "feminine")],
				},
				{
					greek: "Δεν του αρέσει να κάνει μπάνιο.",
					english: "He doesn't like having a bath.",
					marks: [mark("του", "genitive", "masculine")],
				},
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
					[cellWith("με βλέπεις;", mark("με", "accusative")), "can you see me?"],
					[cellWith("τον ξυπνάω", mark("τον", "accusative", "masculine")), "I wake him up"],
					[cellWith("την ξέρω", mark("την", "accusative", "feminine")), "I know her"],
					[cellWith("το θέλω", mark("το", "accusative", "neuter")), "I want it"],
					[cellWith("τους βλέπω", mark("τους", "accusative", "masculine", true)), "I see them"],
					[cellWith("πώς τον λένε;", mark("τον", "accusative", "masculine")), "what's his name?"],
				],
			},
			examples: [
				{
					greek: "Τον ξυπνάω και τον ταΐζω.",
					english: "I wake him up and feed him.",
					marks: [mark("Τον", "accusative", "masculine"), mark("τον", "accusative", "masculine")],
				},
				{
					greek: "Πώς το λένε στα ελληνικά;",
					english: "What's it called in Greek?",
					marks: [mark("το", "accusative", "neuter"), mark("στα ελληνικά", "accusative", "neuter", true)],
				},
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
					[cellWith("η δική σου τσάντα", mark("η δική", "nominative", "feminine")), "your own bag"],
					[cellWith("μόνος μου", mark("μόνος", "nominative", "masculine")), "by myself (a man)"],
					[cellWith("μόνη μου", mark("μόνη", "nominative", "feminine")), "by myself (a woman)"],
					[cellWith("μόνοι μας", mark("μόνοι", "nominative", "masculine", true)), "by ourselves"],
				],
			},
			examples: [
				{
					greek: "Δουλεύω μόνος μου.",
					english: "I work by myself.",
					marks: [mark("μόνος", "nominative", "masculine")],
				},
				{
					greek: "Δουλεύει μόνη της.",
					english: "She works by herself.",
					marks: [mark("μόνη", "nominative", "feminine")],
				},
			],
			drills: [],
		},
	],
	reference: [{ label: "Pronouns", href: "/reference/pronouns" }],
};
