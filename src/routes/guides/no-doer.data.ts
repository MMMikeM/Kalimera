import { cellWith, mark } from "@/lib/guide-marks";
import type { Guide } from "@/types/guide";

export const NO_DOER_GUIDE: Guide = {
	slug: "no-doer",
	tone: "terracotta",
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
					[cellWith("θα ήθελα έναν καφέ", mark("έναν καφέ", "accusative", "masculine")), "I'd like a coffee"],
					[cellWith("θα ήθελα να ήμουν αρχιτέκτονας", mark("αρχιτέκτονας", "nominative", "masculine")), "I'd like to be an architect"],
				],
			},
			examples: [
				{
					greek: "Θα ήθελα να ήμουν δάσκαλος.",
					english: "I'd like to be a teacher.",
					marks: [mark("δάσκαλος", "nominative", "masculine")],
				},
			],
			drills: [],
		},
	],
	reference: [{ label: "Patterns", href: "/reference/patterns" }],
};
