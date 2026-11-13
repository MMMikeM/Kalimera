import { AGREEMENT_PARADIGMS, type AgreementParadigm } from "@/constants/agreement";
import { stripTonos } from "@/lib/greek-letters";
import { markedCell } from "@/lib/guide-marks";
import { declineNoun } from "@/lib/noun-declension";
import { enrichNoun } from "@/scripts/seed-data/vocabulary/noun-seed-enrichment";
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

/**
 * The patterns each gender's table shows. καφές moves to the table of plurals that
 * add a syllable, and -ξη, -ψη and archaic -η decline exactly like -ση, so they
 * share its column as examples (`SAME_ENDINGS`).
 */
const GENDER_SECTIONS = [
	{
		gender: "masculine",
		title: "Masculine nouns",
		patterns: ["masc-os", "masc-as", "masc-is"],
		taughtIn: [TAUGHT_IN.masculineNouns],
	},
	{
		gender: "feminine",
		title: "Feminine nouns",
		patterns: ["fem-a", "fem-i", "fem-si"],
		taughtIn: [TAUGHT_IN.feminineNouns, TAUGHT_IN.extraSyllable],
	},
	{
		gender: "neuter",
		title: "Neuter nouns",
		patterns: ["neut-o", "neut-i", "neut-ma", "neut-os"],
		taughtIn: [TAUGHT_IN.neuterNouns],
	},
] as const satisfies { gender: Gender; title: string; patterns: string[]; taughtIn: GuideSectionRef[] }[];

const SAME_ENDINGS: Partial<Record<string, string[]>> = { "fem-si": ["fem-ksi", "fem-psi", "fem-i-archaic"] };

/** Plurals that add a syllable, all common family and café words, from the same generator the seed uses. */
const EXTRA_SYLLABLE: { lemma: string; gender: Gender }[] = [
	{ lemma: "καφές", gender: "masculine" },
	{ lemma: "μπαμπάς", gender: "masculine" },
	{ lemma: "παππούς", gender: "masculine" },
	{ lemma: "γιαγιά", gender: "feminine" },
];

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
		["Examples", ...paradigms.map((p) => examplesOf(data, p).join(", "))],
	],
});

const examplesOf = (data: NounsData | null, paradigm: AgreementParadigm): string[] => {
	const siblings = SAME_ENDINGS[paradigm.id];
	if (!siblings) return examplesFor(data, paradigm);
	return AGREEMENT_PARADIGMS.filter((p) => siblings.includes(p.id)).map(lemmaOf);
};

const extraSyllableTable = (): GuideTableData => {
	const nouns = EXTRA_SYLLABLE.map(({ lemma, gender }) => ({
		lemma,
		gender,
		forms: enrichNoun({ lemma, gender, english: "", cefrLevel: "A1" }).nominalForms,
	}));
	return {
		columns: [{ label: "Form" }, ...nouns.map(({ lemma }) => ({ label: lemma, greek: true }))],
		rows: grammaticalNumbers.flatMap((number) =>
			CASE_ORDER.map((grammaticalCase) => [
				CASE_LABEL[number][grammaticalCase],
				...nouns.map(({ forms, gender }) => {
					const cell = forms[`${grammaticalCase}_${number}` as keyof typeof forms];
					return cell
						? markedCell(`${cell.article ?? ""} ${cell.form}`.trim(), grammaticalCase, gender, number === "plural")
						: "—";
				}),
			]),
		),
	};
};

export function NounsTab({ data = null }: { data?: NounsData | null }) {
	return (
		<LookupPage title="Nouns">
			{GENDER_SECTIONS.map(({ gender, title, patterns, taughtIn }) => (
				<LookupSection key={gender} title={title} tone={`gender-${gender}`} taughtIn={taughtIn}>
					<GuideTable
						table={nounTable(
							AGREEMENT_PARADIGMS.filter((p) => (patterns as readonly string[]).includes(p.id)),
							gender,
							data,
						)}
					/>
				</LookupSection>
			))}
			<LookupSection title="Plurals that add a syllable" tone="olive" taughtIn={[TAUGHT_IN.extraSyllable]}>
				<GuideTable table={extraSyllableTable()} />
			</LookupSection>
		</LookupPage>
	);
}
