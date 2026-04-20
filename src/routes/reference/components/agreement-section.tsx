import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { Callout, TeachingCard } from "@/components/cards";
import { Card } from "@/components/Card";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MistakeComparison } from "@/components/MistakeComparison";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AGREEMENT_MISTAKES,
	AGREEMENT_PARADIGMS,
	type AgreementParadigm,
	ARTICLE_AGREEMENT_QUICK_REF,
} from "@/constants/agreement";
import { MOVABLE_NU_RULE } from "@/constants/articles";
import { GENDER_SCHEME } from "@/constants/grammar-palette";
import { GENDER_HINTS } from "@/constants/nouns";

import { CaseTable } from "./CaseTable";

// Reusable paradigm table for agreement patterns (streamlined - removed Article column)
const AgreementParadigmTable: React.FC<{
	paradigm: AgreementParadigm;
	showPlural?: boolean;
}> = ({ paradigm, showPlural = true }) => {
	// Use semantic gender colors from the design system
	const genderStyles = {
		masculine: {
			border: "border-gender-masculine-300",
			bg: "bg-gender-masculine-100",
			headerBg: "bg-gender-masculine-100",
			text: "text-gender-masculine-text",
		},
		feminine: {
			border: "border-gender-feminine-300",
			bg: "bg-gender-feminine-100",
			headerBg: "bg-gender-feminine-100",
			text: "text-gender-feminine-text",
		},
		neuter: {
			border: "border-gender-neuter-300",
			bg: "bg-gender-neuter-100",
			headerBg: "bg-gender-neuter-100",
			text: "text-gender-neuter-text",
		},
	};
	const style = genderStyles[paradigm.gender];

	return (
		<TeachingCard
			scheme={GENDER_SCHEME[paradigm.gender]}
			tone="soft"
			eyebrow="Pattern"
			title={
				<MonoText
					variant={
						paradigm.gender === "masculine"
							? "masculine"
							: paradigm.gender === "feminine"
								? "feminine"
								: "neuter"
					}
					size="lg"
					className="font-bold"
				>
					{paradigm.pattern}
				</MonoText>
			}
			badge={paradigm.frequency}
			description={paradigm.title}
		>
			{paradigm.tip && <p className="mb-3 text-sm text-stone-600 italic">{paradigm.tip}</p>}

			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className={`${style.headerBg} border-b ${style.border}`}>
							<th className="w-16 px-3 py-2 text-left font-medium text-stone-600">Case</th>
							<th className="px-3 py-2 text-left font-medium text-stone-600">Ending</th>
							<th className="px-3 py-2 text-left font-medium text-stone-600">Example</th>
							<th className="px-3 py-2 text-left font-medium text-stone-600">English</th>
						</tr>
					</thead>
					<tbody>
						{paradigm.forms.map((form) => (
							<tr key={form.case} className="border-b border-stone-100">
								<td className="px-3 py-2 text-xs text-stone-500">{form.case}</td>
								<td className="px-3 py-2">
									<MonoText size="sm" className="text-stone-600">
										{form.ending}
									</MonoText>
								</td>
								<td className="px-3 py-2">
									<MonoText
										variant={
											paradigm.gender === "masculine"
												? "masculine"
												: paradigm.gender === "feminine"
													? "feminine"
													: "neuter"
										}
									>
										{form.full}
									</MonoText>
								</td>
								<td className="px-3 py-2 text-sm text-stone-600">{form.english}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{showPlural && paradigm.pluralForms && (
				<div className="mt-4 border-t border-stone-200 pt-3">
					<div className="mb-2 text-xs font-medium text-stone-600">Plural Forms</div>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<tbody>
								{paradigm.pluralForms.map((form) => (
									<tr key={form.case} className="border-b border-stone-50">
										<td className="w-16 px-3 py-1.5 text-xs text-stone-500">{form.case}</td>
										<td className="px-3 py-1.5">
											<MonoText size="sm" className="text-stone-600">
												{form.ending}
											</MonoText>
										</td>
										<td className="px-3 py-1.5">
											<MonoText size="sm">{form.full}</MonoText>
										</td>
										<td className="px-3 py-1.5 text-xs text-stone-600">{form.english}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</TeachingCard>
	);
};

// Gender hints card - compact reference for spotting gender
const GenderHintsCard: React.FC = () => (
	<TeachingCard
		scheme="neutral"
		tone="soft"
		eyebrow="Spotting gender"
		title="Spot gender by ending"
	>
		<div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
			{(["masculine", "feminine", "neuter"] as const).map((gender) => (
				<div key={gender} className="flex items-center gap-2">
					<span className={`h-2 w-2 rounded-full bg-gender-${gender}`} />
					<span className="text-stone-600 capitalize">{gender}:</span>
					<span className="text-stone-800">{GENDER_HINTS[gender].endings.join(", ")}</span>
				</div>
			))}
		</div>
	</TeachingCard>
);

// Article quick lookup - now expanded by default
const ArticleQuickLookup: React.FC = () => (
	<CollapsibleSection
		title="Article Quick Lookup (ο, η, το, τον, την...)"
		colorScheme="ocean"
		defaultOpen={true}
	>
		<div className="grid gap-4 md:grid-cols-2">
			<Card variant="bordered" padding="sm">
				<CaseTable label="Singular" data={ARTICLE_AGREEMENT_QUICK_REF.singular} />
			</Card>
			<Card variant="bordered" padding="sm">
				<CaseTable label="Plural" data={ARTICLE_AGREEMENT_QUICK_REF.plural} />
			</Card>
		</div>
	</CollapsibleSection>
);

// Paradigm carousel for reduced density
const ParadigmCarousel: React.FC<{
	paradigms: AgreementParadigm[];
}> = ({ paradigms }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? paradigms.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === paradigms.length - 1 ? 0 : prev + 1));
	};

	const currentParadigm = paradigms[currentIndex];
	if (paradigms.length === 0 || !currentParadigm) return null;

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<button
					type="button"
					onClick={handlePrev}
					className="rounded-lg p-2 transition-colors hover:bg-stone-100 disabled:opacity-50"
					disabled={paradigms.length <= 1}
				>
					<ChevronLeft size={20} className="text-stone-600" />
				</button>
				<div className="flex gap-1">
					{paradigms.map((p, idx) => (
						<button
							key={p.id}
							type="button"
							onClick={() => setCurrentIndex(idx)}
							className={`h-2 w-2 rounded-full transition-colors ${
								idx === currentIndex ? "bg-stone-600" : "bg-stone-300"
							}`}
						/>
					))}
				</div>
				<button
					type="button"
					onClick={handleNext}
					className="rounded-lg p-2 transition-colors hover:bg-stone-100 disabled:opacity-50"
					disabled={paradigms.length <= 1}
				>
					<ChevronRight size={20} className="text-stone-600" />
				</button>
			</div>
			<AgreementParadigmTable paradigm={currentParadigm} />
		</div>
	);
};

export const AgreementSection: React.FC = () => {
	const masculineParadigms = AGREEMENT_PARADIGMS.filter((p) => p.gender === "masculine");
	const feminineParadigms = AGREEMENT_PARADIGMS.filter((p) => p.gender === "feminine");
	const neuterParadigms = AGREEMENT_PARADIGMS.filter((p) => p.gender === "neuter");

	return (
		<section id="agreement" className="space-y-6">
			<SectionHeading
				title="Nouns & Articles"
				subtitle="How articles and nouns must match in gender, case, and number"
			/>

			<TeachingCard
				scheme="neutral"
				tone="soft"
				eyebrow="Quick win"
				title="When uncertain, use the -ν form"
				description="Always keep the final ν on τον/την/στον/στην. Never wrong."
			>
				<p className="text-sm text-stone-600">
					For{" "}
					<MonoText variant="greek" size="sm">
						τον/την
					</MonoText>{" "}
					and{" "}
					<MonoText variant="greek" size="sm">
						στον/στην
					</MonoText>
					, you can always include the -ν.{" "}
					<MonoText variant="greek" size="sm">
						τον φίλο
					</MonoText>{" "}
					or{" "}
					<MonoText variant="greek" size="sm">
						τη φίλη
					</MonoText>{" "}
					— both correct.
				</p>
			</TeachingCard>

			{/* Gender hints - how to spot gender by ending */}
			<GenderHintsCard />

			{/* Article quick lookup - expanded by default */}
			<ArticleQuickLookup />

			<Callout scheme="neutral" icon={<Lightbulb size={16} />} title="The core pattern">
				In Greek, the article must <strong>agree</strong> with its noun in three ways: gender
				(masculine/feminine/neuter), case (nominative/accusative/genitive), and number
				(singular/plural). This is why "the" has so many forms.
			</Callout>

			<Card variant="bordered" padding="lg" className="bg-stone-50/50">
				<Tabs defaultValue="masculine" className="w-full">
					<TabsList className="mb-4 h-auto flex-wrap gap-1">
						<TabsTrigger value="masculine" className="text-gender-masculine-text">
							Masculine ({masculineParadigms.length})
						</TabsTrigger>
						<TabsTrigger value="feminine" className="text-gender-feminine-text">
							Feminine ({feminineParadigms.length})
						</TabsTrigger>
						<TabsTrigger value="neuter" className="text-gender-neuter-text">
							Neuter ({neuterParadigms.length})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="masculine" className="mt-0 space-y-4">
						<ParadigmCarousel paradigms={masculineParadigms} />
						<div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-sm text-stone-600">
							<span className="font-medium text-stone-700">Vocative changes:</span>
							<MonoText size="sm">-ος → -ε</MonoText>
							<MonoText size="sm">-ας → -α</MonoText>
							<MonoText size="sm">-ης → -η</MonoText>
							<MonoText size="sm">-ές → -έ</MonoText>
						</div>
					</TabsContent>

					<TabsContent value="feminine" className="mt-0">
						<ParadigmCarousel paradigms={feminineParadigms} />
					</TabsContent>

					<TabsContent value="neuter" className="mt-0">
						<ParadigmCarousel paradigms={neuterParadigms} />
					</TabsContent>
				</Tabs>
			</Card>

			{/* Common Mistakes - now collapsible and using accessible MistakeComparison */}
			<CollapsibleSection
				title="Common Agreement Mistakes"
				colorScheme="terracotta"
				defaultOpen={false}
			>
				<MistakeComparison mistakes={AGREEMENT_MISTAKES} title="" />
			</CollapsibleSection>
		</section>
	);
};

export const MovableNuSection: React.FC = () => (
	<section id="movable-nu" className="space-y-6">
		<SectionHeading
			title="The -ν Rule"
			subtitle="Fine-tuning: when to keep or drop final ν on articles"
		/>

		<Card variant="elevated" padding="lg" className="border-2 border-stone-200 bg-stone-50">
			<Alert variant="info" className="mb-6">
				<Lightbulb size={16} />
				<AlertTitle>The Rule</AlertTitle>
				<AlertDescription>{MOVABLE_NU_RULE.rule}</AlertDescription>
			</Alert>
			<div className="grid gap-6 md:grid-cols-2">
				<div className="space-y-4">
					<h4 className="text-lg font-bold text-correct">Keep the -ν</h4>
					<div className="space-y-3">
						{MOVABLE_NU_RULE.examples.keep.map((example) => (
							<div
								key={example.text}
								className="bg-correct-100 border-correct-300 rounded-lg border p-3"
							>
								<MonoText variant="success" size="lg" className="mb-1 block">
									{example.text}
								</MonoText>
								<div className="text-sm text-stone-600 italic">{example.reason}</div>
							</div>
						))}
					</div>
				</div>
				<div className="space-y-4">
					<h4 className="text-lg font-bold text-incorrect">Drop the -ν</h4>
					<div className="space-y-3">
						{MOVABLE_NU_RULE.examples.drop.map((example) => (
							<div
								key={example.text}
								className="bg-incorrect-100 border-incorrect-300 rounded-lg border p-3"
							>
								<MonoText variant="error" size="lg" className="mb-1 block">
									{example.text}
								</MonoText>
								<div className="text-sm text-stone-600 italic">{example.reason}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	</section>
);
