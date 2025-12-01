import { AlertCircle, Lightbulb, Target } from "lucide-react";
import type React from "react";
import {
	ARTICLE_FORMULAS,
	DEFINITE_ARTICLES,
	MOVABLE_NU_RULE,
	type ArticleForm,
} from "../constants/articles";
import { CASE_RECOGNITION } from "../constants/recognition";
import { Card, InfoBox, MonoText, Table } from "../components/ui";

const CoreRules: React.FC = () => {
	// Helper function to render article forms with colors
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
			{/* Quick Rules Cheat Sheet - Most Important First */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"
			>
				<h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
					🎯 Quick Case Rules - Master These First!
				</h2>
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

			<InfoBox
				variant="info"
				title='The "Tin Tis Toun" Mystery Solved!'
				icon={<Lightbulb size={20} />}
			>
				These are all forms of "the" - they change based on gender, number, and
				case! This is your definitive reference for understanding the Greek
				article system.
			</InfoBox>

			{/* Essential Formulas - Critical for Understanding */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
			>
				<h2 className="text-xl font-bold text-center mb-4 text-green-800 flex items-center justify-center gap-2">
					<Target size={20} />
					Essential Formulas - How "στο" Really Works!
				</h2>
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

			{/* Article Tables - The Core Reference */}
			<div className="grid lg:grid-cols-2 gap-8">
				<div className="space-y-4">
					<Table
						title="📋 Singular Forms - Complete Reference"
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
						title="📋 Plural Forms - Complete Reference"
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

			{/* Quick Spot Check - Pattern Recognition */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200"
			>
				<h2 className="text-xl font-bold text-center mb-4 text-amber-800 flex items-center justify-center gap-2">
					<Target size={20} />🔍 Quick Spot Check - Instant Recognition
				</h2>
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

			{/* Movable Nu Rule - Linguistic Precision */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200"
			>
				<h2 className="text-xl font-bold text-center mb-4 text-slate-800 flex items-center justify-center gap-2">
					<AlertCircle size={20} />📝 The -ν Rule: When to Keep, When to Drop
				</h2>
				<InfoBox
					variant="info"
					title="Pro Tip"
					icon={<Lightbulb size={18} />}
					className="mb-6"
				>
					{MOVABLE_NU_RULE.rule}
				</InfoBox>
				<div className="grid md:grid-cols-2 gap-6">
					<div className="space-y-4">
						<h3 className="text-lg font-bold text-green-700 flex items-center gap-2">
							✅ Keep the -ν
						</h3>
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
						<h3 className="text-lg font-bold text-red-700 flex items-center gap-2">
							❌ Drop the -ν
						</h3>
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

			{/* Reference Note */}
			<InfoBox
				variant="success"
				title="Using This Reference"
				icon={<Target size={18} />}
			>
				This page is your grammar rulebook. Once you understand these patterns,
				head to <strong>"Daily Patterns"</strong> to see them in action with
				real examples!
			</InfoBox>
		</div>
	);
};



export function meta() {
  return [
    { title: "Core Rules - Greek Conjugation Reference" },
    { name: "description", content: "Fundamental Greek grammar rules and patterns" },
  ];
}

export default function CoreRulesRoute() {
  return <CoreRules />;
}
