import { AGREEMENT_PARADIGMS, type AgreementParadigm } from "@/constants/agreement";
import { stripTonos } from "@/lib/greek-letters";
import { markedCell } from "@/lib/guide-marks";
import { declineNoun } from "@/lib/noun-declension";
import { GuideTable } from "@/routes/guides/components/guide-table";
import {
	type Gender,
	type GrammaticalNumber,
	grammaticalNumbers,
	type NounDeclensionPattern,
	nounDeclensionPatterns,
} from "@/server/db/enums";
import type { GuideTable as GuideTableData } from "@/types/guide";

import type { NounsData } from "../$tab";
import { CASE_LABEL, CASE_ORDER } from "../components/gender-case-table";
import { LookupPage, LookupSection } from "../components/lookup-section";
import { type GuideSectionRef, TAUGHT_IN } from "../taught-in.data";

const GENDER_SECTIONS = [
	{ gender: "masculine", title: "Masculine nouns", taughtIn: TAUGHT_IN.masculineNouns },
	{ gender: "feminine", title: "Feminine nouns", taughtIn: TAUGHT_IN.feminineNouns },
	{ gender: "neuter", title: "Neuter nouns", taughtIn: TAUGHT_IN.neuterNouns },
] as const satisfies { gender: Gender; title: string; taughtIn: GuideSectionRef }[];

const formFor = (paradigm: AgreementParadigm, number: GrammaticalNumber, caseKey: string) =>
	(number === "singular" ? paradigm.forms : paradigm.pluralForms).find((f) => f.case === caseKey);

/** `example` reads "φίλος (friend)"; tables want the word alone. */
const lemmaOf = (paradigm: AgreementParadigm) => paradigm.example.split(" (")[0] ?? paradigm.example;

/** An example has to actually show the ending it illustrates. Pluralia tantum are
 * assigned a pattern for declension purposes but do not demonstrate it — λεφτά is
 * a neut-o noun, yet a column headed "-ο / λεφτά" teaches nothing. Tonos-blind
 * because endings carry stress the lemma may not (σπίτι against -ί). */
const demonstratesPattern = (lemma: string, paradigm: AgreementParadigm): boolean => {
	const ending = formFor(paradigm, "singular", "nom")?.ending?.replace(/^-/, "");
	const bare = { keepDiaeresis: false };
	return ending ? stripTonos(lemma, bare).endsWith(stripTonos(ending, bare)) : true;
};

const isDeclensionPattern = (id: string): id is NounDeclensionPattern =>
	(nounDeclensionPatterns as readonly string[]).includes(id);

/** It also has to decline the way its column does. μπαμπάς is filed under masc-as
 * for its singular, but its plural is μπαμπάδες, not *μπαμπές: shown beside
 * πατέρας it would teach the wrong plural. The seed hand-writes every such noun's
 * forms, so a stored form the pattern does not generate marks one. The citation
 * form is skipped, because the seed always stores the lemma there. */
const followsPattern = (
	example: { lemma: string; forms: Record<string, { form: string } | undefined> },
	paradigm: AgreementParadigm,
): boolean => {
	if (!isDeclensionPattern(paradigm.id)) return false;
	try {
		return declineNoun(example.lemma, paradigm.id).every(
			(generated) =>
				(generated.case === "nominative" && generated.number === "singular") ||
				example.forms[`${generated.case}_${generated.number}`]?.form === generated.noun,
		);
	} catch {
		return false;
	}
};

const EXAMPLES_SHOWN = 2;

/** Real corpus nouns for a pattern, falling back to the paradigm's own word —
 * masc-es and fem-psi have a single noun each, and archaic patterns may have none. */
const examplesFor = (data: NounsData | null, paradigm: AgreementParadigm): string[] => {
	const examples = (data?.byPattern[paradigm.id]?.examples ?? [])
		.filter((e) => demonstratesPattern(e.lemma, paradigm) && followsPattern(e, paradigm))
		.map((e) => e.lemma)
		.slice(0, EXAMPLES_SHOWN);
	return examples.length > 0 ? examples : [lemmaOf(paradigm)];
};

const CASE_KEY = { nominative: "nom", accusative: "acc", genitive: "gen" } as const;

/** Singular above plural in one table, so a column reads straight down from φίλος to
 * φίλοι. Side by side puts them at different x and turns the derivation into a
 * cross-table saccade. */
const nounTable = (paradigms: AgreementParadigm[], gender: Gender, data: NounsData | null): GuideTableData => ({
	columns: [{ label: "Form" }, ...paradigms.map((p) => ({ label: `${lemmaOf(p)} ${p.pattern}`, greek: true }))],
	rows: [
		...grammaticalNumbers.flatMap((number) =>
			CASE_ORDER.map((grammaticalCase) => [
				CASE_LABEL[number][grammaticalCase],
				...paradigms.map((p) => {
					const form = formFor(p, number, CASE_KEY[grammaticalCase as keyof typeof CASE_KEY]);
					return form ? markedCell(form.full, grammaticalCase, gender, number === "plural") : "—";
				}),
			]),
		),
		["Examples", ...paradigms.map((p) => examplesFor(data, p).join(", "))],
	],
});

export function NounsTab({ data = null }: { data?: NounsData | null }) {
	return (
		<LookupPage title="Nouns">
			{GENDER_SECTIONS.map(({ gender, title, taughtIn }) => (
				<LookupSection key={gender} title={title} tone={`gender-${gender}`} taughtIn={[taughtIn]}>
					<GuideTable table={nounTable(AGREEMENT_PARADIGMS.filter((p) => p.gender === gender), gender, data)} />
				</LookupSection>
			))}
		</LookupPage>
	);
}
