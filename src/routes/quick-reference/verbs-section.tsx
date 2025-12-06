import { AlertCircle } from "lucide-react";
import type React from "react";

import { Card, MonoText, ParadigmTable } from "../../components";
import { IRREGULAR_VERBS, VERB_PATTERNS } from "../../constants/verbs";

interface UsageExample {
	greek: string;
	verb: string;
	english: string;
	formNote: string;
}

const USAGE_EXAMPLES: Record<string, UsageExample[]> = {
	active: [
		{ greek: "Τι κάνεις;", verb: "κάνεις", english: "How are you?", formNote: "-εις" },
		{ greek: "Κάνει κρύο.", verb: "Κάνει", english: "It's cold.", formNote: "-ει" },
		{ greek: "Κάνουμε διάλειμμα.", verb: "Κάνουμε", english: "We're taking a break.", formNote: "-ουμε" },
	],
	contracted: [
		{ greek: "Μιλάς ελληνικά;", verb: "Μιλάς", english: "Do you speak Greek?", formNote: "-άς" },
		{ greek: "Δεν μιλάμε πολύ.", verb: "μιλάμε", english: "We don't speak much.", formNote: "-άμε" },
	],
	deponent: [
		{ greek: "Έρχομαι αύριο.", verb: "Έρχομαι", english: "I'm coming tomorrow.", formNote: "-ομαι" },
		{ greek: "Πότε έρχεσαι;", verb: "έρχεσαι", english: "When are you coming?", formNote: "-εσαι" },
		{ greek: "Δεν θυμάμαι.", verb: "θυμάμαι", english: "I don't remember.", formNote: "-άμαι" },
	],
};

const highlightVerb = (sentence: string, verb: string, colorClass: string): React.ReactNode => {
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
	highlightClass?: string;
}> = ({ examples, highlightClass = "text-blue-600" }) => (
	<div className="mt-4">
		<div className="text-sm font-medium text-gray-600 mb-2">In context:</div>
		<div className="space-y-1.5">
			{examples.map((ex) => (
				<div key={ex.greek} className="text-sm flex items-baseline gap-2 flex-wrap">
					<MonoText weight="medium">
						{highlightVerb(ex.greek, ex.verb, highlightClass)}
					</MonoText>
					<span className="text-gray-500">{ex.english}</span>
					<span className="text-xs text-gray-400">({ex.formNote})</span>
				</div>
			))}
		</div>
	</div>
);

const SamePatternList: React.FC<{
	verbs: Array<{ infinitive: string; meaning: string }>;
}> = ({ verbs }) => (
	<div className="mt-4">
		<div className="text-sm font-medium text-gray-600 mb-2">Same pattern:</div>
		<div className="flex flex-wrap gap-2">
			{verbs.map((v) => (
				<span
					key={v.infinitive}
					className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md text-sm"
				>
					<MonoText weight="semibold">{v.infinitive}</MonoText>
					<span className="text-gray-500">({v.meaning})</span>
				</span>
			))}
		</div>
	</div>
);

const PatternSection: React.FC<{
	patternKey: "active" | "contracted" | "deponent";
	pattern: (typeof VERB_PATTERNS)[keyof typeof VERB_PATTERNS];
	colorClass?: string;
	endingColorClass?: string;
	highlightClass?: string;
}> = ({
	patternKey,
	pattern,
	colorClass = "border-blue-200",
	endingColorClass = "text-blue-700 font-bold",
	highlightClass = "text-blue-600",
}) => (
	<Card variant="bordered" padding="lg" className={`border-2 ${colorClass}`}>
		<h3 className="text-lg font-bold mb-2 text-gray-800">{pattern.name}</h3>
		<p className="text-gray-600 text-sm mb-4">{pattern.description}</p>

		<ParadigmTable
			stem={pattern.canonical.stem}
			meaning={pattern.canonical.meaning}
			infinitive={pattern.canonical.infinitive}
			forms={pattern.canonical.forms}
			endingClassName={endingColorClass}
			showHeaders={true}
			fadeStem={true}
		/>

		<SamePatternList verbs={pattern.samePattern} />
		<UsageExamples examples={USAGE_EXAMPLES[patternKey]} highlightClass={highlightClass} />
	</Card>
);

const PatternIdentifier: React.FC = () => (
	<Card variant="bordered" padding="lg" className="bg-slate-50 border-2 border-slate-200">
		<h3 className="text-lg font-bold mb-3 text-slate-800">Which Pattern?</h3>
		<p className="text-sm text-gray-600 mb-4">
			Look at the verb's dictionary form (1st person singular) to identify its pattern:
		</p>
		<div className="space-y-2">
			<div className="flex items-center gap-3 p-2 rounded bg-blue-50 border border-blue-100">
				<MonoText className="text-blue-700 font-bold w-16">-ω</MonoText>
				<span className="text-gray-600">→</span>
				<span className="text-gray-700 font-medium">Active</span>
				<span className="text-gray-400 text-sm ml-auto">κάνω, θέλω, έχω</span>
			</div>
			<div className="flex items-center gap-3 p-2 rounded bg-purple-50 border border-purple-100">
				<MonoText className="text-purple-700 font-bold w-16">-άω/-ώ</MonoText>
				<span className="text-gray-600">→</span>
				<span className="text-gray-700 font-medium">Contracted</span>
				<span className="text-gray-400 text-sm ml-auto">μιλάω, αγαπάω</span>
			</div>
			<div className="flex items-center gap-3 p-2 rounded bg-green-50 border border-green-100">
				<MonoText className="text-green-700 font-bold w-16">-μαι</MonoText>
				<span className="text-gray-600">→</span>
				<span className="text-gray-700 font-medium">Deponent</span>
				<span className="text-gray-400 text-sm ml-auto">έρχομαι, θυμάμαι</span>
			</div>
		</div>
	</Card>
);

export const VerbsSection: React.FC = () => (
	<section id="verbs" className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-gray-800">Verb Conjugation</h2>
			<p className="text-gray-600 mt-1">
				Greek verbs change their endings to show who is doing the action.
				<strong className="text-gray-800"> Learn the endings</strong>, and you can conjugate
				thousands of verbs.
			</p>
		</div>

		{/* Pattern Identifier */}
		<PatternIdentifier />

		{/* Pattern Families */}
		<div className="space-y-6">
			<PatternSection
				patternKey="active"
				pattern={VERB_PATTERNS.active}
				colorClass="border-blue-200"
				endingColorClass="text-blue-700 font-bold"
				highlightClass="text-blue-600 font-semibold"
			/>

			<PatternSection
				patternKey="contracted"
				pattern={VERB_PATTERNS.contracted}
				colorClass="border-purple-200"
				endingColorClass="text-purple-700 font-bold"
				highlightClass="text-purple-600 font-semibold"
			/>

			<PatternSection
				patternKey="deponent"
				pattern={VERB_PATTERNS.deponent}
				colorClass="border-green-200"
				endingColorClass="text-green-700 font-bold"
				highlightClass="text-green-600 font-semibold"
			/>
		</div>

		{/* Irregular Verbs */}
		<Card variant="bordered" padding="lg" className="border-2 border-amber-200">
			<div className="flex items-center gap-2 mb-3">
				<AlertCircle size={18} className="text-amber-600" />
				<h3 className="text-lg font-bold text-gray-800">Irregular Verbs</h3>
			</div>
			<p className="text-gray-600 text-sm mb-4">
				These 4 ultra-common verbs don't follow the patterns above. You'll memorize them naturally through exposure.
			</p>
			<div className="grid sm:grid-cols-2 gap-6">
				{IRREGULAR_VERBS.map((verb) => (
					<div key={verb.infinitive}>
						<ParadigmTable
							infinitive={verb.infinitive}
							meaning={verb.meaning}
							forms={verb.forms}
							formClassName="text-amber-700 font-semibold"
						/>
						{verb.note && (
							<p className="mt-2 text-sm text-gray-500 italic px-1">{verb.note}</p>
						)}
					</div>
				))}
			</div>
		</Card>
	</section>
);
