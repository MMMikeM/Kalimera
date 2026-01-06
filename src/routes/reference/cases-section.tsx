import { ChevronDown } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { CASE_RECOGNITION } from "../../constants/recognition";
import { Card } from "@/components/Card";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { CollapsibleSection } from "@/components/CollapsibleSection";

export const CasesSection: React.FC = () => {
	const [showVocative, setShowVocative] = useState(false);

	return (
		<section id="cases" className="space-y-6">
			<SectionHeading title="Cases" />

			{/* Simple prose intro - explains what cases ARE for true beginners */}
			<p className="text-slate-text leading-relaxed">
				In English, word order shows meaning:{" "}
				<em>"The dog bit the man"</em> vs <em>"The man bit the dog."</em>{" "}
				In Greek, word <strong>endings</strong> show meaning, so word order
				is flexible. These different endings are called <strong>cases</strong>.
			</p>

			{/* The Four Questions - HERO element, foundation first */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-ocean-50 border-2 border-ocean-300"
			>
				<h3 className="text-lg font-bold text-ocean-text mb-1">
					The Four Questions
				</h3>
				<p className="text-stone-600 text-sm mb-4">
					Ask these questions to know which case to use. Notice how{" "}
					<MonoText variant="greek" size="sm">
						Γιάννης
					</MonoText>{" "}
					changes form in each:
				</p>

				{/* Main three cases - shown prominently */}
				<div className="grid md:grid-cols-3 gap-4 mb-4">
					{CASE_RECOGNITION.quickRules.map((rule) => (
						<div
							key={rule.answer}
							className="text-center p-4 bg-white rounded-xl shadow-sm"
						>
							{/* Greek example FIRST and LARGEST */}
							<MonoText
								variant="greek"
								size="lg"
								className="block text-xl mb-2"
							>
								{rule.example}
							</MonoText>
							{/* Translation */}
							<p className="text-stone-500 text-sm mb-3 italic">
								{rule.translation}
							</p>
							{/* Question as context */}
							<div className="text-stone-700 font-medium mb-1">
								{rule.question}
							</div>
							{/* Case name - badge style */}
							<span className="inline-block px-3 py-1 bg-ocean-100 text-ocean-text text-sm font-semibold rounded-full">
								{rule.answer}
							</span>
						</div>
					))}
				</div>

				{/* Focus guidance - inside the card where it belongs */}
				<p className="text-sm text-stone-600 bg-white/50 rounded-lg p-3 mb-4">
					<strong>Focus on Nominative and Accusative first</strong> — they cover
					most of what you'll encounter. Genitive comes up with possession and
					some prepositions.
				</p>

				{/* Vocative - collapsible, less common */}
				<div className="border-t border-ocean-200 pt-4">
					<button
						type="button"
						onClick={() => setShowVocative(!showVocative)}
						className="flex items-center gap-2 text-sm text-ocean-text hover:text-ocean-dark transition-colors w-full"
					>
						<ChevronDown
							size={16}
							className={`transition-transform ${showVocative ? "rotate-180" : ""}`}
						/>
						<span>
							{showVocative ? "Hide" : "Show"} Vocative (for calling someone
							directly)
						</span>
					</button>

					{showVocative && CASE_RECOGNITION.vocativeRule && (
						<div className="mt-3 p-4 bg-white rounded-xl shadow-sm max-w-xs">
							<MonoText
								variant="greek"
								size="lg"
								className="block text-xl mb-2 text-center"
							>
								{CASE_RECOGNITION.vocativeRule.example}
							</MonoText>
							<p className="text-stone-500 text-sm mb-2 italic text-center">
								{CASE_RECOGNITION.vocativeRule.translation}
							</p>
							<div className="text-stone-700 font-medium mb-1 text-center">
								{CASE_RECOGNITION.vocativeRule.question}
							</div>
							<div className="text-center">
								<span className="inline-block px-3 py-1 bg-ocean-100 text-ocean-text text-sm font-semibold rounded-full">
									{CASE_RECOGNITION.vocativeRule.answer}
								</span>
							</div>
							<p className="text-xs text-stone-500 mt-2 text-center">
								{CASE_RECOGNITION.vocativeRule.note}
							</p>
						</div>
					)}
				</div>
			</Card>

			{/* Quick Spot-Check Patterns - for reference */}
			<CollapsibleSection
				title="Quick Spot-Check Patterns"
				colorScheme="honey"
				defaultOpen={false}
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
};
