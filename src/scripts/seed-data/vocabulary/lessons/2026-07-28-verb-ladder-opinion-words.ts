import { createLesson } from "@/types/lesson-builder";

export const LESSON_2026_07_28 = createLesson({
	meta: {
		date: "2026-07-28",
		topic: "Now / done / not-yet ladder for core verbs, plus opinion and hedging words",
		source:
			"Weekly lesson - three-form drill (present, past, θα future) for βλέπω/τρώω/πίνω/λέω, everyday verbs, and the -αίνω movement family; νομίζω/πιστεύω/ίσως/τότε",
		homework: "Say each verb ladder out loud: present, past, θα form",
	},

	verbs: [
		{ lemma: "νομίζω", english: "I think (opinion)", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "πιστεύω", english: "I believe", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "βλέπω", english: "I see/watch", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "τρώω", english: "I eat", conjugationFamily: "irregular", cefrLevel: "A1" },
		{ lemma: "πίνω", english: "I drink", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "λέω", english: "I say", conjugationFamily: "irregular", cefrLevel: "A1" },
		{ lemma: "είμαι", english: "I am", conjugationFamily: "irregular", cefrLevel: "A1" },
		{ lemma: "έχω", english: "I have", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "κάνω", english: "I do/make", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "ξέρω", english: "I know", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "περιμένω", english: "I wait", conjugationFamily: "-ω", cefrLevel: "A2" },
		{ lemma: "βγαίνω", english: "I go out", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "μπαίνω", english: "I go in", conjugationFamily: "-ω", cefrLevel: "A1" },
		{ lemma: "ανεβαίνω", english: "I go up", conjugationFamily: "irregular", cefrLevel: "A2" },
		{ lemma: "κατεβαίνω", english: "I go down", conjugationFamily: "irregular", cefrLevel: "A2" },
	],

	adverbs: [
		{ lemma: "τότε", english: "then", cefrLevel: "A1" },
		{ lemma: "ίσως", english: "maybe", cefrLevel: "A2" },
	],

	phrases: [
		{
			text: "αν όχι, τότε δεν ξέρω",
			english: "if not, then I don't know",
			metadata: { pattern: "αν + condition, τότε + result", usage: "hedging in conversation" },
		},
		{
			text: "έτσι νομίζω",
			english: "I think so",
			metadata: { note: "νομίζω alone = I think; έτσι νομίζω answers a question" },
		},
		{
			text: "νομίζω ότι είναι καλό",
			english: "I think that it is good",
			metadata: { pattern: "νομίζω ότι + sentence" },
		},
		{
			text: "πιστεύω ότι θα έρθει",
			english: "I believe that he/she will come",
			metadata: { pattern: "πιστεύω ότι + sentence" },
		},
		{
			text: "ίσως αύριο",
			english: "maybe tomorrow",
			metadata: { usage: "softening an answer" },
		},
		{
			text: "χθες είδα μια ταινία, αύριο θα δω άλλη",
			english: "yesterday I saw a film, tomorrow I'll see another",
			metadata: { pattern: "past είδα vs future θα δω" },
		},
		{
			text: "περίμενα πολύ, αλλά θα περιμένω κι άλλο",
			english: "I waited a lot, but I'll wait more",
			metadata: { pattern: "περίμενα vs θα περιμένω" },
		},
		{
			text: "βγήκα έξω και μετά μπήκα στο σπίτι",
			english: "I went out and then I went into the house",
			metadata: { pattern: "-αίνω verbs in the past: βγήκα / μπήκα" },
		},
	],

	grammarNotes: [
		{
			pattern: "Three forms for every verb: now / done / not yet",
			examples: [
				"βλέπω (I see now) - είδα (I saw) - θα δω (I will see)",
				"τρώω - έφαγα - θα φάω",
				"πίνω - ήπια - θα πιω",
				"λέω - είπα - θα πω",
			],
			explanation:
				"Learn each verb as a set of three. The 'done' form and the θα form share the same shape family — once you know είδα you can predict θα δω. θα + the short form means one single action in the future, not something ongoing.",
		},
		{
			pattern: "Everyday verbs that keep their shape",
			examples: [
				"είμαι - ήμουν - θα είμαι",
				"έχω - είχα - θα έχω",
				"κάνω - έκανα - θα κάνω",
				"ξέρω - ήξερα - θα ξέρω",
				"περιμένω - περίμενα - θα περιμένω",
			],
			explanation:
				"These five don't switch to a short form in the future — θα simply goes in front of the everyday form. είμαι, έχω, ξέρω describe states, so there is no one-off version of them.",
		},
		{
			pattern: "Movement verbs in -αίνω",
			examples: [
				"βγαίνω - βγήκα - θα βγω (go out)",
				"μπαίνω - μπήκα - θα μπω (go in)",
				"ανεβαίνω - ανέβηκα - θα ανέβω (go up)",
				"κατεβαίνω - κατέβηκα - θα κατέβω (go down)",
			],
			explanation:
				"This family follows one rule: the past ends in -ηκα and the θα form is very short (θα βγω, θα μπω, θα ανέβω, θα κατέβω). Learn all four together — the pattern repeats exactly.",
		},
		{
			pattern: "Softening what you say",
			examples: [
				"νομίζω (I think) — έτσι νομίζω (I think so)",
				"πιστεύω (I believe) — πιστεύω ότι...",
				"ίσως (maybe) — ίσως αύριο",
				"αν όχι, τότε δεν ξέρω (if not, then I don't know)",
			],
			explanation:
				"νομίζω and πιστεύω take ότι before a full sentence. ίσως goes in front of whatever you are unsure about. τότε (then) picks up the result of an 'αν' (if) clause.",
		},
	],
});
