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
} from "../../constants/pronouns";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { ContentSection } from "@/components/ContentSection";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PronounDecisionGuide } from "./pronoun-decision-guide";
import { PronounParadigmTable } from "./pronoun-paradigm-table";

// Group phrases by category
const groupPhrasesByCategory = () => {
	const groups: Record<string, typeof PRONOUN_PHRASES> = {};
	for (const phrase of PRONOUN_PHRASES) {
		const category = phrase.category;
		if (!groups[category]) {
			groups[category] = [];
		}
		groups[category]?.push(phrase);
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
				<ContentSection
					title="Nominative Pronouns"
					colorScheme="olive"
				>
					<div className="p-3 space-y-4">
						<p className="text-sm text-stone-600">
							Subject pronouns: often dropped! (εγώ, εσύ...)
						</p>
						<Alert variant="success">
							<AlertTitle>Good news</AlertTitle>
							<AlertDescription>
								Verb endings already show person, so subject pronouns are usually
								optional. Use them for emphasis.
							</AlertDescription>
						</Alert>
						<PronounParadigmTable
							data={SUBJECT_PRONOUNS}
							colorClass="border-olive-400"
						/>
						<div className="pt-4 border-t border-olive-300">
							<div className="text-sm text-stone-600 mb-2 font-medium">
								Examples:
							</div>
							<div className="flex flex-wrap gap-2">
								{SUBJECT_PRONOUN_EXAMPLES.map((ex) => (
									<div
										key={ex.greek}
										className="px-3 py-1.5 bg-white rounded-full border border-olive-300 text-sm"
									>
										<MonoText size="sm" className="text-olive-text">
											{ex.greek}
										</MonoText>
										<span className="text-stone-600 ml-1">({ex.english})</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</ContentSection>

				<ContentSection
					title="Genitive Pronouns"
					colorScheme="terracotta"
					badge="Essential"
				>
					<div className="p-3 space-y-4">
						<p className="text-sm text-stone-600">
							Possessive pronouns: for "my/your/their" (μου, σου...)
						</p>
						<Alert variant="purple">
							<AlertTitle>Word order</AlertTitle>
							<AlertDescription>
								Possessives go AFTER the noun: το σπίτι μου (the house my) = my
								house
							</AlertDescription>
						</Alert>
						<PronounParadigmTable
							data={POSSESSIVE_PRONOUNS}
							colorClass="border-terracotta-400"
							note="Neuter uses same form as masculine (του)"
						/>
						<div className="pt-4 border-t border-terracotta-300">
							<div className="text-sm text-stone-600 mb-2 font-medium">
								Examples:
							</div>
							<div className="flex flex-wrap gap-2">
								{POSSESSIVE_PRONOUN_EXAMPLES.map((ex) => (
									<div
										key={ex.greek}
										className="px-3 py-1.5 bg-white rounded-full border border-terracotta-300 text-sm"
									>
										<MonoText size="sm" className="text-terracotta-text">
											{ex.greek}
										</MonoText>
										<span className="text-stone-600 ml-1">({ex.english})</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</ContentSection>
			</div>

			{/* Secondary pronouns - less frequent */}
			<div className="grid lg:grid-cols-2 gap-6">
				<ContentSection
					title="Accusative Pronouns"
					colorScheme="ocean"
					badge="Essential"
				>
					<div className="p-3 space-y-4">
						<p className="text-sm text-stone-600">
							Object pronouns: use these constantly! (με, σε, τον...)
						</p>
						<Alert variant="info">
							<AlertTitle>Word order</AlertTitle>
							<AlertDescription>
								Object pronouns go BEFORE the verb: σε βλέπω (you I-see) = I see
								you
							</AlertDescription>
						</Alert>
						<PronounParadigmTable
							data={OBJECT_PRONOUNS}
							colorClass="border-ocean-300"
						/>
						<div className="pt-4 border-t border-ocean-300">
							<div className="text-sm text-stone-600 mb-2 font-medium">
								Examples:
							</div>
							<div className="flex flex-wrap gap-2">
								{OBJECT_PRONOUN_EXAMPLES.map((ex) => (
									<div
										key={ex.greek}
										className="px-3 py-1.5 bg-white rounded-full border border-ocean-300 text-sm"
									>
										<MonoText size="sm" className="text-ocean-text">
											{ex.greek}
										</MonoText>
										<span className="text-stone-600 ml-1">({ex.english})</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</ContentSection>

				<ContentSection
					title="Emphatic Accusative"
					colorScheme="honey"
				>
					<div className="p-3 space-y-4">
						<p className="text-sm text-stone-600">
							Strong forms: after prepositions (εμένα, εσένα...)
						</p>
						<Alert variant="warning">
							<AlertTitle>When to use</AlertTitle>
							<AlertDescription>
								Use these after prepositions (για, με, από, σε): για μένα = for me
							</AlertDescription>
						</Alert>
						<PronounParadigmTable
							data={EMPHATIC_PRONOUNS}
							colorClass="border-honey-400"
						/>
						<div className="pt-4 border-t border-honey-300">
							<div className="text-sm text-stone-600 mb-2 font-medium">
								Examples:
							</div>
							<div className="flex flex-wrap gap-2">
								{EMPHATIC_PRONOUN_EXAMPLES.map((ex) => (
									<div
										key={ex.greek}
										className="px-3 py-1.5 bg-white rounded-full border border-honey-300 text-sm"
									>
										<MonoText size="sm" className="text-honey-text">
											{ex.greek}
										</MonoText>
										<span className="text-stone-600 ml-1">({ex.english})</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</ContentSection>
			</div>

			{/* Connection to cases - NOW it makes sense after seeing the pronouns */}
			<Alert variant="info">
				<AlertTitle>Pronouns = Cases in Action!</AlertTitle>
				<AlertDescription>
					<strong>Accusative</strong> (
					<MonoText variant="greek" size="sm">
						με, σε, τον
					</MonoText>
					) answers "WHOM/WHAT do I [verb]?" <strong>Genitive</strong> (
					<MonoText variant="greek" size="sm">
						μου, σου, του
					</MonoText>
					) answers "WHOSE?" You're already using cases every time you use a
					pronoun!
				</AlertDescription>
			</Alert>

			{/* Double object pattern - neutral styling */}
			<Card
				variant="bordered"
				padding="md"
				className="bg-white border-stone-200"
			>
				<h4 className="font-bold text-navy-text mb-1">
					{PRONOUN_PATTERNS.doubleObject.title}
				</h4>
				<p className="text-sm text-stone-600 mb-4">
					{PRONOUN_PATTERNS.doubleObject.explanation}
				</p>

				{/* Visual contrast */}
				<div className="mb-4 p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1 text-sm">
					<div className="flex items-center gap-2">
						<span className="text-stone-600 w-16">English:</span>
						<span className="text-stone-700">
							{PRONOUN_PATTERNS.doubleObject.contrast.english}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-stone-600 w-16">Greek:</span>
						<MonoText variant="highlighted">
							{PRONOUN_PATTERNS.doubleObject.contrast.greek}
						</MonoText>
						<span className="text-stone-600">
							({PRONOUN_PATTERNS.doubleObject.contrast.literal})
						</span>
					</div>
				</div>

				{/* Examples with literal translations */}
				<div className="flex flex-wrap gap-2">
					{PRONOUN_PATTERNS.doubleObject.examples.map((ex) => (
						<div
							key={ex.greek}
							className="px-3 py-2 bg-stone-50 rounded-lg border border-stone-200"
						>
							<MonoText variant="highlighted">{ex.greek}</MonoText>
							<span className="text-stone-600 ml-2 text-sm">
								({ex.literal})
							</span>
						</div>
					))}
				</div>
			</Card>

			{/* Common Phrases - Collapsible */}
			<CollapsibleSection
				title="Common Phrases with Pronouns"
				colorScheme="default"
				defaultOpen={false}
			>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{Object.entries(phraseGroups).map(([category, phrases]) => (
						<div key={category}>
							<h4 className="text-sm font-medium text-slate-text mb-2">
								{CATEGORY_LABELS[category] || category}
							</h4>
							<div className="space-y-1">
								{phrases.map((phrase) => (
									<div
										key={phrase.greek}
										className="flex items-baseline gap-2 text-sm"
									>
										<MonoText
											variant="greek"
											size="sm"
											className="text-stone-700 font-medium"
										>
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
