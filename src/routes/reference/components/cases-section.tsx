import { ChevronDown } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { Card } from "@/components/Card";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { CASE_RECOGNITION } from "@/constants/recognition";

export const CasesSection: React.FC = () => {
	const [showVocative, setShowVocative] = useState(false);

	return (
		<section id="cases" className="space-y-6">
			<SectionHeading title="Cases" />

			{/* Simple prose intro - explains what cases ARE for true beginners */}
			<p className="leading-relaxed text-slate-text">
				In English, word order shows meaning: <em>"The dog bit the man"</em> vs{" "}
				<em>"The man bit the dog."</em> In Greek, word <strong>endings</strong> show meaning, so
				word order is flexible. These different endings are called <strong>cases</strong>.
			</p>

			{/* The Four Questions - HERO element, foundation first */}
			<Card variant="elevated" padding="lg" className="border-2 border-ocean-300 bg-ocean-50">
				<h3 className="mb-1 text-lg font-bold text-ocean-text">The Four Questions</h3>
				<p className="mb-4 text-sm text-stone-600">
					Ask these questions to know which case to use. Notice how{" "}
					<MonoText variant="greek" size="sm">
						Γιάννης
					</MonoText>{" "}
					changes form in each:
				</p>

				{/* Main three cases - shown prominently */}
				<div className="mb-4 grid gap-4 md:grid-cols-3">
					{CASE_RECOGNITION.quickRules.map((rule) => (
						<div key={rule.answer} className="rounded-xl bg-white p-4 text-center shadow-sm">
							{/* Greek example FIRST and LARGEST */}
							<MonoText variant="greek" size="lg" className="mb-2 block text-xl">
								{rule.example}
							</MonoText>
							{/* Translation */}
							<p className="mb-3 text-sm text-stone-500 italic">{rule.translation}</p>
							{/* Question as context */}
							<div className="mb-1 font-medium text-stone-700">{rule.question}</div>
							{/* Case name - badge style */}
							<span className="inline-block rounded-full bg-ocean-100 px-3 py-1 text-sm font-semibold text-ocean-text">
								{rule.answer}
							</span>
						</div>
					))}
				</div>

				{/* Focus guidance - inside the card where it belongs */}
				<p className="mb-4 rounded-lg bg-white/50 p-3 text-sm text-stone-600">
					<strong>Focus on Nominative and Accusative first.</strong> They cover most of what you'll
					encounter. Genitive comes up with possession and some prepositions.
				</p>

				{/* Vocative - collapsible, less common */}
				<div className="border-t border-ocean-200 pt-4">
					<button
						type="button"
						onClick={() => setShowVocative(!showVocative)}
						className="flex w-full items-center gap-2 text-sm text-ocean-text transition-colors hover:text-ocean-dark"
					>
						<ChevronDown
							size={16}
							className={`transition-transform ${showVocative ? "rotate-180" : ""}`}
						/>
						<span>{showVocative ? "Hide" : "Show"} Vocative (for calling someone directly)</span>
					</button>

					{showVocative && CASE_RECOGNITION.vocativeRule && (
						<div className="mt-3 max-w-xs rounded-xl bg-white p-4 shadow-sm">
							<MonoText variant="greek" size="lg" className="mb-2 block text-center text-xl">
								{CASE_RECOGNITION.vocativeRule.example}
							</MonoText>
							<p className="mb-2 text-center text-sm text-stone-500 italic">
								{CASE_RECOGNITION.vocativeRule.translation}
							</p>
							<div className="mb-1 text-center font-medium text-stone-700">
								{CASE_RECOGNITION.vocativeRule.question}
							</div>
							<div className="text-center">
								<span className="inline-block rounded-full bg-ocean-100 px-3 py-1 text-sm font-semibold text-ocean-text">
									{CASE_RECOGNITION.vocativeRule.answer}
								</span>
							</div>
							<p className="mt-2 text-center text-xs text-stone-500">
								{CASE_RECOGNITION.vocativeRule.note}
							</p>
						</div>
					)}
				</div>
			</Card>

			{/* Quick Spot-Check Patterns - for reference */}
			<CollapsibleSection title="Quick Spot-Check Patterns" colorScheme="honey" defaultOpen={false}>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{CASE_RECOGNITION.quickSpotCheck?.map((check) => (
						<div
							key={check.pattern}
							className="rounded-xl border border-honey-300 bg-white p-4 shadow-sm"
						>
							<div className="mb-2 text-lg font-bold text-honey-text">{check.pattern}</div>
							<div className="mb-3 text-sm font-medium text-honey-text">→ {check.meaning}</div>
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
