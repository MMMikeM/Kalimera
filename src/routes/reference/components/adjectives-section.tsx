import { Lightbulb } from "lucide-react";
import type React from "react";

import { Card } from "@/components/Card";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ContentSection } from "@/components/ContentSection";
import { MistakeComparison } from "@/components/MistakeComparison";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	ADJECTIVE_AGREEMENT_EXAMPLES,
	ADJECTIVE_ENDINGS_QUICK_REF,
	ADJECTIVE_MISTAKES,
	ADJECTIVE_PARADIGMS,
	type AdjectiveParadigm,
	type AgreementExample,
	COMMON_ADJECTIVES,
} from "@/constants/adjectives";

import { CaseTableGrid } from "./CaseTable";

// Adjective endings quick lookup table
const AdjectiveEndingsTable: React.FC = () => (
	<Card variant="bordered" padding="md" className="bg-stone-50/50">
		<div className="mb-3 text-sm font-medium text-stone-700">
			Standard adjective endings (-ος, -η, -ο pattern)
		</div>
		<CaseTableGrid data={ADJECTIVE_ENDINGS_QUICK_REF} />
	</Card>
);

const CaseExampleGroup: React.FC<{
	label: string;
	labelClass: string;
	examples: AgreementExample[];
}> = ({ label, labelClass, examples }) => (
	<div>
		<div className={`mb-2 text-xs font-medium tracking-wide ${labelClass} uppercase`}>{label}</div>
		<div className="space-y-2">
			{examples.map((ex) => (
				<div key={ex.greek} className="rounded border border-stone-200 bg-stone-50 p-2">
					<div className="flex items-baseline gap-2">
						<MonoText
							variant={
								ex.gender === "masculine"
									? "masculine"
									: ex.gender === "feminine"
										? "feminine"
										: "neuter"
							}
							size="lg"
						>
							{ex.greek}
						</MonoText>
					</div>
					<div className="mt-1 text-sm text-stone-600">{ex.english}</div>
				</div>
			))}
		</div>
	</div>
);

// Agreement examples showing article + adjective + noun
const AgreementExamplesCard: React.FC = () => {
	const nomExamples = ADJECTIVE_AGREEMENT_EXAMPLES.filter((e) => e.case === "Nom");
	const accExamples = ADJECTIVE_AGREEMENT_EXAMPLES.filter((e) => e.case === "Acc");

	return (
		<Card variant="bordered" padding="md">
			<div className="mb-3 text-sm font-medium text-stone-700">
				Agreement in action: article + adjective + noun
			</div>
			<div className="grid gap-6 md:grid-cols-2">
				<CaseExampleGroup
					label="Nominative (subject)"
					labelClass="text-ocean-text"
					examples={nomExamples}
				/>
				<CaseExampleGroup
					label="Accusative (object)"
					labelClass="text-terracotta-text"
					examples={accExamples}
				/>
			</div>
		</Card>
	);
};

// Full paradigm display for a single adjective pattern
const AdjectiveParadigmCard: React.FC<{ paradigm: AdjectiveParadigm }> = ({ paradigm }) => {
	const genderStyles = {
		masculine: {
			border: "border-gender-masculine-300",
			bg: "bg-gender-masculine-50",
			headerBg: "bg-gender-masculine-100",
		},
		feminine: {
			border: "border-gender-feminine-300",
			bg: "bg-gender-feminine-50",
			headerBg: "bg-gender-feminine-100",
		},
		neuter: {
			border: "border-gender-neuter-300",
			bg: "bg-gender-neuter-50",
			headerBg: "bg-gender-neuter-100",
		},
	};

	const renderGenderTable = (
		gender: "masculine" | "feminine" | "neuter",
		forms: AdjectiveParadigm["masculine"],
	) => {
		const style = genderStyles[gender];
		const genderLabel = gender.charAt(0).toUpperCase() + gender.slice(1);
		const variant =
			gender === "masculine" ? "masculine" : gender === "feminine" ? "feminine" : "neuter";

		return (
			<div className={`rounded-lg ${style.bg} ${style.border} border p-3`}>
				<div className={`text-xs font-medium text-gender-${gender} mb-2`}>{genderLabel}</div>
				<table className="w-full text-sm">
					<thead>
						<tr className={`${style.headerBg} border-b ${style.border}`}>
							<th className="w-10 px-2 py-1 text-left text-xs font-medium text-stone-600" />
							<th className="px-2 py-1 text-left text-xs font-medium text-stone-600">Sg</th>
							<th className="px-2 py-1 text-left text-xs font-medium text-stone-600">Pl</th>
						</tr>
					</thead>
					<tbody>
						{forms.singular.map((sg, idx) => {
							const pl = forms.plural[idx];
							return (
								<tr key={sg.case} className="border-b border-stone-100/50">
									<td className="px-2 py-1 text-xs text-stone-500">{sg.case}</td>
									<td className="px-2 py-1">
										<MonoText variant={variant} size="sm">
											{sg.form}
										</MonoText>
									</td>
									<td className="px-2 py-1">
										<MonoText variant={variant} size="sm">
											{pl?.form}
										</MonoText>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	};

	return (
		<Card variant="bordered" padding="md">
			<div className="mb-3 flex items-center gap-3">
				<MonoText variant="greek" size="lg" className="font-bold">
					{paradigm.pattern}
				</MonoText>
				<span className="text-sm text-stone-600">{paradigm.title}</span>
				<span
					className={`rounded px-2 py-0.5 text-xs ${
						paradigm.frequency === "very common"
							? "bg-olive-200 text-olive-text"
							: paradigm.frequency === "common"
								? "bg-honey-200 text-honey-text"
								: "bg-stone-100 text-stone-600"
					}`}
				>
					{paradigm.frequency}
				</span>
			</div>

			<div className="mb-3 flex items-baseline gap-2 text-sm">
				<span className="text-stone-600">Example:</span>
				<MonoText variant="masculine">{paradigm.example.masculine}</MonoText>
				<span className="text-stone-400">/</span>
				<MonoText variant="feminine">{paradigm.example.feminine}</MonoText>
				<span className="text-stone-400">/</span>
				<MonoText variant="neuter">{paradigm.example.neuter}</MonoText>
				<span className="text-stone-500">= {paradigm.example.english}</span>
			</div>

			{paradigm.tip && <p className="mb-4 text-sm text-stone-600 italic">{paradigm.tip}</p>}

			<div className="grid gap-3 md:grid-cols-3">
				{renderGenderTable("masculine", paradigm.masculine)}
				{renderGenderTable("feminine", paradigm.feminine)}
				{renderGenderTable("neuter", paradigm.neuter)}
			</div>
		</Card>
	);
};

// Common adjectives quick list
const CommonAdjectivesCard: React.FC = () => (
	<Card variant="bordered" padding="md" className="bg-honey-50/30">
		<div className="mb-3 text-sm font-medium text-honey-text">
			High-frequency adjectives (all follow -ος/-η/-ο pattern)
		</div>
		<div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3 md:grid-cols-4">
			{COMMON_ADJECTIVES.map((adj) => (
				<div key={adj.greek} className="flex items-baseline gap-2">
					<MonoText variant="greek">{adj.greek}</MonoText>
					<span className="text-stone-500">{adj.english}</span>
				</div>
			))}
		</div>
	</Card>
);

export const AdjectivesSection: React.FC = () => {
	const mainPattern = ADJECTIVE_PARADIGMS[0];
	const otherPatterns = ADJECTIVE_PARADIGMS.slice(1);

	return (
		<section id="adjectives" className="space-y-6">
			<SectionHeading
				title="Adjectives"
				subtitle="Words that describe nouns. They must agree in gender, case, and number."
			/>

			<ContentSection title="Adjectives copy the noun" colorScheme="olive">
				<div className="space-y-3 p-3">
					<p className="text-sm text-stone-600">
						Match the article's gender and case. The adjective ending follows the same pattern as
						nouns.
					</p>
					<div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
						<div className="mb-2 text-xs font-semibold tracking-wide text-olive-text uppercase">
							What this means
						</div>
						<p className="mb-2 text-sm text-stone-600">
							Look at the article. The adjective uses the same gender, case, and number as the noun
							it describes.
						</p>
						<div className="space-y-1">
							<div>
								<MonoText variant="masculine">ο καλός φίλος</MonoText>
								<span className="ml-2 text-sm text-stone-600">(all masculine nominative)</span>
							</div>
							<div>
								<MonoText variant="masculine">τον καλό φίλο</MonoText>
								<span className="ml-2 text-sm text-stone-600">
									(all masculine accusative, drop the -ς)
								</span>
							</div>
						</div>
					</div>
				</div>
			</ContentSection>

			<Alert variant="info">
				<Lightbulb size={16} />
				<AlertTitle>Word Order</AlertTitle>
				<AlertDescription>
					Greek adjectives usually come <strong>before</strong> the noun:{" "}
					<MonoText variant="greek" size="sm">
						ο καλός φίλος
					</MonoText>{" "}
					(the good friend), not *ο φίλος καλός.
				</AlertDescription>
			</Alert>

			{/* Quick reference endings table */}
			<AdjectiveEndingsTable />

			{/* Agreement examples */}
			<AgreementExamplesCard />

			{/* Main paradigm - always visible */}
			{mainPattern && (
				<div className="space-y-3">
					<div className="text-sm font-medium text-stone-700">
						The most common pattern (covers ~80% of adjectives):
					</div>
					<AdjectiveParadigmCard paradigm={mainPattern} />
				</div>
			)}

			{/* Common adjectives */}
			<CommonAdjectivesCard />

			{/* Other patterns - collapsible */}
			<CollapsibleSection title="Other Adjective Patterns" colorScheme="olive" defaultOpen={false}>
				<div className="space-y-4">
					{otherPatterns.map((paradigm) => (
						<AdjectiveParadigmCard key={paradigm.id} paradigm={paradigm} />
					))}
				</div>
			</CollapsibleSection>

			{/* Common mistakes */}
			<CollapsibleSection
				title="Common Adjective Mistakes"
				colorScheme="terracotta"
				defaultOpen={false}
			>
				<MistakeComparison
					mistakes={ADJECTIVE_MISTAKES.filter(
						(m) => m.correct !== m.wrong || m.explanation.includes("correct"),
					).map((m) => ({
						wrong: m.wrong,
						correct: m.correct,
						explanation: m.explanation,
						category: m.category as "gender" | "case" | "number",
					}))}
					title=""
				/>
			</CollapsibleSection>
		</section>
	);
};
