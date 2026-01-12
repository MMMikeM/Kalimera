import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Card } from "@/components/Card";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ContentSection } from "@/components/ContentSection";
import { MistakeComparison } from "@/components/MistakeComparison";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AGREEMENT_MISTAKES,
	AGREEMENT_PARADIGMS,
	type AgreementParadigm,
} from "@/constants/agreement";
import { GENDER_HINTS } from "@/constants/nouns";

const genderStyles = {
	masculine: {
		border: "border-gender-masculine-300",
		bg: "bg-gender-masculine-50",
		headerBg: "bg-gender-masculine-100",
		text: "text-gender-masculine",
	},
	feminine: {
		border: "border-gender-feminine-300",
		bg: "bg-gender-feminine-50",
		headerBg: "bg-gender-feminine-100",
		text: "text-gender-feminine",
	},
	neuter: {
		border: "border-gender-neuter-300",
		bg: "bg-gender-neuter-50",
		headerBg: "bg-gender-neuter-100",
		text: "text-gender-neuter",
	},
};

const NounParadigmTable: React.FC<{
	paradigm: AgreementParadigm;
	showPlural?: boolean;
}> = ({ paradigm, showPlural = true }) => {
	const style = genderStyles[paradigm.gender];

	return (
		<Card
			variant="bordered"
			padding="md"
			className={`${style.bg} ${style.border}`}
		>
			<div className="flex items-center gap-2 mb-3">
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
				<span className={`text-sm ${style.text}`}>{paradigm.title}</span>
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

			{paradigm.tip && (
				<p className="text-sm text-stone-600 mb-3 italic">{paradigm.tip}</p>
			)}

			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className={`${style.headerBg} border-b ${style.border}`}>
							<th className="text-left py-2 px-3 font-medium text-stone-600 w-16">
								Case
							</th>
							<th className="text-left py-2 px-3 font-medium text-stone-600">
								Ending
							</th>
							<th className="text-left py-2 px-3 font-medium text-stone-600">
								Example
							</th>
							<th className="text-left py-2 px-3 font-medium text-stone-600">
								English
							</th>
						</tr>
					</thead>
					<tbody>
						{paradigm.forms.map((form) => (
							<tr key={form.case} className="border-b border-stone-100">
								<td className="py-2 px-3 text-stone-500 text-xs">
									{form.case}
								</td>
								<td className="py-2 px-3">
									<MonoText size="sm" className="text-stone-600">
										{form.ending}
									</MonoText>
								</td>
								<td className="py-2 px-3">
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
								<td className="py-2 px-3 text-stone-600 text-sm">
									{form.english}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{showPlural && paradigm.pluralForms && (
				<div className="mt-4 pt-3 border-t border-stone-200">
					<div className="text-xs text-stone-600 mb-2 font-medium">
						Plural Forms
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<tbody>
								{paradigm.pluralForms.map((form) => (
									<tr key={form.case} className="border-b border-stone-50">
										<td className="py-1.5 px-3 text-stone-500 text-xs w-16">
											{form.case}
										</td>
										<td className="py-1.5 px-3">
											<MonoText size="sm" className="text-stone-600">
												{form.ending}
											</MonoText>
										</td>
										<td className="py-1.5 px-3">
											<MonoText size="sm">{form.full}</MonoText>
										</td>
										<td className="py-1.5 px-3 text-stone-600 text-xs">
											{form.english}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</Card>
	);
};

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
					className="p-2 rounded-lg hover:bg-stone-100 transition-colors disabled:opacity-50"
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
							className={`w-2 h-2 rounded-full transition-colors ${
								idx === currentIndex ? "bg-stone-600" : "bg-stone-300"
							}`}
						/>
					))}
				</div>
				<button
					type="button"
					onClick={handleNext}
					className="p-2 rounded-lg hover:bg-stone-100 transition-colors disabled:opacity-50"
					disabled={paradigms.length <= 1}
				>
					<ChevronRight size={20} className="text-stone-600" />
				</button>
			</div>
			<NounParadigmTable paradigm={currentParadigm} />
		</div>
	);
};

const GenderHintsExpanded: React.FC = () => (
	<ContentSection title="Spot gender by ending" colorScheme="olive">
		<div className="p-4 space-y-4">
			{(["masculine", "feminine", "neuter"] as const).map((gender) => {
				const hints = GENDER_HINTS[gender];
				const style = genderStyles[gender];
				return (
					<div
						key={gender}
						className={`p-3 rounded-lg border ${style.bg} ${style.border}`}
					>
						<div className="flex items-center gap-2 mb-2">
							<span
								className={`w-3 h-3 rounded-full ${
									gender === "masculine"
										? "bg-gender-masculine"
										: gender === "feminine"
											? "bg-gender-feminine"
											: "bg-gender-neuter"
								}`}
							/>
							<span className={`font-medium capitalize ${style.text}`}>
								{gender}
							</span>
							<span className="text-stone-600 text-sm">
								{hints.endings.join(", ")}
							</span>
						</div>
						<p className="text-sm text-stone-600 mb-2">{hints.tip}</p>
						<div className="flex flex-wrap gap-2">
							{hints.examples.map((ex) => (
								<MonoText
									key={ex}
									size="sm"
									variant={
										gender === "masculine"
											? "masculine"
											: gender === "feminine"
												? "feminine"
												: "neuter"
									}
									className="px-2 py-0.5 bg-white/50 rounded"
								>
									{ex}
								</MonoText>
							))}
						</div>
					</div>
				);
			})}
		</div>
	</ContentSection>
);

const VocativeChanges: React.FC = () => (
	<CollapsibleSection
		title="Vocative Changes (Direct Address)"
		colorScheme="honey"
		defaultOpen={false}
	>
		<div className="p-4 space-y-4">
			<p className="text-sm text-stone-600">
				When calling someone directly (vocative case), masculine nouns change
				their ending. Feminine and neuter nouns keep the nominative form.
			</p>
			<div className="grid md:grid-cols-2 gap-4">
				<Card variant="bordered" padding="sm" className="bg-gender-masculine-50">
					<div className="text-sm font-medium text-gender-masculine mb-2">
						Masculine Changes
					</div>
					<div className="space-y-1 text-sm">
						<div className="flex items-center gap-2">
							<MonoText size="sm">-ος → -ε</MonoText>
							<span className="text-stone-500">φίλος → φίλε!</span>
						</div>
						<div className="flex items-center gap-2">
							<MonoText size="sm">-ας → -α</MonoText>
							<span className="text-stone-500">πατέρας → πατέρα!</span>
						</div>
						<div className="flex items-center gap-2">
							<MonoText size="sm">-ης → -η</MonoText>
							<span className="text-stone-500">μαθητής → μαθητή!</span>
						</div>
						<div className="flex items-center gap-2">
							<MonoText size="sm">-ές → -έ</MonoText>
							<span className="text-stone-500">καφές → καφέ!</span>
						</div>
					</div>
				</Card>
				<Card variant="bordered" padding="sm" className="bg-stone-50">
					<div className="text-sm font-medium text-stone-700 mb-2">
						Feminine & Neuter
					</div>
					<p className="text-sm text-stone-600">
						Keep the nominative form unchanged for direct address:
					</p>
					<div className="space-y-1 text-sm mt-2">
						<div className="text-stone-500">γυναίκα! (woman!)</div>
						<div className="text-stone-500">παιδί! (child!)</div>
					</div>
				</Card>
			</div>
		</div>
	</CollapsibleSection>
);

export const NounsSection: React.FC = () => {
	const masculineParadigms = AGREEMENT_PARADIGMS.filter(
		(p) => p.gender === "masculine",
	);
	const feminineParadigms = AGREEMENT_PARADIGMS.filter(
		(p) => p.gender === "feminine",
	);
	const neuterParadigms = AGREEMENT_PARADIGMS.filter(
		(p) => p.gender === "neuter",
	);

	const nounMistakes = AGREEMENT_MISTAKES.filter(
		(m) => m.category === "case" || m.category === "number",
	);

	return (
		<section id="nouns" className="space-y-6">
			<SectionHeading
				title="Noun Declensions"
				subtitle="How Greek nouns change their endings by case and number"
			/>

			<Alert variant="info">
				<Lightbulb size={16} />
				<AlertTitle>The Core Pattern</AlertTitle>
				<AlertDescription>
					Greek nouns change their endings to show case (function in sentence)
					and number (singular/plural). The article changes along with the noun
					and helps you identify the gender.
				</AlertDescription>
			</Alert>

			<GenderHintsExpanded />

			<Card variant="bordered" padding="lg" className="bg-stone-50/50">
				<div className="text-sm font-medium text-stone-700 mb-4">
					Noun Paradigms by Gender
				</div>
				<Tabs defaultValue="masculine" className="w-full">
					<TabsList className="flex-wrap h-auto gap-1 mb-4">
						<TabsTrigger value="masculine" className="text-gender-masculine">
							Masculine ({masculineParadigms.length})
						</TabsTrigger>
						<TabsTrigger value="feminine" className="text-gender-feminine">
							Feminine ({feminineParadigms.length})
						</TabsTrigger>
						<TabsTrigger value="neuter" className="text-gender-neuter">
							Neuter ({neuterParadigms.length})
						</TabsTrigger>
					</TabsList>

					<TabsContent value="masculine" className="space-y-4 mt-0">
						<ParadigmCarousel paradigms={masculineParadigms} />
					</TabsContent>

					<TabsContent value="feminine" className="mt-0">
						<ParadigmCarousel paradigms={feminineParadigms} />
					</TabsContent>

					<TabsContent value="neuter" className="mt-0">
						<ParadigmCarousel paradigms={neuterParadigms} />
					</TabsContent>
				</Tabs>
			</Card>

			<VocativeChanges />

			<CollapsibleSection
				title="Common Noun Mistakes"
				colorScheme="terracotta"
				defaultOpen={false}
			>
				<MistakeComparison mistakes={nounMistakes} title="" />
			</CollapsibleSection>
		</section>
	);
};
