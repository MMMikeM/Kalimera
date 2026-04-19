import { Clock } from "lucide-react";
import type React from "react";

import { Callout, TeachingCard } from "@/components/cards";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { MistakeComparison } from "@/components/MistakeComparison";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	BIG_4_PREPOSITIONS,
	COMPOUND_CONTRAST_PAIRS,
	OTHER_PREPOSITIONS,
	PREPOSITION_MISTAKES,
	PREPOSITION_PRONOUN_INFO,
	SE_CONTRACTIONS,
	TIME_EXPRESSIONS,
} from "@/constants/prepositions";

import { PrepositionNavigator } from "./preposition-navigator";

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
					tone="soft"
					eyebrow="Big 4"
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
			tone="full"
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
				{SE_CONTRACTIONS.formulas.map((f) => (
					<div
						key={f.formula}
						className="rounded-xl border border-stone-300 bg-white p-3 text-center"
					>
						<div className="mb-1 text-lg font-bold text-stone-800">{f.formula}</div>
						<div className="mb-2 text-xs text-stone-500">{f.gender}</div>
						<div className="space-y-0.5">
							{f.examples.slice(0, 2).map((ex) => (
								<MonoText key={ex} variant="greek" size="sm" className="block text-stone-600">
									{ex}
								</MonoText>
							))}
						</div>
					</div>
				))}
			</div>
		</TeachingCard>

		{/* 4. Preposition + Pronouns */}
		<TeachingCard
			scheme="neutral"
			tone="soft"
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
			tone="soft"
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
			colorScheme="ocean"
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
				<Alert variant="info">
					<AlertTitle>The Pattern</AlertTitle>
					<AlertDescription>
						Compound prepositions = <strong>position word</strong> +{" "}
						<MonoText size="sm">σε</MonoText> or <MonoText size="sm">από</MonoText>. The{" "}
						<MonoText size="sm">σε</MonoText> ones contract with articles (πάνω <strong>στο</strong>
						), the <MonoText size="sm">από</MonoText> ones don't (κάτω <strong>από το</strong>).
					</AlertDescription>
				</Alert>

				{/* TODO(local-axis): contraction-behaviour (σε vs από) is a page-local
				    axis. Previously signalled by olive/ocean fills — reusing case
				    colours here asserts a false grammatical value. Neutralised for
				    now; revisit with a dedicated local-axis palette. */}

				{/* Contrast Pairs */}
				<div className="space-y-3">
					{COMPOUND_CONTRAST_PAIRS.map((pair) => (
						<div key={pair.left.greek} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<div className="rounded-lg border border-stone-300 bg-stone-100 p-3">
								<div className="mb-1 flex items-baseline justify-between">
									<MonoText variant="greek" size="md" className="font-semibold text-stone-800">
										{pair.left.greek}
									</MonoText>
									<span className="text-sm text-stone-600">{pair.left.english}</span>
								</div>
								<MonoText variant="greek" size="sm" className="block text-stone-600">
									{pair.left.example}
								</MonoText>
							</div>

							<div className="rounded-lg border border-stone-300 bg-stone-100 p-3">
								<div className="mb-1 flex items-baseline justify-between">
									<MonoText variant="greek" size="md" className="font-semibold text-stone-800">
										{pair.right.greek}
									</MonoText>
									<span className="text-sm text-stone-600">{pair.right.english}</span>
								</div>
								<MonoText variant="greek" size="sm" className="block text-stone-600">
									{pair.right.example}
								</MonoText>
							</div>
						</div>
					))}
				</div>
			</div>
		</CollapsibleSection>
	</section>
);
