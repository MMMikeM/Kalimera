import type React from "react";
import {
	EMPHATIC_PRONOUNS,
	EMPHATIC_PRONOUN_EXAMPLES,
	OBJECT_PRONOUNS,
	OBJECT_PRONOUN_EXAMPLES,
	POSSESSIVE_PRONOUNS,
	POSSESSIVE_PRONOUN_EXAMPLES,
	PRONOUN_PATTERNS,
	PRONOUN_PHRASES,
	SUBJECT_PRONOUNS,
	SUBJECT_PRONOUN_EXAMPLES,
	type PronounParadigm,
} from "../../constants/pronouns";
import { Card, MonoText, CategoryCard, CollapsibleSection } from "../../components";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Reusable paradigm table component
const PronounParadigmTable: React.FC<{
	data: PronounParadigm[];
	colorClass: string;
	note?: string;
}> = ({ data, colorClass, note }) => (
	<div className="overflow-x-auto">
		<table className="w-full text-sm">
			<thead>
				<tr className={`border-b-2 ${colorClass}`}>
					<th className="text-left py-2 px-3 text-stone-600 font-medium w-16"></th>
					<th className="text-left py-2 px-3 font-semibold">Singular</th>
					<th className="text-left py-2 px-3 font-semibold">Plural</th>
				</tr>
			</thead>
			<tbody>
				{data.map((row, i) => (
					<tr key={i} className="border-b border-stone-100">
						<td className="py-2 px-3 text-stone-500 text-xs">{row.person}</td>
						<td className="py-2 px-3">
							<MonoText variant="highlighted" size="lg">{row.singular.greek}</MonoText>
							<span className="text-stone-600 ml-2 text-sm">{row.singular.english}</span>
						</td>
						<td className="py-2 px-3">
							<MonoText variant="highlighted" size="lg">{row.plural.greek}</MonoText>
							<span className="text-stone-600 ml-2 text-sm">{row.plural.english}</span>
						</td>
					</tr>
				))}
			</tbody>
		</table>
		{note && (
			<p className="text-xs text-stone-500 italic mt-2 px-3">{note}</p>
		)}
	</div>
);

// Quick decision guide - answers "which pronoun do I use?"
const PronounDecisionGuide: React.FC = () => (
	<Card variant="bordered" padding="lg" className="bg-honey/5 border-honey/30">
		<h3 className="text-lg font-bold text-honey-text mb-3">Which "me/you" do I use?</h3>
		<p className="text-sm text-stone-600 mb-4">
			English "me" is one word. Greek splits it by <strong>function</strong>:
		</p>

		<div className="space-y-3">
			{/* Direct object */}
			<div className="p-3 bg-white rounded-lg border border-honey/30">
				<div className="flex items-start gap-3">
					<div className="text-honey-text font-bold text-sm w-20 shrink-0">με / σε</div>
					<div className="flex-1">
						<div className="text-sm font-medium text-stone-800 mb-1">
							Someone does something <strong>to</strong> you (direct object)
						</div>
						<div className="text-sm text-stone-600 space-y-0.5">
							<div><MonoText size="sm" variant="highlighted">σε βλέπω</MonoText> <span className="text-stone-600">— I see you</span></div>
							<div><MonoText size="sm" variant="highlighted">με ακούς;</MonoText> <span className="text-stone-600">— do you hear me?</span></div>
						</div>
					</div>
				</div>
			</div>

			{/* Possession / indirect */}
			<div className="p-3 bg-white rounded-lg border border-honey/30">
				<div className="flex items-start gap-3">
					<div className="text-honey-text font-bold text-sm w-20 shrink-0">μου / σου</div>
					<div className="flex-1">
						<div className="text-sm font-medium text-stone-800 mb-1">
							<strong>My/your</strong> (possession) OR <strong>to me/you</strong> (indirect object)
						</div>
						<div className="text-sm text-stone-600 space-y-0.5">
							<div><MonoText size="sm" variant="highlighted">το σπίτι μου</MonoText> <span className="text-stone-600">— my house</span></div>
							<div><MonoText size="sm" variant="highlighted">μου λέει</MonoText> <span className="text-stone-600">— tells (to) me</span></div>
							<div><MonoText size="sm" variant="highlighted">σου δίνω</MonoText> <span className="text-stone-600">— I give (to) you</span></div>
						</div>
					</div>
				</div>
			</div>

			{/* Emphatic / after prepositions */}
			<div className="p-3 bg-white rounded-lg border border-honey/30">
				<div className="flex items-start gap-3">
					<div className="text-honey-text font-bold text-sm w-20 shrink-0">εμένα / εσένα</div>
					<div className="flex-1">
						<div className="text-sm font-medium text-stone-800 mb-1">
							After prepositions (για, με, από, σε) OR for <strong>emphasis</strong>
						</div>
						<div className="text-sm text-stone-600 space-y-0.5">
							<div><MonoText size="sm" variant="highlighted">για μένα</MonoText> <span className="text-stone-600">— for me</span></div>
							<div><MonoText size="sm" variant="highlighted">με σένα</MonoText> <span className="text-stone-600">— with you</span></div>
							<div><MonoText size="sm" variant="highlighted">εμένα μου αρέσει!</MonoText> <span className="text-stone-600">— I like it! (emphatic)</span></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div className="mt-4 pt-3 border-t border-honey/30 text-sm text-honey-text">
			<strong>Quick test:</strong> Can you insert "to" before it? → Use <MonoText size="sm">μου/σου</MonoText>.
			Is there a preposition before it? → Use <MonoText size="sm">εμένα/εσένα</MonoText>.
			Otherwise → Use <MonoText size="sm">με/σε</MonoText>.
		</div>
	</Card>
);

// Group phrases by category
const groupPhrasesByCategory = () => {
	const groups: Record<string, typeof PRONOUN_PHRASES> = {};
	for (const phrase of PRONOUN_PHRASES) {
		if (!groups[phrase.category]) {
			groups[phrase.category] = [];
		}
		groups[phrase.category].push(phrase);
	}
	return groups;
};

const CATEGORY_LABELS: Record<string, string> = {
	requests: "Requests",
	opinions: "Opinions",
	questions: "Questions",
	answers: "Answers",
	family: "Family",
};

export const PronounsSection: React.FC = () => {
	const phraseGroups = groupPhrasesByCategory();

	return (
		<section id="pronouns" className="space-y-6">
			{/* Quick decision guide at the top */}
			<PronounDecisionGuide />

			{/* Primary pronouns - most used */}
			<div className="grid lg:grid-cols-2 gap-6">
				<CategoryCard
					title="Object Pronouns"
					priority="primary"
					colorScheme="aegean"
					badge="Essential"
				>
					<p className="text-sm text-stone-600 mb-3">Use these constantly! (με, σε, τον...)</p>
					<Alert variant="info" className="mb-4">
						<AlertTitle>Word order</AlertTitle>
						<AlertDescription>Object pronouns go BEFORE the verb: σε βλέπω (you I-see) = I see you</AlertDescription>
					</Alert>
					<PronounParadigmTable data={OBJECT_PRONOUNS} colorClass="border-aegean/40" />
					<div className="mt-4 pt-4 border-t border-aegean/30">
						<div className="text-sm text-stone-600 mb-2 font-medium">Examples:</div>
						<div className="flex flex-wrap gap-2">
							{OBJECT_PRONOUN_EXAMPLES.map((ex, i) => (
								<div key={i} className="px-3 py-1.5 bg-white rounded-full border border-aegean/30 text-sm">
									<MonoText size="sm" className="text-aegean-text">{ex.greek}</MonoText>
									<span className="text-stone-600 ml-1">({ex.english})</span>
								</div>
							))}
						</div>
					</div>
				</CategoryCard>

				<CategoryCard
					title="Possessive Pronouns"
					priority="primary"
					colorScheme="terracotta"
					badge="Essential"
				>
					<p className="text-sm text-stone-600 mb-3">For "my/your/their" (μου, σου...)</p>
					<Alert variant="purple" className="mb-4">
						<AlertTitle>Word order</AlertTitle>
						<AlertDescription>Possessives go AFTER the noun: το σπίτι μου (the house my) = my house</AlertDescription>
					</Alert>
					<PronounParadigmTable
						data={POSSESSIVE_PRONOUNS}
						colorClass="border-terracotta/40"
						note="Neuter uses same form as masculine (του)"
					/>
					<div className="mt-4 pt-4 border-t border-terracotta/30">
						<div className="text-sm text-stone-600 mb-2 font-medium">Examples:</div>
						<div className="flex flex-wrap gap-2">
							{POSSESSIVE_PRONOUN_EXAMPLES.map((ex, i) => (
								<div key={i} className="px-3 py-1.5 bg-white rounded-full border border-terracotta/30 text-sm">
									<MonoText size="sm" className="text-terracotta-text">{ex.greek}</MonoText>
									<span className="text-stone-600 ml-1">({ex.english})</span>
								</div>
							))}
						</div>
					</div>
				</CategoryCard>
			</div>

			{/* Secondary pronouns - less frequent */}
			<div className="grid lg:grid-cols-2 gap-6">
				<CategoryCard
					title="Subject Pronouns"
					priority="tertiary"
					colorScheme="olive"
				>
					<p className="text-sm text-stone-600 mb-3">Often dropped! (εγώ, εσύ...)</p>
					<Alert variant="success" className="mb-4">
						<AlertTitle>Good news</AlertTitle>
						<AlertDescription>Verb endings already show person, so subject pronouns are usually optional. Use them for emphasis.</AlertDescription>
					</Alert>
					<PronounParadigmTable data={SUBJECT_PRONOUNS} colorClass="border-olive/40" />
					<div className="mt-4 pt-4 border-t border-olive/30">
						<div className="text-sm text-stone-600 mb-2 font-medium">Examples:</div>
						<div className="flex flex-wrap gap-2">
							{SUBJECT_PRONOUN_EXAMPLES.map((ex, i) => (
								<div key={i} className="px-3 py-1.5 bg-white rounded-full border border-olive/30 text-sm">
									<MonoText size="sm" className="text-olive-text">{ex.greek}</MonoText>
									<span className="text-stone-600 ml-1">({ex.english})</span>
								</div>
							))}
						</div>
					</div>
				</CategoryCard>

				<CategoryCard
					title="Emphatic Pronouns"
					priority="tertiary"
					colorScheme="honey"
				>
					<p className="text-sm text-stone-600 mb-3">After prepositions (εμένα, εσένα...)</p>
					<Alert variant="warning" className="mb-4">
						<AlertTitle>When to use</AlertTitle>
						<AlertDescription>Use these after prepositions (για, με, από, σε): για μένα = for me</AlertDescription>
					</Alert>
					<PronounParadigmTable data={EMPHATIC_PRONOUNS} colorClass="border-honey/40" />
					<div className="mt-4 pt-4 border-t border-honey/30">
						<div className="text-sm text-stone-600 mb-2 font-medium">Examples:</div>
						<div className="flex flex-wrap gap-2">
							{EMPHATIC_PRONOUN_EXAMPLES.map((ex, i) => (
								<div key={i} className="px-3 py-1.5 bg-white rounded-full border border-honey/30 text-sm">
									<MonoText size="sm" className="text-honey-text">{ex.greek}</MonoText>
									<span className="text-stone-600 ml-1">({ex.english})</span>
								</div>
							))}
						</div>
					</div>
				</CategoryCard>
			</div>

			{/* Double object pattern - with visual contrast */}
			<Card variant="bordered" padding="md" className="bg-aegean/5 border-aegean/30">
				<h4 className="font-bold text-aegean-text mb-1">{PRONOUN_PATTERNS.doubleObject.title}</h4>
				<p className="text-sm text-stone-600 mb-4">{PRONOUN_PATTERNS.doubleObject.explanation}</p>

				{/* Visual contrast */}
				<div className="mb-4 p-3 bg-white rounded-lg border border-aegean/30 space-y-1 text-sm">
					<div className="flex items-center gap-2">
						<span className="text-stone-600 w-16">English:</span>
						<span className="text-stone-700">{PRONOUN_PATTERNS.doubleObject.contrast.english}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-stone-600 w-16">Greek:</span>
						<MonoText variant="highlighted">{PRONOUN_PATTERNS.doubleObject.contrast.greek}</MonoText>
						<span className="text-stone-600">({PRONOUN_PATTERNS.doubleObject.contrast.literal})</span>
					</div>
				</div>

				{/* Examples with literal translations */}
				<div className="flex flex-wrap gap-2">
					{PRONOUN_PATTERNS.doubleObject.examples.map((ex, i) => (
						<div key={i} className="px-3 py-2 bg-white rounded-lg border border-aegean/30">
							<MonoText variant="highlighted">{ex.greek}</MonoText>
							<span className="text-stone-600 ml-2 text-sm">({ex.literal})</span>
						</div>
					))}
				</div>
			</Card>

			{/* Common Phrases - Collapsible */}
			<CollapsibleSection
				title="Common Phrases with Pronouns"
				colorScheme="santorini"
				defaultOpen={false}
			>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{Object.entries(phraseGroups).map(([category, phrases]) => (
						<div key={category}>
							<h4 className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-2">
								{CATEGORY_LABELS[category] || category}
							</h4>
							<div className="space-y-1">
								{phrases.map((phrase, i) => (
									<div key={i} className="flex items-baseline gap-2 text-sm">
										<MonoText variant="greek" size="sm" className="text-santorini-text font-medium">
											{phrase.greek}
										</MonoText>
										<span className="text-stone-600">{phrase.english}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</CollapsibleSection>
		</section>
	);
};
