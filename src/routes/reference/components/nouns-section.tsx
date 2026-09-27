import type React from "react";

import { Card } from "@/components/Card";
import { NextStepCard } from "@/components/cards/NextStepCard";
import { TeachingCard } from "@/components/cards/TeachingCard";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import {
	CASE_ROW_DEFS,
	type ColumnDef,
	type ColumnGroup,
	GrammarTable,
	type RowGroup,
} from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import { AGREEMENT_PARADIGMS, type AgreementParadigm } from "@/constants/agreement";
import { GENDER_SCHEME } from "@/constants/grammar-palette";
import { stripTonos } from "@/lib/greek-letters";
import { declineNoun } from "@/lib/noun-declension";
import {
	type Gender,
	type GrammaticalNumber,
	genders,
	type NounDeclensionPattern,
	nounDeclensionPatterns,
} from "@/server/db/enums";

import type { NounsData } from "../$tab";
import { BandHeading } from "./BandHeading";
import { GenderChip } from "./case-table";

type RoleCase = "nom" | "acc" | "gen";

const byId = (ids: readonly string[]): AgreementParadigm[] =>
	ids
		.map((id) => AGREEMENT_PARADIGMS.find((p) => p.id === id))
		.filter((p): p is AgreementParadigm => p !== undefined);

const formFor = (paradigm: AgreementParadigm, number: GrammaticalNumber, caseKey: string) =>
	(number === "singular" ? paradigm.forms : paradigm.pluralForms).find((f) => f.case === caseKey);

/** `example` reads "φίλος (friend)"; tables want the word alone. */
const lemmaOf = (paradigm: AgreementParadigm) => paradigm.example.split(" (")[0] ?? paradigm.example;

const splitArticle = (full: string): [article: string, word: string] => {
	const [article = "", ...word] = full.split(" ");
	return [article, word.join(" ")];
};

const capitalise = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

interface GenderMove {
	gender: Gender;
	rule: React.ReactNode;
	/** The one case whose ending this gender changes in a way worth learning first. */
	movesFor: Exclude<RoleCase, "nom">;
	ids: readonly string[];
}

// `agreement.test.ts` holds every paradigm of each gender to its rule, so these
// sentences stay true as patterns are added.
const GENDER_MOVES: GenderMove[] = [
	{
		gender: "masculine",
		rule: (
			<>
				Drops the <GreekText size="sm">-ς</GreekText> when it's the Target.
			</>
		),
		movesFor: "acc",
		ids: ["masc-os", "masc-as", "masc-is", "masc-es"],
	},
	{
		gender: "feminine",
		rule: (
			<>
				Adds a <GreekText size="sm">-ς</GreekText> when it's the Owner.
			</>
		),
		movesFor: "gen",
		ids: ["fem-a", "fem-i", "fem-si"],
	},
	{
		gender: "neuter",
		rule: "Doer and Target are the same word. Only the Owner changes.",
		movesFor: "gen",
		ids: ["neut-o", "neut-i", "neut-ma"],
	},
];

/** Where two forms of one word part company. Stress-blind, because όνομα → ονόματος
 * moves the tonos without changing the stem. */
const divergeAt = (a: string, b: string): number => {
	const [x, y] = [stripTonos(a), stripTonos(b)];
	let i = 0;
	while (i < x.length && x[i] === y[i]) i++;
	return i;
};

const BoldFrom = ({ word, at }: { word: string; at: number }) => (
	<>
		{word.slice(0, at)}
		<span className="font-bold">{word.slice(at)}</span>
	</>
);

/** The weight goes on what changed: the letters the new form gains, or, when it
 * only loses some (φίλος → φίλο), the letters the Doer gives up. */
const MoveRow = ({ paradigm, movesFor }: { paradigm: AgreementParadigm; movesFor: RoleCase }) => {
	const doer = formFor(paradigm, "singular", "nom");
	const moved = formFor(paradigm, "singular", movesFor);
	if (!doer || !moved) return null;

	const [doerArticle, doerWord] = splitArticle(doer.full);
	const [movedArticle, movedWord] = splitArticle(moved.full);
	const at = divergeAt(doerWord, movedWord);
	const gains = movedWord.length > at;

	return (
		<tr className="border-t border-stone-200/70">
			<td className="py-1.5 pr-2">
				<GreekText size="sm" tone="muted">
					{paradigm.pattern}
				</GreekText>
			</td>
			<td className="py-1.5 pr-2">
				<GreekText size="sm" className="sm:text-base">
					{doerArticle} {gains ? doerWord : <BoldFrom word={doerWord} at={at} />}
				</GreekText>
			</td>
			<td className="py-1.5 pr-2 text-stone-400" aria-hidden="true">
				→
			</td>
			<td className="py-1.5">
				<GreekText size="sm" className="sm:text-base">
					{movedArticle} {gains ? <BoldFrom word={movedWord} at={at} /> : movedWord}
				</GreekText>
			</td>
		</tr>
	);
};

const MOVE_TARGET_LABEL: Record<Exclude<RoleCase, "nom">, string> = {
	acc: "Target",
	gen: "Owner",
};

const GenderMoveCard = ({ move }: { move: GenderMove }) => (
	<TeachingCard
		scheme={GENDER_SCHEME[move.gender]}
		title={capitalise(move.gender)}
		description={move.rule}
	>
		<table className="w-full table-fixed text-left">
			<thead>
				<tr className="text-xs text-stone-500">
					<th className="w-11 pb-1">
						<span className="sr-only">Ending</span>
					</th>
					<th className="pb-1 font-normal">Doer</th>
					<th className="w-6 pb-1">
						<span className="sr-only">becomes</span>
					</th>
					<th className="pb-1 font-normal">{MOVE_TARGET_LABEL[move.movesFor]}</th>
				</tr>
			</thead>
			<tbody>
				{byId(move.ids).map((paradigm) => (
					<MoveRow key={paradigm.id} paradigm={paradigm} movesFor={move.movesFor} />
				))}
			</tbody>
		</table>
	</TeachingCard>
);

const Bold = ({ children }: { children: string }) => (
	<span className="font-bold">{children}</span>
);

// Greek here stays neutral with weight on the morpheme: the cards above carry gender
// colour, and case colour beside them would put both axes in one view.
const NOUN_NOTES: Array<{ key: string; body: React.ReactNode }> = [
	{
		key: "look-alikes",
		body: (
			<>
				<strong className="text-stone-800">A few neuters dress as masculines.</strong>{" "}
				<GreekText>το μέρος</GreekText> and <GreekText>το κρέας</GreekText> end like{" "}
				<GreekText>φίλος</GreekText> and <GreekText>πατέρας</GreekText> but take{" "}
				<GreekText>το</GreekText>. When the ending and the article disagree, trust the article.
			</>
		),
	},
	{
		key: "plural-match",
		body: (
			<>
				<strong className="text-stone-800">In the plural, Doer and Target match</strong>, except
				for masculines in <GreekText>-ος</GreekText>:{" "}
				<GreekText>
					οι φίλ<Bold>οι</Bold>
				</GreekText>{" "}
				but{" "}
				<GreekText>
					τους φίλ<Bold>ους</Bold>
				</GreekText>
				.
			</>
		),
	},
	{
		key: "plural-owner",
		body: (
			<>
				<strong className="text-stone-800">
					Every plural Owner ends in <GreekText>-ων</GreekText>
				</strong>
				, whatever the gender:{" "}
				<GreekText>
					των φίλ<Bold>ων</Bold>
				</GreekText>
				,{" "}
				<GreekText>
					των γυναικ<Bold>ών</Bold>
				</GreekText>
				,{" "}
				<GreekText>
					των παιδι<Bold>ών</Bold>
				</GreekText>
				.
			</>
		),
	},
	{
		key: "calling",
		body: (
			<>
				<strong className="text-stone-800">Calling someone</strong> uses the Target form without
				its article: <GreekText>Γιάννη!</GreekText>, <GreekText>πατέρα!</GreekText> Nouns in{" "}
				<GreekText>-ος</GreekText> usually switch to <GreekText>-ε</GreekText> instead:{" "}
				<GreekText>
					φίλ<Bold>ε</Bold>!
				</GreekText>
			</>
		),
	},
];

/**
 * The four commonest patterns in the seeded corpus — fem-a 99, neut-o 91,
 * masc-os 71, neut-i 52 — which is also all three genders. fem-i is next at 32
 * and stays out for a second reason: its plural endings are stored accented, so
 * an endings-only cell would read `-η → -ές` and teach αγάπη → *αγαπές.
 */
const CORE_IDS: readonly string[] = ["masc-os", "fem-a", "neut-o", "neut-i"];

type Emphasis = "anchor" | "changed" | "same";

/**
 * Three weights, not two. The nominative is the anchor the learner already knows
 * and derives the rest from; cells that differ from it are the ones you would get
 * wrong; cells identical to it are predictable and recede. With only two weights a
 * fully regular column greys out entirely and the eye has nowhere to land.
 *
 * Receding the predictable cells is also what keeps this grid inside the
 * working-memory ceiling: the ceiling counts deviations, not cells.
 */
const emphasisFor = (
	paradigm: AgreementParadigm,
	number: GrammaticalNumber,
	caseKey: string,
): Emphasis => {
	if (caseKey === "nom") return "anchor";
	return formFor(paradigm, number, caseKey)?.ending === formFor(paradigm, number, "nom")?.ending
		? "same"
		: "changed";
};

/**
 * Article, stem and ending, with the weight on the ending. A phone has no room for
 * four columns of full forms, so below `sm` the cell falls back to the ending alone
 * and the column header supplies the word.
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

	const [article, word] = splitArticle(form.full);
	// Endings are stored without the stress their word may carry (μαθητής against -ης),
	// so the split is by length, which a precomposed tonos leaves unchanged.
	const stem = word.slice(0, word.length - form.ending.replace(/^-/, "").length);
	const ending = word.slice(stem.length);
	const emphasis = emphasisFor(paradigm, number, caseKey);

	return (
		<GreekText
			size="sm"
			tone={emphasis === "same" ? "muted" : "default"}
			weight={emphasis === "anchor" ? "medium" : "normal"}
		>
			<span className="hidden text-muted-foreground sm:inline">{article} </span>
			<span className="hidden sm:inline">{stem}</span>
			<span className="sm:hidden">-</span>
			<span className={emphasis === "changed" ? "font-semibold" : undefined}>{ending}</span>
		</GreekText>
	);
};

/** One gender chip over each run of same-gender columns, so φίλος's column says
 * masculine once and the two neuter patterns share a single neuter. */
const genderGroups = (paradigms: AgreementParadigm[]): ColumnGroup[] => {
	const runs: Array<{ gender: Gender; first: string; span: number }> = [];
	for (const p of paradigms) {
		const last = runs.at(-1);
		if (last?.gender === p.gender) last.span += 1;
		else runs.push({ gender: p.gender, first: p.id, span: 1 });
	}
	return runs.map((run) => ({
		key: run.first,
		label: (
			<span className="block border-b-2 border-stone-200 pb-1.5">
				<GenderChip gender={run.gender} />
			</span>
		),
		span: run.span,
	}));
};

/** Singular above plural in one table, so a column reads straight down from φίλος to
 * φίλοι. Side by side puts them at different x and turns the derivation into a
 * cross-table saccade. Do not "improve" into a grid. */
const NounTable = ({
	paradigms,
	showGender = true,
}: {
	paradigms: AgreementParadigm[];
	/** Off under a heading that already names the one gender every column shares. */
	showGender?: boolean;
}) => {
	const columns: ColumnDef[] = paradigms.map((p) => ({
		key: p.id,
		label: (
			<GreekText size="xs" weight="semibold" className="sm:text-sm">
				{lemmaOf(p)}
			</GreekText>
		),
	}));

	// Keyed off `row.key`, never row position: CASE_ROW_DEFS is a shared export and
	// reordering it used to silently mislabel every cell on this page.
	const groups: RowGroup[] = (["singular", "plural"] as const).map((number) => ({
		label: capitalise(number),
		rows: CASE_ROW_DEFS,
		cells: CASE_ROW_DEFS.map((row) =>
			paradigms.map((p) => (
				<NounForm key={p.id} paradigm={p} number={number} caseKey={row.key} />
			)),
		),
	}));

	return (
		<div className="-mx-4 overflow-x-auto px-4">
			{/* Even columns from sm up; phones size them to content so γυναίκα gets
			    the room it needs. */}
			<GrammarTable
				className="sm:table-fixed"
				columns={columns}
				columnGroups={showGender ? genderGroups(paradigms) : undefined}
				groups={groups}
			/>
		</div>
	);
};

/** Three example words per pattern keeps new material inside the working-memory ceiling. */
const EXAMPLES_SHOWN = 3;

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

/** Real corpus nouns for a pattern, falling back to the paradigm's own word —
 * masc-es and fem-psi have a single noun each, and archaic patterns may have none. */
const examplesFor = (data: NounsData | null, paradigm: AgreementParadigm): string[] => {
	const examples = (data?.byPattern[paradigm.id]?.examples ?? [])
		.filter((e) => demonstratesPattern(e.lemma, paradigm) && followsPattern(e, paradigm))
		.map((e) => e.lemma)
		.slice(0, EXAMPLES_SHOWN);
	return examples.length > 0 ? examples : [lemmaOf(paradigm)];
};

const PatternWords = ({ gender, data }: { gender: Gender; data: NounsData | null }) => (
	<ul className="divide-y divide-stone-200 border-y border-stone-200 text-sm">
		{AGREEMENT_PARADIGMS.filter((p) => p.gender === gender).map((p) => {
			const count = data?.byPattern[p.id]?.count ?? null;
			return (
				<li key={p.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-2">
					<GreekText size="sm" weight="semibold" className="w-20 shrink-0">
						{p.pattern}
					</GreekText>
					<GreekText size="sm">{examplesFor(data, p).join(", ")}</GreekText>
					{count !== null && (
						<span className="text-xs text-stone-500">
							{count} {count === 1 ? "noun" : "nouns"} in the course
						</span>
					)}
					{p.tip && <span className="basis-full text-xs text-stone-500 italic">{p.tip}</span>}
				</li>
			);
		})}
	</ul>
);

const OtherPatterns = ({ data }: { data: NounsData | null }) => (
	<CollapsibleSection
		title="Every pattern in the course"
		subtitle="with words that follow each"
		colorScheme="stone"
	>
		<div className="space-y-12 p-4">
			{genders.map((gender) => {
				const rest = AGREEMENT_PARADIGMS.filter(
					(p) => p.gender === gender && !CORE_IDS.includes(p.id),
				);
				return (
					<div key={gender} className="space-y-5">
						<BandHeading as="h3" size="md" tone="quiet" title={capitalise(gender)} />
						{rest.length > 0 ? <NounTable paradigms={rest} showGender={false} /> : null}
						<PatternWords gender={gender} data={data} />
					</div>
				);
			})}
		</div>
	</CollapsibleSection>
);

export const NounsSection = ({ data = null }: { data?: NounsData | null }) => (
	<section id="nouns" className="space-y-16">
		<div className="space-y-8">
			<h2 className="sr-only">What each gender changes</h2>
			<div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
				{GENDER_MOVES.map((move) => (
					<GenderMoveCard key={move.gender} move={move} />
				))}
			</div>
			<ul className="divide-y divide-stone-200 border-y border-stone-200">
				{NOUN_NOTES.map((note) => (
					<li key={note.key} className="py-4 leading-relaxed text-stone-700">
						{note.body}
					</li>
				))}
			</ul>
		</div>

		<div className="space-y-8">
			<BandHeading
				title="Look it up"
				lede="The four patterns behind most nouns you'll meet. Bold endings are the ones that differ from the Doer; the faint ones are the Doer again."
			/>
			<Card variant="bordered" padding="lg" className="px-4 sm:px-6">
				<NounTable paradigms={byId(CORE_IDS)} />
			</Card>
			<OtherPatterns data={data} />
		</div>

		<div className="space-y-6 border-t border-stone-200 pt-12">
			<BandHeading
				title="Nouns sorted. Now describe them."
				lede="Adjectives copy every ending on this page, so there is less new to learn than it looks."
			/>
			<div className="grid gap-3 md:grid-cols-3">
				<NextStepCard
					to="/reference/adjectives"
					title="Adjectives"
					description="The same endings, copied onto the describing word"
					emphasis
				/>
				<NextStepCard
					to="/reference/articles"
					title="Articles"
					description="The article that travels with each form"
				/>
				<NextStepCard
					to="/learn/nouns"
					title="Browse nouns"
					description="Every noun in the course, by subject"
				/>
			</div>
		</div>
	</section>
);
