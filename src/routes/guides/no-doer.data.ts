import { cellWith, mark } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const NO_DOER_GUIDE: Guide = {
	slug: "no-doer",
	tone: "terracotta",
	title: "Sentences without a doer",
	greek: "Χωρίς υποκείμενο",
	description: "There is, it's raining, you must",
	idea: "Some Greek sentences have nobody doing anything: there is, it's raining, you must, it's hard. The verb stands alone in its he / she / it form and doesn't change for person. θα ήθελα, the polite I would like, sits here too: it does change for person, but like πρέπει it is a fixed frame that leads into a noun or into να and a verb.",
	sections: [
		{
			id: "there-is",
			title: "υπάρχει for there is and there are",
			rule: "υπάρχει means there is and υπάρχουν means there are. The verb matches whatever exists: υπάρχει for one thing, υπάρχουν for more than one. What exists takes the Doer form, the one for who does the action: υπάρχουν Άγγλοι, there are English people. Put δεν in front for there isn't, and θα for there will be.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[
						{ text: "υπάρχει ένα βιβλιοπωλείο", weight: "anchor", marks: [mark("ένα βιβλιοπωλείο", "nominative", "neuter")] },
						"there is a bookshop",
					],
					[
						{ text: "υπάρχουν πολλά πάρκα", weight: "deviate", marks: [mark("πολλά πάρκα", "nominative", "neuter", true)] },
						"there are many parks",
					],
					[cellWith("δεν υπάρχει βιβλιοθήκη", mark("βιβλιοθήκη", "nominative", "feminine")), "there's no library"],
					[cellWith("θα υπάρχουν πολλά πάρκα", mark("πολλά πάρκα", "nominative", "neuter", true)), "there will be many parks"],
					[cellWith("υπάρχουν Άγγλοι", mark("Άγγλοι", "nominative", "masculine", true)), "there are English people"],
					[
						{ text: "έχει Άγγλους", weight: "deviate", marks: [mark("Άγγλους", "accusative", "masculine", true)] },
						"there are English people",
					],
				],
			},
			examples: [
				{
					greek: "Υπάρχει φαγητό πάνω στη φωτιά.",
					english: "There is food on the fire.",
					marks: [mark("φαγητό", "nominative", "neuter"), mark("στη φωτιά", "accusative", "feminine")],
				},
				{
					greek: "Θα υπάρχουν πολλά πάρκα στην πόλη μου.",
					english: "There will be many parks in my city.",
					marks: [mark("πολλά πάρκα", "nominative", "neuter", true), mark("στην πόλη", "accusative", "feminine")],
				},
			],
			details: [
				{
					label: "έχει in speech",
					text: "In speech έχει often does the same job as υπάρχει. It stays έχει even for more than one, and what exists takes the Target form, the one for what an action is done to: έχει Άγγλους, against υπάρχουν Άγγλοι.",
					examples: [
						{
							greek: "Έχει Άγγλους στην Πάφο.",
							english: "There are English people in Paphos.",
							marks: [mark("Άγγλους", "accusative", "masculine", true), mark("στην Πάφο", "accusative", "feminine")],
						},
					],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "no-doer-there-is",
					title: "υπάρχει or έχει",
					greek: "υπάρχουν πολλά πάρκα · έχει Άγγλους",
					tests: "Shows a there is or there are sentence in English and the verb to use; the answer matches the noun to it: υπάρχουν Άγγλοι with the Doer form, έχει Άγγλους with the Target form.",
				},
			],
		},
		{
			id: "weather",
			title: "Weather with κάνει, βρέχει and έχει",
			rule: "Greek weather sentences have no word for it: the verb stands alone in its he, she, it form. For heat and cold, use κάνει with a noun: κάνει κρύο, it's cold. Rain and snow have verbs of their own, βρέχει and χιονίζει, or you can use έχει with the noun: έχει βροχή, there's rain.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("κάνει κρύο", mark("κρύο", "accusative", "neuter")), "it's cold"],
					[cellWith("κάνει ζέστη", mark("ζέστη", "accusative", "feminine")), "it's hot"],
					["βρέχει", "it's raining"],
					["χιονίζει", "it's snowing"],
					[cellWith("έχει βροχή", mark("βροχή", "accusative", "feminine")), "there's rain"],
				],
			},
			examples: [
				{ greek: "Δεν βρέχει.", english: "It isn't raining." },
				{
					greek: "Δεν έχει βροχή.",
					english: "There's no rain.",
					marks: [mark("βροχή", "accusative", "feminine")],
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "no-doer-weather",
					title: "Weather with κάνει, βρέχει and έχει",
					greek: "κάνει κρύο · βρέχει · έχει βροχή",
					tests: "Shows the weather in English (it's cold); the answer is the Greek frame, κάνει κρύο.",
				},
			],
		},
		{
			id: "must",
			title: "πρέπει να",
			rule: "πρέπει να means must or have to. πρέπει never changes for person; the verb after να does: πρέπει να πάω, I must go; πρέπει να φας, you must eat. For one action, use the short form, the one built on the simple past's stem (έφαγα, να φάω). For something ongoing or habitual, use the present.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["πρέπει να πάω", "I must go"],
					["πρέπει να φας", "you must eat"],
					[{ text: "έπρεπε να φύγω νωρίς", weight: "deviate" }, "I had to leave early"],
				],
			},
			examples: [
				{ greek: "Πρέπει να δουλέψω.", english: "I have to work." },
				{ greek: "Πρέπει να διαβάζεις κάθε μέρα.", english: "You must study every day." },
			],
			details: [
				{
					label: "Had to: έπρεπε",
					text: "For had to, use έπρεπε, the past of πρέπει. It doesn't change for person either: έπρεπε να φύγω νωρίς, I had to leave early.",
				},
			],
			drills: ["verbs-modal-constructions"],
		},
		{
			id: "wish",
			title: "θα ήθελα",
			rule: "θα ήθελα is the polite I would like. Follow it with a noun in the Target form, the one for what an action is done to: θα ήθελα έναν καφέ. Or follow it with να and a verb.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("θα ήθελα έναν καφέ", mark("έναν καφέ", "accusative", "masculine")), "I'd like a coffee"],
					[cellWith("θα ήθελα να ήμουν αρχιτέκτονας", mark("αρχιτέκτονας", "nominative", "masculine")), "I wish I were an architect"],
				],
			},
			examples: [
				{
					greek: "Θα ήθελα να κλείσω ένα τραπέζι.",
					english: "I'd like to book a table.",
					marks: [mark("ένα τραπέζι", "accusative", "neuter")],
				},
			],
			details: [
				{
					label: "Wishing for what isn't so",
					text: "With να and a past form, θα ήθελα wishes for what isn't so: θα ήθελα να ήμουν αρχιτέκτονας, I wish I were an architect. After ήμουν (I was), a form of είμαι, the noun says what someone is rather than what an action is done to, so it takes the Doer form, the one for who does the action.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "no-doer-would-like",
					title: "θα ήθελα",
					greek: "θα ήθελα έναν καφέ · θα ήθελα να",
					tests: "Shows a request in English (I'd like a coffee); the answer is θα ήθελα with the thing in the Target form: θα ήθελα έναν καφέ.",
				},
			],
		},
		{
			id: "its-hard",
			title: "είναι δύσκολο να and other it's frames",
			rule: "Greek has no word for the it in it's hard: είναι takes the -ο form of the adjective, the one it has beside a το noun: είναι δύσκολο, είναι τρελό. Add να and a verb to say what is hard.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[{ text: "είναι δύσκολο", weight: "anchor", marks: [mark("δύσκολο", "nominative", "neuter")] }, "it's hard"],
					[cellWith("είναι εύκολο", mark("εύκολο", "nominative", "neuter")), "it's easy"],
					[cellWith("είναι τρελό", mark("τρελό", "nominative", "neuter")), "it's crazy"],
					[{ text: "ήταν πολύ ωραία", weight: "deviate" }, "it was very nice"],
				],
			},
			examples: [
				{
					greek: "Είναι δύσκολο να βρίσκεις δουλειά.",
					english: "It's hard to find work.",
					marks: [mark("δύσκολο", "nominative", "neuter")],
				},
				{
					greek: "Είναι τρελό!",
					english: "It's crazy!",
					marks: [mark("τρελό", "nominative", "neuter")],
				},
			],
			details: [
				{
					label: "The -α form",
					text: "Greek can also use the -α form, the plural of the -ο form, for the same it's … frame: είναι δύσκολα, ήταν πολύ ωραία, it was very nice. Both are correct; ωραία is especially common this way.",
				},
			],
			drills: [],
			plannedDrills: [
				{
					id: "no-doer-its-adjective",
					title: "είναι δύσκολο να",
					greek: "είναι δύσκολο · είναι τρελό · ήταν ωραία",
					tests: "Shows a reaction in English (it's hard to find work); the answer is είναι with the -ο form of the adjective: είναι δύσκολο να βρίσκεις δουλειά.",
				},
			],
		},
	],
	reference: [{ label: "Patterns", href: "/reference/patterns" }],
};
