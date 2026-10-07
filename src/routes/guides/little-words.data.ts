import { cellWith, mark, markedCell } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const LITTLE_WORDS_GUIDE: Guide = {
	slug: "little-words",
	tone: "honey",
	title: "The little words μου, σου, του",
	greek: "Μικρές λέξεις",
	description: "One set of short words doing three jobs",
	idea: "The short words μου, σου, του and the rest do two jobs. After a noun they say whose it is: my, your, his. Before a verb they say to whom: to me, to you, to him, which is also how Greek says who likes something.",
	sections: [
		{
			id: "forms",
			title: "The same forms for my and to me",
			rule: [
				"μου, σου, του and the rest are short words for people. The table has all seven. The same word does two jobs:",
				[
					"After a noun, it says whose: my, your, his.",
					"Before a verb, it says to whom: to me, to you, to him.",
				],
				"In both jobs the word is in its Owner form, so its mark shows the Owner even when it means to me.",
				"Liking uses the second job: μου αρέσει, it pleases me.",
			],
			table: {
				columns: [
					{ label: "Short word", greek: true },
					{ label: "After a noun", greek: true },
					{ label: "Before a verb", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[markedCell("μου", "genitive", undefined, false), "το σπίτι μου", "μου μιλάς", "my · to me"],
					[markedCell("σου", "genitive"), "το σπίτι σου", "σου μιλάω", "your · to you"],
					[markedCell("του", "genitive"), "το σπίτι του", "του μιλάει", "his · to him"],
					[markedCell("της", "genitive", "feminine"), "το σπίτι της", "της μιλάει", "her · to her"],
					[markedCell("μας", "genitive", undefined, true), "το σπίτι μας", "μας μιλάει", "our · to us"],
					[markedCell("σας", "genitive", undefined, true), "το σπίτι σας", "σας μιλάω", "your · to you (more than one)"],
					[markedCell("τους", "genitive", undefined, true), "το σπίτι τους", "τους μιλάει", "their · to them"],
				],
			},
			examples: [
				{ greek: "Πού είναι τα κλειδιά μου;", english: "Where are my keys?", marks: [mark("μου", "genitive")] },
				{ greek: "Σου μιλάω.", english: "I'm talking to you.", marks: [mark("Σου", "genitive")] },
				{
					greek: "Η μητέρα μου μού τηλεφωνεί κάθε μέρα.",
					english: "My mother phones me every day. (the first μου is my; the second, to me, takes an accent so the two don't run together)",
					marks: [mark("μου", "genitive"), mark("μού", "genitive")],
				},
			],
			details: [
				{
					label: "After an adjective",
					text: "When an adjective comes before the noun, the short word often follows the adjective instead.",
					examples: [
						{
							greek: "Το αγαπημένο μου χρώμα είναι το μπλε.",
							english: "My favourite colour is blue.",
							marks: [mark("μου", "genitive")],
						},
					],
				},
				{
					label: "A second accent",
					text: "A word stressed on its third-last syllable takes a second accent, on its last syllable, before the short word: η εκπαίδευση, but την εκπαίδευσή μας.",
					examples: [
						{
							greek: "Το τηλέφωνό μου δε δουλεύει.",
							english: "My phone isn't working.",
							marks: [mark("μου", "genitive")],
						},
						{
							greek: "Για την εκπαίδευσή μας πάμε ή στα σχολεία ή στα πανεπιστήμια.",
							english: "For our education we go either to schools or to universities.",
							marks: [mark("μας", "genitive", undefined, true)],
						},
					],
				},
			],
			drills: ["pronouns-possessives"],
		},
		{
			id: "likes",
			title: "Liking with μου αρέσει",
			rule: [
				"αρέσει means pleases. Greek doesn't say I like coffee; it says coffee pleases me: μου αρέσει ο καφές.",
				"So the thing liked is the Doer, because it does the pleasing, and it takes the Doer form: ο καφές, not τον καφέ. The person who likes is the to-me word before the verb: μου, σου, του and the rest.",
				"Don't ask _I like what?_, which leads to a Target. Ask _what pleases me?_",
				"The verb agrees with the thing liked:",
				[
					"one thing: αρέσει",
					"more than one: αρέσουν",
					"you: αρέσεις, as in μου αρέσεις, I like you",
				],
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[
						{
							text: "μου αρέσει ο καφές",
							marks: [mark("μου", "genitive"), mark("ο καφές", "nominative", "masculine")],
						},
						"I like coffee",
					],
					[
						{
							text: "μου αρέσουν οι γάτες",
							marks: [mark("μου", "genitive"), mark("οι γάτες", "nominative", "feminine", true)],
						},
						"I like cats",
					],
					[{ text: "μου αρέσεις", marks: [mark("μου", "genitive")] }, "I like you"],
					[cellWith("σου αρέσει;", mark("σου", "genitive")), "do you like it?"],
					[cellWith("δε μου αρέσει", mark("μου", "genitive")), "I don't like it"],
				],
			},
			examples: [
				{
					greek: "Της αρέσουν οι γάτες, αλλά δεν της αρέσουν οι σκύλοι.",
					english: "She likes cats but not dogs. (the cats and dogs do the pleasing, so οι σκύλοι, not τους σκύλους)",
					marks: [
						mark("Της", "genitive"),
						mark("οι γάτες", "nominative", "feminine", true),
						mark("της", "genitive"),
						mark("οι σκύλοι", "nominative", "masculine", true),
					],
				},
				{
					greek: "Σου αρέσει ο καφές εδώ;",
					english: "Do you like the coffee here?",
					marks: [mark("Σου", "genitive"), mark("ο καφές", "nominative", "masculine")],
				},
				{
					greek: "Δεν του αρέσει να κάνει μπάνιο.",
					english: "He doesn't like having a bath. (with να and a verb, αρέσει stays as it is)",
					marks: [mark("του", "genitive")],
				},
			],
			details: [
				{
					label: "Verbs that work the same way",
					text: "φαίνεται (seems) and λείπει (is missing) work the same way: the person takes the short word, and the thing is the Doer, so the verb agrees with it.",
					examples: [
						{
							greek: "Μου φαίνεται ότι βρέχει.",
							english: "It seems to me it's raining.",
							marks: [mark("Μου", "genitive")],
						},
						{
							greek: "Μου λείπεις.",
							english: "I miss you. (literally: you are missing to me)",
							marks: [mark("Μου", "genitive")],
						},
						{
							greek: "Μου λείπουν τα παιδιά.",
							english: "I miss the children.",
							marks: [mark("Μου", "genitive"), mark("τα παιδιά", "nominative", "neuter", true)],
						},
					],
				},
				{
					label: "With νοιάζει",
					text: "νοιάζει (concerns) takes με instead of μου: δε με νοιάζει, it doesn't concern me.",
					examples: [
						{
							greek: "Δε με νοιάζει τι λένε.",
							english: "I don't care what they say.",
							marks: [mark("με", "accusative")],
						},
					],
				},
				{
					label: "In speech",
					text: [
						"μου often shortens to μ' before αρέσει.",
						"The short word drops out altogether when it's clear who is meant.",
					],
					examples: [
						{ greek: "Μ' αρέσει πολύ.", english: "I like it a lot.", marks: [mark("Μ'", "genitive")] },
						{ greek: "Άρεσε;", english: "Did you like it?" },
					],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "pronouns-likes",
					title: "μου αρέσει or μου αρέσουν",
					greek: "μου αρέσει ο καφές · μου αρέσουν οι γάτες",
					tests: "Shows who likes what in English (I like the cats); the answer uses the short word for the one who likes, puts the thing liked in the Doer form and matches the verb to it: μου αρέσουν οι γάτες.",
				},
			],
		},
		{
			id: "objects",
			title: "τον, την, το for him, her and it",
			rule: [
				"A short Target word before the verb stands for me, you, him, her, it, us or them. The Target is the person or thing the action is done to.",
				"For _it_ and _them_, the word copies the gender of the noun it stands for. For a mix of genders, _them_ is masculine.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("με βλέπεις;", mark("με", "accusative")), "can you see me?"],
					[cellWith("σε ξέρω", mark("σε", "accusative")), "I know you"],
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
					greek: "Ο καφές είναι κρύος, αλλά τον πίνω.",
					english: "The coffee is cold, but I'm drinking it.",
					marks: [mark("Ο καφές", "nominative", "masculine"), mark("τον", "accusative", "masculine")],
				},
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
			details: [
				{
					label: "με λένε",
					text: "It means my name is, but is literally _they call me_, so με is the Target.",
					examples: [
						{
							greek: "Με λένε Μαρία.",
							english: "My name is Maria.",
							marks: [mark("Με", "accusative")],
						},
					],
				},
			],
			confuse: {
				text: "τον, την, το, τους, τις and τα are also the article. Before a verb they mean him, her, it or them: τον βλέπω, I see him. Before a noun they mean the: τον φίλο.",
				section: "roles/articles",
			},
			drills: ["pronouns-object", "pronouns-placement"],
		},
		{
			id: "own-alone",
			title: "Mine and my own: δικός μου",
			rule: "For emphasis, δικός goes before the short word for my, your, his (μου, σου, του and the rest). It means my own, or mine, and takes the gender of the thing owned.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[
						cellWith("ο δικός μου καφές", mark("ο δικός", "nominative", "masculine"), mark("μου", "genitive"), mark("καφές", "nominative", "masculine")),
						"my own coffee",
					],
					[
						cellWith("η δική σου τσάντα", mark("η δική", "nominative", "feminine"), mark("σου", "genitive"), mark("τσάντα", "nominative", "feminine")),
						"your own bag",
					],
					[cellWith("είναι δικό μου", mark("δικό", "nominative", "neuter"), mark("μου", "genitive")), "it's mine"],
				],
			},
			examples: [
				{
					greek: "Αυτή η τσάντα είναι δική σου;",
					english: "Is this bag yours? (δική: τσάντα is feminine)",
					marks: [mark("Αυτή η τσάντα", "nominative", "feminine"), mark("δική", "nominative", "feminine"), mark("σου", "genitive")],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "pronouns-own-alone",
					title: "δικός μου",
					greek: "ο δικός μου καφές · είναι δικό μου",
					tests: "Shows the English (my own, mine); the answer is δικός in the gender of the thing owned, with the short word: η δική σου τσάντα.",
				},
			],
		},
		{
			id: "alone",
			title: "By myself: μόνος μου",
			rule: "μόνος with the short word for me, you, him (μου, σου, του and the rest) means by myself. It takes the gender and number of the person.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("μόνος μου", mark("μόνος", "nominative", "masculine"), mark("μου", "genitive")), "by myself (a man)"],
					[cellWith("μόνη μου", mark("μόνη", "nominative", "feminine"), mark("μου", "genitive")), "by myself (a woman)"],
					[cellWith("μόνοι μας", mark("μόνοι", "nominative", "masculine", true), mark("μας", "genitive", undefined, true)), "by ourselves"],
				],
			},
			examples: [
				{
					greek: "Δουλεύω μόνος μου.",
					english: "I work by myself.",
					marks: [mark("μόνος", "nominative", "masculine"), mark("μου", "genitive")],
				},
				{
					greek: "Δουλεύει μόνη της.",
					english: "She works by herself.",
					marks: [mark("μόνη", "nominative", "feminine"), mark("της", "genitive")],
				},
			],
			details: [
				{
					label: "μόνο and μόνος",
					text: "μόνο, meaning only, never changes. Without the short word after it, μόνος means alone or the only one, and changes like any adjective.",
					examples: [
						{ greek: "Χθες είδα μόνο YouTube.", english: "Yesterday I only watched YouTube. (μόνο never changes)" },
						{ greek: "Μένει μόνη.", english: "She lives alone.", marks: [mark("μόνη", "nominative", "feminine")] },
						{
							greek: "Αυτή είναι η μόνη λύση.",
							english: "This is the only answer.",
							marks: [mark("η μόνη λύση", "nominative", "feminine")],
						},
					],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "pronouns-alone",
					title: "μόνος μου",
					greek: "μόνος μου · μόνη της · μόνοι μας",
					tests: "Shows the English and who is meant (by herself); the answer is μόνος in that person's gender and number, with the short word: μόνη της.",
				},
			],
		},
		{
			id: "long-forms",
			title: "The long forms εγώ, εμένα and αυτός",
			rule: [
				"Beside the short words such as με and μου, Greek has long forms for people. αυτός, αυτή, αυτό mean he, she, it.",
				"The Doer forms, εγώ, εσύ and the rest, are usually left out, as Who does what explains. They come back for contrast.",
				"After a preposition such as για (for) or με (with), the short με (me) and σε (you) can't stand. Use the long εμένα and εσένα, often shortened to μένα and σένα: για μένα, not για με.",
			],
			table: {
				columns: [
					{ label: "Doer form", greek: true },
					{ label: "After a preposition", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[
						markedCell("εγώ", "nominative", undefined, false),
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
					greek: "Χωρίς εσένα δεν πάω.",
					english: "I'm not going without you.",
					marks: [mark("εσένα", "accusative")],
				},
				{
					greek: "Αυτό είναι για σένα.",
					english: "This is for you.",
					marks: [mark("Αυτό", "nominative", "neuter"), mark("σένα", "accusative")],
				},
			],
			details: [
				{
					label: "Also this",
					text: "αυτός, αυτή, αυτό also mean this. The noun after them keeps its article.",
					examples: [
						{
							greek: "Ποιο είναι αυτό το παιδί;",
							english: "Who is this child?",
							marks: [mark("αυτό το παιδί", "nominative", "neuter")],
						},
					],
				},
				{
					label: "In the plural",
					text: [
						"In the plural, they is:",
						[
							"αυτοί for men, or a mix of people",
							"αυτές for women only",
							"αυτά for neuter nouns, such as τα παιδιά",
						],
						"For things, it copies the gender of the noun.",
					],
					examples: [
						{
							greek: "Αυτοί είναι αδέλφια.",
							english: "They're siblings. (a mixed group takes αυτοί)",
							marks: [mark("Αυτοί", "nominative", "masculine", true)],
						},
						{
							greek: "Αυτές είναι οι φίλες μου.",
							english: "They're my friends. (all women)",
							marks: [
								mark("Αυτές", "nominative", "feminine", true),
								mark("οι φίλες", "nominative", "feminine", true),
								mark("μου", "genitive"),
							],
						},
					],
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
					title: "Long forms after a preposition",
					greek: "για μένα · με σένα · από αυτόν",
					tests: "Shows a preposition and a person in English (for me); the answer is the preposition with the long form, για μένα, and για με counts as wrong.",
				},
			],
		},
		{
			id: "polite",
			title: "Polite you with σας and the plural verb",
			rule: "With strangers, older people and in shops, speak to one person as you would to several: the verb takes its you-all ending, and the short word for you, σου or σε, becomes σας.",
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
					["Πού μένεις;", "Πού μένετε;", "where do you live?"],
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
					english: "Excuse me, can you help me? (μπορείτε, the you-all form, to one stranger)",
					marks: [mark("με", "accusative")],
				},
				{
					greek: "Θέλετε να σας δείξω τον δρόμο;",
					english: "Do you want me to show you the way?",
					marks: [mark("σας", "genitive", undefined, true), mark("τον δρόμο", "accusative", "masculine")],
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
			rule: [
				"The short words for people, such as με (me), το (it) and μου (to me), sit right before the verb. θα (will), να (to) and δεν (not) go in front of the short word.",
				"After a command, they follow the verb instead.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("θα με κοιτάξει", mark("με", "accusative")), "he will look at me"],
					[cellWith("δεν το παίρνει", mark("το", "accusative", "neuter")), "he isn't taking it"],
					[cellWith("θέλω να το δω", mark("το", "accusative", "neuter")), "I want to see it"],
					[{ text: "δώσε μου", marks: [mark("μου", "genitive")] }, "give me"],
					[{ text: "κοίτα με", marks: [mark("με", "accusative")] }, "look at me"],
					[{ text: "πάρε το", marks: [mark("το", "accusative", "neuter")] }, "take it"],
					[{ text: "άκουσέ μας", marks: [mark("μας", "accusative", undefined, true)] }, "listen to us"],
				],
			},
			examples: [
				{
					greek: "Δώσε μου το νερό.",
					english: "Give me the water.",
					marks: [mark("μου", "genitive"), mark("το νερό", "accusative", "neuter")],
				},
			],
			details: [
				{
					label: "Commands with μη",
					text: "A command that starts with μη (don't) keeps the short word before the verb.",
					examples: [
						{
							greek: "Μη με κοιτάς έτσι.",
							english: "Don't look at me like that.",
							marks: [mark("με", "accusative")],
						},
					],
				},
				{
					label: "Two together",
					text: "When two come before the verb, the person goes first, then the thing.",
					examples: [
						{
							greek: "Μου το δίνει κάθε πρωί.",
							english: "He gives it to me every morning.",
							marks: [mark("Μου", "genitive"), mark("το", "accusative", "neuter")],
						},
						{
							greek: "Σου τα φέρνω αύριο.",
							english: "I'll bring them to you tomorrow.",
							marks: [mark("Σου", "genitive"), mark("τα", "accusative", "neuter", true)],
						},
						{
							greek: "Μπορούμε να του το δώσουμε;",
							english: "Can we give it to him?",
							marks: [mark("του", "genitive", "masculine"), mark("το", "accusative", "neuter")],
						},
					],
				},
				{
					label: "The Target named twice",
					text: "A Target (the person or thing the action is done to) already named is often picked up again by the short word before the verb.",
					examples: [
						{
							greek: "Τον φίλο μου τον λένε Γιώργο.",
							english: "My friend is called Giorgos.",
							marks: [mark("Τον φίλο", "accusative", "masculine"), mark("μου", "genitive"), mark("τον", "accusative", "masculine")],
						},
						{
							greek: "Το παιδί το λένε Λουκά.",
							english: "The child is called Loukas.",
							marks: [mark("Το παιδί", "accusative", "neuter"), mark("το", "accusative", "neuter")],
						},
					],
				},
			],
			drills: ["pronouns-placement"],
			plannedDrills: [
				{
					id: "pronouns-two-together",
					title: "Two short words together",
					greek: "μου το δίνει · του το δίνω · σου τα φέρνω",
					tests: "Shows a sentence in English with a person and a thing (he gives it to me); the answer puts both short words before the verb, person first: μου το δίνει.",
				},
			],
		},
	],
	reference: [{ label: "Pronouns", href: "/reference/pronouns" }],
};
