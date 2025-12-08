import { Lightbulb } from "lucide-react";
import type React from "react";
import { CASE_RECOGNITION } from "../../constants/recognition";
import {
	Card,
	MonoText,
	SectionHeading,
	KeyInsight,
	CollapsibleSection,
} from "../../components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const CasesSection: React.FC = () => (
	<section id="cases" className="space-y-6">
		<SectionHeading
			title="Cases"
			subtitle="The framework that explains why words change"
		/>

		<KeyInsight
			title="Object Pronouns = Accusative, Possessive = Genitive"
			expandedExample={{
				label: "The connection to pronouns",
				content: (
					<div className="space-y-2 text-sm">
						<p>
							Cases aren't just theory — they're the same system pronouns use:
						</p>
						<div className="grid grid-cols-2 gap-3 mt-2">
							<div className="p-2 bg-white rounded border border-santorini-200">
								<div className="font-medium text-stone-700">
									Object pronouns
								</div>
								<div className="text-stone-600">
									με, σε, τον → <strong>Accusative</strong>
								</div>
							</div>
							<div className="p-2 bg-white rounded border border-santorini-200">
								<div className="font-medium text-stone-700">
									Possessive pronouns
								</div>
								<div className="text-stone-600">
									μου, σου, του → <strong>Genitive</strong>
								</div>
							</div>
						</div>
					</div>
				),
			}}
		>
			If you know the pronouns, you already understand cases!
		</KeyInsight>

		<Alert variant="info">
			<Lightbulb size={16} />
			<AlertTitle>The Four Questions</AlertTitle>
			<AlertDescription>
				Greek uses cases to show a word's role. Ask these questions and you'll
				know which case to use.
			</AlertDescription>
		</Alert>

		<Card
			variant="elevated"
			padding="lg"
			className="bg-ocean-50 border-2 border-ocean-300"
		>
			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
				{CASE_RECOGNITION.quickRules.map((rule) => (
					<div
						key={rule.answer}
						className="text-center p-4 bg-white rounded-xl shadow-sm"
					>
						<div className="text-lg font-bold text-stone-800 mb-2">
							{rule.question}
						</div>
						<div className="text-ocean-text font-semibold mb-2">
							{rule.answer}
						</div>
						<MonoText variant="highlighted" size="sm">
							{rule.example}
						</MonoText>
					</div>
				))}
			</div>
		</Card>

		<CollapsibleSection
			title="Quick Spot-Check Patterns"
			colorScheme="honey"
			defaultOpen={true}
		>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{CASE_RECOGNITION.quickSpotCheck?.map((check) => (
					<div
						key={check.pattern}
						className="p-4 bg-white rounded-xl shadow-sm border border-honey-300"
					>
						<div className="text-lg font-bold text-honey-text mb-2">
							{check.pattern}
						</div>
						<div className="text-honey-text font-medium mb-3 text-sm">
							→ {check.meaning}
						</div>
						<div className="space-y-1">
							{check.examples.map((example) => (
								<MonoText
									key={example}
									variant="greek"
									size="sm"
									className="block text-honey-text"
								>
									{example}
								</MonoText>
							))}
						</div>
					</div>
				))}
			</div>
		</CollapsibleSection>
	</section>
);
