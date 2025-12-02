import { AlertCircle, Lightbulb, Target } from "lucide-react";
import type React from "react";
import {
	ARTICLE_FORMULAS,
	DEFINITE_ARTICLES,
	MOVABLE_NU_RULE,
	type ArticleForm,
} from "../constants/articles";
import { CASE_RECOGNITION } from "../constants/recognition";
import { VERB_CONJUGATIONS } from "../constants/verbs";
import { Card, InfoBox, MonoText, Table } from "../components/ui";

const QuickReference: React.FC = () => {
	const renderArticleForm = (form: ArticleForm) => [
		form.case,
		<MonoText key={`${form.case}-m`} variant="masculine">
			{form.masculine}
		</MonoText>,
		<MonoText key={`${form.case}-f`} variant="feminine">
			{form.feminine}
		</MonoText>,
		<MonoText key={`${form.case}-n`} variant="neuter">
			{form.neuter}
		</MonoText>,
	];

	return (
		<div className="space-y-10">
			{/* Articles Section */}
			<section id="articles">
				<h2 className="text-2xl font-bold mb-6 text-gray-800">Articles</h2>

				<InfoBox
					variant="info"
					title='The "Tin Tis Toun" Mystery Solved'
					icon={<Lightbulb size={20} />}
					className="mb-6"
				>
					These are all forms of "the" - they change based on gender, number, and case.
				</InfoBox>

				<div className="grid lg:grid-cols-2 gap-8">
					<div className="space-y-4">
						<Table
							title="Singular Forms"
							headers={["Case", "Masculine", "Feminine", "Neuter"]}
							headerColors={[
								"",
								"text-blue-600 font-bold",
								"text-pink-600 font-bold",
								"text-green-600 font-bold",
							]}
							rows={DEFINITE_ARTICLES.singular.map(renderArticleForm)}
						/>
					</div>

					<div className="space-y-4">
						<Table
							title="Plural Forms"
							headers={["Case", "Masculine", "Feminine", "Neuter"]}
							headerColors={[
								"",
								"text-blue-600 font-bold",
								"text-pink-600 font-bold",
								"text-green-600 font-bold",
							]}
							rows={DEFINITE_ARTICLES.plural.map(renderArticleForm)}
						/>
					</div>
				</div>
			</section>

			{/* Cases Section */}
			<section id="cases">
				<h2 className="text-2xl font-bold mb-6 text-gray-800">Cases</h2>

				<Card
					variant="elevated"
					padding="lg"
					className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"
				>
					<h3 className="text-xl font-bold text-center mb-6 text-blue-800">
						Case Quick Reference
					</h3>
					<div className="grid md:grid-cols-3 gap-4">
						{CASE_RECOGNITION.quickRules.map((rule, index) => (
							<div
								key={index}
								className="text-center p-4 bg-white rounded-xl shadow-sm"
							>
								<div className="text-lg font-bold text-gray-800 mb-2">
									{rule.question}
								</div>
								<div className="text-blue-600 font-semibold mb-2">
									{rule.answer}
								</div>
								<MonoText variant="highlighted" size="sm">
									{rule.example}
								</MonoText>
							</div>
						))}
					</div>
				</Card>

				<Card
					variant="elevated"
					padding="lg"
					className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 mt-6"
				>
					<h3 className="text-xl font-bold text-center mb-4 text-amber-800 flex items-center justify-center gap-2">
						<Target size={20} />
						Pattern Recognition
					</h3>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{CASE_RECOGNITION.quickSpotCheck?.map((check, index) => (
							<div
								key={index}
								className="p-4 bg-white rounded-xl shadow-sm border border-amber-200"
							>
								<div className="text-lg font-bold text-amber-800 mb-2">
									{check.pattern}
								</div>
								<div className="text-amber-600 font-medium mb-3 text-sm">
									→ {check.meaning}
								</div>
								<div className="space-y-1">
									{check.examples.map((example, i) => (
										<MonoText
											key={i}
											variant="warning"
											size="sm"
											className="block"
										>
											{example}
										</MonoText>
									))}
								</div>
							</div>
						))}
					</div>
				</Card>
			</section>

			{/* Prepositions Section */}
			<section id="prepositions">
				<h2 className="text-2xl font-bold mb-6 text-gray-800">Prepositions</h2>

				<Card
					variant="elevated"
					padding="lg"
					className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
				>
					<h3 className="text-xl font-bold text-center mb-4 text-green-800 flex items-center justify-center gap-2">
						<Target size={20} />
						Preposition Contractions
					</h3>
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
										<MonoText
											key={i}
											variant="success"
											size="sm"
											className="block"
										>
											{example}
										</MonoText>
									))}
								</div>
							</div>
						))}
					</div>
				</Card>
			</section>

			{/* Verb Patterns Section */}
			<section id="verbs">
				<h2 className="text-2xl font-bold mb-6 text-gray-800">Verb Patterns</h2>

				<InfoBox
					variant="purple"
					title="Four Verb Families"
					icon={<Lightbulb size={20} />}
					className="mb-6"
				>
					Almost every Greek verb fits into one of these four patterns.
				</InfoBox>

				<div className="grid lg:grid-cols-2 gap-8 mb-6">
					<Card variant="bordered" padding="lg">
						<h3 className="text-lg font-bold mb-4 text-blue-600">
							Family 1: Active -ω verbs
						</h3>
						<InfoBox variant="info" size="sm" title="Pattern">
							<MonoText variant="highlighted" size="lg">
								-ω, -εις, -ει, -ουμε, -ετε, -ουν(ε)
							</MonoText>
						</InfoBox>
						<div className="mt-4">
							<Table
								title="κάνω (I do)"
								rows={VERB_CONJUGATIONS.kano.map((conj) => [
									conj.person,
									<MonoText key={conj.person}>{conj.form}</MonoText>,
									conj.english,
								])}
							/>
						</div>
					</Card>

					<Card variant="bordered" padding="lg">
						<h3 className="text-lg font-bold mb-4 text-blue-600">
							Family 2: Active -άω/-ώ verbs
						</h3>
						<InfoBox variant="info" size="sm" title="Pattern">
							<MonoText variant="highlighted" size="lg">
								-άω/-ώ, -άς, -άει/-ά, -άμε/-ούμε, -άτε, -άνε/-ούν(ε)
							</MonoText>
						</InfoBox>
						<div className="mt-4">
							<Table
								title="μιλάω (I speak)"
								rows={VERB_CONJUGATIONS.milao.map((conj) => [
									conj.person,
									<MonoText key={conj.person}>{conj.form}</MonoText>,
									conj.english,
								])}
							/>
						</div>
					</Card>

					<Card variant="bordered" padding="lg">
						<h3 className="text-lg font-bold mb-4 text-green-600">
							Family 3: Passive -ομαι verbs
						</h3>
						<InfoBox variant="info" size="sm" title="Pattern">
							<MonoText variant="highlighted" size="lg">
								-ομαι, -εσαι, -εται, -όμαστε, -εστε, -ονται
							</MonoText>
						</InfoBox>
						<div className="mt-4">
							<Table
								title="έρχομαι (I come)"
								rows={VERB_CONJUGATIONS.erhomai.map((conj) => [
									conj.person,
									<MonoText key={conj.person}>{conj.form}</MonoText>,
									conj.english,
								])}
							/>
						</div>
					</Card>

					<Card variant="bordered" padding="lg">
						<h3 className="text-lg font-bold mb-4 text-green-600">
							Family 4: Passive -άμαι verbs
						</h3>
						<InfoBox variant="info" size="sm" title="Pattern">
							<MonoText variant="highlighted" size="lg">
								-άμαι/-ιέμαι, -άσαι/-ιέσαι, -άται/-ιέται, -όμαστε/-ιόμαστε, -άστε/-ιέστε, -ώνται/-ιούνται
							</MonoText>
						</InfoBox>
						<div className="mt-4">
							<Table
								title="θυμάμαι (I remember)"
								rows={VERB_CONJUGATIONS.thymamai.map((conj) => [
									conj.person,
									<MonoText key={conj.person}>{conj.form}</MonoText>,
									conj.english,
								])}
							/>
						</div>
					</Card>
				</div>

				<Card variant="bordered" padding="lg" className="bg-blue-50 border-2 border-blue-200">
					<h3 className="text-lg font-bold mb-3 text-blue-800">Simple Future</h3>
					<div className="bg-white p-3 rounded mb-3">
						<p className="font-semibold">Formula: θα + present tense</p>
					</div>
					<div className="grid md:grid-cols-2 gap-3 text-sm">
						<div>
							<MonoText>θα κάνω</MonoText> = I will do
						</div>
						<div>
							<MonoText>θα μιλάω</MonoText> = I will speak
						</div>
						<div>
							<MonoText>θα έρχομαι</MonoText> = I will come
						</div>
						<div>
							<MonoText>θα θυμάμαι</MonoText> = I will remember
						</div>
					</div>
				</Card>
			</section>

			{/* The -ν Rule Section */}
			<section id="movable-nu">
				<h2 className="text-2xl font-bold mb-6 text-gray-800">The -ν Rule</h2>

				<Card
					variant="elevated"
					padding="lg"
					className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200"
				>
					<h3 className="text-xl font-bold text-center mb-4 text-slate-800 flex items-center justify-center gap-2">
						<AlertCircle size={20} />
						When to Keep, When to Drop
					</h3>
					<InfoBox
						variant="info"
						title="The Rule"
						icon={<Lightbulb size={18} />}
						className="mb-6"
					>
						{MOVABLE_NU_RULE.rule}
					</InfoBox>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<h4 className="text-lg font-bold text-green-700 flex items-center gap-2">
								Keep the -ν
							</h4>
							<div className="space-y-3">
								{MOVABLE_NU_RULE.examples.keep.map((example, index) => (
									<div
										key={index}
										className="p-3 bg-green-100 rounded-lg border border-green-200"
									>
										<MonoText variant="success" size="lg" className="block mb-1">
											{example.text}
										</MonoText>
										<div className="text-green-600 text-sm italic">
											{example.reason}
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="space-y-4">
							<h4 className="text-lg font-bold text-red-700 flex items-center gap-2">
								Drop the -ν
							</h4>
							<div className="space-y-3">
								{MOVABLE_NU_RULE.examples.drop.map((example, index) => (
									<div
										key={index}
										className="p-3 bg-red-100 rounded-lg border border-red-200"
									>
										<MonoText variant="error" size="lg" className="block mb-1">
											{example.text}
										</MonoText>
										<div className="text-red-600 text-sm italic">
											{example.reason}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</Card>
			</section>
		</div>
	);
};

export function meta() {
  return [
    { title: "Quick Reference - Greek Grammar Lookup" },
    { name: "description", content: "Grammar lookup - find what you need fast" },
  ];
}

export default function QuickReferenceRoute() {
  return <QuickReference />;
}
