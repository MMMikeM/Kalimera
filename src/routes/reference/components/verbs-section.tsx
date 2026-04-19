import {
	AlertCircle,
	ArrowRight,
	ArrowRightLeft,
	BookOpen,
	Lightbulb,
	RefreshCw,
	Sparkles,
	Zap,
} from "lucide-react";
import type React from "react";
import { Link } from "react-router";

import { Card } from "@/components/Card";
import { Callout, NavigatorCard, NavigatorCell, TeachingCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ContentSection } from "@/components/ContentSection";
import { MonoText } from "@/components/MonoText";
import { ParadigmTable } from "@/components/ParadigmTable";
import { SectionHeading } from "@/components/SectionHeading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
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

// TODO(local-axis): verb-pattern family is a page-local axis (active /
// contracted / deponent). Currently neutralised because reusing case-identity
// colours (ocean / terracotta / olive) here would lie about the grammatical
// value of the verb paradigm. Introduce a dedicated local-axis palette if the
// signal loss turns out to hurt learners.
interface PatternMeta {
	ending: string;
	displayName: string;
	scheme: GrammarScheme;
}

const PATTERN_META: Record<PatternKey, PatternMeta> = {
	active: { ending: "-ω", displayName: "Active", scheme: "neutral" },
	contracted: { ending: "-άω/-ώ", displayName: "Contracted", scheme: "neutral" },
	deponent: { ending: "-μαι", displayName: "Deponent", scheme: "neutral" },
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
		>
			<div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
				<ParadigmTable
					stem={pattern.canonical.stem}
					meaning={pattern.canonical.meaning}
					infinitive={pattern.canonical.infinitive}
					forms={pattern.canonical.forms}
					endingClassName={`${style.text} font-bold`}
					showHeaders={true}
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
	icon: React.ReactNode;
	ending: string;
	name: string;
	examples: string[];
	scheme: GrammarScheme;
}

// TODO(local-axis): see PatternMeta above.
const PATTERN_ROWS: PatternRow[] = [
	{ icon: <Zap size={18} />, ending: "-ω", name: "Active", examples: ["κάνω", "θέλω"], scheme: "neutral" },
	{
		icon: <Sparkles size={18} />,
		ending: "-άω/-ώ",
		name: "Contracted",
		examples: ["μιλάω", "αγαπάω"],
		scheme: "neutral",
	},
	{
		icon: <RefreshCw size={18} />,
		ending: "-μαι",
		name: "Deponent",
		examples: ["έρχομαι", "θυμάμαι"],
		scheme: "neutral",
	},
];

const PatternIdentifier: React.FC = () => (
	<NavigatorCard
		title="Which Pattern?"
		subtitle="Look at the verb's dictionary form (1st person singular)"
	>
		{PATTERN_ROWS.map((row) => {
			const style = SCHEME[row.scheme];
			return (
				<NavigatorCell
					key={row.ending}
					className={`${style.bg} ${style.border} flex items-center gap-3 border-2 sm:gap-4`}
				>
					<div className={`shrink-0 rounded-lg p-2 ${style.badgeBg}`}>
						<span className={style.text}>{row.icon}</span>
					</div>
					<MonoText className={`text-xl font-bold ${style.text}`}>{row.ending}</MonoText>
					<span className="font-semibold text-stone-800">{row.name}</span>
					<div className="ml-auto hidden gap-2 sm:flex">
						{row.examples.map((ex) => (
							<span
								key={ex}
								className={`rounded-md border ${style.border} bg-white px-2 py-1 font-mono text-sm ${style.text}`}
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

const VoiceExplanation: React.FC = () => (
	<Card variant="bordered" padding="lg" className="border-2 border-stone-300 bg-stone-50">
		<div className="mb-4 flex items-center gap-3">
			<div className="rounded-xl bg-stone-200 p-2.5">
				<ArrowRightLeft size={20} className="text-stone-700" />
			</div>
			<div>
				<h3 className="text-lg font-bold text-stone-800">Voice: Who Does the Action?</h3>
				<p className="text-sm text-stone-600">
					Greek verbs show not just WHO (the endings) but also the DIRECTION of action
				</p>
			</div>
		</div>

		<div className="space-y-4">
			{/* TODO(local-axis): voice axis (active / passive) is page-local.
			    Neutralised for now; same remedy as PatternMeta. */}
			<Callout scheme="neutral" title="Active: Subject DOES the action">
				<div className="flex items-baseline gap-2">
					<MonoText className="font-bold text-stone-800">βλέπω τον φίλο</MonoText>
					<span className="text-stone-600">=</span>
					<span className="text-stone-700">I see the friend</span>
				</div>
				<p className="text-sm text-stone-500 italic">Action flows FROM me TO the friend</p>
			</Callout>

			<Callout scheme="neutral" title="Passive: Subject RECEIVES the action">
				<div className="flex items-baseline gap-2">
					<MonoText className="font-bold text-stone-800">βλέπομαι από τον φίλο</MonoText>
					<span className="text-stone-600">=</span>
					<span className="text-stone-700">I am seen by the friend</span>
				</div>
				<p className="text-sm text-stone-500 italic">Action flows TO me FROM the friend</p>
			</Callout>

			{/* The -μαι marker */}
			<div className="rounded-lg border border-stone-200 bg-white p-4">
				<p className="mb-3 text-sm text-stone-700">
					The <MonoText className="font-bold text-stone-800">-μαι</MonoText> ending is the
					passive marker:
				</p>
				<div className="grid gap-3 sm:grid-cols-2">
					<div className="flex items-center gap-2 text-sm">
						<MonoText className="font-semibold text-stone-800">βλέπω</MonoText>
						<span className="text-stone-400">(I see)</span>
						<ArrowRight size={14} className="text-stone-400" />
						<MonoText className="font-semibold text-stone-800">βλέπομαι</MonoText>
						<span className="text-stone-400">(I am seen)</span>
					</div>
					<div className="flex items-center gap-2 text-sm">
						<MonoText className="font-semibold text-stone-800">ακούω</MonoText>
						<span className="text-stone-400">(I hear)</span>
						<ArrowRight size={14} className="text-stone-400" />
						<MonoText className="font-semibold text-stone-800">ακούομαι</MonoText>
						<span className="text-stone-400">(I am heard)</span>
					</div>
				</div>
			</div>

			<Callout
				scheme="neutral"
				title="Deponent: Passive form, active meaning"
				footer="The endings follow passive patterns, but YOU are doing the action."
			>
				<p className="text-sm text-stone-600">
					Some verbs ONLY exist in <MonoText className="font-bold text-stone-800">-μαι</MonoText>{" "}
					form, but their meaning is active:
				</p>
				<div className="flex items-baseline gap-2">
					<MonoText className="font-bold text-stone-800">έρχομαι</MonoText>
					<span className="text-stone-600">=</span>
					<span className="text-stone-700">I come</span>
					<span className="text-sm text-stone-400">(not "I am come-d")</span>
				</div>
				<div className="flex items-baseline gap-2">
					<MonoText className="font-bold text-stone-800">θυμάμαι</MonoText>
					<span className="text-stone-600">=</span>
					<span className="text-stone-700">I remember</span>
					<span className="text-sm text-stone-400">(not "I am remembered")</span>
				</div>
				<div className="flex items-baseline gap-2">
					<MonoText className="font-bold text-stone-800">κοιμάμαι</MonoText>
					<span className="text-stone-600">=</span>
					<span className="text-stone-700">I sleep</span>
					<span className="text-sm text-stone-400">(not "I am slept")</span>
				</div>
			</Callout>

			{/* Etymology note */}
			<div className="rounded-lg border border-stone-200 bg-stone-100 p-3">
				<p className="text-sm text-stone-700">
					<strong className="text-stone-800">Why "deponent"?</strong> From Latin <em>deponere</em>{" "}
					(to put aside) — these verbs have "set aside" their active forms.
				</p>
			</div>
		</div>
	</Card>
);

// Find είμαι (to be) from irregular verbs for promotion
const eimai = IRREGULAR_VERBS.find((v) => v.infinitive === "είμαι");
const otherIrregulars = IRREGULAR_VERBS.filter((v) => v.infinitive !== "είμαι");

export const VerbsSection: React.FC = () => (
	<section id="verbs" className="space-y-6">
		<SectionHeading
			title="Verb Conjugation"
			subtitle="Greek verbs change their endings to show who is doing the action"
		/>

		{/* Voice explanation - Active vs Passive vs Deponent */}
		<VoiceExplanation />

		{/* Essential First: είμαι (to be) - promoted from irregulars */}
		{eimai && (
			<ContentSection title="είμαι (to be)" colorScheme="olive">
				<div className="space-y-3 p-3">
					<p className="text-sm text-stone-600">
						The most common Greek verb. Memorize it first. You'll use it in every conversation.
					</p>
					<ParadigmTable
						infinitive={eimai.infinitive}
						meaning={eimai.meaning}
						forms={eimai.forms}
						formClassName="text-stone-800 font-semibold"
					/>
					{eimai.note && (
						<p className="border-t border-stone-200 pt-2 text-sm text-stone-600 italic">
							{eimai.note}
						</p>
					)}
				</div>
			</ContentSection>
		)}

		<Alert variant="info">
			<Lightbulb size={16} />
			<AlertTitle>The Power of Patterns</AlertTitle>
			<AlertDescription>
				Learn just <strong>3 ending patterns</strong> and you can conjugate thousands of verbs. The
				endings tell you WHO is doing the action.
			</AlertDescription>
		</Alert>

		{/* Negation note */}
		<div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
			<p className="text-sm text-stone-700">
				<strong className="text-stone-800">Negation:</strong> Add{" "}
				<MonoText variant="greek" size="sm">
					δεν
				</MonoText>{" "}
				before the verb:{" "}
				<MonoText variant="greek" size="sm">
					Δεν μιλάω
				</MonoText>{" "}
				(I don't speak)
			</p>
		</div>

		{/* Pattern Identifier */}
		<PatternIdentifier />

		{/* Pattern Families */}
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

		{/* Other Irregular Verbs (excluding είμαι which is promoted above) */}
		{otherIrregulars.length > 0 && (
			<Card variant="bordered" padding="lg" className="border-2 border-honey-300 bg-honey-50">
				<div className="mb-4 flex items-start gap-3">
					<div className="rounded-xl bg-honey-200 p-2.5">
						<AlertCircle size={20} className="text-honey-text" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-honey-text">Other Irregular Verbs</h3>
						<p className="text-sm text-stone-600">
							These common verbs don't follow patterns. You'll learn them naturally through frequent
							exposure.
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
					Browse all verbs organized by conjugation family
				</span>
			</div>
			<Link
				to="/learn/verbs"
				className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-800 hover:underline"
			>
				View vocabulary <ArrowRight size={14} />
			</Link>
		</div>

		{/* Tense scope note */}
		<p className="text-center text-sm text-stone-500 italic">
			This section covers present tense only. Past and future tenses coming soon.
		</p>
	</section>
);
