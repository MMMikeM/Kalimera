import { GrammarTable, type ColumnDef, type RowGroup } from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import { AGREEMENT_PARADIGMS, type AgreementParadigm } from "@/constants/agreement";
import { stripTonos } from "@/lib/greek-letters";
import { declineNoun } from "@/lib/noun-declension";
import {
	type Gender,
	type GrammaticalNumber,
	grammaticalNumbers,
	type NounDeclensionPattern,
	nounDeclensionPatterns,
} from "@/server/db/enums";

import type { NounsData } from "../$tab";
import { CASE_ROWS, NUMBER_LABEL } from "../components/gender-case-table";
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

/**
 * Article, stem and ending. A phone has no room for several columns of full forms,
 * so below `sm` the cell falls back to the ending alone and the column header
 * supplies the word. Endings are stored without the stress their word may carry
 * (μαθητής against -ης), so the split is by length, which a precomposed tonos leaves
 * unchanged.
 */
const NounForm = ({
	paradigm,
	number,
	caseKey,
}: {
	paradigm: AgreementParadigm;
	number: GrammaticalNumber;
	caseKey: string;
}) => {
	const form = formFor(paradigm, number, caseKey);
	if (!form) return <span className="text-stone-300">—</span>;

	const [article = "", ...rest] = form.full.split(" ");
	const word = rest.join(" ");
	const stem = word.slice(0, word.length - form.ending.replace(/^-/, "").length);

	return (
		<GreekText size="sm">
			<span className="hidden sm:inline">
				{article} {stem}
			</span>
			<span className="sm:hidden">-</span>
			{word.slice(stem.length)}
		</GreekText>
	);
};

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

const EXAMPLES_SHOWN = 3;

/** Real corpus nouns for a pattern, falling back to the paradigm's own word —
 * masc-es and fem-psi have a single noun each, and archaic patterns may have none. */
const examplesFor = (data: NounsData | null, paradigm: AgreementParadigm): string[] => {
	const examples = (data?.byPattern[paradigm.id]?.examples ?? [])
		.filter((e) => demonstratesPattern(e.lemma, paradigm) && followsPattern(e, paradigm))
		.map((e) => e.lemma)
		.slice(0, EXAMPLES_SHOWN);
	return examples.length > 0 ? examples : [lemmaOf(paradigm)];
};

/** Singular above plural in one table, so a column reads straight down from φίλος to
 * φίλοι. Side by side puts them at different x and turns the derivation into a
 * cross-table saccade. */
const NounTable = ({ paradigms, data }: { paradigms: AgreementParadigm[]; data: NounsData | null }) => {
	const columns: ColumnDef[] = paradigms.map((p) => ({
		key: p.id,
		label: (
			<>
				<GreekText size="xs" weight="semibold" className="sm:text-sm">
					{lemmaOf(p)}
				</GreekText>
				<GreekText size="xs" className="block font-normal">
					{p.pattern}
				</GreekText>
			</>
		),
	}));

	const groups: RowGroup[] = [
		...grammaticalNumbers.map((number) => ({
			label: NUMBER_LABEL[number],
			rows: CASE_ROWS,
			cells: CASE_ROWS.map((row) =>
				paradigms.map((p) => <NounForm key={p.id} paradigm={p} number={number} caseKey={row.key} />),
			),
		})),
		{
			label: "Words that follow it",
			rows: [{ key: "examples", label: "Examples" }],
			cells: [
				paradigms.map((p) => (
					<GreekText key={p.id} size="sm" className="block">
						{examplesFor(data, p).map((lemma) => (
							<span key={lemma} className="block">
								{lemma}
							</span>
						))}
					</GreekText>
				)),
			],
		},
	];

	return <GrammarTable className="sm:table-fixed" columns={columns} groups={groups} rowHeaderLabel="Job" />;
};

export function NounsTab({ data = null }: { data?: NounsData | null }) {
	return (
		<LookupPage title="Nouns">
			{GENDER_SECTIONS.map(({ gender, title, taughtIn }) => (
				<LookupSection key={gender} title={title} taughtIn={[taughtIn]}>
					<NounTable paradigms={AGREEMENT_PARADIGMS.filter((p) => p.gender === gender)} data={data} />
				</LookupSection>
			))}
		</LookupPage>
	);
}
