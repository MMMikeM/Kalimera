import type React from "react";
import {
	EMPHATIC_PRONOUNS,
	EMPHATIC_PRONOUN_EXAMPLES,
	OBJECT_PRONOUNS,
	OBJECT_PRONOUN_EXAMPLES,
	POSSESSIVE_PRONOUNS,
	POSSESSIVE_PRONOUN_EXAMPLES,
	PRONOUN_PATTERNS,
	SUBJECT_PRONOUNS,
	SUBJECT_PRONOUN_EXAMPLES,
	type PronounParadigm,
} from "../../constants/pronouns";
import { Card, MonoText } from "../../components";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Reusable paradigm table component
const PronounParadigmTable: React.FC<{
	data: PronounParadigm[];
	colorClass: string;
}> = ({ data, colorClass }) => (
	<div className="overflow-x-auto">
		<table className="w-full text-sm">
			<thead>
				<tr className={`border-b-2 ${colorClass}`}>
					<th className="text-left py-2 px-3 text-gray-500 font-medium w-16"></th>
					<th className="text-left py-2 px-3 font-semibold">Singular</th>
					<th className="text-left py-2 px-3 font-semibold">Plural</th>
				</tr>
			</thead>
			<tbody>
				{data.map((row, i) => (
					<tr key={i} className="border-b border-gray-100">
						<td className="py-2 px-3 text-gray-400 text-xs">{row.person}</td>
						<td className="py-2 px-3">
							<MonoText variant="highlighted" size="lg">{row.singular.greek}</MonoText>
							<span className="text-gray-500 ml-2 text-sm">{row.singular.english}</span>
						</td>
						<td className="py-2 px-3">
							<MonoText variant="highlighted" size="lg">{row.plural.greek}</MonoText>
							<span className="text-gray-500 ml-2 text-sm">{row.plural.english}</span>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

// Individual pronoun type card
const PronounTypeCard: React.FC<{
	title: string;
	subtitle: string;
	tip: string;
	tipTitle: string;
	data: PronounParadigm[];
	examples: { greek: string; english: string }[];
	colorScheme: "blue" | "purple" | "green" | "orange";
	alertVariant: "info" | "purple" | "success" | "warning";
}> = ({ title, subtitle, tip, tipTitle, data, examples, colorScheme, alertVariant }) => {
	const colors = {
		blue: { bg: "bg-blue-50/50", border: "border-blue-200", text: "text-blue-800", borderColor: "border-blue-300", exText: "text-blue-700" },
		purple: { bg: "bg-purple-50/50", border: "border-purple-200", text: "text-purple-800", borderColor: "border-purple-300", exText: "text-purple-700" },
		green: { bg: "bg-green-50/50", border: "border-green-200", text: "text-green-800", borderColor: "border-green-300", exText: "text-green-700" },
		orange: { bg: "bg-orange-50/50", border: "border-orange-200", text: "text-orange-800", borderColor: "border-orange-300", exText: "text-orange-700" },
	};
	const c = colors[colorScheme];

	return (
		<Card variant="bordered" padding="lg" className={`${c.bg} ${c.border}`}>
			<h3 className={`text-lg font-bold ${c.text} mb-1`}>{title}</h3>
			<p className="text-sm text-gray-600 mb-3">{subtitle}</p>
			<Alert variant={alertVariant} className="mb-4">
				<AlertTitle>{tipTitle}</AlertTitle>
				<AlertDescription>{tip}</AlertDescription>
			</Alert>
			<PronounParadigmTable data={data} colorClass={c.borderColor} />
			<div className={`mt-4 pt-4 border-t ${c.border}`}>
				<div className="text-sm text-gray-600 mb-2 font-medium">Examples:</div>
				<div className="flex flex-wrap gap-2">
					{examples.map((ex, i) => (
						<div key={i} className={`px-3 py-1.5 bg-white rounded-full border ${c.border} text-sm`}>
							<MonoText size="sm" className={c.exText}>{ex.greek}</MonoText>
							<span className="text-gray-500 ml-1">({ex.english})</span>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

// Quick decision guide - answers "which pronoun do I use?"
const PronounDecisionGuide: React.FC = () => (
	<Card variant="bordered" padding="lg" className="bg-amber-50/50 border-amber-200">
		<h3 className="text-lg font-bold text-amber-800 mb-3">Which "me/you" do I use?</h3>
		<p className="text-sm text-gray-600 mb-4">
			English "me" is one word. Greek splits it by <strong>function</strong>:
		</p>

		<div className="space-y-3">
			{/* Direct object */}
			<div className="p-3 bg-white rounded-lg border border-amber-200">
				<div className="flex items-start gap-3">
					<div className="text-amber-600 font-bold text-sm w-20 shrink-0">με / σε</div>
					<div className="flex-1">
						<div className="text-sm font-medium text-gray-800 mb-1">
							Someone does something <strong>to</strong> you (direct object)
						</div>
						<div className="text-sm text-gray-600 space-y-0.5">
							<div><MonoText size="sm" variant="highlighted">σε βλέπω</MonoText> <span className="text-gray-500">— I see you</span></div>
							<div><MonoText size="sm" variant="highlighted">με ακούς;</MonoText> <span className="text-gray-500">— do you hear me?</span></div>
						</div>
					</div>
				</div>
			</div>

			{/* Possession / indirect */}
			<div className="p-3 bg-white rounded-lg border border-amber-200">
				<div className="flex items-start gap-3">
					<div className="text-amber-600 font-bold text-sm w-20 shrink-0">μου / σου</div>
					<div className="flex-1">
						<div className="text-sm font-medium text-gray-800 mb-1">
							<strong>My/your</strong> (possession) OR <strong>to me/you</strong> (indirect object)
						</div>
						<div className="text-sm text-gray-600 space-y-0.5">
							<div><MonoText size="sm" variant="highlighted">το σπίτι μου</MonoText> <span className="text-gray-500">— my house</span></div>
							<div><MonoText size="sm" variant="highlighted">μου λέει</MonoText> <span className="text-gray-500">— tells (to) me</span></div>
							<div><MonoText size="sm" variant="highlighted">σου δίνω</MonoText> <span className="text-gray-500">— I give (to) you</span></div>
						</div>
					</div>
				</div>
			</div>

			{/* Emphatic / after prepositions */}
			<div className="p-3 bg-white rounded-lg border border-amber-200">
				<div className="flex items-start gap-3">
					<div className="text-amber-600 font-bold text-sm w-20 shrink-0">εμένα / εσένα</div>
					<div className="flex-1">
						<div className="text-sm font-medium text-gray-800 mb-1">
							After prepositions (για, με, από, σε) OR for <strong>emphasis</strong>
						</div>
						<div className="text-sm text-gray-600 space-y-0.5">
							<div><MonoText size="sm" variant="highlighted">για μένα</MonoText> <span className="text-gray-500">— for me</span></div>
							<div><MonoText size="sm" variant="highlighted">με σένα</MonoText> <span className="text-gray-500">— with you</span></div>
							<div><MonoText size="sm" variant="highlighted">εμένα μου αρέσει!</MonoText> <span className="text-gray-500">— I like it! (emphatic)</span></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className="mt-4 pt-3 border-t border-amber-200 text-sm text-amber-800">
			<strong>Quick test:</strong> Can you insert "to" before it? → Use <MonoText size="sm">μου/σου</MonoText>.
			Is there a preposition before it? → Use <MonoText size="sm">εμένα/εσένα</MonoText>.
			Otherwise → Use <MonoText size="sm">με/σε</MonoText>.
		</div>
	</Card>
);

export const PronounsSection: React.FC = () => (
	<section id="pronouns" className="space-y-6">
		{/* Quick decision guide at the top */}
		<PronounDecisionGuide />

		{/* All 4 pronoun types in a 2x2 grid on desktop, stacked on mobile */}
		<div className="grid lg:grid-cols-2 gap-6">
			<PronounTypeCard
				title="Object Pronouns"
				subtitle="Use these constantly! (με, σε, τον...)"
				tipTitle="Word order"
				tip="Object pronouns go BEFORE the verb: σε βλέπω (you I-see) = I see you"
				data={OBJECT_PRONOUNS}
				examples={OBJECT_PRONOUN_EXAMPLES}
				colorScheme="blue"
				alertVariant="info"
			/>

			<PronounTypeCard
				title="Possessive Pronouns"
				subtitle='For "my/your/their" (μου, σου...)'
				tipTitle="Word order"
				tip="Possessives go AFTER the noun: το σπίτι μου (the house my) = my house"
				data={POSSESSIVE_PRONOUNS}
				examples={POSSESSIVE_PRONOUN_EXAMPLES}
				colorScheme="purple"
				alertVariant="purple"
			/>

			<PronounTypeCard
				title="Subject Pronouns"
				subtitle="Often dropped! (εγώ, εσύ...)"
				tipTitle="Good news"
				tip="Verb endings already show person, so subject pronouns are usually optional. Use them for emphasis."
				data={SUBJECT_PRONOUNS}
				examples={SUBJECT_PRONOUN_EXAMPLES}
				colorScheme="green"
				alertVariant="success"
			/>

			<PronounTypeCard
				title="Emphatic Pronouns"
				subtitle="After prepositions (εμένα, εσένα...)"
				tipTitle="When to use"
				tip="Use these after prepositions (για, με, από, σε): για μένα = for me"
				data={EMPHATIC_PRONOUNS}
				examples={EMPHATIC_PRONOUN_EXAMPLES}
				colorScheme="orange"
				alertVariant="warning"
			/>
		</div>

		{/* Double object pattern - with visual contrast */}
		<Card variant="bordered" padding="md" className="bg-indigo-50/50 border-indigo-200">
			<h4 className="font-bold text-indigo-800 mb-1">{PRONOUN_PATTERNS.doubleObject.title}</h4>
			<p className="text-sm text-gray-600 mb-4">{PRONOUN_PATTERNS.doubleObject.explanation}</p>

			{/* Visual contrast */}
			<div className="mb-4 p-3 bg-white rounded-lg border border-indigo-200 space-y-1 text-sm">
				<div className="flex items-center gap-2">
					<span className="text-gray-500 w-16">English:</span>
					<span className="text-gray-700">{PRONOUN_PATTERNS.doubleObject.contrast.english}</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-gray-500 w-16">Greek:</span>
					<MonoText variant="highlighted">{PRONOUN_PATTERNS.doubleObject.contrast.greek}</MonoText>
					<span className="text-gray-400">({PRONOUN_PATTERNS.doubleObject.contrast.literal})</span>
				</div>
			</div>

			{/* Examples with literal translations */}
			<div className="flex flex-wrap gap-2">
				{PRONOUN_PATTERNS.doubleObject.examples.map((ex, i) => (
					<div key={i} className="px-3 py-2 bg-white rounded-lg border border-indigo-200">
						<MonoText variant="highlighted">{ex.greek}</MonoText>
						<span className="text-gray-400 ml-2 text-sm">({ex.literal})</span>
					</div>
				))}
			</div>
		</Card>
	</section>
);
