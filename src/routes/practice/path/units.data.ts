import type { DrillEntry, PathStep } from "@/constants/drills";
import type { Unit, UnitStage } from "@/lib/units";

/** The path, in order. Each unit's sentences use only its own words and earlier units'. */
export const UNITS: Unit[] = [
	{
		id: "coming-going",
		title: "Coming and going",
		pattern: "persons-singular",
		words: [
			{ greek: "πάω", example: { greek: "Πάω σπίτι.", english: "I'm going home." } },
			{ greek: "έρχομαι", example: { greek: "Έρχομαι αύριο.", english: "I'm coming tomorrow." } },
			{ greek: "φεύγω", example: { greek: "Φεύγω τώρα.", english: "I'm leaving now." } },
			{ greek: "μένω", example: { greek: "Μένω στην Αθήνα.", english: "I live in Athens." } },
			{ greek: "τρέχω", example: { greek: "Τρέχω στο πάρκο.", english: "I run in the park." } },
		],
		sentences: [
			{ english: "Where are you going?", greek: "Πού πας;" },
			{ english: "Are you leaving now?", greek: "Φεύγεις τώρα;" },
			{ english: "She lives in Athens.", greek: "Μένει στην Αθήνα." },
			{ english: "He's coming tomorrow.", greek: "Έρχεται αύριο." },
			{ english: "I'm going home.", greek: "Πάω σπίτι." },
			{ english: "He runs in the park.", greek: "Τρέχει στο πάρκο." },
			{ english: "Where do you live?", greek: "Πού μένεις;" },
			{ english: "Are you coming?", greek: "Έρχεσαι;" },
		],
	},
	{
		id: "giving-taking",
		title: "Giving and taking",
		pattern: "target-form",
		words: [
			{ greek: "φέρνω", example: { greek: "Φέρνω νερό.", english: "I bring water." } },
			{ greek: "παίρνω", example: { greek: "Παίρνω το λεωφορείο.", english: "I take the bus." } },
			{ greek: "δίνω", example: { greek: "Δίνω το βιβλίο στη Μαρία.", english: "I give the book to Maria." } },
			{ greek: "ο καφές", example: { greek: "Ένας καφές, παρακαλώ.", english: "A coffee, please." } },
			{ greek: "η τσάντα", example: { greek: "Η τσάντα είναι εδώ.", english: "The bag is here." } },
			{ greek: "το κλειδί", example: { greek: "Πού είναι το κλειδί;", english: "Where's the key?" } },
		],
		sentences: [
			{ english: "I'm bringing the coffee.", greek: "Φέρνω τον καφέ." },
			{ english: "Are you taking the bag?", greek: "Παίρνεις την τσάντα;" },
			{ english: "She gives the key to Maria.", greek: "Δίνει το κλειδί στη Μαρία." },
			{ english: "He's bringing water.", greek: "Φέρνει νερό." },
			{ english: "I give the bag to Nikos.", greek: "Δίνω την τσάντα στον Νίκο." },
			{ english: "Are you taking the key?", greek: "Παίρνεις το κλειδί;" },
			{ english: "She's bringing the bag tomorrow.", greek: "Φέρνει την τσάντα αύριο." },
		],
	},
	{
		id: "wanting-knowing",
		title: "Wanting and knowing",
		pattern: "saying-no",
		words: [
			{ greek: "θέλω", example: { greek: "Θέλω νερό.", english: "I want water." } },
			{ greek: "έχω", example: { greek: "Έχω ένα κλειδί.", english: "I have a key." } },
			{ greek: "ξέρω", example: { greek: "Ξέρω πού μένει.", english: "I know where she lives." } },
			{ greek: "μπορώ", example: { greek: "Μπορώ να πάω;", english: "Can I go?" } },
			{ greek: "το σπίτι", example: { greek: "Το σπίτι είναι μεγάλο.", english: "The house is big." } },
			{ greek: "η δουλειά", example: { greek: "Πάω στη δουλειά.", english: "I'm going to work." } },
		],
		sentences: [
			{ english: "Do you want coffee?", greek: "Θέλεις καφέ;" },
			{ english: "I don't know.", greek: "Δεν ξέρω." },
			{ english: "She's got work to do.", greek: "Έχει δουλειά." },
			{ english: "I can't now.", greek: "Δεν μπορώ τώρα." },
			{ english: "Do you know where he lives?", greek: "Ξέρεις πού μένει;" },
			{ english: "I want the key.", greek: "Θέλω το κλειδί." },
			{ english: "He doesn't have the bag.", greek: "Δεν έχει την τσάντα." },
			{ english: "I don't want coffee.", greek: "Δεν θέλω καφέ." },
		],
	},
];

export const findUnit = (unitId: string) => {
	const index = UNITS.findIndex((u) => u.id === unitId);
	return index === -1 ? undefined : { unit: UNITS[index]!, index };
};

/** Every unit stage runs on one route; only the check records attempts, under this id. */
export const UNIT_CHECK: DrillEntry = {
	id: "units-check",
	to: "/practice/path/stage",
	title: "Unit check",
	greek: "",
	minutes: 3,
	category: "verbs",
	caseRole: null,
};

const STAGE_TITLE: Record<UnitStage, string> = {
	meet: "Meet",
	recognise: "Recognise",
	recall: "Recall",
	pattern: "Forms",
	sentences: "Sentences",
	check: "Check",
};

const STAGE_MINUTES: Record<UnitStage, number> = {
	meet: 1,
	recognise: 2,
	recall: 2,
	pattern: 3,
	sentences: 3,
	check: 4,
};

const stepId = (unit: Unit, stage: UnitStage) => `unit:${unit.id}:${stage}`;

/**
 * Each unit's stages in order. A unit opens once the one before it has been
 * typed correctly, and never while two units are still short of their check.
 */
export const unitSteps = (units: readonly Unit[]): PathStep[] =>
	units.flatMap((unit, n) => {
		const previous = units[n - 1];
		const twoBack = units[n - 2];
		const step = (stage: UnitStage, rule: Partial<PathStep>): PathStep => ({
			id: stepId(unit, stage),
			drill: { ...UNIT_CHECK, minutes: STAGE_MINUTES[stage] },
			title: `${STAGE_TITLE[stage]}: ${unit.title}`,
			greek: unit.words.map((w) => w.greek).join(" · "),
			phase: unit.title,
			unit: { id: unit.id, stage },
			...rule,
		});
		return [
			step("meet", {
				gate: true,
				requires: [
					...(previous ? [stepId(previous, "recall")] : []),
					...(twoBack ? [stepId(twoBack, "check")] : []),
				],
			}),
			step("recognise", { gate: true, requires: [stepId(unit, "meet")] }),
			step("recall", { gate: true, requires: [stepId(unit, "recognise")] }),
			step("pattern", { gate: true, requires: [stepId(unit, "recall")], heldUntilNextDay: true }),
			step("sentences", { gate: true, requires: [stepId(unit, "pattern")] }),
			step("check", { requires: [stepId(unit, "sentences")], heldUntilNextDay: true }),
		];
	});

export const UNIT_PATH = unitSteps(UNITS);
