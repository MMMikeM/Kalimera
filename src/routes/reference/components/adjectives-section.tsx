import { Lightbulb } from "lucide-react";
import type React from "react";

import { Callout, TeachingCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { CASE_ROW_DEFS, GrammarTable, type ColumnDef } from "@/components/GrammarTable";
import { GENDER_SCHEME } from "@/constants/grammar-palette";
import { MistakeComparison } from "@/components/MistakeComparison";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
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
	<TeachingCard
		scheme="neutral"
		eyebrow="Endings"
		title="Standard pattern"
		badge="-ος / -η / -ο"
		description="Quick lookup for the default adjective endings."
	>
		<CaseTableGrid data={ADJECTIVE_ENDINGS_QUICK_REF} />
	</TeachingCard>
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
		<TeachingCard
			scheme="neutral"
			eyebrow="Agreement"
			title="Article + adjective + noun"
			description="All three pieces copy the same gender, case, and number."
		>
			<div className="grid gap-6 md:grid-cols-2">
				<CaseExampleGroup
					label="Doer (Nominative)"
					labelClass="text-case-nominative-text"
					examples={nomExamples}
				/>
				<CaseExampleGroup
					label="Target (Accusative)"
					labelClass="text-case-accusative-text"
					examples={accExamples}
				/>
			</div>
		</TeachingCard>
	);
};

// Full paradigm display for a single adjective pattern
const AdjectiveParadigmCard: React.FC<{ paradigm: AdjectiveParadigm; emphasis?: boolean }> = ({
	paradigm,
	emphasis = false,
}) => {
	const genderStyles = {
		masculine: { border: "border-gender-masculine-300", bg: "bg-gender-masculine-100/40" },
		feminine: { border: "border-gender-feminine-300", bg: "bg-gender-feminine-100/40" },
		neuter: { border: "border-gender-neuter-300", bg: "bg-gender-neuter-100/40" },
	};

	const renderGenderTable = (
		gender: "masculine" | "feminine" | "neuter",
		forms: AdjectiveParadigm["masculine"],
	) => {
		const style = genderStyles[gender];
		const genderLabel = gender.charAt(0).toUpperCase() + gender.slice(1);
		const variant =
			gender === "masculine" ? "masculine" : gender === "feminine" ? "feminine" : "neuter";

		const columns: ColumnDef[] = [
			{ key: "singular", label: "Singular" },
			{ key: "plural", label: "Plural" },
		];

		const rows = CASE_ROW_DEFS.map((row) => ({ ...row, schemeVariant: "border" as const }));

		const cells = rows.map((_row, ri) => {
			const sg = forms.singular[ri];
			const pl = forms.plural[ri];
			return [
				<MonoText variant={variant} size="sm">{sg?.form ?? "—"}</MonoText>,
				<MonoText variant={variant} size="sm">{pl?.form ?? "—"}</MonoText>,
			];
		});

		return (
			<div className={`rounded-lg ${style.bg} ${style.border} border p-3`}>
				<div className={`text-xs font-medium text-gender-${gender} mb-2`}>{genderLabel}</div>
				<GrammarTable
					columns={columns}
					rows={rows}
					cells={cells}
					scheme={GENDER_SCHEME[gender]}
				/>
			</div>
		);
	};

	return (
		<TeachingCard
			scheme="neutral"
			eyebrow="Pattern"
			title={
				<MonoText variant="greek" size={emphasis ? "xl" : "lg"} className="font-bold">
					{paradigm.pattern}
				</MonoText>
			}
			badge={paradigm.frequency}
			description={paradigm.title}
		>
			<div className="space-y-4">
				<div className="flex items-baseline gap-2 text-sm">
					<span className="text-stone-600">Example:</span>
					<MonoText variant="masculine">{paradigm.example.masculine}</MonoText>
					<span className="text-stone-400">/</span>
					<MonoText variant="feminine">{paradigm.example.feminine}</MonoText>
					<span className="text-stone-400">/</span>
					<MonoText variant="neuter">{paradigm.example.neuter}</MonoText>
					<span className="text-stone-500">= {paradigm.example.english}</span>
				</div>

				{paradigm.tip && <p className="text-sm text-stone-600 italic">{paradigm.tip}</p>}

				<div className="grid gap-3 md:grid-cols-3">
					{renderGenderTable("masculine", paradigm.masculine)}
					{renderGenderTable("feminine", paradigm.feminine)}
					{renderGenderTable("neuter", paradigm.neuter)}
				</div>
			</div>
		</TeachingCard>
	);
};

// Common adjectives quick list
const CommonAdjectivesCard: React.FC = () => (
	<TeachingCard
		scheme="neutral"
		eyebrow="Vocabulary"
		title="High-frequency adjectives"
		description="All follow the -ος / -η / -ο pattern."
	>
		<div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-3 md:grid-cols-4">
			{COMMON_ADJECTIVES.map((adj) => (
				<div key={adj.greek} className="flex items-baseline gap-2">
					<MonoText variant="greek">{adj.greek}</MonoText>
					<span className="text-stone-500">{adj.english}</span>
				</div>
			))}
		</div>
	</TeachingCard>
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

			<TeachingCard
				scheme="neutral"
				eyebrow="Concept"
				title="Adjectives copy the noun"
				description="Look at the article. The adjective uses the same gender, case, and number as the noun it describes."
			>
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
			</TeachingCard>

			<Callout scheme="neutral" icon={<Lightbulb size={16} />} title="Word order">
				Greek adjectives usually come <strong>before</strong> the noun:{" "}
				<MonoText variant="greek" size="sm">
					ο καλός φίλος
				</MonoText>{" "}
				(the good friend), not *ο φίλος καλός.
			</Callout>

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
					<AdjectiveParadigmCard paradigm={mainPattern} emphasis />
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
