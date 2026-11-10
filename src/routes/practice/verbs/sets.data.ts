import type { DrillEntry, PathStep, SetStage } from "@/constants/drills";

export interface VerbSet {
	id: string;
	title: string;
	verbs: Array<{ greek: string; example: { greek: string; english: string } }>;
}

/** Verbs learnt five at a time, grouped by meaning. The meanings come from the vocabulary table. */
export const VERB_SETS: VerbSet[] = [
	{
		id: "coming-going",
		title: "Coming and going",
		verbs: [
			{ greek: "πάω", example: { greek: "Πάω σπίτι.", english: "I'm going home." } },
			{ greek: "έρχομαι", example: { greek: "Έρχομαι αύριο.", english: "I'm coming tomorrow." } },
			{ greek: "φεύγω", example: { greek: "Φεύγω τώρα.", english: "I'm leaving now." } },
			{ greek: "μένω", example: { greek: "Μένω στην Αθήνα.", english: "I live in Athens." } },
			{ greek: "τρέχω", example: { greek: "Τρέχω στο πάρκο.", english: "I run in the park." } },
		],
	},
	{
		id: "giving-taking",
		title: "Giving and taking",
		verbs: [
			{ greek: "φέρνω", example: { greek: "Φέρνω νερό.", english: "I bring water." } },
			{ greek: "παίρνω", example: { greek: "Παίρνω το λεωφορείο.", english: "I take the bus." } },
			{ greek: "δίνω", example: { greek: "Δίνω το βιβλίο στη Μαρία.", english: "I give the book to Maria." } },
			{
				greek: "αφήνω",
				example: { greek: "Αφήνω το κλειδί στο τραπέζι.", english: "I leave the key on the table." },
			},
			{
				greek: "βάζω",
				example: { greek: "Βάζω το γάλα στο ψυγείο.", english: "I put the milk in the fridge." },
			},
		],
	},
];

export const findVerbSet = (setId: string) => VERB_SETS.find((set) => set.id === setId);

/** Items a stage's session is scored on: the "Done" of meeting the set, or each verb once. */
export const scoredItems = (set: VerbSet, stage: SetStage) => (stage === "meet" ? 1 : set.verbs.length);

/** Every stage of a set runs on the sets route; recall-timed records under the vocabulary drill's id. */
export const VERB_SETS_DRILL: DrillEntry = {
	id: "verbs-vocabulary-sg1",
	to: "/practice/verbs/sets",
	title: "Verb sets",
	greek: "",
	minutes: 2,
	category: "verbs",
	caseRole: null,
};

const STAGE_TITLE: Record<SetStage, string> = {
	meet: "Meet",
	recognise: "Recognise",
	recall: "Recall",
	"recall-timed": "Recall, timed",
};

const stepId = (set: VerbSet, stage: SetStage) => `verbs-set:${set.id}:${stage}`;

/**
 * Each set's stages in order. A set starts once the one before it has been
 * typed correctly, and never while two sets are still short of timed recall.
 */
export const verbSetSteps = (sets: readonly VerbSet[], phase: string): PathStep[] =>
	sets.flatMap((set, n) => {
		const previous = sets[n - 1];
		const twoBack = sets[n - 2];
		const step = (stage: SetStage, rule: Partial<PathStep>): PathStep => ({
			id: stepId(set, stage),
			drill: VERB_SETS_DRILL,
			title: `${STAGE_TITLE[stage]}: ${set.title}`,
			greek: set.verbs.map((v) => v.greek).join(" · "),
			phase,
			set: { id: set.id, stage },
			...rule,
		});
		return [
			step("meet", {
				gate: true,
				requires: [
					...(previous ? [stepId(previous, "recall")] : []),
					...(twoBack ? [stepId(twoBack, "recall-timed")] : []),
				],
			}),
			step("recognise", { gate: true, requires: [stepId(set, "meet")] }),
			step("recall", { gate: true, requires: [stepId(set, "recognise")] }),
			step("recall-timed", { requires: [stepId(set, "recall")], heldUntilNextDay: true }),
		];
	});
