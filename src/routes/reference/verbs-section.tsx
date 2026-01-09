import {
	AlertCircle,
	Zap,
	Sparkles,
	RefreshCw,
	Lightbulb,
	ArrowRight,
	BookOpen,
	Star,
} from "lucide-react";
import type React from "react";
import { Link } from "react-router";

import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { ParadigmTable } from "@/components/ParadigmTable";
import { SectionHeading } from "@/components/SectionHeading";
import { ContentSection } from "@/components/ContentSection";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { IRREGULAR_VERBS, VERB_PATTERNS } from "../../constants/verbs";

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

const highlightVerb = (
	sentence: string,
	verb: string,
	colorClass: string,
): React.ReactNode => {
	const parts = sentence.split(verb);
	if (parts.length === 1) return sentence;
	return (
		<>
			{parts[0]}
			<span className={colorClass}>{verb}</span>
			{parts[1]}
		</>
	);
};

const UsageExamples: React.FC<{
	examples: UsageExample[];
	config: PatternConfig;
}> = ({ examples, config }) => (
	<div className="mt-5">
		<div
			className={`text-sm font-semibold ${config.textClass} mb-2 flex items-center gap-1.5`}
		>
			<ArrowRight size={14} /> In context:
		</div>
		<div className="space-y-2 bg-stone-50 rounded-lg p-3 border border-stone-200">
			{examples.map((ex) => (
				<div
					key={ex.greek}
					className="text-sm flex items-baseline gap-2 flex-wrap"
				>
					<MonoText weight="medium" size="md">
						{highlightVerb(
							ex.greek,
							ex.verb,
							`${config.textClass} font-semibold`,
						)}
					</MonoText>
					<span className="text-stone-600">{ex.english}</span>
					<span
						className={`text-sm px-1.5 py-0.5 rounded ${config.badgeBg} ${config.textClass}`}
					>
						{ex.formNote}
					</span>
				</div>
			))}
		</div>
	</div>
);

const SamePatternList: React.FC<{
	verbs: Array<{ infinitive: string; meaning: string }>;
	config: PatternConfig;
}> = ({ verbs, config }) => (
	<div className="mt-5">
		<div className={`text-sm font-semibold ${config.textClass} mb-2`}>
			Same pattern:
		</div>
		<div className="flex flex-wrap gap-2">
			{verbs.map((v) => (
				<span
					key={v.infinitive}
					className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border ${config.borderClass} rounded-full text-sm shadow-sm`}
				>
					<MonoText weight="semibold" className={config.textClass}>
						{v.infinitive}
					</MonoText>
					<span className="text-stone-600">({v.meaning})</span>
				</span>
			))}
		</div>
	</div>
);

type PatternConfig = {
	key: "active" | "contracted" | "deponent";
	icon: React.ReactNode;
	ending: string;
	bgClass: string;
	borderClass: string;
	textClass: string;
	badgeBg: string;
	isFirst?: boolean;
};

const PATTERN_CONFIGS: Record<string, PatternConfig> = {
	active: {
		key: "active",
		icon: <Zap size={20} />,
		ending: "-ω",
		bgClass: "bg-ocean-100",
		borderClass: "border-ocean-400",
		textClass: "text-ocean-text",
		badgeBg: "bg-ocean-300",
		isFirst: true,
	},
	contracted: {
		key: "contracted",
		icon: <Sparkles size={20} />,
		ending: "-άω/-ώ",
		bgClass: "bg-terracotta-100",
		borderClass: "border-terracotta-400",
		textClass: "text-terracotta-text",
		badgeBg: "bg-terracotta-200",
	},
	deponent: {
		key: "deponent",
		icon: <RefreshCw size={20} />,
		ending: "-μαι",
		bgClass: "bg-olive-100",
		borderClass: "border-olive-400",
		textClass: "text-olive-text",
		badgeBg: "bg-olive-200",
	},
};

const PatternSection: React.FC<{
	patternKey: "active" | "contracted" | "deponent";
	pattern: (typeof VERB_PATTERNS)[keyof typeof VERB_PATTERNS];
}> = ({ patternKey, pattern }) => {
	const config = PATTERN_CONFIGS[patternKey];
	if (!config) return null;

	return (
		<Card
			variant="bordered"
			padding="lg"
			className={`${config.bgClass} border-2 ${config.borderClass}`}
		>
			{/* Header with icon and badge */}
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-3">
					<div className={`p-2.5 rounded-xl ${config.badgeBg}`}>
						<span className={config.textClass}>{config.icon}</span>
					</div>
					<div>
						<div className="flex items-center gap-2">
							<h3 className={`text-lg font-bold ${config.textClass}`}>
								{pattern.name}
							</h3>
							{config.isFirst && (
								<Badge
									variant="default"
									size="sm"
									className="bg-ocean-100 text-ocean-text border border-ocean-300"
								>
									<Star size={12} className="mr-1" /> Learn First
								</Badge>
							)}
						</div>
						<p className="text-stone-600 text-sm">{pattern.description}</p>
					</div>
				</div>
				<div
					className={`px-3 py-1.5 rounded-full ${config.badgeBg} ${config.textClass} font-mono font-bold text-lg`}
				>
					{config.ending}
				</div>
			</div>

			{/* Paradigm Table */}
			<div className="bg-white rounded-lg p-4 border border-stone-200 shadow-sm">
				<ParadigmTable
					stem={pattern.canonical.stem}
					meaning={pattern.canonical.meaning}
					infinitive={pattern.canonical.infinitive}
					forms={pattern.canonical.forms}
					endingClassName={`${config.textClass} font-bold`}
					showHeaders={true}
					fadeStem={true}
				/>
			</div>

			<SamePatternList verbs={pattern.samePattern} config={config} />
			<UsageExamples
				examples={USAGE_EXAMPLES[patternKey] ?? []}
				config={config}
			/>
		</Card>
	);
};

const PatternIdentifier: React.FC = () => (
	<Card
		variant="bordered"
		padding="lg"
		className="bg-honey-50 border-2 border-stone-300 shadow-sm"
	>
		<div className="flex items-center gap-3 mb-4">
			<div className="p-2.5 rounded-xl bg-honey-200">
				<Lightbulb size={20} className="text-honey-text" />
			</div>
			<div>
				<h3 className="text-lg font-bold text-stone-800">Which Pattern?</h3>
				<p className="text-sm text-stone-600">
					Look at the verb's dictionary form (1st person singular)
				</p>
			</div>
		</div>
		<div className="space-y-3">
			<div className="flex items-center gap-4 p-3 rounded-xl bg-ocean-200 border-2 border-ocean-400 hover:border-ocean-600 transition-colors">
				<div className="p-2 rounded-lg bg-ocean-300">
					<Zap size={18} className="text-ocean-text" />
				</div>
				<MonoText className="text-ocean-text font-bold text-xl w-20">
					-ω
				</MonoText>
				<ArrowRight size={16} className="text-stone-400" />
				<span className="text-stone-800 font-semibold">Active</span>
				<div className="ml-auto flex gap-2">
					<span className="px-2 py-1 bg-white rounded-md text-sm font-mono text-ocean-text border border-ocean-300">
						κάνω
					</span>
					<span className="px-2 py-1 bg-white rounded-md text-sm font-mono text-ocean-text border border-ocean-300">
						θέλω
					</span>
				</div>
			</div>
			<div className="flex items-center gap-4 p-3 rounded-xl bg-terracotta-200 border-2 border-terracotta-400 hover:border-terracotta-600 transition-colors">
				<div className="p-2 rounded-lg bg-terracotta-300">
					<Sparkles size={18} className="text-terracotta-text" />
				</div>
				<MonoText className="text-terracotta-text font-bold text-xl w-20">
					-άω/-ώ
				</MonoText>
				<ArrowRight size={16} className="text-stone-400" />
				<span className="text-stone-800 font-semibold">Contracted</span>
				<div className="ml-auto flex gap-2">
					<span className="px-2 py-1 bg-white rounded-md text-sm font-mono text-terracotta-text border border-terracotta-400">
						μιλάω
					</span>
					<span className="px-2 py-1 bg-white rounded-md text-sm font-mono text-terracotta-text border border-terracotta-400">
						αγαπάω
					</span>
				</div>
			</div>
			<div className="flex items-center gap-4 p-3 rounded-xl bg-olive-200 border-2 border-olive-400 hover:border-olive-600 transition-colors">
				<div className="p-2 rounded-lg bg-olive-300">
					<RefreshCw size={18} className="text-olive-text" />
				</div>
				<MonoText className="text-olive-text font-bold text-xl w-20">
					-μαι
				</MonoText>
				<ArrowRight size={16} className="text-stone-400" />
				<span className="text-stone-800 font-semibold">Deponent</span>
				<div className="ml-auto flex gap-2">
					<span className="px-2 py-1 bg-white rounded-md text-sm font-mono text-olive-text border border-olive-400">
						έρχομαι
					</span>
					<span className="px-2 py-1 bg-white rounded-md text-sm font-mono text-olive-text border border-olive-400">
						θυμάμαι
					</span>
				</div>
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

		{/* Essential First: είμαι (to be) - promoted from irregulars */}
		{eimai && (
			<ContentSection title="Start Here: είμαι (to be)" colorScheme="olive">
				<div className="p-3 space-y-3">
					<p className="text-sm text-stone-600">
						The most common Greek verb. Memorize it first. You'll use it in every
						conversation.
					</p>
					<ParadigmTable
						infinitive={eimai.infinitive}
						meaning={eimai.meaning}
						forms={eimai.forms}
						formClassName="text-olive-text font-semibold"
					/>
					{eimai.note && (
						<p className="text-sm text-stone-600 italic border-t border-stone-200 pt-2">
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
				Learn just <strong>3 ending patterns</strong> and you can conjugate
				thousands of verbs. The endings tell you WHO is doing the action.
			</AlertDescription>
		</Alert>

		{/* Negation note */}
		<div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
			<p className="text-sm text-slate-text">
				<strong className="text-navy-text">Negation:</strong> Add{" "}
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
				<PatternSection
					patternKey="contracted"
					pattern={VERB_PATTERNS.contracted}
				/>
			)}
			{VERB_PATTERNS.deponent && (
				<PatternSection
					patternKey="deponent"
					pattern={VERB_PATTERNS.deponent}
				/>
			)}
		</div>

		{/* Other Irregular Verbs (excluding είμαι which is promoted above) */}
		{otherIrregulars.length > 0 && (
			<Card
				variant="bordered"
				padding="lg"
				className="bg-honey-50 border-2 border-honey-300"
			>
				<div className="flex items-start gap-3 mb-4">
					<div className="p-2.5 rounded-xl bg-honey-200">
						<AlertCircle size={20} className="text-honey-text" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-honey-text">
							Other Irregular Verbs
						</h3>
						<p className="text-stone-600 text-sm">
							These common verbs don't follow patterns. You'll learn them
							naturally through frequent exposure.
						</p>
					</div>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{otherIrregulars.map((verb) => (
						<div
							key={verb.infinitive}
							className="bg-white rounded-lg p-4 border border-honey-200 shadow-sm"
						>
							<ParadigmTable
								infinitive={verb.infinitive}
								meaning={verb.meaning}
								forms={verb.forms}
								formClassName="text-honey-text font-semibold"
							/>
							{verb.note && (
								<p className="mt-3 text-sm text-stone-600 italic px-1 border-t border-stone-100 pt-2">
									{verb.note}
								</p>
							)}
						</div>
					))}
				</div>
			</Card>
		)}

		{/* Cross-link to vocabulary */}
		<div className="p-3 bg-olive-100 rounded-lg border border-olive-300 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<BookOpen size={16} className="text-olive-text" />
				<span className="text-sm text-stone-700">
					Browse all verbs organized by conjugation family
				</span>
			</div>
			<Link
				to="/learn/vocabulary/verbs"
				className="inline-flex items-center gap-1.5 text-sm font-medium text-olive-text hover:underline"
			>
				View vocabulary <ArrowRight size={14} />
			</Link>
		</div>

		{/* Tense scope note */}
		<p className="text-sm text-stone-500 text-center italic">
			This section covers present tense only. Past and future tenses coming
			soon.
		</p>
	</section>
);
