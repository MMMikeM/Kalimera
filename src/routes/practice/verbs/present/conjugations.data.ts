import type { VerbForm } from "@/constants/verbs";
import { matchPhonetic } from "@/lib/greek-transliteration";
import { type PersonNumber, personNumbers } from "@/server/db/enums";

import type { SimpleListItem } from "../../components/engines/deck";

const PRONOUNS: Record<PersonNumber, { pronoun: string; grammatical: string }> = {
	sg1: { pronoun: "I", grammatical: "1st person singular" },
	sg2: { pronoun: "you", grammatical: "2nd person singular" },
	sg3: { pronoun: "he / she", grammatical: "3rd person singular" },
	pl1: { pronoun: "we", grammatical: "1st person plural" },
	pl2: { pronoun: "you all", grammatical: "2nd person plural" },
	pl3: { pronoun: "they", grammatical: "3rd person plural" },
};

export interface EndingItem extends SimpleListItem {
	/** Split where the ending the card asks for begins. */
	word: VerbForm;
	/** A second standard form for the same person, such as έρχεστε beside ερχόσαστε. */
	alternative?: VerbForm;
}

type SixForms = readonly [VerbForm, VerbForm, VerbForm, VerbForm, VerbForm, VerbForm];

interface Paradigm {
	key: string;
	context: string;
	forms: SixForms;
	alternatives?: Partial<Record<PersonNumber, VerbForm>>;
}

const split = (stem: string, ending: string): VerbForm => ({ stem, ending });

export const fullForm = ({ stem, ending }: VerbForm) => stem + ending;

// Stems are written per form because the past moves the stress and drops the
// augment: έ-κανα but κάναμε. Listed in teaching order, which the filter follows.
const PARADIGMS: Paradigm[] = [
	{
		key: "g1p",
		context: "κάνω · present",
		forms: [
			split("κάν", "ω"),
			split("κάν", "εις"),
			split("κάν", "ει"),
			split("κάν", "ουμε"),
			split("κάν", "ετε"),
			split("κάν", "ουν"),
		],
	},
	{
		key: "g2ap",
		context: "μιλάω · present",
		forms: [
			split("μιλ", "άω"),
			split("μιλ", "άς"),
			split("μιλ", "άει"),
			split("μιλ", "άμε"),
			split("μιλ", "άτε"),
			split("μιλ", "άνε"),
		],
		alternatives: { pl1: split("μιλ", "ούμε"), pl3: split("μιλ", "ούν") },
	},
	{
		key: "g2bp",
		context: "μπορώ · present",
		forms: [
			split("μπορ", "ώ"),
			split("μπορ", "είς"),
			split("μπορ", "εί"),
			split("μπορ", "ούμε"),
			split("μπορ", "είτε"),
			split("μπορ", "ούν"),
		],
	},
	{
		key: "depp",
		context: "έρχομαι · present",
		forms: [
			split("έρχ", "ομαι"),
			split("έρχ", "εσαι"),
			split("έρχ", "εται"),
			split("ερχ", "όμαστε"),
			split("ερχ", "όσαστε"),
			split("έρχ", "ονται"),
		],
		alternatives: { pl2: split("έρχ", "εστε") },
	},
	{
		key: "aor",
		context: "κάνω · aorist",
		forms: [
			split("έκαν", "α"),
			split("έκαν", "ες"),
			split("έκαν", "ε"),
			split("κάν", "αμε"),
			split("κάν", "ατε"),
			split("έκαν", "αν"),
		],
	},
	{
		key: "g1i",
		context: "γράφω · imperfect",
		forms: [
			split("έγραφ", "α"),
			split("έγραφ", "ες"),
			split("έγραφ", "ε"),
			split("γράφ", "αμε"),
			split("γράφ", "ατε"),
			split("έγραφ", "αν"),
		],
	},
	{
		key: "g2i",
		context: "μιλάω · imperfect",
		forms: [
			split("μιλ", "ούσα"),
			split("μιλ", "ούσες"),
			split("μιλ", "ούσε"),
			split("μιλ", "ούσαμε"),
			split("μιλ", "ούσατε"),
			split("μιλ", "ούσαν"),
		],
	},
];

const answersFor = (form: VerbForm) => [form.ending, fullForm(form)];

export const ENDINGS: EndingItem[] = PARADIGMS.flatMap((paradigm) =>
	personNumbers.map((person, i): EndingItem => {
		const word = paradigm.forms[i]!;
		const alternative = paradigm.alternatives?.[person];
		return {
			id: `${paradigm.key}-${person}`,
			greek: word.ending,
			acceptAlso: [fullForm(word), ...(alternative ? answersFor(alternative) : [])],
			detail: PRONOUNS[person].grammatical,
			context: paradigm.context,
			label: PRONOUNS[person].pronoun,
			category: paradigm.key,
			word,
			alternative,
		};
	}),
);

const gave = (input: string, form: VerbForm) =>
	answersFor(form).some((answer) => matchPhonetic(input, answer).isCorrect);

/** The form to show back: the alternative when that is what the learner typed. */
export const formShown = (item: EndingItem, input = "") =>
	item.alternative && gave(input, item.alternative) ? item.alternative : item.word;

/** The card from the same verb and tense whose answer the learner typed instead, if any. */
export const typedInstead = (item: EndingItem, input = ""): EndingItem | undefined => {
	if (!input) return undefined;
	return ENDINGS.find(
		(other) =>
			other.context === item.context &&
			other.id !== item.id &&
			[other.word, other.alternative].some((form) => form && gave(input, form)),
	);
};

export const CATEGORIES = PARADIGMS.map(({ key, context }) => ({ id: key, label: context }));

/** The six forms of one verb in table order, for showing the whole pattern before drilling it. */
export const paradigmRows = (key: string) =>
	ENDINGS.filter((item) => item.category === key).map(({ id, label, word, alternative }) => ({
		id,
		pronoun: label,
		word,
		alternative,
	}));
