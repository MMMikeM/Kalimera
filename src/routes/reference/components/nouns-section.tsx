import { useState } from "react";

import { NextStepCard, TeachingCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { CASE_ROW_DEFS, GrammarTable, type ColumnDef } from "@/components/GrammarTable";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { AGREEMENT_PARADIGMS, type AgreementParadigm } from "@/constants/agreement";
import { GENDER_SCHEME, SCHEME } from "@/constants/grammar-palette";

type Gender = "masculine" | "feminine" | "neuter";
type Case = "Nom" | "Acc" | "Gen";

const CASES: Case[] = ["Nom", "Acc", "Gen"];

const GENDER_PATTERNS: Record<Gender, readonly string[]> = {
	masculine: ["masc-os", "masc-as", "masc-is"],
	feminine: ["fem-a", "fem-i", "fem-si"],
	neuter: ["neut-o", "neut-i", "neut-ma"],
};

const ESSENTIAL_IDS = ["masc-os", "fem-a", "neut-o"] as const;

const GENDER_HINTS: Record<Gender, { endings: string; hint: string }> = {
	masculine: { endings: "-ος, -ας, -ης, -ές", hint: "Male people, -ος words" },
	feminine: { endings: "-α, -η, -ση/-ξη", hint: "Female people, αγάπη / ζωή" },
	neuter: { endings: "-ο, -ι, -μα", hint: "Diminutives, result nouns" },
};

const CASE_META: Record<Case, { handle: string; greek: string; scheme: "case-nominative" | "case-accusative" | "case-genitive" }> = {
	Nom: { handle: "Doer", greek: "Nominative", scheme: "case-nominative" },
	Acc: { handle: "Target", greek: "Accusative", scheme: "case-accusative" },
	Gen: { handle: "Owner", greek: "Genitive", scheme: "case-genitive" },
};

const CASE_QUESTIONS: Array<{
	case: Case;
	question: string;
	greek: string;
	english: string;
}> = [
	{
		case: "Nom",
		question: "Who does it?",
		greek: "ο φίλος μιλάει",
		english: "the friend speaks",
	},
	{
		case: "Acc",
		question: "Who/what receives?",
		greek: "βλέπω τον φίλο",
		english: "I see the friend",
	},
	{
		case: "Gen",
		question: "Whose is it?",
		greek: "το σπίτι του φίλου",
		english: "the friend's house",
	},
];

const SAME_NOUN_COMPARISONS: Array<{
	lemma: string;
	forms: Record<Case, { greek: string; english: string }>;
}> = [
	{
		lemma: "φίλος",
		forms: {
			Nom: { greek: "ο φίλος μιλάει", english: "the friend speaks" },
			Acc: { greek: "βλέπω τον φίλο", english: "I see the friend" },
			Gen: { greek: "το σπίτι του φίλου", english: "the friend's house" },
		},
	},
	{
		lemma: "γυναίκα",
		forms: {
			Nom: { greek: "η γυναίκα γελάει", english: "the woman laughs" },
			Acc: { greek: "ξέρω τη γυναίκα", english: "I know the woman" },
			Gen: { greek: "το παιδί της γυναίκας", english: "the woman's child" },
		},
	},
	{
		lemma: "βιβλίο",
		forms: {
			Nom: { greek: "το βιβλίο πέφτει", english: "the book falls" },
			Acc: { greek: "διαβάζω το βιβλίο", english: "I read the book" },
			Gen: { greek: "ο τίτλος του βιβλίου", english: "the title of the book" },
		},
	},
];

const getParadigms = (ids: readonly string[]): AgreementParadigm[] =>
	ids
		.map((id) => AGREEMENT_PARADIGMS.find((p) => p.id === id))
		.filter((p): p is AgreementParadigm => p !== undefined);

const getEnding = (paradigm: AgreementParadigm, caseType: Case) =>
	paradigm.forms.find((f) => f.case === caseType)?.ending ?? "—";

const getFull = (paradigm: AgreementParadigm, caseType: Case) =>
	paradigm.forms.find((f) => f.case === caseType)?.full ?? "—";

const CaseGuide = () => (
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
			{CASE_QUESTIONS.map(({ case: c, question, greek, english }) => {
				const meta = CASE_META[c];
				const style = SCHEME[meta.scheme];
				return (
					<div key={c} className="flex items-start gap-3">
						<span
							className={`shrink-0 rounded px-2 py-1 text-xs font-semibold ${style.bgSoft} ${style.text}`}
						>
							<span className="block leading-tight">{meta.handle}</span>
							<span className="block text-[10px] font-normal opacity-70">{meta.greek}</span>
						</span>
						<div>
							<span className="text-sm font-medium">{question}</span>
							<div className="text-sm text-stone-500">
								<MonoText variant="greek" size="sm">
									{greek}
								</MonoText>{" "}
								({english})
							</div>
						</div>
					</div>
				);
			})}
		</div>
	</TeachingCard>
);

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
						<span className={`h-2.5 w-2.5 rounded-full bg-gender-${gender}`} />
						<span className={`font-medium text-gender-${gender} capitalize`}>{gender}</span>
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
	mode: "endings" | "full";
	onChange: (mode: "endings" | "full") => void;
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
	mode = "endings",
}: {
	paradigms: AgreementParadigm[];
	mode?: "endings" | "full";
}) => {
	const columns: ColumnDef[] = paradigms.map((p) => ({
		key: p.id,
		label: p.pattern,
		scheme: GENDER_SCHEME[p.gender],
	}));

	const cells = CASE_ROW_DEFS.map((_row, ri) => {
		const caseType = (["Nom", "Acc", "Gen"] as const)[ri]!;
		return paradigms.map((p) => {
			const value = mode === "endings" ? getEnding(p, caseType) : getFull(p, caseType);
			return (
				<MonoText size="sm" variant={p.gender}>
					{value}
				</MonoText>
			);
		});
	});

	return (
		<div className="-mx-4 overflow-x-auto px-4">
			<GrammarTable columns={columns} rows={CASE_ROW_DEFS} cells={cells} />
		</div>
	);
};

const EssentialPatterns = () => {
	const [mode, setMode] = useState<"endings" | "full">("endings");
	const paradigms = getParadigms(ESSENTIAL_IDS);

	return (
		<TeachingCard
			scheme="neutral"
			eyebrow="The core"
			title="Essential patterns"
			badge={<ViewToggle mode={mode} onChange={setMode} />}
			description="One pattern per gender. 80% of nouns fit here."
			footer={
				<div className="space-y-1">
					<p className="text-sm font-medium text-stone-700">
						Feminine & neuter: Doer = Target. Only Owner changes.
					</p>
					<p className="text-sm text-stone-600">
						Masculine is the tricky one — it changes in every row.
					</p>
				</div>
			}
		>
			<NounEndingsTable paradigms={paradigms} mode={mode} />
		</TeachingCard>
	);
};

const GenderVariants = ({ gender }: { gender: Gender }) => {
	const paradigms = getParadigms(GENDER_PATTERNS[gender]);
	if (paradigms.length === 0) return null;

	const title = `${gender.charAt(0).toUpperCase()}${gender.slice(1)} variants`;

	return (
		<TeachingCard
			scheme="neutral"
			eyebrow="Variants"
			title={<span className={`text-gender-${gender}-text`}>{title}</span>}
			badge={GENDER_HINTS[gender].endings}
			footer={
				<div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-stone-600">
					{paradigms.map((p) => (
						<span key={p.id}>
							<MonoText size="sm" variant={gender}>
								{p.pattern}
							</MonoText>{" "}
							{p.example}
						</span>
					))}
				</div>
			}
		>
			<NounEndingsTable paradigms={paradigms} mode="endings" />
		</TeachingCard>
	);
};

const DecisionGuide = () => (
	<CollapsibleSection title="Same noun, different role" colorScheme="honey" defaultOpen={false}>
		<div className="space-y-4 p-4">
			{SAME_NOUN_COMPARISONS.map(({ lemma, forms }) => (
				<div key={lemma} className="rounded-lg bg-stone-50 p-3">
					<div className="mb-2 font-mono text-xs text-stone-500">{lemma}</div>
					<div className="space-y-1.5">
						{CASES.map((c) => {
							const meta = CASE_META[c];
							const style = SCHEME[meta.scheme];
							const form = forms[c];
							return (
								<div key={c} className="flex items-center gap-2 text-sm">
									<span
										className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${style.bgSoft} ${style.text}`}
									>
										{meta.handle}
									</span>
									<MonoText variant="greek" size="sm">
										{form.greek}
									</MonoText>
									<span className="text-xs text-stone-500">({form.english})</span>
								</div>
							);
						})}
					</div>
				</div>
			))}
			<div className="rounded-lg border border-honey-200 bg-honey-50 p-3 text-sm text-stone-700">
				<span className="font-medium text-honey-700">Shortcut:</span> after σε, με, για, από, σαν
				→ always Target (accusative).
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

const MorePatterns = () => (
	<CollapsibleSection title="More patterns" colorScheme="stone" defaultOpen={false}>
		<div className="space-y-4 p-4">
			<GenderVariants gender="masculine" />
			<GenderVariants gender="feminine" />
			<GenderVariants gender="neuter" />
		</div>
	</CollapsibleSection>
);

export const NounsSection = () => (
	<section id="nouns" className="space-y-6">
		<SectionHeading title="How Noun Endings Change" subtitle="Patterns by gender and case" />
		<CaseGuide />
		<GenderHints />
		<EssentialPatterns />
		<DecisionGuide />
		<MorePatterns />
		<ArticlesLink />
	</section>
);
