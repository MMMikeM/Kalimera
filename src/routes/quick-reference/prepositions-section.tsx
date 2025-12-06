import { Clock, Lightbulb, Target, Users } from "lucide-react";
import type React from "react";
import {
	ARTICLE_FORMULAS,
	COMPOUND_PREPOSITION_PAIRS,
	PREPOSITION_PRONOUN_EXAMPLES,
	SIMPLE_PREPOSITIONS,
	TIME_PREPOSITION_EXAMPLES,
} from "../../constants/articles";
import { Card, MonoText } from "../../components";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// ============================================================================
// SECTION 5: PREPOSITIONS
// ============================================================================
export const PrepositionsSection: React.FC = () => (
	<section id="prepositions" className="space-y-6">
		<div>
			<h2 className="text-2xl font-bold text-gray-800">Prepositions</h2>
			<p className="text-gray-600 mt-1">
				Simple and compound prepositions with articles and pronouns
			</p>
		</div>

		<Alert variant="info">
			<Lightbulb size={16} />
			<AlertTitle>Key insight</AlertTitle>
			<AlertDescription>
				All common prepositions take the accusative case — no exceptions!
			</AlertDescription>
		</Alert>

		{/* Simple Prepositions - Compact Table */}
		<Card variant="bordered" padding="lg">
			<h3 className="text-lg font-bold mb-4 text-green-700">
				Simple Prepositions
			</h3>
			<div className="grid md:grid-cols-3 gap-4">
				{Object.entries(SIMPLE_PREPOSITIONS).map(([key, category]) => (
					<div key={key}>
						<h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
							{category.label}
						</h4>
						<div className="space-y-1">
							{category.items.map((item, index) => (
								<div key={index} className="flex items-baseline gap-2">
									<MonoText variant="success" size="md">
										{item.greek}
									</MonoText>
									<span className="text-gray-600 text-sm">{item.english}</span>
									{"note" in item && item.note && (
										<span className="text-xs text-green-600">({item.note})</span>
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
			className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
		>
			<h3 className="text-xl font-bold text-center mb-4 text-green-800 flex items-center justify-center gap-2">
				<Target size={20} />
				The σε Contraction
			</h3>
			<p className="text-center text-gray-600 mb-4">
				σε + article always contracts to στο/στη/στον
			</p>
			<div className="grid md:grid-cols-3 gap-4">
				{ARTICLE_FORMULAS.map((formula, index) => (
					<div
						key={index}
						className="text-center p-4 bg-white rounded-xl shadow-sm border border-green-200"
					>
						<div className="text-lg font-bold text-green-800 mb-2">
							{formula.formula}
						</div>
						<div className="text-sm text-gray-600 mb-3">
							{formula.explanation}
						</div>
						<div className="space-y-1">
							{formula.examples.map((example, i) => (
								<MonoText key={i} variant="success" size="sm" className="block">
									{example}
								</MonoText>
							))}
						</div>
					</div>
				))}
			</div>
		</Card>

		{/* Compound Prepositions - Contrast Pairs */}
		<Card variant="bordered" padding="lg">
			<h3 className="text-lg font-bold mb-2 text-green-700">
				Compound Prepositions
			</h3>
			<p className="text-gray-600 mb-4">
				Adverb + σε/από — learn as contrast pairs
			</p>

			<div className="space-y-4">
				{COMPOUND_PREPOSITION_PAIRS.map((group) => (
					<div key={group.category}>
						<h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
							{group.category}
						</h4>
						<div className="space-y-2">
							{group.pairs.map((pair, index) => (
								<div
									key={index}
									className="grid grid-cols-2 gap-3"
								>
									{/* Left side */}
									<div className="p-3 bg-green-50 rounded-lg border border-green-200">
										<div className="flex items-baseline justify-between mb-1">
											<MonoText variant="success" size="md">
												{pair.left.greek}
											</MonoText>
											<span className="text-gray-500 text-sm">
												{pair.left.english}
											</span>
										</div>
										<MonoText
											variant="highlighted"
											size="sm"
											className="block text-gray-600"
										>
											{pair.left.example}
										</MonoText>
									</div>
									{/* Right side */}
									<div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
										<div className="flex items-baseline justify-between mb-1">
											<MonoText variant="primary" size="md">
												{pair.right.greek}
											</MonoText>
											<span className="text-gray-500 text-sm">
												{pair.right.english}
											</span>
										</div>
										<MonoText
											variant="highlighted"
											size="sm"
											className="block text-gray-600"
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

			<div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
				<p className="text-sm text-gray-600">
					<span className="font-medium text-green-700">Green = σε</span>{" "}
					contracts (δίπλα <strong>στο</strong>){" · "}
					<span className="font-medium text-blue-700">Blue = από</span>{" "}
					doesn't contract (μπροστά <strong>από το</strong>)
				</p>
			</div>
		</Card>

		{/* Common Patterns - Merged Section */}
		<Card variant="bordered" padding="lg">
			<h3 className="text-lg font-bold mb-4 text-green-700">Common Patterns</h3>
			<div className="grid md:grid-cols-2 gap-6">
				<div>
					<h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
						<Users size={16} className="text-green-600" />
						With Pronouns
					</h4>
					<div className="space-y-2">
						{PREPOSITION_PRONOUN_EXAMPLES.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-2 bg-gray-50 rounded"
							>
								<MonoText variant="success" size="md">
									{item.greek}
								</MonoText>
								<span className="text-gray-600 text-sm">{item.english}</span>
							</div>
						))}
					</div>
				</div>

				<div>
					<h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
						<Clock size={16} className="text-green-600" />
						Time Expressions
					</h4>
					<div className="space-y-2">
						{TIME_PREPOSITION_EXAMPLES.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-2 bg-gray-50 rounded"
							>
								<MonoText variant="success" size="md">
									{item.greek}
								</MonoText>
								<span className="text-gray-600 text-sm">{item.english}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	</section>
);

