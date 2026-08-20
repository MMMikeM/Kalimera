import { useState } from "react";

import { NextStepCard, TeachingCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import {
	CASE_ROW_DEFS,
	type ColumnDef,
	GrammarTable,
	type RowDef,
} from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import { MistakeComparison } from "@/components/MistakeComparison";
import { SectionHeading } from "@/components/SectionHeading";
import { AGREEMENT_PARADIGMS, type AgreementParadigm } from "@/constants/agreement";
import { GENDER_SCHEME, SCHEME } from "@/constants/grammar-palette";
import type { NounsData } from "../$tab";

type Gender = "masculine" | "feminine" | "neuter";
/** Matches both `RowDef.key` and `AgreementPattern["case"]`, which is what lets
 * the table look cells up by key instead of by row position. */
type CaseKey = "nom" | "acc" | "gen" | "voc";
type RoleCase = Exclude<CaseKey, "voc">;
type GrammaticalNumber = "singular" | "plural";
type ViewMode = "endings" | "full";

const ROLE_CASES: RoleCase[] = ["nom", "acc", "gen"];

/** Sits outside the Doer/Target/Owner system, so it hides behind the toggle. */
const VOCATIVE_ROW: RowDef = { key: "voc", label: "Calling", sublabel: "Vocative" };

/** Derived from AGREEMENT_PARADIGMS: hand-kept copies drifted from the generator. */
const paradigmsByGender = (gender: Gender): AgreementParadigm[] =>
	AGREEMENT_PARADIGMS.filter((p) => p.gender === gender);

const GENDER_PATTERNS: Record<Gender, readonly string[]> = {
	masculine: paradigmsByGender("masculine").map((p) => p.id),
	feminine: paradigmsByGender("feminine").map((p) => p.id),
	neuter: paradigmsByGender("neuter").map((p) => p.id),
};

/** Two paradigms can share a label (`-η` covers both regular and archaic), and a
 * repeated ending in the hint list reads as a bug. */
const endingsFor = (gender: Gender): string => [
	...new Set(paradigmsByGender(gender).map((p) => p.pattern)),
].join(", ");

/**
 * The four commonest patterns in the seeded corpus — fem-a 99, neut-o 91,
 * masc-os 71, neut-i 52 — which is also all three genders. fem-i is next at 32
 * and stays out for a second reason: its plural endings are stored accented, so
 * an Endings cell would read `-η → -ές` and teach αγάπη → *αγαπές.
 */
const ESSENTIAL_IDS = ["masc-os", "fem-a", "neut-o", "neut-i"] as const;

const GENDER_HINTS: Record<Gender, { endings: string; hint: string }> = {
	masculine: { endings: endingsFor("masculine"), hint: "Male people, -ος words" },
	feminine: { endings: endingsFor("feminine"), hint: "Female people, αγάπη / ζωή" },
	neuter: { endings: endingsFor("neuter"), hint: "Diminutives, result nouns" },
};

const CASE_META: Record<
	RoleCase,
	{ handle: string; greek: string; scheme: "case-nominative" | "case-accusative" | "case-genitive" }
> = {
	nom: { handle: "Doer", greek: "Nominative", scheme: "case-nominative" },
	acc: { handle: "Target", greek: "Accusative", scheme: "case-accusative" },
	gen: { handle: "Owner", greek: "Genitive", scheme: "case-genitive" },
};

const getParadigms = (ids: readonly string[]): AgreementParadigm[] =>
	ids
		.map((id) => AGREEMENT_PARADIGMS.find((p) => p.id === id))
		.filter((p): p is AgreementParadigm => p !== undefined);

const formFor = (paradigm: AgreementParadigm, number: GrammaticalNumber, caseKey: string) =>
	(number === "singular" ? paradigm.forms : paradigm.pluralForms).find((f) => f.case === caseKey);

const cellValue = (
	paradigm: AgreementParadigm,
	number: GrammaticalNumber,
	caseKey: string,
	mode: ViewMode,
) => {
	const form = formFor(paradigm, number, caseKey);
	if (!form) return "—";
	return mode === "endings" ? form.ending : form.full;
};

/**
 * Three weights, not two. The nominative is the anchor the learner already knows
 * and derives the rest from; cells that differ from it are the ones you would get
 * wrong; cells identical to it are predictable and recede. With only two weights a
 * fully regular column greys out entirely and the eye has nowhere to land.
 *
 * Receding the predictable cells is also what keeps this grid inside the
 * working-memory ceiling: the ceiling counts deviations, not cells.
 */
const cellEmphasis = (
	paradigm: AgreementParadigm,
	number: GrammaticalNumber,
	caseKey: string,
): { tone: "default" | "muted"; weight: "normal" | "medium" | "semibold" } => {
	if (caseKey === "nom") return { tone: "default", weight: "medium" };
	const nominative = formFor(paradigm, number, "nom");
	const current = formFor(paradigm, number, caseKey);
	return current?.ending === nominative?.ending
		? { tone: "muted", weight: "normal" }
		: { tone: "default", weight: "semibold" };
};

/** The paradigm owns the noun phrase; only the frame around it is authored here. */
interface SentenceFrame {
	prefix?: string;
	suffix?: string;
	english: string;
}

const ROLE_SENTENCES: Array<{ paradigmId: string; frames: Record<RoleCase, SentenceFrame> }> = [
	{
		paradigmId: "masc-os",
		frames: {
			nom: { suffix: " μιλάει", english: "the friend speaks" },
			acc: { prefix: "βλέπω ", english: "I see the friend" },
			gen: { prefix: "το σπίτι ", english: "the friend's house" },
		},
	},
	{
		paradigmId: "fem-a",
		frames: {
			nom: { suffix: " γελάει", english: "the woman laughs" },
			acc: { prefix: "ξέρω ", english: "I know the woman" },
			gen: { prefix: "το παιδί ", english: "the woman's child" },
		},
	},
	{
		paradigmId: "neut-o",
		frames: {
			nom: { suffix: " πέφτει", english: "the book falls" },
			acc: { prefix: "διαβάζω ", english: "I read the book" },
			gen: { prefix: "ο τίτλος ", english: "the title of the book" },
		},
	},
];

const sentenceFor = (paradigm: AgreementParadigm, caseKey: RoleCase, frame: SentenceFrame) =>
	`${frame.prefix ?? ""}${formFor(paradigm, "singular", caseKey)?.full ?? ""}${frame.suffix ?? ""}`;

const CASE_QUESTIONS: Record<RoleCase, string> = {
	nom: "Who does it?",
	acc: "Who/what receives?",
	gen: "Whose is it?",
};

const NOUN_MISTAKES = [
	{
		wrong: "βλέπω ο πατέρας",
		correct: "βλέπω τον πατέρα",
		explanation: "What the verb acts on is the Target, so ο πατέρας becomes τον πατέρα.",
	},
	{
		wrong: "θέλω ο καφές",
		correct: "θέλω τον καφέ",
		explanation: "θέλω takes a Target too — the -ς drops off.",
	},
	{
		wrong: "το σπίτι ο Νίκος",
		correct: "το σπίτι του Νίκου",
		explanation: "Possession is the Owner: ο Νίκος becomes του Νίκου.",
	},
	{
		wrong: "οι παιδιά",
		correct: "τα παιδιά",
		explanation: "παιδί is neuter, so its plural article is τα, never οι.",
	},
	{
		wrong: "το βιβλία",
		correct: "τα βιβλία",
		explanation: "The article matches the noun's number: plural βιβλία takes τα.",
	},
];

/** Three example words per pattern keeps new material inside the working-memory ceiling. */
const EXAMPLES_SHOWN = 3;

const stripTonos = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");

/** An example has to actually show the ending it illustrates. Pluralia tantum are
 * assigned a pattern for declension purposes but do not demonstrate it — λεφτά is
 * a neut-o noun, yet a column headed "-ο / λεφτά" teaches nothing. Tonos-blind
 * because endings carry stress the lemma may not (σπίτι against -ί). */
const demonstratesPattern = (lemma: string, paradigm: AgreementParadigm): boolean => {
	const ending = formFor(paradigm, "singular", "nom")?.ending?.replace(/^-/, "");
	return ending ? stripTonos(lemma).endsWith(stripTonos(ending)) : true;
};

/** Real corpus nouns for a pattern, falling back to the paradigm's own example —
 * masc-es and fem-psi have a single noun each, and archaic patterns may have none. */
const examplesFor = (data: NounsData | null, paradigm: AgreementParadigm): string[] => {
	const examples = (data?.byPattern[paradigm.id]?.examples ?? [])
		.map((e) => e.lemma)
		.filter((lemma) => demonstratesPattern(lemma, paradigm))
		.slice(0, EXAMPLES_SHOWN);
	return examples.length > 0 ? examples : [paradigm.example];
};

const countFor = (data: NounsData | null, paradigm: AgreementParadigm): number | null =>
	data?.byPattern[paradigm.id]?.count ?? null;

const CaseGuide = () => {
	const friend = getParadigms(["masc-os"])[0];
	const frames = ROLE_SENTENCES[0]?.frames;
	if (!friend || !frames) return null;

	return (
		<TeachingCard
			scheme="neutral"
			eyebrow="Concept"
			title="Which case should I use?"
			description="The job the noun does in the sentence decides its case."
			footer={
				<p className="text-sm text-stone-500">
					All prepositions (σε, με, για, από…) take accusative.
				</p>
			}
		>
			<div className="space-y-3">
				{ROLE_CASES.map((caseKey) => {
					const meta = CASE_META[caseKey];
					const style = SCHEME[meta.scheme];
					const frame = frames[caseKey];
					return (
						<div key={caseKey} className="flex items-start gap-3">
							<span
								className={`shrink-0 rounded px-2 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
							>
								<span className="block leading-tight">{meta.handle}</span>
								<span className="block text-xs font-normal opacity-70">{meta.greek}</span>
							</span>
							<div>
								<span className="text-sm font-medium">{CASE_QUESTIONS[caseKey]}</span>
								<div className="text-sm text-stone-500">
									<GreekText tone="accent" size="sm">
										{sentenceFor(friend, caseKey, frame)}
									</GreekText>{" "}
									({frame.english})
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</TeachingCard>
	);
};

const GenderHints = () => (
	<TeachingCard
		scheme="neutral"
		eyebrow="Spotting gender"
		title="Recognise gender by ending"
		description="The ending tells you the gender → the gender tells you how it declines."
	>
		<div className="grid grid-cols-3 gap-3 text-sm">
			{(["masculine", "feminine", "neuter"] as const).map((gender) => (
				<div key={gender} className="space-y-1">
					<div className="flex items-center gap-1.5">
						<span className={`h-2.5 w-2.5 rounded-full ${SCHEME[GENDER_SCHEME[gender]].badgeBg}`} />
						<span className={`font-medium capitalize ${SCHEME[GENDER_SCHEME[gender]].text}`}>
							{gender}
						</span>
					</div>
					<div className="text-xs text-stone-600">{GENDER_HINTS[gender].endings}</div>
					<div className="text-xs text-stone-500">{GENDER_HINTS[gender].hint}</div>
				</div>
			))}
		</div>
	</TeachingCard>
);

const ViewToggle = ({
	mode,
	onChange,
}: {
	mode: ViewMode;
	onChange: (mode: ViewMode) => void;
}) => (
	<div className="flex overflow-hidden rounded-lg border border-stone-200 text-xs">
		{(["endings", "full"] as const).map((m) => (
			<button
				key={m}
				type="button"
				onClick={() => onChange(m)}
				className={`px-3 py-1.5 transition-colors ${
					mode === m ? "bg-stone-700 text-white" : "bg-white text-stone-600 hover:bg-stone-50"
				}`}
			>
				{m === "endings" ? "Endings" : "Full forms"}
			</button>
		))}
	</div>
);

const NounEndingsTable = ({
	paradigms,
	number,
	mode = "endings",
	includeVocative = false,
	columnLabels,
}: {
	paradigms: AgreementParadigm[];
	number: GrammaticalNumber;
	mode?: ViewMode;
	includeVocative?: boolean;
	columnLabels?: (paradigm: AgreementParadigm) => React.ReactNode;
}) => {
	const columns: ColumnDef[] = paradigms.map((p) => ({
		key: p.id,
		label: columnLabels ? columnLabels(p) : p.pattern,
		scheme: GENDER_SCHEME[p.gender],
	}));

	const rows = includeVocative ? [...CASE_ROW_DEFS, VOCATIVE_ROW] : CASE_ROW_DEFS;

	// Keyed off `row.key`, never row position: CASE_ROW_DEFS is a shared export and
	// reordering it used to silently mislabel every cell on this page.
	const cells = rows.map((row) =>
		paradigms.map((p) => {
			const { tone, weight } = cellEmphasis(p, number, row.key);
			return (
				<GreekText key={p.id} size="sm" tone={tone} weight={weight}>
					{cellValue(p, number, row.key, mode)}
				</GreekText>
			);
		}),
	);

	return (
		<div className="-mx-4 overflow-x-auto px-4">
			{/* table-fixed so the singular and plural grids share column widths and a
			    column reads straight down across both. */}
			<GrammarTable className="table-fixed" columns={columns} rows={rows} cells={cells} />
		</div>
	);
};

const NumberBlock = ({ label, ...tableProps }: { label: string } & Parameters<
	typeof NounEndingsTable
>[0]) => (
	<div className="space-y-1.5">
		<p className="text-xs font-semibold tracking-wide text-stone-500 uppercase">{label}</p>
		<NounEndingsTable {...tableProps} />
	</div>
);

const EssentialPatterns = ({ data }: { data: NounsData | null }) => {
	const [mode, setMode] = useState<ViewMode>("endings");
	const paradigms = getParadigms(ESSENTIAL_IDS);

	// Ground each ending in a word the learner will actually meet.
	const columnLabels = (p: AgreementParadigm) => (
		<span className="block leading-tight">
			<span className="block">{p.pattern}</span>
			<GreekText size="xs" tone="muted" weight="normal">
				{examplesFor(data, p)[0] ?? p.example}
			</GreekText>
		</span>
	);

	return (
		<TeachingCard
			scheme="neutral"
			eyebrow="The core"
			title="Essential patterns"
			badge={<ViewToggle mode={mode} onChange={setMode} />}
			description="The patterns you'll encounter most. Learn these first."
			footer={
				<div className="space-y-1">
					<p className="text-sm font-medium text-stone-700">
						Feminine &amp; neuter: Doer = Target. Only Owner changes.
					</p>
					<p className="text-sm text-stone-600">
						Masculine is the only family where Target differs from Doer — in singular and plural
						alike.
					</p>
				</div>
			}
		>
			{/* Stacked, not side by side: singular → plural has to read straight down a
			    fixed column. Side by side puts φίλος and φίλοι at different x and turns
			    the derivation into a cross-table saccade. Do not "improve" into a grid. */}
			<div className="space-y-5">
				<NumberBlock
					label="Singular"
					paradigms={paradigms}
					number="singular"
					mode={mode}
					includeVocative={mode === "full"}
					columnLabels={columnLabels}
				/>
				{/* No vocative row: the plural vocative is identical to the plural
				    nominative in every paradigm, so the row would only repeat itself. */}
				<NumberBlock
					label="Plural"
					paradigms={paradigms}
					number="plural"
					mode={mode}
					columnLabels={columnLabels}
				/>
			</div>
		</TeachingCard>
	);
};

const GenderVariants = ({ gender, data }: { gender: Gender; data: NounsData | null }) => {
	const paradigms = getParadigms(GENDER_PATTERNS[gender]);
	if (paradigms.length === 0) return null;

	const title = `${gender.charAt(0).toUpperCase()}${gender.slice(1)} variants`;

	return (
		<TeachingCard
			scheme={GENDER_SCHEME[gender]}
			eyebrow="Variants"
			title={title}
			badge={GENDER_HINTS[gender].endings}
			footer={
				<div className="space-y-1.5 text-xs text-stone-600">
					{paradigms.map((p) => {
						const count = countFor(data, p);
						return (
							<div key={p.id} className="flex flex-wrap items-baseline gap-x-2">
								<GreekText size="sm" tone={gender}>
									{p.pattern}
								</GreekText>
								<GreekText size="xs" tone="muted">
									{examplesFor(data, p).join(", ")}
								</GreekText>
								{count !== null && (
									<span className="text-stone-400">
										{count} {count === 1 ? "noun" : "nouns"} in this course
									</span>
								)}
								{p.tip && <span className="basis-full text-stone-500 italic">{p.tip}</span>}
							</div>
						);
					})}
				</div>
			}
		>
			<div className="space-y-5">
				<NumberBlock label="Singular" paradigms={paradigms} number="singular" mode="endings" />
				<NumberBlock label="Plural" paradigms={paradigms} number="plural" mode="endings" />
			</div>
		</TeachingCard>
	);
};

const DecisionGuide = () => (
	<CollapsibleSection title="Same noun, different role" colorScheme="honey" defaultOpen={false}>
		<div className="space-y-4 p-4">
			{ROLE_SENTENCES.map(({ paradigmId, frames }) => {
				const paradigm = getParadigms([paradigmId])[0];
				if (!paradigm) return null;
				return (
					<div key={paradigmId} className="rounded-lg bg-stone-50 p-3">
						<div className="mb-2 font-mono text-xs text-stone-500">{paradigm.example}</div>
						<div className="space-y-1.5">
							{ROLE_CASES.map((caseKey) => {
								const meta = CASE_META[caseKey];
								const style = SCHEME[meta.scheme];
								const frame = frames[caseKey];
								return (
									<div key={caseKey} className="flex items-center gap-2 text-sm">
										<span
											className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}
										>
											{meta.handle}
										</span>
										<GreekText tone="accent" size="sm">
											{sentenceFor(paradigm, caseKey, frame)}
										</GreekText>
										<span className="text-xs text-stone-500">({frame.english})</span>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
			<div className="rounded-lg border border-honey-200 bg-honey-50 p-3 text-sm text-stone-700">
				<span className="font-medium text-honey-700">Shortcut:</span> after σε, με, για, από, σαν →
				always Target (accusative).
			</div>
		</div>
	</CollapsibleSection>
);

const ArticlesLink = () => (
	<NextStepCard
		to="/reference/articles"
		kicker="Reference"
		title="Articles"
		description="The definite article paradigm across cases"
	/>
);

const MorePatterns = ({ data }: { data: NounsData | null }) => (
	<CollapsibleSection title="More patterns" colorScheme="stone" defaultOpen={false}>
		<div className="space-y-4 p-4">
			<GenderVariants gender="masculine" data={data} />
			<GenderVariants gender="feminine" data={data} />
			<GenderVariants gender="neuter" data={data} />
		</div>
	</CollapsibleSection>
);

const CommonMistakes = () => (
	<CollapsibleSection title="Common mistakes" colorScheme="terracotta" defaultOpen={false}>
		<div className="p-4">
			<MistakeComparison mistakes={NOUN_MISTAKES} title="" layout="grid" />
		</div>
	</CollapsibleSection>
);

export const NounsSection = ({ data = null }: { data?: NounsData | null }) => (
	<section id="nouns" className="space-y-6">
		<SectionHeading title="How Noun Endings Change" subtitle="Patterns by gender and case" />
		<CaseGuide />
		<GenderHints />
		<EssentialPatterns data={data} />
		<DecisionGuide />
		<MorePatterns data={data} />
		<CommonMistakes />
		<ArticlesLink />
	</section>
);
