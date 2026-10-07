import { cellWith, mark } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const NO_DOER_GUIDE: Guide = {
	slug: "no-doer",
	tone: "terracotta",
	title: "Sentences without a doer",
	greek: "Χωρίς υποκείμενο",
	description: "There is, it's raining, you must",
	idea: "Some Greek sentences have no one doing anything: there is, it's raining, you must, it's hard. With no doer to match, the verb keeps its it form whoever is meant, or its they form for there are. θα ήθελα, I would like, sits here too as a fixed frame, though it does change for person.",
	sections: [
		{
			id: "there-is",
			title: "υπάρχει for there is and there are",
			rule: [
				"υπάρχει means there is and υπάρχουν means there are. The verb matches what exists: υπάρχει for one thing, υπάρχουν for more than one.",
				"What exists stays in its plain form, the one in the dictionary (also the Doer form). Nothing is done to it, so it never takes the Target form.",
				"Put δεν in front for there isn't, and θα for there will be.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[
						{ text: "υπάρχει ένα βιβλιοπωλείο", marks: [mark("ένα βιβλιοπωλείο", "nominative", "neuter")] },
						"there is a bookshop",
					],
					[
						{ text: "υπάρχουν πολλά πάρκα", marks: [mark("πολλά πάρκα", "nominative", "neuter", true)] },
						"there are many parks",
					],
					[cellWith("δεν υπάρχει βιβλιοθήκη", mark("βιβλιοθήκη", "nominative", "feminine")), "there's no library"],
					[cellWith("θα υπάρχουν πολλά πάρκα", mark("πολλά πάρκα", "nominative", "neuter", true)), "there will be many parks"],
					[cellWith("υπάρχουν Άγγλοι", mark("Άγγλοι", "nominative", "masculine", true)), "there are English people"],
				],
			},
			examples: [
				{
					greek: "Υπάρχει ένας φούρνος εδώ κοντά.",
					english: "There's a bakery near here. (ένας, the plain form, not έναν)",
					marks: [mark("ένας φούρνος", "nominative", "masculine")],
				},
				{
					greek: "Το καλοκαίρι υπάρχουν πολλοί τουρίστες.",
					english: "In summer there are lots of tourists. (πολλοί τουρίστες, not πολλούς τουρίστες)",
					marks: [mark("πολλοί τουρίστες", "nominative", "masculine", true)],
				},
			],
			details: [
				{
					label: "έχει in speech",
					text: [
						"In speech έχει often does the same job as υπάρχει. It stays έχει even for more than one.",
						"Word for word, έχει is has, so what exists changes to the Target form, the form for what an action is done to.",
					],
					examples: [
						{
							greek: "Έχει Άγγλους στην Πάφο.",
							english: "There are English people in Paphos. (υπάρχουν Άγγλοι, but έχει Άγγλους)",
							marks: [mark("Άγγλους", "accusative", "masculine", true)],
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
					tests: "Shows a there is or there are sentence in English and the verb to use; the answer matches the noun to it: υπάρχουν Άγγλοι with the plain form, έχει Άγγλους with the Target form.",
				},
			],
		},
		{
			id: "weather",
			title: "Weather with κάνει, βρέχει and έχει",
			rule: [
				"Greek weather sentences have no word for it: the verb stands alone in its he, she, it form. There are three ways to build one:",
				[
					"For heat, cold and the weather in general: κάνει with a noun.",
					"For rain and snow: a verb of their own.",
					"For sun, rain and snow: έχει with the noun, meaning there is.",
				],
				"Word for word, κάνει is makes and έχει is has, so the noun after them is in the Target form, the form for what an action is done to.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("κάνει κρύο", mark("κρύο", "accusative", "neuter")), "it's cold"],
					[cellWith("κάνει ζέστη", mark("ζέστη", "accusative", "feminine")), "it's hot"],
					[cellWith("κάνει καλό καιρό", mark("καλό καιρό", "accusative", "masculine")), "the weather's good"],
					["βρέχει", "it's raining"],
					["χιονίζει", "it's snowing"],
					[cellWith("έχει ήλιο", mark("ήλιο", "accusative", "masculine")), "it's sunny"],
					[cellWith("έχει βροχή", mark("βροχή", "accusative", "feminine")), "there's rain"],
				],
			},
			examples: [
				{
					greek: "Σήμερα κάνει καλό καιρό.",
					english: "The weather's good today. (ο καιρός becomes καλό καιρό, the Target form)",
					marks: [mark("καλό καιρό", "accusative", "masculine")],
				},
				{ greek: "Δεν βρέχει.", english: "It isn't raining." },
				{
					greek: "Έχει ήλιο, αλλά κάνει κρύο.",
					english: "It's sunny, but it's cold. (ο ήλιος becomes ήλιο)",
					marks: [mark("ήλιο", "accusative", "masculine"), mark("κρύο", "accusative", "neuter")],
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
			rule: [
				"πρέπει να means must or have to. πρέπει never changes for person; the verb after να does.",
				"Which form the verb takes after να is set out in The short form: future, να and commands.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["πρέπει να πάω", "I must go"],
					["πρέπει να φας", "you must eat"],
				],
			},
			examples: [
				{ greek: "Πρέπει να δουλέψω.", english: "I have to work. (one action: short form)" },
				{ greek: "Πρέπει να διαβάζεις κάθε μέρα.", english: "You must study every day. (habit: present)" },
			],
			details: [
				{
					label: "Had to: έπρεπε",
					text: "For had to, use έπρεπε, the past of πρέπει. It doesn't change for person either.",
					examples: [{ greek: "Έπρεπε να φύγω νωρίς.", english: "I had to leave early." }],
				},
			],
			drills: ["verbs-modal-constructions"],
		},
		{
			id: "wish",
			title: "θα ήθελα",
			rule: "θα ήθελα is the polite I would like. Follow it with a noun in the Target form, the form for what an action is done to, or with να and a verb.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[cellWith("θα ήθελα έναν καφέ", mark("έναν καφέ", "accusative", "masculine")), "I'd like a coffee"],
					["θα ήθελα να πάω", "I'd like to go"],
				],
			},
			examples: [
				{
					greek: "Θα ήθελα έναν καφέ, παρακαλώ.",
					english: "I'd like a coffee, please.",
					marks: [mark("έναν καφέ", "accusative", "masculine")],
				},
				{
					greek: "Θα ήθελα να κλείσω ένα τραπέζι.",
					english: "I'd like to book a table.",
					marks: [mark("ένα τραπέζι", "accusative", "neuter")],
				},
			],
			details: [
				{
					label: "Wishing for what isn't so",
					text: "With να and a past form, θα ήθελα wishes for what isn't so.",
					examples: [
						{
							greek: "Θα ήθελα να ήμουν αρχιτέκτονας.",
							english: "I wish I were an architect. (αρχιτέκτονας keeps its plain form after ήμουν)",
							marks: [mark("αρχιτέκτονας", "nominative", "masculine")],
						},
					],
				},
			],
			confuse: {
				text: "After είμαι, and so after ήμουν, a noun keeps its plain form: είμαι γιατρός.",
				section: "roles/linking",
			},
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
			rule: [
				"Greek has no word for the it in it's hard. είναι stands alone and takes the -ο form of the adjective, the form it has beside a το noun.",
				"Add να and a verb to say what is hard.",
			],
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[{ text: "είναι δύσκολο", marks: [mark("δύσκολο", "nominative", "neuter")] }, "it's hard"],
					[cellWith("είναι εύκολο", mark("εύκολο", "nominative", "neuter")), "it's easy"],
					[cellWith("είναι τρελό", mark("τρελό", "nominative", "neuter")), "it's crazy"],
				],
			},
			examples: [
				{
					greek: "Είναι δύσκολο να βρίσκεις δουλειά.",
					english: "It's hard to find work.",
					marks: [mark("δύσκολο", "nominative", "neuter")],
				},
				{
					greek: "Δεν είναι εύκολο να μάθεις ελληνικά.",
					english: "It isn't easy to learn Greek.",
					marks: [mark("εύκολο", "nominative", "neuter")],
				},
			],
			details: [
				{
					label: "The -α form",
					text: "Greek can also use the -α form, the plural of the -ο form, in the same it's … frame: είναι δύσκολα, it's hard. Both are correct; ωραία is especially common this way.",
					examples: [{ greek: "Ήταν πολύ ωραία!", english: "It was very nice!" }],
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
