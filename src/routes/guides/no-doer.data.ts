import type { Guide } from "@/types/guide";

export const NO_DOER_GUIDE: Guide = {
	slug: "no-doer",
	title: "Sentences without a doer",
	greek: "Χωρίς υποκείμενο",
	description: "There is, it's raining, you must",
	idea: "Some Greek sentences have nobody doing anything: the verb stands alone in its he / she / it form and never changes for person. Learn each as a fixed frame.",
	sections: [
		{
			id: "there-is",
			title: "There is, there are: υπάρχει",
			rule: "υπάρχει means there is and υπάρχουν there are: the verb matches whatever exists. For the future, put θα in front: θα υπάρχει.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					[{ text: "υπάρχει ένα βιβλιοπωλείο", weight: "anchor" }, "there is a bookshop"],
					[{ text: "υπάρχουν πολλά πάρκα", weight: "deviate" }, "there are many parks"],
					["δεν υπάρχει βιβλιοθήκη", "there's no library"],
					["θα υπάρχουν πολλά πάρκα", "there will be many parks"],
				],
			},
			examples: [
				{ greek: "Υπάρχει φαγητό πάνω στη φωτιά.", english: "There is food on the fire." },
				{
					greek: "Θα υπάρχουν πολλά πάρκα στην πόλη μου.",
					english: "There will be many parks in my city.",
				},
			],
			drills: [],
		},
		{
			id: "weather",
			title: "Weather: κάνει, βρέχει, έχει",
			rule: "Weather has no doer. Use κάνει with a noun for temperature, a verb of its own for rain and snow, or έχει with a noun for there's some.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["κάνει κρύο", "it's cold"],
					["κάνει ζέστη", "it's hot"],
					["βρέχει", "it's raining"],
					["χιονίζει", "it's snowing"],
					["έχει βροχή", "there's rain"],
				],
			},
			examples: [
				{ greek: "Δεν βρέχει.", english: "It isn't raining." },
				{ greek: "Δεν έχει βροχή.", english: "There's no rain." },
			],
			drills: [],
		},
		{
			id: "must",
			title: "Must: πρέπει να",
			rule: "πρέπει never changes for person; the verb after να does, and it takes the short form. For had to, use έπρεπε.",
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
			examples: [{ greek: "Πρέπει να δουλέψω.", english: "I have to work." }],
			drills: ["verbs-modal-constructions"],
		},
		{
			id: "wish",
			title: "I would like: θα ήθελα",
			rule: "θα ήθελα is the polite I would like. Follow it with a noun, or with να and a verb.",
			table: {
				columns: [
					{ label: "Greek", greek: true },
					{ label: "Meaning" },
				],
				rows: [
					["θα ήθελα έναν καφέ", "I'd like a coffee"],
					["θα ήθελα να ήμουν αρχιτέκτονας", "I'd like to be an architect"],
				],
			},
			examples: [{ greek: "Θα ήθελα να ήμουν δάσκαλος.", english: "I'd like to be a teacher." }],
			drills: [],
		},
	],
	reference: [{ label: "Patterns", href: "/reference/patterns" }],
};
