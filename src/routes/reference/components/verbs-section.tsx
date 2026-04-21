import { AlertCircle, ArrowRight, BookOpen } from "lucide-react";
import type React from "react";
import { Link } from "react-router";

import { Card } from "@/components/Card";
import { NavigatorCard, NavigatorCell, TeachingCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MonoText } from "@/components/MonoText";
import { ParadigmTable } from "@/components/ParadigmTable";
import { SectionHeading } from "@/components/SectionHeading";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import { cn } from "@/lib/utils";
import { IRREGULAR_VERBS, VERB_PATTERNS } from "@/constants/verbs";

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

				<CollapsibleSection
					title="See it in action"
					colorScheme="stone"
					defaultOpen={false}
				>
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
	{ ending: "-άω/-ώ", name: "Contracted", examples: ["μιλάω", "αγαπάω"], scheme: "verb-contracted" },
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
					<MonoText className={`w-20 shrink-0 text-xl font-bold ${style.text}`}>{row.ending}</MonoText>
					<span className="font-semibold text-stone-800">{row.name}</span>
					<div className="ml-auto hidden gap-2 sm:flex">
						{row.examples.map((ex) => (
							<span
								key={ex}
								className={cn("rounded-md border bg-white px-2 py-1 font-mono text-sm", style.border, style.text)}
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
					eimai.note ? (
						<p className="text-xs text-stone-500 italic">{eimai.note}</p>
					) : undefined
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

		<p className="text-center text-sm text-stone-500 italic">
			This section covers present tense only. Past and future tenses coming soon.
		</p>
	</section>
);
