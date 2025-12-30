import { Lightbulb } from "lucide-react";
import type React from "react";
import {
	ADJECTIVE_PARADIGMS,
	ADJECTIVE_AGREEMENT_EXAMPLES,
	ADJECTIVE_MISTAKES,
	ADJECTIVE_ENDINGS_QUICK_REF,
	COMMON_ADJECTIVES,
	type AdjectiveParadigm,
} from "../../constants/adjectives";
import {
	Card,
	MonoText,
	SectionHeading,
	KeyInsight,
	CollapsibleSection,
	MistakeComparison,
} from "../../components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Adjective endings quick lookup table
const AdjectiveEndingsTable: React.FC = () => (
	<Card variant="bordered" padding="md" className="bg-stone-50/50">
		<div className="text-sm font-medium text-stone-700 mb-3">
			Standard adjective endings (-ος, -η, -ο pattern)
		</div>
		<div className="grid md:grid-cols-2 gap-4">
			{/* Singular */}
			<div>
				<div className="text-xs font-medium text-stone-600 mb-2">Singular</div>
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-stone-200">
							<th className="text-left py-1 pr-2 text-stone-600 font-medium w-12" />
							<th className="text-left py-1 px-2 text-gender-masculine font-medium">
								M
							</th>
							<th className="text-left py-1 px-2 text-gender-feminine font-medium">
								F
							</th>
							<th className="text-left py-1 px-2 text-gender-neuter font-medium">
								N
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-stone-500 text-xs">Nom</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.singular.masculine.nom}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.singular.feminine.nom}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.singular.neuter.nom}
								</MonoText>
							</td>
						</tr>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-stone-500 text-xs">Acc</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.singular.masculine.acc}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.singular.feminine.acc}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.singular.neuter.acc}
								</MonoText>
							</td>
						</tr>
						<tr>
							<td className="py-1 pr-2 text-stone-500 text-xs">Gen</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.singular.masculine.gen}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.singular.feminine.gen}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.singular.neuter.gen}
								</MonoText>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			{/* Plural */}
			<div>
				<div className="text-xs font-medium text-stone-600 mb-2">Plural</div>
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-stone-200">
							<th className="text-left py-1 pr-2 text-stone-600 font-medium w-12" />
							<th className="text-left py-1 px-2 text-gender-masculine font-medium">
								M
							</th>
							<th className="text-left py-1 px-2 text-gender-feminine font-medium">
								F
							</th>
							<th className="text-left py-1 px-2 text-gender-neuter font-medium">
								N
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-stone-500 text-xs">Nom</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.plural.masculine.nom}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.plural.feminine.nom}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.plural.neuter.nom}
								</MonoText>
							</td>
						</tr>
						<tr className="border-b border-stone-100">
							<td className="py-1 pr-2 text-stone-500 text-xs">Acc</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.plural.masculine.acc}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.plural.feminine.acc}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.plural.neuter.acc}
								</MonoText>
							</td>
						</tr>
						<tr>
							<td className="py-1 pr-2 text-stone-500 text-xs">Gen</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.plural.masculine.gen}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.plural.feminine.gen}
								</MonoText>
							</td>
							<td className="py-1 px-2">
								<MonoText size="sm">
									{ADJECTIVE_ENDINGS_QUICK_REF.plural.neuter.gen}
								</MonoText>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</Card>
);

// Agreement examples showing article + adjective + noun
const AgreementExamplesCard: React.FC = () => {
	const nomExamples = ADJECTIVE_AGREEMENT_EXAMPLES.filter(
		(e) => e.case === "Nom",
	);
	const accExamples = ADJECTIVE_AGREEMENT_EXAMPLES.filter(
		(e) => e.case === "Acc",
	);

	return (
		<Card variant="bordered" padding="md">
			<div className="text-sm font-medium text-stone-700 mb-3">
				Agreement in action: article + adjective + noun
			</div>
			<div className="grid md:grid-cols-2 gap-6">
				{/* Nominative */}
				<div>
					<div className="text-xs font-medium text-ocean-text mb-2 uppercase tracking-wide">
						Nominative (subject)
					</div>
					<div className="space-y-2">
						{nomExamples.map((ex) => (
							<div
								key={ex.greek}
								className="p-2 bg-stone-50 rounded border border-stone-200"
							>
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
								<div className="text-stone-600 text-sm mt-1">{ex.english}</div>
							</div>
						))}
					</div>
				</div>
				{/* Accusative */}
				<div>
					<div className="text-xs font-medium text-terracotta-text mb-2 uppercase tracking-wide">
						Accusative (object)
					</div>
					<div className="space-y-2">
						{accExamples.map((ex) => (
							<div
								key={ex.greek}
								className="p-2 bg-stone-50 rounded border border-stone-200"
							>
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
								<div className="text-stone-600 text-sm mt-1">{ex.english}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	);
};

// Full paradigm display for a single adjective pattern
const AdjectiveParadigmCard: React.FC<{ paradigm: AdjectiveParadigm }> = ({
	paradigm,
}) => {
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
			gender === "masculine"
				? "masculine"
				: gender === "feminine"
					? "feminine"
					: "neuter";

		return (
			<div className={`rounded-lg ${style.bg} ${style.border} border p-3`}>
				<div className={`text-xs font-medium text-gender-${gender} mb-2`}>
					{genderLabel}
				</div>
				<table className="w-full text-sm">
					<thead>
						<tr className={`${style.headerBg} border-b ${style.border}`}>
							<th className="text-left py-1 px-2 text-stone-600 font-medium text-xs w-10" />
							<th className="text-left py-1 px-2 text-stone-600 font-medium text-xs">
								Sg
							</th>
							<th className="text-left py-1 px-2 text-stone-600 font-medium text-xs">
								Pl
							</th>
						</tr>
					</thead>
					<tbody>
						{forms.singular.map((sg, idx) => {
							const pl = forms.plural[idx];
							return (
								<tr key={sg.case} className="border-b border-stone-100/50">
									<td className="py-1 px-2 text-stone-500 text-xs">
										{sg.case}
									</td>
									<td className="py-1 px-2">
										<MonoText variant={variant} size="sm">
											{sg.form}
										</MonoText>
									</td>
									<td className="py-1 px-2">
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
			<div className="flex items-center gap-3 mb-3">
				<MonoText variant="greek" size="lg" className="font-bold">
					{paradigm.pattern}
				</MonoText>
				<span className="text-sm text-stone-600">{paradigm.title}</span>
				<span
					className={`text-xs px-2 py-0.5 rounded ${
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

			<div className="flex items-baseline gap-2 mb-3 text-sm">
				<span className="text-stone-600">Example:</span>
				<MonoText variant="masculine">{paradigm.example.masculine}</MonoText>
				<span className="text-stone-400">/</span>
				<MonoText variant="feminine">{paradigm.example.feminine}</MonoText>
				<span className="text-stone-400">/</span>
				<MonoText variant="neuter">{paradigm.example.neuter}</MonoText>
				<span className="text-stone-500">= {paradigm.example.english}</span>
			</div>

			{paradigm.tip && (
				<p className="text-sm text-stone-600 mb-4 italic">{paradigm.tip}</p>
			)}

			<div className="grid md:grid-cols-3 gap-3">
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
		<div className="text-sm font-medium text-honey-text mb-3">
			High-frequency adjectives (all follow -ος/-η/-ο pattern)
		</div>
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-1 text-sm">
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
				subtitle="Words that describe nouns — they must agree in gender, case, and number"
			/>

			<KeyInsight
				title="Adjectives copy the noun"
				expandedExample={{
					label: "What this means",
					content: (
						<div className="space-y-2 text-sm">
							<p>
								Look at the article. The adjective uses the same gender, case,
								and number as the noun it describes.
							</p>
							<div className="mt-2 p-2 bg-white rounded border border-ocean-200">
								<div className="space-y-1">
									<div>
										<MonoText variant="masculine">ο καλός φίλος</MonoText>
										<span className="text-stone-600 ml-2">
											— all masculine nominative
										</span>
									</div>
									<div>
										<MonoText variant="masculine">τον καλό φίλο</MonoText>
										<span className="text-stone-600 ml-2">
											— all masculine accusative (drop the -ς)
										</span>
									</div>
								</div>
							</div>
						</div>
					),
				}}
			>
				Match the article's gender and case. The adjective ending follows the
				same pattern as nouns.
			</KeyInsight>

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
			<CollapsibleSection
				title="Other Adjective Patterns"
				colorScheme="olive"
				defaultOpen={false}
			>
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
