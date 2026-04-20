import { Clock } from "lucide-react";
import type React from "react";

import { Callout, TeachingCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MistakeComparison } from "@/components/MistakeComparison";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import {
	BIG_4_PREPOSITIONS,
	COMPOUND_CONTRAST_PAIRS,
	OTHER_PREPOSITIONS,
	PREPOSITION_MISTAKES,
	PREPOSITION_PRONOUN_INFO,
	SE_CONTRACTIONS,
	TIME_EXPRESSIONS,
} from "@/constants/prepositions";
import { cn } from "@/lib/utils";

import { PrepositionNavigator } from "./preposition-navigator";

const CONTRACTION_GENDER_SCHEME: Record<string, GrammarScheme> = {
	neuter: "gender-neuter",
	feminine: "gender-feminine",
	masculine: "gender-masculine",
};

export const PrepositionsSection: React.FC = () => (
	<section id="prepositions" className="space-y-6">
		<SectionHeading
			title="Prepositions"
			subtitle="The words that connect location, direction, and relationships"
		/>

		{/* 1. Decision Navigator */}
		<PrepositionNavigator />

		{/* 2. The Big 4 */}
		<div className="grid gap-4 sm:grid-cols-2">
			{BIG_4_PREPOSITIONS.map((prep) => (
				<TeachingCard
					key={prep.greek}
					scheme="neutral"
	
	
					eyebrow={prep.role}
					title={
						<MonoText variant="greek" size="xl" className="font-bold">
							{prep.greek}
						</MonoText>
					}
					description={prep.english}
					footer={
						prep.contracts ? (
							<div className="text-xs text-stone-500">
								Contracts with articles → στο, στη, στον
							</div>
						) : undefined
					}
				>
					<div className="space-y-1">
						{prep.examples.map((ex) => (
							<div key={ex.greek} className="text-sm">
								<MonoText size="sm" variant="greek" className="font-medium">
									{ex.greek}
								</MonoText>
								<span className="ml-2 text-stone-600">{ex.english}</span>
							</div>
						))}
					</div>
				</TeachingCard>
			))}
		</div>

		{/* 3. The σε Story - Hero Element */}
		<TeachingCard
			scheme="neutral"

			eyebrow="The σε story"
			title="σε + article contraction"
			description={SE_CONTRACTIONS.intro}
			footer={
				<Callout scheme="neutral" title={SE_CONTRACTIONS.noArticle.title}>
					{SE_CONTRACTIONS.noArticle.explanation}:{" "}
					{SE_CONTRACTIONS.noArticle.examples.map((ex, i) => (
						<span key={ex.greek}>
							{i > 0 && ", "}
							<MonoText size="sm" variant="highlighted">
								{ex.greek}
							</MonoText>{" "}
							<span className="text-stone-600">({ex.english})</span>
						</span>
					))}
				</Callout>
			}
		>


			<div className="grid gap-3 sm:grid-cols-3">
				{SE_CONTRACTIONS.formulas.map((f) => {
					const gScheme = CONTRACTION_GENDER_SCHEME[f.gender] ?? "neutral";
					const style = SCHEME[gScheme];
					return (
						<div
							key={f.formula}
							className={cn(
								"rounded-xl border-2 p-3 text-center",
								style.bgSoft,
								"bg-opacity-40",
								style.borderSoft,
							)}
						>
							<div className={cn("mb-2 text-lg font-bold", style.text)}>{f.formula}</div>
							<div className="space-y-0.5">
								{f.examples.slice(0, 2).map((ex) => (
									<MonoText key={ex} variant="greek" size="sm" className="block text-stone-600">
										{ex}
									</MonoText>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</TeachingCard>

		{/* 4. Preposition + Pronouns */}
		<TeachingCard
			scheme="neutral"
			eyebrow="With pronouns"
			title="Prepositions with pronouns"
			description={PREPOSITION_PRONOUN_INFO.rule}
			footer={<p className="text-xs text-stone-500">{PREPOSITION_PRONOUN_INFO.why}</p>}
		>
			<div className="flex flex-wrap gap-2">
				{PREPOSITION_PRONOUN_INFO.examples.map((ex) => (
					<div
						key={ex.greek}
						className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm"
					>
						<MonoText size="sm" className="font-medium text-stone-800">
							{ex.greek}
						</MonoText>
						<span className="ml-1 text-stone-600">({ex.english})</span>
					</div>
				))}
			</div>
		</TeachingCard>

		{/* 5. Time Expressions */}
		<TeachingCard
			scheme="neutral"
			eyebrow="Time"
			title={
				<span className="flex items-center gap-2">
					<Clock size={18} className="text-stone-600" />
					Time expressions
				</span>
			}
		>
			<div className="grid gap-4 sm:grid-cols-3">
				{TIME_EXPRESSIONS.patterns.map((p) => (
					<div key={p.pattern}>
						<div className="mb-1 text-sm font-semibold text-stone-700">{p.pattern}</div>
						<div className="mb-2 text-xs text-stone-500">{p.meaning}</div>
						<div className="space-y-1">
							{p.examples.map((ex) => (
								<div key={ex.greek} className="text-sm">
									<MonoText size="sm" variant="greek">
										{ex.greek}
									</MonoText>
									<span className="ml-1 text-xs text-stone-500">{ex.english}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</TeachingCard>

		{/* 6. Common Mistakes */}
		<MistakeComparison
			mistakes={PREPOSITION_MISTAKES.map((m) => ({
				wrong: m.wrong,
				correct: m.right,
				explanation: m.rule,
			}))}
		/>

		{/* 7. Other Prepositions (Collapsible) */}
		<CollapsibleSection
			title="More Prepositions"
			subtitle="Less common but still useful"
			colorScheme="stone"
			defaultOpen={false}
		>
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{OTHER_PREPOSITIONS.map((prep) => (
					<div key={prep.greek} className="rounded-lg border border-stone-200 bg-white p-3">
						<div className="mb-1 flex items-baseline gap-2">
							<MonoText variant="greek" size="md" className="font-semibold text-stone-800">
								{prep.greek}
							</MonoText>
							<span className="text-sm text-stone-600">{prep.english}</span>
						</div>
						<MonoText variant="greek" size="sm" className="text-stone-500">
							{prep.example}
						</MonoText>
					</div>
				))}
			</div>
		</CollapsibleSection>

		{/* 8. Compound Prepositions */}
		<CollapsibleSection
			title="Compound Prepositions"
			subtitle="Spatial descriptions: on, under, next to, behind..."
			colorScheme="stone"
			defaultOpen={false}
		>
			<div className="space-y-4">
				{/* Pattern explanation — two rows, no inline/block mixing */}
				<div className="rounded-lg border border-stone-200 bg-white p-4 space-y-3">
					<p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
						The pattern
					</p>
					<div className="space-y-2 text-sm">
						<div className="flex items-center gap-2">
							<span className="w-20 shrink-0 rounded bg-stone-200 px-2 py-0.5 text-center text-xs font-semibold text-stone-700">
								+ σε
							</span>
							<span className="text-stone-600">contracts with article:</span>
							<MonoText size="sm" className="font-semibold text-stone-800">
								πάνω στο
							</MonoText>
						</div>
						<div className="flex items-center gap-2">
							<span className="w-20 shrink-0 rounded border border-stone-200 px-2 py-0.5 text-center text-xs text-stone-400">
								+ από
							</span>
							<span className="text-stone-500">no change:</span>
							<MonoText size="sm" className="text-stone-600">
								κάτω από το
							</MonoText>
						</div>
					</div>
				</div>

				{/* Two-column split by contraction behaviour */}
				{(() => {
					const all = COMPOUND_CONTRAST_PAIRS.flatMap((pair) => [pair.left, pair.right]);
					const contracts = all.filter((item) => item.usesσε);
					const noChange = all.filter((item) => !item.usesσε);
					const col = (items: typeof contracts, tinted: boolean) => (
						<div className="space-y-2">
							{items.map((item) => (
								<div
									key={item.greek}
									className={cn(
										"rounded-lg border p-3",
										tinted
											? "border-stone-300 bg-stone-100"
											: "border-stone-200 bg-white",
									)}
								>
									<div className="mb-1 flex items-baseline gap-2">
										<MonoText
											variant="greek"
											size="md"
											className="font-semibold text-stone-800"
										>
											{item.greek}
										</MonoText>
										<span className="text-sm text-stone-500">{item.english}</span>
									</div>
									<MonoText variant="greek" size="sm" className="block text-stone-500">
										{item.example}
									</MonoText>
								</div>
							))}
						</div>
					);
					return (
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
									σε — contracts
								</p>
								{col(contracts, true)}
							</div>
							<div className="space-y-2">
								<p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
									από — no change
								</p>
								{col(noChange, false)}
							</div>
						</div>
					);
				})()}
			</div>
		</CollapsibleSection>
	</section>
);
