import { Clock, Lightbulb, Target, Users } from "lucide-react";
import type React from "react";
import {
	ARTICLE_FORMULAS,
	COMPOUND_PREPOSITION_PAIRS,
	PREPOSITION_PRONOUN_EXAMPLES,
	SIMPLE_PREPOSITIONS,
	TIME_PREPOSITION_EXAMPLES,
} from "../../constants/articles";
import { Card, MonoText, SectionHeading, KeyInsight, QuickTest } from "../../components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PREPOSITION_QUICK_TEST = [
	{
		answer: "σε / στο",
		condition: "Location where something IS or going TO",
		examples: [
			{ greek: "στο σπίτι", english: "at/to home" },
			{ greek: "στη δουλειά", english: "at/to work" },
		],
	},
	{
		answer: "από",
		condition: "Coming FROM somewhere",
		examples: [
			{ greek: "από το σπίτι", english: "from home" },
			{ greek: "από την Αθήνα", english: "from Athens" },
		],
	},
	{
		answer: "με",
		condition: "WITH someone/something",
		examples: [
			{ greek: "με τον φίλο μου", english: "with my friend" },
			{ greek: "με το αυτοκίνητο", english: "by car" },
		],
	},
	{
		answer: "για",
		condition: "FOR someone or a purpose",
		examples: [
			{ greek: "για σένα", english: "for you" },
			{ greek: "για δουλειά", english: "for work" },
		],
	},
];

// ============================================================================
// SECTION 5: PREPOSITIONS
// ============================================================================
export const PrepositionsSection: React.FC = () => (
	<section id="prepositions" className="space-y-6">
		<SectionHeading
			title="Prepositions"
			subtitle="Simple and compound prepositions with articles and pronouns"
		/>

		<KeyInsight
			title="All prepositions take accusative"
			expandedExample={{
				label: "What this means in practice",
				content: (
					<div className="space-y-2 text-sm">
						<p>After any preposition, always use the accusative article forms:</p>
						<div className="flex flex-wrap gap-2 mt-2">
							<span className="px-2 py-1 bg-white rounded border border-santorini/20">
								<MonoText variant="greek" size="sm">τον</MonoText> (masc)
							</span>
							<span className="px-2 py-1 bg-white rounded border border-santorini/20">
								<MonoText variant="greek" size="sm">την</MonoText> (fem)
							</span>
							<span className="px-2 py-1 bg-white rounded border border-santorini/20">
								<MonoText variant="greek" size="sm">το</MonoText> (neut)
							</span>
						</div>
						<p className="mt-2">
							<MonoText variant="greek" size="sm">με <strong>τον</strong> φίλο</MonoText> (with the friend) — not *με ο φίλος
						</p>
					</div>
				),
			}}
		>
			No exceptions! This simplifies things considerably.
		</KeyInsight>

		{/* Simple Prepositions - Compact Table */}
		<Card variant="bordered" padding="lg">
			<h3 className="text-lg font-bold mb-4 text-olive-text">
				Simple Prepositions
			</h3>
			<div className="grid md:grid-cols-3 gap-4">
				{Object.entries(SIMPLE_PREPOSITIONS).map(([key, category]) => (
					<div key={key}>
						<h4 className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-2">
							{category.label}
						</h4>
						<div className="space-y-1">
							{category.items.map((item, index) => (
								<div key={index} className="flex items-baseline gap-2">
									<MonoText variant="greek" size="md" className="text-olive-text font-semibold">
										{item.greek}
									</MonoText>
									<span className="text-stone-600 text-sm">{item.english}</span>
									{"note" in item && item.note && (
										<span className="text-xs text-olive-text">({item.note})</span>
									)}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</Card>

		{/* σε Contractions */}
		<Card
			variant="elevated"
			padding="lg"
			className="bg-olive/5 border-2 border-olive/30"
		>
			<h3 className="text-xl font-bold text-center mb-4 text-olive-text flex items-center justify-center gap-2">
				<Target size={20} />
				The σε Contraction
			</h3>
			<p className="text-center text-stone-600 mb-2">
				σε + article always contracts to στο/στη/στον
			</p>
			<p className="text-center text-sm text-olive-text mb-4">
				These contractions are mandatory in speech — you'll never hear "σε το"
			</p>
			<div className="grid md:grid-cols-3 gap-4">
				{ARTICLE_FORMULAS.map((formula, index) => (
					<div
						key={index}
						className="text-center p-4 bg-white rounded-xl shadow-sm border border-olive/30"
					>
						<div className="text-lg font-bold text-olive-text mb-2">
							{formula.formula}
						</div>
						<div className="text-sm text-stone-600 mb-3">
							{formula.explanation}
						</div>
						<div className="space-y-1">
							{formula.examples.map((example, i) => (
								<MonoText key={i} variant="greek" size="sm" className="block text-olive-text">
									{example}
								</MonoText>
							))}
						</div>
					</div>
				))}
			</div>
		</Card>

		{/* QuickTest - Which preposition? */}
		<QuickTest
			title="Which preposition?"
			colorScheme="olive"
			options={PREPOSITION_QUICK_TEST}
		/>

		{/* Compound Prepositions - Contrast Pairs */}
		<Card variant="bordered" padding="lg">
			<h3 className="text-lg font-bold mb-2 text-olive-text">
				Compound Prepositions
			</h3>
			<p className="text-stone-600 mb-4">
				Adverb + σε/από — learn as contrast pairs
			</p>

			{/* Color legend BEFORE content */}
			<Alert variant="default" className="mb-4 bg-stone-50 border-stone-200">
				<Lightbulb size={16} className="text-stone-600" />
				<AlertTitle className="text-stone-700">Color coding</AlertTitle>
				<AlertDescription className="flex items-center gap-4 flex-wrap">
					<span className="flex items-center gap-2">
						<span className="w-4 h-4 rounded bg-olive/30 border border-olive/50" />
						<span className="font-medium text-olive-text">Olive = σε</span>
						<span className="text-stone-600">(contracts: δίπλα <strong>στο</strong>)</span>
					</span>
					<span className="flex items-center gap-2">
						<span className="w-4 h-4 rounded bg-aegean/30 border border-aegean/50" />
						<span className="font-medium text-aegean-text">Blue = από</span>
						<span className="text-stone-600">(no contraction: μπροστά <strong>από το</strong>)</span>
					</span>
				</AlertDescription>
			</Alert>

			<div className="space-y-4">
				{COMPOUND_PREPOSITION_PAIRS.map((group) => (
					<div key={group.category}>
						<h4 className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-2">
							{group.category}
						</h4>
						<div className="space-y-2">
							{group.pairs.map((pair, index) => (
								<div
									key={index}
									className="grid grid-cols-2 gap-3"
								>
									{/* Left side - σε (olive) */}
									<div className="p-3 bg-olive/10 rounded-lg border border-olive/30">
										<div className="flex items-baseline justify-between mb-1">
											<MonoText variant="greek" size="md" className="text-olive-text font-semibold">
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
									{/* Right side - από (aegean) */}
									<div className="p-3 bg-aegean/10 rounded-lg border border-aegean/30">
										<div className="flex items-baseline justify-between mb-1">
											<MonoText variant="greek" size="md" className="text-aegean-text font-semibold">
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
				))}
			</div>
		</Card>

		{/* Common Patterns - Merged Section */}
		<Card variant="bordered" padding="lg">
			<h3 className="text-lg font-bold mb-4 text-olive-text">Common Patterns</h3>
			<div className="grid md:grid-cols-2 gap-6">
				<div>
					<h4 className="font-semibold text-stone-700 mb-3 flex items-center gap-2">
						<Users size={16} className="text-olive-text" />
						With Pronouns
					</h4>
					<div className="space-y-2">
						{PREPOSITION_PRONOUN_EXAMPLES.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-2 bg-stone-50 rounded"
							>
								<MonoText variant="greek" size="md" className="text-olive-text font-medium">
									{item.greek}
								</MonoText>
								<span className="text-stone-600 text-sm">{item.english}</span>
							</div>
						))}
					</div>
				</div>

				<div>
					<h4 className="font-semibold text-stone-700 mb-3 flex items-center gap-2">
						<Clock size={16} className="text-olive-text" />
						Time Expressions
					</h4>
					<div className="space-y-2">
						{TIME_PREPOSITION_EXAMPLES.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-2 bg-stone-50 rounded"
							>
								<MonoText variant="greek" size="md" className="text-olive-text font-medium">
									{item.greek}
								</MonoText>
								<span className="text-stone-600 text-sm">{item.english}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	</section>
);
