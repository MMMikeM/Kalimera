import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, BookOpen } from "lucide-react";
import type React from "react";
import { cn } from "tailwind-variants";

import { Card } from "@/components/Card";
import { NavigatorCard, NavigatorCell } from "@/components/cards/NavigatorCard";
import { TeachingCard } from "@/components/cards/TeachingCard";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { type ColumnDef, GrammarTable, type RowDef } from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import { type ParadigmForms, ParadigmTable } from "@/components/ParadigmTable";
import { SectionHeading } from "@/components/SectionHeading";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import {
	AORIST_EXCEPTIONS,
	AORIST_FINDER,
	AORIST_FORMATION_PATTERNS,
	FUTURE_AINO,
	FUTURE_LADDER,
	FUTURE_UNCHANGED,
	IRREGULAR_AORIST_STEMS,
	IRREGULAR_VERBS,
	PAST_TENSE_PATTERNS,
	VERB_PATTERNS,
} from "@/constants/verbs";

interface UsageExample {
	greek: string;
	verb: string;
	english: string;
	formNote: string;
}

const USAGE_EXAMPLES: Record<string, UsageExample[]> = {
	active: [
		{
			greek: "Τι κάνεις;",
			verb: "κάνεις",
			english: "How are you?",
			formNote: "-εις",
		},
		{
			greek: "Κάνει κρύο.",
			verb: "Κάνει",
			english: "It's cold.",
			formNote: "-ει",
		},
		{
			greek: "Κάνουμε διάλειμμα.",
			verb: "Κάνουμε",
			english: "We're taking a break.",
			formNote: "-ουμε",
		},
	],
	contracted: [
		{
			greek: "Μιλάς ελληνικά;",
			verb: "Μιλάς",
			english: "Do you speak Greek?",
			formNote: "-άς",
		},
		{
			greek: "Δεν μιλάμε πολύ.",
			verb: "μιλάμε",
			english: "We don't speak much.",
			formNote: "-άμε",
		},
	],
	deponent: [
		{
			greek: "Έρχομαι αύριο.",
			verb: "Έρχομαι",
			english: "I'm coming tomorrow.",
			formNote: "-ομαι",
		},
		{
			greek: "Πότε έρχεσαι;",
			verb: "έρχεσαι",
			english: "When are you coming?",
			formNote: "-εσαι",
		},
		{
			greek: "Δεν θυμάμαι.",
			verb: "θυμάμαι",
			english: "I don't remember.",
			formNote: "-άμαι",
		},
	],
};

const UsageExamples: React.FC<{
	examples: UsageExample[];
	textClass: string;
}> = ({ examples, textClass }) => (
	<div className="space-y-3">
		{examples.map((ex) => (
			<div key={ex.greek} className="space-y-1">
				<div className="flex items-baseline gap-2">
					<GreekText tone="default" size="base" className={`${textClass} text-base font-bold`}>
						{ex.verb}
					</GreekText>
					<span className="text-sm text-stone-500">{ex.formNote}</span>
				</div>
				<div className="border-l-2 border-stone-200 pl-2">
					<GreekText tone="default" size="base" className="text-stone-700">
						{ex.greek}
					</GreekText>
					<p className="text-sm text-stone-500">{ex.english}</p>
				</div>
			</div>
		))}
	</div>
);

const SamePatternList: React.FC<{
	verbs: Array<{ infinitive: string; meaning: string }>;
	textClass: string;
}> = ({ verbs, textClass }) => (
	<ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
		{verbs.map((v) => (
			<li key={v.infinitive} className="flex min-w-0 flex-col">
				<GreekText tone="default" size="base" className={`${textClass} font-semibold`}>
					{v.infinitive}
				</GreekText>
				<span className="text-sm text-stone-600">{v.meaning}</span>
			</li>
		))}
	</ul>
);

type PatternKey = "active" | "contracted" | "deponent";

interface PatternMeta {
	ending: string;
	displayName: string;
	scheme: GrammarScheme;
	/** Dictionary forms shown in the "Which pattern?" key. */
	examples: string[];
}

const PATTERN_META: Record<PatternKey, PatternMeta> = {
	active: {
		ending: "-ω",
		displayName: "Active",
		scheme: "verb-active",
		examples: ["κάνω", "θέλω", "βλέπω"],
	},
	contracted: {
		ending: "-άω/-ώ",
		displayName: "Contracted",
		scheme: "verb-contracted",
		examples: ["μιλάω", "αγαπάω"],
	},
	deponent: {
		ending: "-μαι",
		displayName: "Deponent",
		scheme: "verb-deponent",
		examples: ["έρχομαι", "θυμάμαι"],
	},
};

const PERSON_ROW_DEFS: RowDef[] = [
	{ key: "sg1", label: "I" },
	{ key: "sg2", label: "you" },
	{ key: "sg3", label: "he/she" },
	{ key: "pl1", label: "we" },
	{ key: "pl2", label: "you all" },
	{ key: "pl3", label: "they" },
];

const PATTERN_ORDER: PatternKey[] = ["active", "contracted", "deponent"];

type ComparisonForms = Record<string, { stem: string; ending: string }>;

interface ComparisonColumn {
	key: string;
	heading: React.ReactNode;
	scheme: GrammarScheme;
	forms: ComparisonForms;
}

/** One table, several paradigms: the slots line up so only the differences move. */
const FormComparison: React.FC<{
	eyebrow: string;
	title: string;
	description: string;
	columns: ComparisonColumn[];
	footer?: React.ReactNode;
}> = ({ eyebrow, title, description, columns, footer }) => {
	const columnDefs: ColumnDef[] = columns.map((col) => ({
		key: col.key,
		label: col.heading,
		scheme: col.scheme,
	}));

	const cells = PERSON_ROW_DEFS.map((row) =>
		columns.map((col) => {
			const form = col.forms[row.key];
			if (!form) return null;
			return (
				<GreekText tone="accent" size="sm" key={col.key}>
					<span className="text-stone-600">{form.stem}</span>
					<span className={`font-bold ${SCHEME[col.scheme].text}`}>{form.ending}</span>
				</GreekText>
			);
		}),
	);

	return (
		<TeachingCard
			scheme="neutral"
			eyebrow={eyebrow}
			title={title}
			description={description}
			footer={footer}
		>
			<div className="-mx-4 overflow-x-auto px-4">
				<GrammarTable columns={columnDefs} rows={PERSON_ROW_DEFS} cells={cells} />
			</div>
		</TeachingCard>
	);
};

const columnHeading = (infinitive: string, tag: string, scheme: GrammarScheme) => (
	<span className="flex items-baseline gap-1.5">
		<GreekText tone="accent" size="sm" className="text-stone-700">
			{infinitive}
		</GreekText>
		<span className={`font-mono text-sm font-bold ${SCHEME[scheme].text}`}>{tag}</span>
	</span>
);

const PatternComparison: React.FC = () => {
	const columns: ComparisonColumn[] = PATTERN_ORDER.flatMap((key) => {
		const pattern = VERB_PATTERNS[key];
		if (!pattern) return [];
		const meta = PATTERN_META[key];
		return [
			{
				key,
				heading: columnHeading(pattern.canonical.infinitive, meta.ending, meta.scheme),
				scheme: meta.scheme,
				forms: pattern.canonical.forms,
			},
		];
	});

	return (
		<FormComparison
			eyebrow="Side by side"
			title="Same slots, different endings"
			description="The stem never moves. Learn which ending column a verb belongs to and the rest follows."
			columns={columns}
		/>
	);
};

/** The mirror of the present table: endings hold still, the stem does the work. */
const AoristComparison: React.FC = () => (
	<FormComparison
		eyebrow="Side by side"
		title="Same endings, different stems"
		description="In the present each family has its own endings. In the past they collapse to one set — what changes is the stem."
		columns={[
			{
				key: "active",
				heading: columnHeading("κάνω", "→ έκανα", "verb-active"),
				scheme: "verb-active",
				forms: PAST_TENSE_PATTERNS.aorist_active.canonical.forms,
			},
			{
				key: "contracted",
				heading: columnHeading("μιλάω", "→ μίλησα", "verb-contracted"),
				scheme: "verb-contracted",
				forms: PAST_TENSE_PATTERNS.aorist_contracted.canonical.forms,
			},
			{
				key: "deponent",
				heading: columnHeading("έρχομαι", "→ ήρθα", "verb-deponent"),
				scheme: "verb-deponent",
				forms: PAST_TENSE_PATTERNS.aorist_deponent.canonical.forms,
			},
		]}
		footer={
			<p className="text-sm text-stone-600">
				-α, -ες, -ε, -αμε, -ατε, -αν in every column. Deponents just carry -θηκ- (or a suppletive
				stem like ήρθ-) in front of them.
			</p>
		}
	/>
);

/** One verb, both past aspects — the distinction χθες vs κάθε μέρα turns on. */
const AspectComparison: React.FC = () => (
	<FormComparison
		eyebrow="One-off or ongoing"
		title="μίλησα or μιλούσα?"
		description="Same verb, same endings. -ησ- closes the action, -ούσ- leaves it running."
		columns={[
			{
				key: "aorist",
				heading: columnHeading("μίλησα", "one-off", "verb-contracted"),
				scheme: "verb-contracted",
				forms: PAST_TENSE_PATTERNS.aorist_contracted.canonical.forms,
			},
			{
				key: "continuous",
				heading: columnHeading("μιλούσα", "ongoing", "verb-active"),
				scheme: "verb-active",
				forms: PAST_TENSE_PATTERNS.past_continuous_contracted.canonical.forms,
			},
		]}
		footer={
			<p className="text-sm text-stone-600">
				Χθες μίλησα με τη Μαρία (once). Κάθε μέρα μιλούσα με τη Μαρία (a habit).
			</p>
		}
	/>
);

const PatternSection: React.FC<{
	patternKey: PatternKey;
	pattern: (typeof VERB_PATTERNS)[keyof typeof VERB_PATTERNS];
}> = ({ patternKey, pattern }) => {
	const meta = PATTERN_META[patternKey];
	const style = SCHEME[meta.scheme];

	return (
		<TeachingCard
			scheme={meta.scheme}
			title={meta.displayName}
			badge={<span className={`font-mono text-base ${style.text}`}>{meta.ending}</span>}
			description={pattern.description}
			footer={
				patternKey === "contracted" ? (
					<p className="text-xs text-stone-500">
						The{" "}
						<GreekText tone="default" size="sm" className="font-medium">
							-ώ
						</GreekText>{" "}
						variant (μπορώ, οδηγώ) has different endings — shown in the high-frequency section
						below.
					</p>
				) : undefined
			}
		>
			<div className="rounded-lg border border-stone-200 bg-card p-4 shadow-sm">
				<ParadigmTable
					stem={pattern.canonical.stem}
					meaning={pattern.canonical.meaning}
					infinitive={pattern.canonical.infinitive}
					forms={pattern.canonical.forms}
					scheme={meta.scheme}
				/>
			</div>

			<div className="mt-3">
				<CollapsibleSection
					title={`Same pattern (${pattern.samePattern.length})`}
					colorScheme="stone"
					defaultOpen={false}
					className="mb-2"
				>
					<SamePatternList verbs={pattern.samePattern} textClass={style.text} />
				</CollapsibleSection>

				<CollapsibleSection title="See it in action" colorScheme="stone" defaultOpen={false}>
					<UsageExamples examples={USAGE_EXAMPLES[patternKey] ?? []} textClass={style.text} />
				</CollapsibleSection>
			</div>
		</TeachingCard>
	);
};

const PatternIdentifier: React.FC = () => (
	<NavigatorCard
		title="Which pattern?"
		subtitle="Look at the verb's dictionary form (1st person singular)"
	>
		{PATTERN_ORDER.map((key) => {
			const row = PATTERN_META[key];
			const style = SCHEME[row.scheme];
			return (
				<NavigatorCell
					key={key}
					className={cn(style.bg, style.border, "flex items-center gap-3 border-2 sm:gap-4")}
				>
					<GreekText
						tone="default"
						size="base"
						className={`w-20 shrink-0 text-xl font-bold ${style.text}`}
					>
						{row.ending}
					</GreekText>
					<span className="font-semibold text-stone-800">{row.displayName}</span>
					<div className="ml-auto hidden gap-2 sm:flex">
						{row.examples.map((ex) => (
							<span
								key={ex}
								className={cn(
									"rounded-md border bg-card px-2 py-1 font-mono text-sm",
									style.border,
									style.text,
								)}
							>
								{ex}
							</span>
						))}
					</div>
				</NavigatorCell>
			);
		})}
	</NavigatorCard>
);

/** Honey call-out for forms no rule predicts. */
const MemoriseCard: React.FC<{
	title: string;
	description: string;
	children: React.ReactNode;
}> = ({ title, description, children }) => (
	<Card variant="bordered" padding="lg" className="border-2 border-honey-300 bg-honey-50">
		<div className="mb-4 flex items-start gap-3">
			<div className="rounded-xl bg-honey-200 p-2.5">
				<AlertCircle size={20} className="text-honey-text" />
			</div>
			<div>
				<h3 className="text-lg font-bold text-honey-text">{title}</h3>
				<p className="text-sm text-stone-600">{description}</p>
			</div>
		</div>
		{children}
	</Card>
);

const CONSONANT_RULES = [
	{
		stems: ["π", "β", "φ"],
		result: "ψ",
		examplePresent: "γράφω",
		examplePast: "έγραψα",
		note: "labials",
	},
	{
		stems: ["κ", "γ", "χ"],
		result: "ξ",
		examplePresent: "ψάχνω",
		examplePast: "έψαξα",
		note: "velars",
	},
	{
		stems: ["τ", "δ", "θ", "ζ"],
		result: "σ",
		examplePresent: "αρχίζω",
		examplePast: "άρχισα",
		note: "dentals",
	},
	{
		stems: ["vowel", "ν", "ρ"],
		result: "σ",
		examplePresent: "ακούω",
		examplePast: "άκουσα",
		note: "default",
	},
] as const;

const AoristExamples: React.FC<{
	examples: readonly { greek: string; english: string }[];
}> = ({ examples }) => (
	<div className="mt-3 space-y-2 border-t border-stone-100 pt-3">
		{examples.map((ex) => (
			<div key={ex.greek} className="flex flex-col gap-0.5">
				<GreekText tone="default" size="base" className="text-sm text-stone-800">
					{ex.greek}
				</GreekText>
				<p className="text-xs text-stone-500">{ex.english}</p>
			</div>
		))}
	</div>
);

const AoristPatternCard: React.FC<{
	title: string;
	badge: string;
	description: string;
	scheme: GrammarScheme;
	paradigm: { infinitive: string; meaning: string; forms: ParadigmForms };
	examples: readonly { greek: string; english: string }[];
	children?: React.ReactNode;
}> = ({ title, badge, description, scheme, paradigm, examples, children }) => (
	<TeachingCard
		scheme={scheme}
		title={title}
		badge={<span className={`font-mono text-base ${SCHEME[scheme].text}`}>{badge}</span>}
		description={description}
	>
		<div className="rounded-lg border border-stone-200 bg-card p-4 shadow-sm">
			<ParadigmTable
				infinitive={paradigm.infinitive}
				meaning={paradigm.meaning}
				forms={paradigm.forms}
				scheme={scheme}
			/>
		</div>
		<AoristExamples examples={examples} />
		{children}
	</TeachingCard>
);

const FormationPatternCard: React.FC<{
	pattern: (typeof AORIST_FORMATION_PATTERNS)[keyof typeof AORIST_FORMATION_PATTERNS];
	scheme: GrammarScheme;
}> = ({ pattern, scheme }) => (
	<AoristPatternCard
		title={`Aorist ${pattern.label}`}
		badge={pattern.label}
		description={pattern.description}
		scheme={scheme}
		paradigm={pattern.canonical}
		examples={pattern.canonical.examples}
	/>
);

/** Fixed columns so the eye can run straight down "becomes" instead of hunting for it. */
const AoristFinder: React.FC = () => (
	<TeachingCard
		scheme="neutral"
		eyebrow="Start here"
		title="Find your verb's ending"
		description="Find how your verb ends in the present on the left. The past ending is in the middle."
	>
		<div className="overflow-hidden rounded-lg border border-stone-200 bg-card">
			{/* eslint-disable-next-line better-tailwindcss/no-restricted-classes -- fixed finder columns, no token fit */}
			<div className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b border-stone-100 px-4 py-2 text-xs tracking-widest text-stone-400 uppercase sm:grid-cols-[13rem_5rem_1fr]">
				<span>Present</span>
				<span className="hidden sm:block">Past</span>
				<span className="text-right sm:text-left">Example</span>
			</div>
			{AORIST_FINDER.map((row) => (
				<div
					key={row.ending}
					// eslint-disable-next-line better-tailwindcss/no-restricted-classes -- fixed finder columns, no token fit
					className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-stone-100 px-4 py-3 last:border-b-0 sm:grid-cols-[13rem_5rem_1fr]"
				>
					<GreekText tone="default" size="sm" className="text-stone-600">
						{row.ending}
					</GreekText>
					<GreekText
						tone="default"
						size="sm"
						className="order-last font-bold text-navy-text sm:order-none"
					>
						{row.becomes}
					</GreekText>
					<span className="text-right sm:text-left">
						<GreekText tone="default" size="sm" className="text-stone-500">
							{row.example[0]}
						</GreekText>
						<span className="mx-1.5 text-xs text-stone-300">→</span>
						<GreekText tone="default" size="sm" className="font-semibold text-stone-800">
							{row.example[1]}
						</GreekText>
					</span>
				</div>
			))}
		</div>
	</TeachingCard>
);

/** The two groups the finder cannot decide for you. */
const AoristExceptions: React.FC = () => (
	<TeachingCard
		scheme="neutral"
		eyebrow="Learn as pairs"
		title="Where the endings stop helping"
		description="Two groups you cannot read off the present tense."
	>
		<div className="grid gap-3 sm:grid-cols-2">
			{AORIST_EXCEPTIONS.map((group) => (
				<div key={group.title} className="rounded-lg border border-stone-200 bg-card p-4">
					<p className="mb-1 text-sm font-medium text-stone-800">{group.title}</p>
					<p className="mb-3 text-xs text-stone-500">{group.detail}</p>
					<div className="space-y-1">
						{group.pairs.map(([present, past]) => (
							<div key={present}>
								<GreekText tone="default" size="sm" className="text-stone-500">
									{present}
								</GreekText>
								<span className="mx-1.5 text-xs text-stone-300">→</span>
								<GreekText tone="default" size="sm" className="font-semibold text-stone-800">
									{past}
								</GreekText>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	</TeachingCard>
);

export const PastTenseSection: React.FC = () => {
	const activeStyle = SCHEME["verb-active"];

	return (
		<section id="past-tense" className="space-y-6">
			<SectionHeading
				title="Past Tense"
				subtitle="Αόριστος — the completed past. One action, finished."
			/>

			{/* ── FORMING THE AORIST ─────────────────────── */}
			<div className="space-y-6 pt-2">
				<AoristFinder />

				<AoristExceptions />

				<AoristComparison />
				<h3 className="mb-4 px-1 text-base font-bold text-stone-800">Forming the aorist</h3>

				{/* Augment rule */}
				<TeachingCard
					scheme="neutral"
					eyebrow="Rule 1"
					title="The augment"
					description="Aorist stress falls on the 3rd syllable from the end. If the stem is too short, add ε- to create that syllable."
				>
					<div className="grid gap-px overflow-hidden rounded-lg bg-stone-200 sm:grid-cols-2">
						<div className="bg-stone-50 px-4 py-3">
							<p className="mb-2 text-xs font-semibold tracking-wide text-stone-400 uppercase">
								Short verb → needs ε-
							</p>
							<div className="flex items-center gap-2">
								<GreekText tone="default" size="base" className="text-base text-stone-500">
									γράφω
								</GreekText>
								<span className="text-stone-300">→</span>
								<div className="flex items-baseline gap-0">
									<span className={`font-mono text-lg font-bold ${activeStyle.text}`}>ε</span>
									<GreekText
										tone="default"
										size="base"
										className="text-lg font-bold text-stone-800"
									>
										γραψ
									</GreekText>
									<span className={`font-mono text-lg font-bold ${activeStyle.text}`}>α</span>
								</div>
							</div>
							<p className="mt-1 text-xs text-stone-400">γρά·φω = 2 syllables → add ε-</p>
						</div>
						<div className="bg-stone-50 px-4 py-3">
							<p className="mb-2 text-xs font-semibold tracking-wide text-stone-400 uppercase">
								Long verb → stress shifts
							</p>
							<div className="flex items-center gap-2">
								<GreekText tone="default" size="base" className="text-base text-stone-500">
									δουλεύω
								</GreekText>
								<span className="text-stone-300">→</span>
								<div className="flex items-baseline gap-0">
									<GreekText
										tone="default"
										size="base"
										className="text-lg font-bold text-stone-800"
									>
										δούλεψ
									</GreekText>
									<span className={`font-mono text-lg font-bold ${activeStyle.text}`}>α</span>
								</div>
							</div>
							<p className="mt-1 text-xs text-stone-400">δου·λεύ·ω = 3 syllables → no ε-</p>
						</div>
					</div>
				</TeachingCard>

				{/* Consonant collision table */}
				<TeachingCard
					scheme="neutral"
					eyebrow="Rule 2"
					title="Consonant collision"
					description="When the stem's final consonant meets σ, they merge. Vowel stems just add σ directly."
				>
					<div className="divide-y divide-stone-100 overflow-hidden rounded-lg border border-stone-200 bg-card">
						{CONSONANT_RULES.map((rule) => (
							<div key={rule.note} className="grid grid-rule items-center gap-4 px-4 py-3">
								<div className="flex flex-wrap gap-1.5">
									{rule.stems.map((s) => (
										<span
											key={s}
											className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-sm font-semibold text-stone-700"
										>
											{s}
										</span>
									))}
								</div>
								<div className="flex items-center gap-1.5 text-stone-400">
									<span className="text-xs">+σ →</span>
									<span className={`font-mono text-xl font-bold ${activeStyle.text}`}>
										{rule.result}
									</span>
								</div>
								<div className="text-right">
									<GreekText tone="default" size="base" className="text-sm text-stone-500">
										{rule.examplePresent}
									</GreekText>
									<span className="mx-1 text-xs text-stone-300">→</span>
									<GreekText
										tone="default"
										size="base"
										className={`text-sm font-bold ${activeStyle.text}`}
									>
										{rule.examplePast}
									</GreekText>
								</div>
							</div>
						))}
					</div>
				</TeachingCard>
			</div>

			<CollapsibleSection title="Full paradigms (6)" colorScheme="stone" defaultOpen={false}>
				<p className="mb-4 text-sm text-stone-600">
					The endings are identical in every one — these are here for the stems.
				</p>

				<div className="space-y-6">
					<FormationPatternCard pattern={AORIST_FORMATION_PATTERNS.sa} scheme="verb-active" />
					<FormationPatternCard pattern={AORIST_FORMATION_PATTERNS.psa} scheme="verb-active" />
					<FormationPatternCard pattern={AORIST_FORMATION_PATTERNS.ksa} scheme="verb-active" />

					<AoristPatternCard
						title="Aorist: -άω verbs"
						badge="-ησα"
						description={PAST_TENSE_PATTERNS.aorist_contracted.description}
						scheme="verb-contracted"
						paradigm={PAST_TENSE_PATTERNS.aorist_contracted.canonical}
						examples={[
							{ greek: "Μίλησα μαζί του χθες.", english: "I spoke with him yesterday." },
							{ greek: "Μιλήσαμε για ώρες.", english: "We talked for hours." },
						]}
					/>

					<FormationPatternCard pattern={AORIST_FORMATION_PATTERNS.thika} scheme="verb-deponent" />

					<AoristPatternCard
						title="Aorist: suppletive verbs"
						badge="new stem"
						description="Stem changes completely — endings are identical to regular aorist."
						scheme="verb-deponent"
						paradigm={PAST_TENSE_PATTERNS.aorist_deponent.canonical}
						examples={[
							{ greek: "Ήρθα νωρίς.", english: "I arrived early." },
							{ greek: "Πότε ήρθες;", english: "When did you arrive?" },
							{ greek: "Ήρθαμε μαζί.", english: "We came together." },
						]}
					>
						<p className="mt-3 px-1 text-xs text-stone-500">
							Find the aorist stem (listed below), then add the same{" "}
							<GreekText tone="default" size="sm">
								-α -ες -ε -αμε -ατε -αν
							</GreekText>
							.
						</p>
					</AoristPatternCard>
				</div>
			</CollapsibleSection>

			{/* Stems that break the rules */}
			<MemoriseCard
				title="Stems that break the rules"
				description="These aorist stems cannot be predicted — the rules above don't apply. Memorise them as units."
			>
				<div className="space-y-3">
					{(["suppletive", "irregular"] as const).map((cat) => (
						<div key={cat}>
							<p className="mb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
								{cat === "suppletive"
									? "Suppletive — completely different stem"
									: "Irregular — follows rules loosely"}
							</p>
							<div className="divide-y divide-honey-100 rounded-lg border border-honey-200 bg-card">
								{IRREGULAR_AORIST_STEMS.filter((s) => s.category === cat).map((s) => (
									<div
										key={s.present}
										className="grid grid-rule-suffix items-baseline gap-2 px-3 py-2"
									>
										<GreekText tone="default" size="base" className="font-semibold text-stone-600">
											{s.present}
										</GreekText>
										<span className="text-honey-300">→</span>
										<GreekText tone="default" size="base" className="font-bold text-honey-text">
											{s.aoristSg1}
										</GreekText>
										<span className="text-right text-xs text-stone-400">{s.english}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</MemoriseCard>
		</section>
	);
};

export const PastContinuousSection: React.FC = () => {
	return (
		<section id="past-continuous" className="space-y-6">
			<SectionHeading
				title="Continuous Past"
				subtitle="Παρατατικός — the past that was still running. Ongoing or repeated."
			/>

			<div className="space-y-4">
				<div className="rounded-lg border border-stone-200 bg-card p-4">
					<p className="mb-3 text-sm text-stone-600">
						Use the <strong>present stem</strong> with the same -α -ες -ε -αμε -ατε -αν endings. For
						-άω verbs, insert{" "}
						<GreekText tone="default" size="sm">
							-ούσ-
						</GreekText>{" "}
						instead.
					</p>
					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<p className="mb-2 text-xs font-semibold text-stone-500">-ω verbs (δουλεύω)</p>
							<ParadigmTable
								infinitive={PAST_TENSE_PATTERNS.past_continuous_active.canonical.infinitive}
								meaning={PAST_TENSE_PATTERNS.past_continuous_active.canonical.meaning}
								forms={PAST_TENSE_PATTERNS.past_continuous_active.canonical.forms}
								scheme="verb-active"
							/>
						</div>
						<div>
							<p className="mb-2 text-xs font-semibold text-stone-500">-άω verbs (μιλάω)</p>
							<ParadigmTable
								infinitive={PAST_TENSE_PATTERNS.past_continuous_contracted.canonical.infinitive}
								meaning={PAST_TENSE_PATTERNS.past_continuous_contracted.canonical.meaning}
								forms={PAST_TENSE_PATTERNS.past_continuous_contracted.canonical.forms}
								scheme="verb-contracted"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* The contrast comes last, once both tenses stand on their own */}
			{/* Two tenses compared */}
			<div className="grid gap-3 sm:grid-cols-2">
				<div className="rounded-lg border-2 border-navy-200 bg-navy-50 p-4">
					<p className="mb-0.5 font-mono text-base font-bold text-navy-text">Αόριστος</p>
					<p className="mb-2 text-xs text-stone-500">Simple past — completed action</p>
					<GreekText tone="default" size="base" className="text-sm text-stone-800">
						Έφαγα χθες.
					</GreekText>
					<p className="text-xs text-stone-500">I ate yesterday.</p>
				</div>
				<div className="rounded-lg border-2 border-slate-200 bg-slate-50 p-4">
					<p className="mb-0.5 font-mono text-base font-bold text-slate-text">Παρατατικός</p>
					<p className="mb-2 text-xs text-stone-500">Continuous past — ongoing or repeated</p>
					<GreekText tone="default" size="base" className="text-sm text-stone-800">
						Έτρωγα κάθε μέρα.
					</GreekText>
					<p className="text-xs text-stone-500">I used to eat every day.</p>
				</div>
			</div>

			<AspectComparison />
		</section>
	);
};

const LADDER_COLUMNS: ColumnDef[] = [
	{ key: "present", label: "σήμερα · present" },
	{ key: "aorist", label: "χθες · past" },
	{ key: "future", label: "αύριο · future" },
];

const LadderTable: React.FC<{ rows: typeof FUTURE_LADDER }> = ({ rows }) => (
	<div className="-mx-4 overflow-x-auto px-4">
		<GrammarTable
			columns={LADDER_COLUMNS}
			rows={rows.map((verb) => ({ key: verb.present, label: verb.english }))}
			cells={rows.map((verb) =>
				[verb.present, verb.aorist, verb.future].map((form, i) => (
					<GreekText
						tone="accent"
						size="sm"
						key={form}
						className={i === 2 ? "font-semibold text-stone-800" : "text-stone-600"}
					>
						{form}
					</GreekText>
				)),
			)}
		/>
	</div>
);

/** θα + the aorist stem, minus its augment — the shape the lessons drill. */
const TenseLadder: React.FC = () => (
	<TeachingCard
		scheme="neutral"
		eyebrow="The ladder"
		title="Past first, then future"
		description="The θα form is the past without its augment. Learn a verb's past and its future comes free."
		footer={
			<div className="space-y-1.5 text-sm text-stone-600">
				<p>
					έφαγα → θα φάω, ήπια → θα πιω, έβαλα → θα βάλω. Strip the έ- or ή-, keep what is left.
				</p>
				<p>
					The effort pays twice over: δω, πω and πάρω are the 41st, 46th and 201st most common words
					in Greek — more common than βλέπω, λέω and παίρνω themselves, because να, ας and every
					modal take the same form.
				</p>
			</div>
		}
	>
		<LadderTable rows={FUTURE_LADDER} />
	</TeachingCard>
);

/** The highest-frequency verbs are the ones that do not shorten at all. */
const FutureUnchanged: React.FC = () => (
	<TeachingCard
		scheme="neutral"
		eyebrow="No short form"
		title="θα does all the work"
		description="These five never change shape. They describe states, and a state has no one-off version."
		footer={
			<p className="text-sm text-stone-600">
				Between them they are the five most common verbs you will use — worth knowing before the
				ladder above.
			</p>
		}
	>
		<LadderTable rows={FUTURE_UNCHANGED} />
	</TeachingCard>
);

/** The -αίνω four, learned as one set. */
const FutureAino: React.FC = () => (
	<TeachingCard
		scheme="neutral"
		eyebrow="One rule, four verbs"
		title="The -αίνω family"
		description="Past in -ηκα, future stripped right back. Learn one and you have all four."
		footer={
			<p className="text-sm text-stone-600">
				Στο σπίτι: θα μπω μέσα, θα ανέβω πάνω. The app's drills currently serve the θα ανεβώ series
				instead — worth settling with Konstantina which one you want to keep.
			</p>
		}
	>
		<LadderTable rows={FUTURE_AINO} />
	</TeachingCard>
);

const FutureTenseSection: React.FC = () => (
	<section id="future-tense" className="space-y-4">
		<SectionHeading title="Future Tense" subtitle="θα + the same stem you use after να" />

		<TeachingCard
			scheme="neutral"
			eyebrow="The rule"
			title="θα + subjunctive"
			description="Drop the past prefix from the aorist (έγραψα → γράψω) and prepend θα. Endings stay regular present-tense endings."
		>
			<div className="grid gap-3 sm:grid-cols-2">
				<div className="rounded-lg border border-honey-200 bg-honey-50 p-4">
					<p className="mb-2 text-xs font-semibold text-honey-text">Regular</p>
					<GreekText tone="default" size="base" className="text-sm text-stone-800">
						γράφω → έγραψα → θα γράψω
					</GreekText>
					<p className="mt-1 text-xs text-stone-500">I write → I wrote → I will write</p>
				</div>
				<div className="rounded-lg border border-honey-200 bg-honey-50 p-4">
					<p className="mb-2 text-xs font-semibold text-honey-text">Suppletive</p>
					<GreekText tone="default" size="base" className="text-sm text-stone-800">
						τρώω → έφαγα → θα φάω
					</GreekText>
					<p className="mt-1 text-xs text-stone-500">I eat → I ate → I will eat</p>
				</div>
			</div>
			<p className="mt-4 text-sm text-stone-600">
				Negation:{" "}
				<GreekText tone="accent" size="sm">
					δεν θα φάω
				</GreekText>{" "}
				(I won't eat). δεν always sits before θα.
			</p>
		</TeachingCard>

		<FutureUnchanged />

		<TenseLadder />

		<FutureAino />

		<TeachingCard
			scheme="neutral"
			eyebrow="Saying there will be"
			title="θα υπάρχει / θα υπάρχουν"
			description="υπάρχει takes θα like any other verb, and stays in the third person."
		>
			<div className="space-y-1.5 text-sm">
				<p>
					<GreekText tone="accent" size="sm">
						Θα υπάρχουν πολλά πάρκα στην πόλη μου
					</GreekText>{" "}
					<span className="text-stone-500">— there will be many parks in my city</span>
				</p>
				<p>
					<GreekText tone="accent" size="sm">
						Δεν θα υπάρχει κανένα αυτοκίνητο
					</GreekText>{" "}
					<span className="text-stone-500">— there won't be a single car</span>
				</p>
				<p className="pt-2 text-stone-600">
					ίσως takes the same short form but never θα:{" "}
					<GreekText tone="accent" size="sm">
						Ίσως πάω
					</GreekText>
					, not ίσως θα πάω.
				</p>
			</div>
		</TeachingCard>
	</section>
);

const NA_EXAMPLES = [
	{ greek: "Θέλω να φάω.", english: "I want to eat." },
	{ greek: "Πρέπει να πάω.", english: "I have to go." },
	{ greek: "Μπορώ να έρθω.", english: "I can come." },
	{ greek: "Ξέρω να μαγειρεύω.", english: "I know how to cook." },
];

const NaConstructionsSection: React.FC = () => (
	<section id="na-constructions" className="space-y-4">
		<SectionHeading
			title="να-constructions"
			subtitle="Modal verb + να + subjunctive — how Greek joins two verbs"
		/>

		<TeachingCard
			scheme="neutral"
			eyebrow="The rule"
			title="Modal + να + verb"
			description="Where English uses an infinitive (I want to eat), Greek uses να + a conjugated verb in the same form as the future minus θα."
		>
			<div className="space-y-2">
				{NA_EXAMPLES.map((ex) => (
					<div key={ex.greek} className="rounded-lg border border-honey-200 bg-honey-50 p-3">
						<GreekText tone="default" size="base" className="text-sm text-stone-800">
							{ex.greek}
						</GreekText>
						<p className="text-xs text-stone-500">{ex.english}</p>
					</div>
				))}
			</div>
			<p className="mt-4 text-sm text-stone-600">
				Both verbs conjugate to match the subject:{" "}
				<GreekText tone="accent" size="sm">
					Θέλει να φάει
				</GreekText>{" "}
				(she wants to eat).
			</p>
			<p className="mt-2 text-sm text-stone-600">
				Negation: put{" "}
				<GreekText tone="accent" size="sm">
					δεν
				</GreekText>{" "}
				before the modal —{" "}
				<GreekText tone="accent" size="sm">
					δεν θέλω να φάω
				</GreekText>
				.
			</p>
		</TeachingCard>
	</section>
);

export const FutureNaSection: React.FC = () => (
	<div className="space-y-10">
		<FutureTenseSection />
		<NaConstructionsSection />
	</div>
);

const eimai = IRREGULAR_VERBS.find((v) => v.infinitive === "είμαι");
const otherIrregulars = IRREGULAR_VERBS.filter((v) => v.infinitive !== "είμαι");

export const PresentTenseSection: React.FC = () => (
	<section id="verbs" className="space-y-6">
		<SectionHeading
			title="Verb Conjugation"
			subtitle="Present tense — the ending shows who is doing the action"
		/>

		{/* είμαι first — most common verb, doesn't fit the 3 patterns */}
		{eimai && (
			<TeachingCard
				scheme="neutral"
				eyebrow="Start here"
				title="είμαι (to be)"
				description="The most common Greek verb. Memorise it first — you'll use it in every conversation."
				footer={
					eimai.note ? <p className="text-xs text-stone-500 italic">{eimai.note}</p> : undefined
				}
			>
				<ParadigmTable
					infinitive={eimai.infinitive}
					meaning={eimai.meaning}
					forms={eimai.forms}
					formClassName="text-stone-800 font-semibold"
				/>
			</TeachingCard>
		)}

		{/* Pattern key — establish the 3 families before the tables */}
		<PatternIdentifier />

		{/* Negation — low salience, plain text */}
		<p className="px-1 text-sm text-stone-600">
			<strong className="text-stone-800">Negation:</strong> put{" "}
			<GreekText tone="accent" size="sm">
				δεν
			</GreekText>{" "}
			before any verb —{" "}
			<GreekText tone="accent" size="sm">
				Δεν μιλάω
			</GreekText>{" "}
			(I don't speak).
		</p>

		{/* Pattern families */}
		<div className="space-y-6">
			<PatternComparison />
			{PATTERN_ORDER.map((key) => {
				const pattern = VERB_PATTERNS[key];
				return pattern && <PatternSection key={key} patternKey={key} pattern={pattern} />;
			})}
		</div>

		{/* Other high-frequency irregulars — all Tier 1, must memorise */}
		{otherIrregulars.length > 0 && (
			<MemoriseCard
				title="Other high-frequency verbs"
				description="These don't follow the 3 patterns — you'll use all of them constantly. Memorise as units."
			>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{otherIrregulars.map((verb) => (
						<div
							key={verb.infinitive}
							className="rounded-lg border border-honey-200 bg-card p-4 shadow-sm"
						>
							<ParadigmTable
								infinitive={verb.infinitive}
								meaning={verb.meaning}
								forms={verb.forms}
								formClassName="text-honey-text font-semibold"
							/>
							{verb.note && (
								<p className="mt-3 border-t border-stone-100 px-1 pt-2 text-sm text-stone-600 italic">
									{verb.note}
								</p>
							)}
						</div>
					))}
				</div>
			</MemoriseCard>
		)}

		{/* Cross-link to vocabulary */}
		<div className="flex items-center justify-between rounded-lg border border-stone-300 bg-stone-100 p-3">
			<div className="flex items-center gap-2">
				<BookOpen size={16} className="text-stone-800" />
				<span className="text-sm text-stone-700">
					Browse all verbs, irregulars first
				</span>
			</div>
			<Link
				to="/learn/verbs"
				className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-800 hover:underline"
			>
				View vocabulary <ArrowRight size={14} />
			</Link>
		</div>
	</section>
);
