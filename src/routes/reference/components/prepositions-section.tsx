import { AlertTriangle, ArrowRight, Clock, Lightbulb } from "lucide-react";
import type React from "react";
import {
	BIG_4_PREPOSITIONS,
	COMPOUND_CONTRAST_PAIRS,
	OTHER_PREPOSITIONS,
	PREPOSITION_MISTAKES,
	PREPOSITION_PRONOUN_INFO,
	SE_CONTRACTIONS,
	TIME_EXPRESSIONS,
} from "@/constants/prepositions";
import { Card } from "@/components/Card";
import { CategoryCard } from "@/components/CategoryCard";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { KeyInsight } from "@/components/KeyInsight";
import { MonoText } from "@/components/MonoText";
import { SectionHeading } from "@/components/SectionHeading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
		<div className="grid sm:grid-cols-2 gap-4">
			{BIG_4_PREPOSITIONS.map((prep) => (
				<CategoryCard
					key={prep.greek}
					title={prep.greek}
					subtitle={prep.english}
					colorScheme={prep.colorScheme}
					priority="primary"
				>
					<div className="space-y-1">
						{prep.examples.map((ex) => (
							<div key={ex.greek} className="text-sm">
								<MonoText size="sm" variant="greek" className="font-medium">
									{ex.greek}
								</MonoText>
								<span className="text-stone-600 ml-2">{ex.english}</span>
							</div>
						))}
					</div>
					{prep.contracts && (
						<div className="mt-2 pt-2 border-t border-stone-200 text-xs text-stone-500">
							Contracts with articles → στο, στη, στον
						</div>
					)}
				</CategoryCard>
			))}
		</div>

		{/* 3. The σε Story - Hero Element */}
		<Card
			variant="elevated"
			padding="lg"
			className="bg-ocean-50 border-2 border-ocean-300"
		>
			<h3 className="text-xl font-bold text-ocean-text mb-2">
				The σε Contraction
			</h3>
			<p className="text-stone-600 mb-4">{SE_CONTRACTIONS.intro}</p>

			<div className="grid sm:grid-cols-3 gap-3 mb-4">
				{SE_CONTRACTIONS.formulas.map((f) => (
					<div
						key={f.formula}
						className="text-center p-3 bg-white rounded-xl border border-ocean-300"
					>
						<div className="text-lg font-bold text-ocean-text mb-1">
							{f.formula}
						</div>
						<div className="text-xs text-stone-500 mb-2">{f.gender}</div>
						<div className="space-y-0.5">
							{f.examples.slice(0, 2).map((ex) => (
								<MonoText
									key={ex}
									variant="greek"
									size="sm"
									className="block text-stone-600"
								>
									{ex}
								</MonoText>
							))}
						</div>
					</div>
				))}
			</div>

			<KeyInsight title={SE_CONTRACTIONS.noArticle.title}>
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
			</KeyInsight>
		</Card>

		{/* 4. Preposition + Pronouns */}
		<Card variant="bordered" padding="lg">
			<h3 className="text-lg font-bold text-olive-text mb-2">
				Prepositions with Pronouns
			</h3>
			<Alert variant="purple" className="mb-4">
				<AlertTitle>{PREPOSITION_PRONOUN_INFO.rule}</AlertTitle>
				<AlertDescription>{PREPOSITION_PRONOUN_INFO.why}</AlertDescription>
			</Alert>

			<div className="flex flex-wrap gap-2">
				{PREPOSITION_PRONOUN_INFO.examples.map((ex) => (
					<div
						key={ex.greek}
						className="px-3 py-1.5 bg-olive-50 rounded-full border border-olive-300 text-sm"
					>
						<MonoText size="sm" className="text-olive-text font-medium">
							{ex.greek}
						</MonoText>
						<span className="text-stone-600 ml-1">({ex.english})</span>
					</div>
				))}
			</div>
		</Card>

		{/* 5. Time Expressions */}
		<Card variant="bordered" padding="lg">
			<h3 className="text-lg font-bold text-stone-700 mb-3 flex items-center gap-2">
				<Clock size={18} className="text-olive-text" />
				Time Expressions
			</h3>

			<div className="grid sm:grid-cols-3 gap-4">
				{TIME_EXPRESSIONS.patterns.map((p) => (
					<div key={p.pattern}>
						<div className="text-sm font-semibold text-olive-text mb-1">
							{p.pattern}
						</div>
						<div className="text-xs text-stone-500 mb-2">{p.meaning}</div>
						<div className="space-y-1">
							{p.examples.map((ex) => (
								<div key={ex.greek} className="text-sm">
									<MonoText size="sm" variant="greek">
										{ex.greek}
									</MonoText>
									<span className="text-stone-500 ml-1 text-xs">
										{ex.english}
									</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</Card>

		{/* 6. Common Mistakes */}
		<Card
			variant="bordered"
			padding="lg"
			className="bg-terracotta-50 border-terracotta-300"
		>
			<h3 className="text-lg font-bold text-terracotta-text mb-3 flex items-center gap-2">
				<AlertTriangle size={18} />
				Common Mistakes
			</h3>

			<div className="space-y-2">
				{PREPOSITION_MISTAKES.map((mistake) => (
					<div
						key={mistake.wrong}
						className="flex items-start gap-3 p-2 bg-white rounded-lg border border-terracotta-200"
					>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 text-sm">
								<span className="text-terracotta-text line-through">
									<MonoText size="sm">{mistake.wrong}</MonoText>
								</span>
								<ArrowRight size={14} className="text-stone-400 shrink-0" />
								<span className="text-olive-text font-medium">
									<MonoText size="sm">{mistake.right}</MonoText>
								</span>
							</div>
							<div className="text-xs text-stone-500 mt-0.5">
								{mistake.rule}
							</div>
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
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
				{OTHER_PREPOSITIONS.map((prep) => (
					<div
						key={prep.greek}
						className="p-3 bg-white rounded-lg border border-ocean-200"
					>
						<div className="flex items-baseline gap-2 mb-1">
							<MonoText
								variant="greek"
								size="md"
								className="text-ocean-text font-semibold"
							>
								{prep.greek}
							</MonoText>
							<span className="text-stone-600 text-sm">{prep.english}</span>
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
				<KeyInsight title="The Pattern">
					Compound prepositions = <strong>position word</strong> +{" "}
					<MonoText size="sm">σε</MonoText> or{" "}
					<MonoText size="sm">από</MonoText>. The{" "}
					<MonoText size="sm">σε</MonoText> ones contract with articles (πάνω{" "}
					<strong>στο</strong>), the <MonoText size="sm">από</MonoText> ones
					don't (κάτω <strong>από το</strong>).
				</KeyInsight>

				{/* Color Legend */}
				<Alert variant="default" className="bg-stone-50 border-stone-200">
					<Lightbulb size={16} className="text-stone-600" />
					<AlertTitle className="text-stone-700">
						Color coding = contraction behavior
					</AlertTitle>
					<AlertDescription className="flex items-center gap-4 flex-wrap">
						<span className="flex items-center gap-2">
							<span className="w-4 h-4 rounded bg-olive-300 border border-olive-400" />
							<span className="text-olive-text font-medium">Olive = σε</span>
							<span className="text-stone-600">
								(contracts: δίπλα <strong>στο</strong>)
							</span>
						</span>
						<span className="flex items-center gap-2">
							<span className="w-4 h-4 rounded bg-ocean-300 border border-ocean-400" />
							<span className="text-ocean-text font-medium">Blue = από</span>
							<span className="text-stone-600">
								(no contraction: κάτω <strong>από το</strong>)
							</span>
						</span>
					</AlertDescription>
				</Alert>

				{/* Contrast Pairs */}
				<div className="space-y-3">
					{COMPOUND_CONTRAST_PAIRS.map((pair) => (
						<div
							key={pair.left.greek}
							className="grid grid-cols-1 sm:grid-cols-2 gap-3"
						>
							<div
								className={`p-3 rounded-lg border ${pair.left.usesσε
										? "bg-olive-100 border-olive-300"
										: "bg-ocean-100 border-ocean-300"
									}`}
							>
								<div className="flex items-baseline justify-between mb-1">
									<MonoText
										variant="greek"
										size="md"
										className={`font-semibold ${pair.left.usesσε ? "text-olive-text" : "text-ocean-text"
											}`}
									>
										{pair.left.greek}
									</MonoText>
									<span className="text-stone-600 text-sm">
										{pair.left.english}
									</span>
								</div>
								<MonoText
									variant="greek"
									size="sm"
									className="block text-stone-600"
								>
									{pair.left.example}
								</MonoText>
							</div>

							<div
								className={`p-3 rounded-lg border ${pair.right.usesσε
										? "bg-olive-100 border-olive-300"
										: "bg-ocean-100 border-ocean-300"
									}`}
							>
								<div className="flex items-baseline justify-between mb-1">
									<MonoText
										variant="greek"
										size="md"
										className={`font-semibold ${pair.right.usesσε ? "text-olive-text" : "text-ocean-text"
											}`}
									>
										{pair.right.greek}
									</MonoText>
									<span className="text-stone-600 text-sm">
										{pair.right.english}
									</span>
								</div>
								<MonoText
									variant="greek"
									size="sm"
									className="block text-stone-600"
								>
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
