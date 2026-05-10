import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, BookOpen } from "lucide-react";
import type React from "react";

import { Card } from "@/components/Card";
import { NavigatorCard, NavigatorCell, TeachingCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MonoText } from "@/components/MonoText";
import { ParadigmTable } from "@/components/ParadigmTable";
import { SectionHeading } from "@/components/SectionHeading";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import {
	AORIST_FORMATION_PATTERNS,
	IRREGULAR_AORIST_STEMS,
	IRREGULAR_VERBS,
	PAST_TENSE_PATTERNS,
	VERB_PATTERNS,
} from "@/constants/verbs";
import { cn } from "@/lib/utils";

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
					<MonoText className={`${textClass} text-base font-bold`}>{ex.verb}</MonoText>
					<span className="text-sm text-stone-500">{ex.formNote}</span>
				</div>
				<div className="border-l-2 border-stone-200 pl-2">
					<MonoText className="text-stone-700">{ex.greek}</MonoText>
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
	<div className="divide-y divide-stone-100">
		{verbs.map((v) => (
			<div key={v.infinitive} className="flex items-baseline gap-2 py-2 first:pt-0 last:pb-0">
				<MonoText className={`${textClass} font-semibold`}>{v.infinitive}</MonoText>
				<span className="text-sm text-stone-600">({v.meaning})</span>
				<span className="ml-auto text-xs text-stone-400">same endings</span>
			</div>
		))}
	</div>
);

type PatternKey = "active" | "contracted" | "deponent";

interface PatternMeta {
	ending: string;
	displayName: string;
	scheme: GrammarScheme;
}

const PATTERN_META: Record<PatternKey, PatternMeta> = {
	active: { ending: "-ω", displayName: "Active", scheme: "verb-active" },
	contracted: { ending: "-άω/-ώ", displayName: "Contracted", scheme: "verb-contracted" },
	deponent: { ending: "-μαι", displayName: "Deponent", scheme: "verb-deponent" },
};

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
						<MonoText size="sm" className="font-medium">
							-ώ
						</MonoText>{" "}
						variant (μπορώ, οδηγώ) has different endings — shown in the high-frequency section
						below.
					</p>
				) : undefined
			}
		>
			<div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
				<ParadigmTable
					stem={pattern.canonical.stem}
					meaning={pattern.canonical.meaning}
					infinitive={pattern.canonical.infinitive}
					forms={pattern.canonical.forms}
					endingClassName={`${style.text} font-bold`}
					scheme={meta.scheme}
					fadeStem={true}
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

interface PatternRow {
	ending: string;
	name: string;
	examples: string[];
	scheme: GrammarScheme;
}

const PATTERN_ROWS: PatternRow[] = [
	{ ending: "-ω", name: "Active", examples: ["κάνω", "θέλω", "βλέπω"], scheme: "verb-active" },
	{
		ending: "-άω/-ώ",
		name: "Contracted",
		examples: ["μιλάω", "αγαπάω"],
		scheme: "verb-contracted",
	},
	{ ending: "-μαι", name: "Deponent", examples: ["έρχομαι", "θυμάμαι"], scheme: "verb-deponent" },
];

const PatternIdentifier: React.FC = () => (
	<NavigatorCard
		title="Which pattern?"
		subtitle="Look at the verb's dictionary form (1st person singular)"
	>
		{PATTERN_ROWS.map((row) => {
			const style = SCHEME[row.scheme];
			return (
				<NavigatorCell
					key={row.ending}
					className={cn(style.bg, style.border, "flex items-center gap-3 border-2 sm:gap-4")}
				>
					<MonoText className={`w-20 shrink-0 text-xl font-bold ${style.text}`}>
						{row.ending}
					</MonoText>
					<span className="font-semibold text-stone-800">{row.name}</span>
					<div className="ml-auto hidden gap-2 sm:flex">
						{row.examples.map((ex) => (
							<span
								key={ex}
								className={cn(
									"rounded-md border bg-white px-2 py-1 font-mono text-sm",
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
				<MonoText className="text-sm text-stone-800">{ex.greek}</MonoText>
				<p className="text-xs text-stone-500">{ex.english}</p>
			</div>
		))}
	</div>
);

const AoristPatternCard: React.FC<{
	pattern: (typeof AORIST_FORMATION_PATTERNS)[keyof typeof AORIST_FORMATION_PATTERNS];
	scheme: GrammarScheme;
}> = ({ pattern, scheme }) => {
	const style = SCHEME[scheme];
	return (
		<TeachingCard
			scheme={scheme}
			title={`Aorist ${pattern.label}`}
			badge={<span className={`font-mono text-base ${style.text}`}>{pattern.label}</span>}
			description={pattern.description}
		>
			<div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
				<ParadigmTable
					infinitive={pattern.canonical.infinitive}
					meaning={pattern.canonical.meaning}
					forms={pattern.canonical.forms}
					endingClassName={`${style.text} font-bold`}
					scheme={scheme}
					fadeStem={true}
				/>
			</div>
			<AoristExamples examples={pattern.canonical.examples} />
		</TeachingCard>
	);
};

const PastTenseSection: React.FC = () => {
	const activeStyle = SCHEME["verb-active"];
	const contractedStyle = SCHEME["verb-contracted"];
	const deponentStyle = SCHEME["verb-deponent"];

	return (
		<section id="past-tense" className="space-y-6">
			<SectionHeading
				title="Past Tense"
				subtitle="Two past tenses — αόριστος (completed) and παρατατικός (ongoing)"
			/>

			{/* Two tenses compared */}
			<div className="grid gap-3 sm:grid-cols-2">
				<div className="rounded-lg border-2 border-navy-200 bg-navy-50 p-4">
					<p className="mb-0.5 font-mono text-base font-bold text-navy-text">Αόριστος</p>
					<p className="mb-2 text-xs text-stone-500">Simple past — completed action</p>
					<MonoText className="text-sm text-stone-800">Έφαγα χθες.</MonoText>
					<p className="text-xs text-stone-500">I ate yesterday.</p>
				</div>
				<div className="rounded-lg border-2 border-slate-200 bg-slate-50 p-4">
					<p className="mb-0.5 font-mono text-base font-bold text-slate-text">Παρατατικός</p>
					<p className="mb-2 text-xs text-stone-500">Continuous past — ongoing or repeated</p>
					<MonoText className="text-sm text-stone-800">Έτρωγα κάθε μέρα.</MonoText>
					<p className="text-xs text-stone-500">I used to eat every day.</p>
				</div>
			</div>

			{/* ── FORMING THE AORIST ─────────────────────── */}
			<div className="space-y-6 pt-2">
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
								<MonoText className="text-base text-stone-500">γράφω</MonoText>
								<span className="text-stone-300">→</span>
								<div className="flex items-baseline gap-0">
									<span className={`font-mono text-lg font-bold ${activeStyle.text}`}>ε</span>
									<MonoText className="text-lg font-bold text-stone-800">γραψ</MonoText>
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
								<MonoText className="text-base text-stone-500">δουλεύω</MonoText>
								<span className="text-stone-300">→</span>
								<div className="flex items-baseline gap-0">
									<MonoText className="text-lg font-bold text-stone-800">δούλεψ</MonoText>
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
					<div className="divide-y divide-stone-100 overflow-hidden rounded-lg border border-stone-200 bg-white">
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
									<MonoText className="text-sm text-stone-500">{rule.examplePresent}</MonoText>
									<span className="mx-1 text-xs text-stone-300">→</span>
									<MonoText className={`text-sm font-bold ${activeStyle.text}`}>
										{rule.examplePast}
									</MonoText>
								</div>
							</div>
						))}
					</div>
				</TeachingCard>
			</div>

			{/* Aorist paradigms — all patterns */}
			<AoristPatternCard pattern={AORIST_FORMATION_PATTERNS.sa} scheme="verb-active" />
			<AoristPatternCard pattern={AORIST_FORMATION_PATTERNS.psa} scheme="verb-active" />
			<AoristPatternCard pattern={AORIST_FORMATION_PATTERNS.ksa} scheme="verb-active" />

			{/* -άω aorist (-ησα) */}
			<TeachingCard
				scheme="verb-contracted"
				title="Aorist: -άω verbs"
				badge={<span className={`font-mono text-base ${contractedStyle.text}`}>-ησα</span>}
				description={PAST_TENSE_PATTERNS.aorist_contracted.description}
			>
				<div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
					<ParadigmTable
						infinitive={PAST_TENSE_PATTERNS.aorist_contracted.canonical.infinitive}
						meaning={PAST_TENSE_PATTERNS.aorist_contracted.canonical.meaning}
						forms={PAST_TENSE_PATTERNS.aorist_contracted.canonical.forms}
						endingClassName={`${contractedStyle.text} font-bold`}
						scheme="verb-contracted"
						fadeStem={true}
					/>
				</div>
				<AoristExamples
					examples={[
						{ greek: "Μίλησα μαζί του χθες.", english: "I spoke with him yesterday." },
						{ greek: "Μιλήσαμε για ώρες.", english: "We talked for hours." },
					]}
				/>
			</TeachingCard>

			{/* -θηκα aorist */}
			<AoristPatternCard pattern={AORIST_FORMATION_PATTERNS.thika} scheme="verb-deponent" />

			{/* Suppletive (έρχομαι) */}
			<TeachingCard
				scheme="verb-deponent"
				title="Aorist: suppletive verbs"
				badge={<span className={`font-mono text-base ${deponentStyle.text}`}>new stem</span>}
				description="Stem changes completely — endings are identical to regular aorist."
			>
				<div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
					<ParadigmTable
						infinitive={PAST_TENSE_PATTERNS.aorist_deponent.canonical.infinitive}
						meaning={PAST_TENSE_PATTERNS.aorist_deponent.canonical.meaning}
						forms={PAST_TENSE_PATTERNS.aorist_deponent.canonical.forms}
						endingClassName={`${deponentStyle.text} font-bold`}
						scheme="verb-deponent"
						fadeStem={true}
					/>
				</div>
				<AoristExamples
					examples={[
						{ greek: "Ήρθα νωρίς.", english: "I arrived early." },
						{ greek: "Πότε ήρθες;", english: "When did you arrive?" },
						{ greek: "Ήρθαμε μαζί.", english: "We came together." },
					]}
				/>
				<p className="mt-3 px-1 text-xs text-stone-500">
					Find the aorist stem (listed below), then add the same{" "}
					<MonoText size="sm">-α -ες -ε -αμε -ατε -αν</MonoText>.
				</p>
			</TeachingCard>

			{/* Stems that break the rules */}
			<Card variant="bordered" padding="lg" className="border-2 border-honey-300 bg-honey-50">
				<div className="mb-4 flex items-start gap-3">
					<div className="rounded-xl bg-honey-200 p-2.5">
						<AlertCircle size={20} className="text-honey-text" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-honey-text">Stems that break the rules</h3>
						<p className="text-sm text-stone-600">
							These aorist stems cannot be predicted — the rules above don't apply. Memorise them as
							units.
						</p>
					</div>
				</div>
				<div className="space-y-3">
					{(["suppletive", "irregular"] as const).map((cat) => (
						<div key={cat}>
							<p className="mb-1 text-xs font-semibold tracking-wide text-stone-500 uppercase">
								{cat === "suppletive"
									? "Suppletive — completely different stem"
									: "Irregular — follows rules loosely"}
							</p>
							<div className="divide-y divide-honey-100 rounded-lg border border-honey-200 bg-white">
								{IRREGULAR_AORIST_STEMS.filter((s) => s.category === cat).map((s) => (
									<div
										key={s.present}
										className="grid grid-rule-suffix items-baseline gap-2 px-3 py-2"
									>
										<MonoText className="font-semibold text-stone-600">{s.present}</MonoText>
										<span className="text-honey-300">→</span>
										<MonoText className="font-bold text-honey-text">{s.aoristSg1}</MonoText>
										<span className="text-right text-xs text-stone-400">{s.english}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</Card>

			{/* ── CONTINUOUS PAST (secondary) ───────────────── */}
			<CollapsibleSection
				title="Continuous past (παρατατικός)"
				colorScheme="stone"
				defaultOpen={false}
			>
				<div className="space-y-4">
					<div className="rounded-lg border border-stone-200 bg-white p-4">
						<p className="mb-3 text-sm text-stone-600">
							Use the <strong>present stem</strong> with the same -α -ες -ε -αμε -ατε -αν endings.
							For -άω verbs, insert <MonoText size="sm">-ούσ-</MonoText> instead.
						</p>
						<div className="grid gap-4 sm:grid-cols-2">
							<div>
								<p className="mb-2 text-xs font-semibold text-stone-500">-ω verbs (δουλεύω)</p>
								<ParadigmTable
									infinitive={PAST_TENSE_PATTERNS.past_continuous_active.canonical.infinitive}
									meaning={PAST_TENSE_PATTERNS.past_continuous_active.canonical.meaning}
									forms={PAST_TENSE_PATTERNS.past_continuous_active.canonical.forms}
									endingClassName={`${activeStyle.text} font-bold`}
									scheme="verb-active"
									fadeStem={true}
								/>
							</div>
							<div>
								<p className="mb-2 text-xs font-semibold text-stone-500">-άω verbs (μιλάω)</p>
								<ParadigmTable
									infinitive={PAST_TENSE_PATTERNS.past_continuous_contracted.canonical.infinitive}
									meaning={PAST_TENSE_PATTERNS.past_continuous_contracted.canonical.meaning}
									forms={PAST_TENSE_PATTERNS.past_continuous_contracted.canonical.forms}
									endingClassName={`${contractedStyle.text} font-bold`}
									scheme="verb-contracted"
									fadeStem={true}
								/>
							</div>
						</div>
					</div>
				</div>
			</CollapsibleSection>
		</section>
	);
};

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
					<MonoText className="text-sm text-stone-800">γράφω → έγραψα → θα γράψω</MonoText>
					<p className="mt-1 text-xs text-stone-500">I write → I wrote → I will write</p>
				</div>
				<div className="rounded-lg border border-honey-200 bg-honey-50 p-4">
					<p className="mb-2 text-xs font-semibold text-honey-text">Suppletive</p>
					<MonoText className="text-sm text-stone-800">τρώω → έφαγα → θα φάω</MonoText>
					<p className="mt-1 text-xs text-stone-500">I eat → I ate → I will eat</p>
				</div>
			</div>
			<p className="mt-4 text-sm text-stone-600">
				Negation:{" "}
				<MonoText variant="greek" size="sm">
					δεν θα φάω
				</MonoText>{" "}
				(I won't eat). δεν always sits before θα.
			</p>
		</TeachingCard>
	</section>
);

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
				<div className="rounded-lg border border-honey-200 bg-honey-50 p-3">
					<MonoText className="text-sm text-stone-800">Θέλω να φάω.</MonoText>
					<p className="text-xs text-stone-500">I want to eat.</p>
				</div>
				<div className="rounded-lg border border-honey-200 bg-honey-50 p-3">
					<MonoText className="text-sm text-stone-800">Πρέπει να πάω.</MonoText>
					<p className="text-xs text-stone-500">I have to go.</p>
				</div>
				<div className="rounded-lg border border-honey-200 bg-honey-50 p-3">
					<MonoText className="text-sm text-stone-800">Μπορώ να έρθω.</MonoText>
					<p className="text-xs text-stone-500">I can come.</p>
				</div>
				<div className="rounded-lg border border-honey-200 bg-honey-50 p-3">
					<MonoText className="text-sm text-stone-800">Ξέρω να μαγειρεύω.</MonoText>
					<p className="text-xs text-stone-500">I know how to cook.</p>
				</div>
			</div>
			<p className="mt-4 text-sm text-stone-600">
				Both verbs conjugate to match the subject:{" "}
				<MonoText variant="greek" size="sm">
					Θέλει να φάει
				</MonoText>{" "}
				(she wants to eat).
			</p>
			<p className="mt-2 text-sm text-stone-600">
				Negation: put{" "}
				<MonoText variant="greek" size="sm">
					δεν
				</MonoText>{" "}
				before the modal —{" "}
				<MonoText variant="greek" size="sm">
					δεν θέλω να φάω
				</MonoText>
				.
			</p>
		</TeachingCard>
	</section>
);

const eimai = IRREGULAR_VERBS.find((v) => v.infinitive === "είμαι");
const otherIrregulars = IRREGULAR_VERBS.filter((v) => v.infinitive !== "είμαι");

export const VerbsSection: React.FC = () => (
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
			<MonoText variant="greek" size="sm">
				δεν
			</MonoText>{" "}
			before any verb —{" "}
			<MonoText variant="greek" size="sm">
				Δεν μιλάω
			</MonoText>{" "}
			(I don't speak).
		</p>

		{/* Pattern families */}
		<div className="space-y-6">
			{VERB_PATTERNS.active && (
				<PatternSection patternKey="active" pattern={VERB_PATTERNS.active} />
			)}
			{VERB_PATTERNS.contracted && (
				<PatternSection patternKey="contracted" pattern={VERB_PATTERNS.contracted} />
			)}
			{VERB_PATTERNS.deponent && (
				<PatternSection patternKey="deponent" pattern={VERB_PATTERNS.deponent} />
			)}
		</div>

		{/* Other high-frequency irregulars — all Tier 1, must memorise */}
		{otherIrregulars.length > 0 && (
			<Card variant="bordered" padding="lg" className="border-2 border-honey-300 bg-honey-50">
				<div className="mb-4 flex items-start gap-3">
					<div className="rounded-xl bg-honey-200 p-2.5">
						<AlertCircle size={20} className="text-honey-text" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-honey-text">Other high-frequency verbs</h3>
						<p className="text-sm text-stone-600">
							These don't follow the 3 patterns — you'll use all of them constantly. Memorise as
							units.
						</p>
					</div>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{otherIrregulars.map((verb) => (
						<div
							key={verb.infinitive}
							className="rounded-lg border border-honey-200 bg-white p-4 shadow-sm"
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
			</Card>
		)}

		{/* Cross-link to vocabulary */}
		<div className="flex items-center justify-between rounded-lg border border-stone-300 bg-stone-100 p-3">
			<div className="flex items-center gap-2">
				<BookOpen size={16} className="text-stone-800" />
				<span className="text-sm text-stone-700">
					Browse all verbs organised by conjugation family
				</span>
			</div>
			<Link
				to="/learn/verbs"
				className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-800 hover:underline"
			>
				View vocabulary <ArrowRight size={14} />
			</Link>
		</div>

		<PastTenseSection />

		<FutureTenseSection />

		<NaConstructionsSection />
	</section>
);
