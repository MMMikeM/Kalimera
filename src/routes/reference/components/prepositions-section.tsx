import { AlertTriangle, ArrowRight, Clock, Lightbulb } from "lucide-react";
import type React from "react";
import { Card } from "@/components/Card";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ContentSection } from "@/components/ContentSection";
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
				<ContentSection
					key={prep.greek}
					title={prep.greek}
					subtitle={prep.english}
					colorScheme={prep.colorScheme}
				>
					<div className="space-y-1 px-3 pt-3">
						{prep.examples.map((ex) => (
							<div key={ex.greek} className="text-sm">
								<MonoText size="sm" variant="greek" className="font-medium">
									{ex.greek}
								</MonoText>
								<span className="ml-2 text-stone-600">{ex.english}</span>
							</div>
						))}
					</div>
					{prep.contracts && (
						<div className="mx-3 mt-2 border-t border-stone-200 pt-2 text-xs text-stone-500">
							Contracts with articles → στο, στη, στον
						</div>
					)}
				</ContentSection>
			))}
		</div>

		{/* 3. The σε Story - Hero Element */}
		<Card variant="elevated" padding="lg" className="border-2 border-ocean-300 bg-ocean-50">
			<h3 className="mb-2 text-xl font-bold text-ocean-text">The σε Contraction</h3>
			<p className="mb-4 text-stone-600">{SE_CONTRACTIONS.intro}</p>

			<div className="mb-4 grid gap-3 sm:grid-cols-3">
				{SE_CONTRACTIONS.formulas.map((f) => (
					<div
						key={f.formula}
						className="rounded-xl border border-ocean-300 bg-white p-3 text-center"
					>
						<div className="mb-1 text-lg font-bold text-ocean-text">{f.formula}</div>
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

			<Alert variant="info">
				<AlertTitle>{SE_CONTRACTIONS.noArticle.title}</AlertTitle>
				<AlertDescription>
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
				</AlertDescription>
			</Alert>
		</Card>

		{/* 4. Preposition + Pronouns */}
		<Card variant="bordered" padding="lg">
			<h3 className="mb-2 text-lg font-bold text-olive-text">Prepositions with Pronouns</h3>
			<Alert variant="purple" className="mb-4">
				<AlertTitle>{PREPOSITION_PRONOUN_INFO.rule}</AlertTitle>
				<AlertDescription>{PREPOSITION_PRONOUN_INFO.why}</AlertDescription>
			</Alert>

			<div className="flex flex-wrap gap-2">
				{PREPOSITION_PRONOUN_INFO.examples.map((ex) => (
					<div
						key={ex.greek}
						className="rounded-full border border-olive-300 bg-olive-50 px-3 py-1.5 text-sm"
					>
						<MonoText size="sm" className="font-medium text-olive-text">
							{ex.greek}
						</MonoText>
						<span className="ml-1 text-stone-600">({ex.english})</span>
					</div>
				))}
			</div>
		</Card>

		{/* 5. Time Expressions */}
		<Card variant="bordered" padding="lg">
			<h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-stone-700">
				<Clock size={18} className="text-olive-text" />
				Time Expressions
			</h3>

			<div className="grid gap-4 sm:grid-cols-3">
				{TIME_EXPRESSIONS.patterns.map((p) => (
					<div key={p.pattern}>
						<div className="mb-1 text-sm font-semibold text-olive-text">{p.pattern}</div>
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
		</Card>

		{/* 6. Common Mistakes */}
		<Card variant="bordered" padding="lg" className="border-terracotta-300 bg-terracotta-50">
			<h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-terracotta-text">
				<AlertTriangle size={18} />
				Common Mistakes
			</h3>

			<div className="space-y-2">
				{PREPOSITION_MISTAKES.map((mistake) => (
					<div
						key={mistake.wrong}
						className="flex items-start gap-3 rounded-lg border border-terracotta-200 bg-white p-2"
					>
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-2 text-sm">
								<span className="text-terracotta-text line-through">
									<MonoText size="sm">{mistake.wrong}</MonoText>
								</span>
								<ArrowRight size={14} className="shrink-0 text-stone-400" />
								<span className="font-medium text-olive-text">
									<MonoText size="sm">{mistake.right}</MonoText>
								</span>
							</div>
							<div className="mt-0.5 text-xs text-stone-500">{mistake.rule}</div>
						</div>
					</div>
				))}
			</div>
		</Card>

		{/* 7. Other Prepositions (Collapsible) */}
		<CollapsibleSection
			title="More Prepositions"
			subtitle="Less common but still useful"
			colorScheme="ocean"
			defaultOpen={false}
		>
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{OTHER_PREPOSITIONS.map((prep) => (
					<div key={prep.greek} className="rounded-lg border border-ocean-200 bg-white p-3">
						<div className="mb-1 flex items-baseline gap-2">
							<MonoText variant="greek" size="md" className="font-semibold text-ocean-text">
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
			colorScheme="ocean"
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

				{/* Color Legend */}
				<Alert variant="default" className="border-stone-200 bg-stone-50">
					<Lightbulb size={16} className="text-stone-600" />
					<AlertTitle className="text-stone-700">Color coding = contraction behavior</AlertTitle>
					<AlertDescription className="flex flex-wrap items-center gap-4">
						<span className="flex items-center gap-2">
							<span className="h-4 w-4 rounded border border-olive-400 bg-olive-300" />
							<span className="font-medium text-olive-text">Olive = σε</span>
							<span className="text-stone-600">
								(contracts: δίπλα <strong>στο</strong>)
							</span>
						</span>
						<span className="flex items-center gap-2">
							<span className="h-4 w-4 rounded border border-ocean-400 bg-ocean-300" />
							<span className="font-medium text-ocean-text">Blue = από</span>
							<span className="text-stone-600">
								(no contraction: κάτω <strong>από το</strong>)
							</span>
						</span>
					</AlertDescription>
				</Alert>

				{/* Contrast Pairs */}
				<div className="space-y-3">
					{COMPOUND_CONTRAST_PAIRS.map((pair) => (
						<div key={pair.left.greek} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<div
								className={`rounded-lg border p-3 ${
									pair.left.usesσε
										? "border-olive-300 bg-olive-100"
										: "border-ocean-300 bg-ocean-100"
								}`}
							>
								<div className="mb-1 flex items-baseline justify-between">
									<MonoText
										variant="greek"
										size="md"
										className={`font-semibold ${pair.left.usesσε ? "text-olive-text" : "text-ocean-text"}`}
									>
										{pair.left.greek}
									</MonoText>
									<span className="text-sm text-stone-600">{pair.left.english}</span>
								</div>
								<MonoText variant="greek" size="sm" className="block text-stone-600">
									{pair.left.example}
								</MonoText>
							</div>

							<div
								className={`rounded-lg border p-3 ${
									pair.right.usesσε
										? "border-olive-300 bg-olive-100"
										: "border-ocean-300 bg-ocean-100"
								}`}
							>
								<div className="mb-1 flex items-baseline justify-between">
									<MonoText
										variant="greek"
										size="md"
										className={`font-semibold ${pair.right.usesσε ? "text-olive-text" : "text-ocean-text"}`}
									>
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
