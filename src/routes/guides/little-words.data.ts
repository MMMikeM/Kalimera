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
			rule: "Learn the forms once. After a noun they mean my, your, his. Before a verb they mean to me, to you, to him. With αρέσει they name who likes it. When an adjective comes before the noun, the short word often follows the adjective: το αγαπημένο μου χρώμα. A word stressed on its third-last syllable takes a second accent before the short word: η εκπαίδευση, but την εκπαίδευσή μας.",
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
				{
					greek: "Το αγαπημένο μου χρώμα είναι...",
					english: "My favourite colour is...",
					marks: [mark("μου", "genitive")],
				},
				{
					greek: "Για την εκπαίδευσή μας πάμε ή στα σχολεία ή στα πανεπιστήμια.",
					english: "For our education we go either to schools or to universities.",
					marks: [mark("μας", "genitive", undefined, true)],
				},
			],
			drills: ["pronouns-possessives"],
		},
		{
			id: "likes",
			title: "Liking works backwards: μου αρέσει",
			rule: "In Greek the thing you like does the pleasing, and you are the one it pleases. So the verb agrees with the thing: αρέσει for one thing, αρέσουν for several, αρέσεις when the thing is you. μου φαίνεται (it seems to me) and μου λείπεις (I miss you) work the same way, but νοιάζει takes the Target form: δε με νοιάζει. In speech μου often shortens to μ' before αρέσει, and the short word drops out when it's clear who is meant: Άρεσε;",
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
					[cellWith("μ' αρέσει", mark("μ'", "genitive")), "I like it"],
					["Άρεσε;", "did you like it?"],
					[cellWith("μου φαίνεται", mark("μου", "genitive")), "it seems to me"],
					[cellWith("μου λείπεις", mark("μου", "genitive")), "I miss you"],
					[{ text: "δε με νοιάζει", weight: "deviate", marks: [mark("με", "accusative")] }, "I don't care"],
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
			plannedDrills: [
				{
					id: "pronouns-likes",
					title: "μου αρέσει or μου αρέσουν",
					greek: "μου αρέσει ο καφές · μου αρέσουν τα πάρκα",
					tests: "Shows who likes what in English (I like the parks); the answer uses the short word for the one who likes and matches the verb to the thing liked: μου αρέσουν τα πάρκα.",
				},
			],
		},
		{
			id: "objects",
			title: "Him, her, it: τον, την, το",
			rule: "Once a person or thing has been mentioned, a short Target word stands in for it before the verb: με for me, σε for you, τον for him, την for her, το for it, μας for us, σας for you all, and for them τους, τις or τα, copying the gender of the noun they stand for: τους for masculine nouns or a mix, τις for feminine, τα for neuter.",
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
					[cellWith("μας βλέπει", mark("μας", "accusative", undefined, true)), "he sees us"],
					[cellWith("σας ευχαριστώ", mark("σας", "accusative", undefined, true)), "thank you (I thank you)"],
					[cellWith("τους βλέπω", mark("τους", "accusative", "masculine", true)), "I see them (masculine, or a mix)"],
					[cellWith("τις βλέπω", mark("τις", "accusative", "feminine", true)), "I see them (feminine)"],
					[cellWith("τα βλέπω", mark("τα", "accusative", "neuter", true)), "I see them (neuter)"],
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
				text: "τον, την, τους, τις and τα look like the article. Before a verb they mean him, her or them: τον βλέπω, I see him; τις βλέπω, I see them. Before a noun they are the article: τον φίλο, τις μέρες. After a noun, του, της and τους mean his, her and their: ο φίλος του, το σπίτι τους.",
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
			confuse: {
				text: "μόνο meaning only never changes: χθες είδα μόνο youtube, yesterday I only watched YouTube. μόνος is an adjective and agrees: alone (μένει μόνη, she lives alone), the only one (η μόνη λύση), or by myself with a short word after it (μόνος μου, μόνη της, μόνο του).",
				section: "scales/quantity",
			},
			drills: [],
			plannedDrills: [
				{
					id: "pronouns-own-alone",
					title: "δικός μου, μόνος μου",
					greek: "είναι δικό μου · μόνος μου · μόνη της",
					tests: "Shows the English and who is meant (by herself); the answer is δικός or μόνος in the right gender with the short word: μόνη της.",
				},
			],
		},
		{
			id: "long-forms",
			title: "I, me, this one: εγώ, εμένα, αυτός",
			rule: "The verb ending already says who, so εγώ, εσύ and the rest usually drop out: θέλω is I want. They come back for contrast. After για, με, από or χωρίς the short με and σε can't stand, so use the long εμένα and εσένα, often shortened to μένα and σένα: για μένα, not για με. αυτός, αυτή, αυτό mean he, she, it, and also this. For men, or a mix of men and women, the plural is αυτοί; for women only, αυτές; for things, αυτά.",
			table: {
				columns: [
					{ label: "Doer", greek: true },
					{ label: "After a preposition", greek: true },
					{ label: "Who" },
				],
				rows: [
					[
						markedCell("εγώ", "nominative", undefined, false, "anchor"),
						cellWith("για μένα", mark("μένα", "accusative")),
						"I, me",
					],
					[markedCell("εσύ", "nominative"), cellWith("με σένα", mark("σένα", "accusative")), "you"],
					[
						markedCell("αυτός", "nominative", "masculine"),
						cellWith("από αυτόν", mark("αυτόν", "accusative", "masculine")),
						"he, him",
					],
					[
						markedCell("αυτή", "nominative", "feminine"),
						cellWith("με αυτήν", mark("αυτήν", "accusative", "feminine")),
						"she, her",
					],
					[
						markedCell("εμείς", "nominative", undefined, true),
						cellWith("χωρίς εμάς", mark("εμάς", "accusative", undefined, true)),
						"we, us",
					],
				],
			},
			examples: [
				{
					greek: "Εγώ θέλω τσάι, εσύ;",
					english: "I want tea; and you?",
					marks: [mark("Εγώ", "nominative"), mark("εσύ", "nominative")],
				},
				{
					greek: "Δεν συμφωνώ με εσένα.",
					english: "I don't agree with you.",
					marks: [mark("εσένα", "accusative")],
				},
				{
					greek: "Αυτό είναι για σένα.",
					english: "This is for you.",
					marks: [mark("Αυτό", "nominative", "neuter"), mark("σένα", "accusative")],
				},
				{
					greek: "Ποιο είναι αυτό το παιδί;",
					english: "Who is this child?",
					marks: [mark("αυτό το παιδί", "nominative", "neuter")],
				},
				{
					greek: "Αυτοί είναι αδέλφια.",
					english: "These are siblings. (a brother and a sister)",
					marks: [mark("Αυτοί", "nominative", "masculine", true)],
				},
			],
			confuse: {
				text: "Before a verb the short form: με βλέπει, he sees me. After a preposition the long one: για μένα, for me.",
				section: "objects",
			},
			drills: [],
			plannedDrills: [
				{
					id: "pronouns-long-forms",
					title: "After a preposition: για μένα",
					greek: "για μένα · με σένα · από αυτόν",
					tests: "Shows a preposition and a person in English (for me); the answer is the preposition with the long form, για μένα, and για με counts as wrong.",
				},
			],
		},
		{
			id: "polite",
			title: "Polite you: σας and the plural verb",
			rule: "With strangers, older people and in shops, speak to one person as you would to several: the verb takes its you-all ending and the short word is σας. So Γεια σου becomes Γεια σας, and a friend's Θέλεις κάτι; is a stranger's Θέλετε κάτι;",
			table: {
				columns: [
					{ label: "Friendly", greek: true },
					{ label: "Polite", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[
						cellWith("Γεια σου", mark("σου", "genitive")),
						cellWith("Γεια σας", mark("σας", "genitive", undefined, true)),
						"hello",
					],
					["Θέλεις κάτι;", "Θέλετε κάτι;", "do you want anything?"],
					["Καλώς ήρθες", "Καλώς ήρθατε", "welcome"],
					["Κάτσε", "Καθίστε", "sit down"],
					[
						cellWith("Πώς σε λένε;", mark("σε", "accusative")),
						cellWith("Πώς σας λένε;", mark("σας", "accusative", undefined, true)),
						"what's your name?",
					],
				],
			},
			examples: [
				{
					greek: "Συγγνώμη, μπορείτε να με βοηθήσετε;",
					english: "Excuse me, can you help me?",
					marks: [mark("με", "accusative")],
				},
				{
					greek: "Θέλετε να σας δείξω τον δρόμο;",
					english: "Do you want me to show you the way?",
					marks: [mark("σας", "genitive", undefined, true), mark("τον δρόμο", "accusative", "masculine")],
				},
				{
					greek: "Σας ευχαριστώ.",
					english: "Thank you.",
					marks: [mark("Σας", "accusative", undefined, true)],
				},
			],
			confuse: {
				text: "Polite you and you all use the same verb and the same σας: Γεια σας greets one stranger or a group of friends.",
				section: "forms",
			},
			drills: ["blocks-chunks"],
			plannedDrills: [
				{
					id: "pronouns-polite-you",
					title: "Polite you",
					greek: "Θέλεις → Θέλετε · Γεια σου → Γεια σας",
					tests: "Shows a friendly phrase such as Θέλεις κάτι; and asks for the polite form; the answer is Θέλετε κάτι;.",
				},
			],
		},
		{
			id: "where-it-goes",
			title: "Where the little word goes",
			rule: "The short word sits right before the verb, with θα, να and δεν in front of both: θα με κοιτάξει, δεν το παίρνει. After a command, unless it starts with μη, it follows the verb instead: δώσε μου, κοίτα με. When two come before the verb, the person goes first: μου το δίνει. A Target already named is often picked up again by the short word: τον φίλο μου τον λένε Γιώργο. με λένε, my name is, is literally they call me.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("θα με κοιτάξει", mark("με", "accusative")), "he will look at me"],
					[cellWith("δεν το παίρνει", mark("το", "accusative", "neuter")), "he isn't taking it"],
					[{ text: "δώσε μου", weight: "deviate", marks: [mark("μου", "genitive")] }, "give me"],
					[{ text: "κοίτα με", weight: "deviate", marks: [mark("με", "accusative")] }, "look at me"],
					[{ text: "πάρε το", weight: "deviate", marks: [mark("το", "accusative", "neuter")] }, "take it"],
					[{ text: "άκουσέ μας", weight: "deviate", marks: [mark("μας", "accusative", undefined, true)] }, "listen to us"],
					[cellWith("μου το δίνει", mark("μου", "genitive"), mark("το", "accusative", "neuter")), "he gives it to me"],
					[cellWith("με λένε", mark("με", "accusative")), "my name is"],
				],
			},
			examples: [
				{
					greek: "Δώσε μου το νερό.",
					english: "Give me the water.",
					marks: [mark("μου", "genitive"), mark("το νερό", "accusative", "neuter")],
				},
				{
					greek: "Μπορούμε να του το δώσουμε;",
					english: "Can we give it to him?",
					marks: [mark("του", "genitive", "masculine"), mark("το", "accusative", "neuter")],
				},
				{
					greek: "Τον φίλο μου τον λένε Γιώργο.",
					english: "My friend is called Giorgos.",
					marks: [mark("Τον φίλο", "accusative", "masculine"), mark("τον", "accusative", "masculine")],
				},
				{
					greek: "Το παιδί το λένε Λουκά.",
					english: "The child is called Loukas.",
					marks: [mark("Το παιδί", "accusative", "neuter"), mark("το", "accusative", "neuter")],
				},
			],
			drills: ["pronouns-placement"],
			plannedDrills: [
				{
					id: "pronouns-two-together",
					title: "Two short words: μου το δίνει",
					greek: "μου το δίνει · του το δίνω · σου τα φέρνω",
					tests: "Shows a sentence in English with a person and a thing (he gives it to me); the answer puts both short words before the verb, person first: μου το δίνει.",
				},
			],
		},
	],
	reference: [{ label: "Pronouns", href: "/reference/pronouns" }],
};
