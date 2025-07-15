import React from "react";
import { Lightbulb } from "lucide-react";
import {
	DEFINITE_ARTICLES,
	CASE_EXAMPLES,
	PREPOSITION_PATTERNS,
} from "../constants/articles";
import { CASE_RECOGNITION, COMMON_MISTAKES } from "../constants/recognition";
import type { ArticleForm } from "../types/greek-reference";
import { Card, InfoBox, Badge, MonoText, Table } from "./ui";

const ArticlesAndCases: React.FC = () => {
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
				case! Focus on <strong>accusative (objects)</strong> and{" "}
				<strong>genitive (possession)</strong> first.
			</InfoBox>

			{/* Article Tables - Reorganized by Importance */}
			<div className="grid lg:grid-cols-2 gap-8">
				<div className="space-y-4">
					<Table
						title="🔥 Most Important: Accusative & Genitive"
						headers={["Case", "Masculine", "Feminine", "Neuter"]}
						headerColors={[
							"",
							"text-blue-600 font-bold",
							"text-pink-600 font-bold",
							"text-green-600 font-bold",
						]}
						rows={[
							...DEFINITE_ARTICLES.singular
								.filter(
									(form) =>
										form.case.includes("Acc") || form.case.includes("Gen"),
								)
								.map(renderArticleForm),
							...DEFINITE_ARTICLES.singular
								.filter((form) => form.case.includes("Nom"))
								.map(renderArticleForm),
						]}
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

			{/* FREQUENCY-BASED LEARNING ORGANIZATION */}

			{/* ESSENTIAL DAILY PATTERNS (80% of usage) */}
			<div className="space-y-8">
				<div className="text-center">
					<h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
						🔥 Essential Daily Patterns (80% of usage)
					</h2>
					<p className="text-gray-600 mt-2">
						Master these first - they cover most conversations!
					</p>
				</div>

				{/* Direct Objects - THE most important */}
				<Card
					variant="bordered"
					padding="lg"
					className="border-red-200 bg-red-50/30"
				>
					<h3 className="text-xl font-bold mb-4 text-red-700 flex items-center gap-2">
						<span className="bg-red-100 rounded-full px-3 py-1 text-sm">
							#1 Priority
						</span>
						🎯 Direct Objects: τον/την/το
					</h3>
					<div className="mb-4 p-4 bg-white rounded-lg">
						<div className="text-sm text-red-600 font-semibold mb-2">
							When to use:
						</div>
						<div className="text-gray-700">
							Use accusative (τον/την/το) for anything you DO something to - the
							direct object of action verbs.
						</div>
					</div>
					<div className="grid md:grid-cols-2 gap-4">
						{CASE_EXAMPLES.accusative
							.filter(
								(ex) =>
									ex.explanation.includes("direct object") ||
									ex.explanation.includes("object of") ||
									ex.greek.includes("βλέπω") ||
									ex.greek.includes("τρώω") ||
									ex.greek.includes("θέλω"),
							)
							.map((example, index) => (
								<div
									key={index}
									className="p-3 bg-red-100 rounded-lg border border-red-200"
								>
									<MonoText variant="error" size="lg" className="block mb-1">
										{example.greek}
									</MonoText>
									<div className="text-gray-700 text-sm mb-1 font-medium">
										{example.english}
									</div>
									<div className="text-red-600 text-xs italic">
										{example.explanation}
									</div>
								</div>
							))}
					</div>
				</Card>

				{/* Going Places - Second most important */}
				<Card
					variant="bordered"
					padding="lg"
					className="border-blue-200 bg-blue-50/30"
				>
					<h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
						<span className="bg-blue-100 rounded-full px-3 py-1 text-sm">
							#2 Priority
						</span>
						📍 Going Places: στον/στην/στο
					</h3>
					<div className="mb-4 p-4 bg-white rounded-lg">
						<div className="text-sm text-blue-600 font-semibold mb-2">
							When to use:
						</div>
						<div className="text-gray-700">
							Use accusative with σε/στον/στην/στο for movement TO a place or
							being IN a place.
						</div>
					</div>
					<div className="grid md:grid-cols-2 gap-4">
						{CASE_EXAMPLES.accusative
							.filter(
								(ex) =>
									ex.explanation.includes("location") ||
									ex.explanation.includes("direction") ||
									ex.greek.includes("στο") ||
									ex.greek.includes("στην") ||
									ex.greek.includes("στον"),
							)
							.map((example, index) => (
								<div
									key={index}
									className="p-3 bg-blue-100 rounded-lg border border-blue-200"
								>
									<MonoText variant="primary" size="lg" className="block mb-1">
										{example.greek}
									</MonoText>
									<div className="text-gray-700 text-sm mb-1 font-medium">
										{example.english}
									</div>
									<div className="text-blue-600 text-xs italic">
										{example.explanation}
									</div>
								</div>
							))}
					</div>
				</Card>

				{/* Basic Possession - Third essential */}
				<Card
					variant="bordered"
					padding="lg"
					className="border-green-200 bg-green-50/30"
				>
					<h3 className="text-xl font-bold mb-4 text-green-700 flex items-center gap-2">
						<span className="bg-green-100 rounded-full px-3 py-1 text-sm">
							#3 Priority
						</span>
						💝 Basic Possession: του/της
					</h3>
					<div className="mb-4 p-4 bg-white rounded-lg">
						<div className="text-sm text-green-600 font-semibold mb-2">
							When to use:
						</div>
						<div className="text-gray-700">
							Use genitive (του/της) to show possession or "of" relationships.
							Think "whose" or "of whom/what".
						</div>
					</div>
					<div className="grid md:grid-cols-2 gap-4">
						{CASE_EXAMPLES.genitive
							.filter(
								(ex) =>
									ex.explanation.includes("possession") ||
									ex.explanation.includes("belongs") ||
									ex.greek.includes("του") ||
									ex.greek.includes("της"),
							)
							.slice(0, 4)
							.map((example, index) => (
								<div
									key={index}
									className="p-3 bg-green-100 rounded-lg border border-green-200"
								>
									<MonoText variant="success" size="lg" className="block mb-1">
										{example.greek}
									</MonoText>
									<div className="text-gray-700 text-sm mb-1 font-medium">
										{example.english}
									</div>
									<div className="text-green-600 text-xs italic">
										{example.explanation}
									</div>
								</div>
							))}
					</div>
				</Card>
			</div>

			{/* COMMON PATTERNS (15% of usage) */}
			<div className="space-y-8">
				<div className="text-center">
					<h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
						⭐ Common Patterns (15% of usage)
					</h2>
					<p className="text-gray-600 mt-2">
						Learn these after mastering the essentials
					</p>
				</div>

				{/* Time Expressions */}
				<Card
					variant="bordered"
					padding="lg"
					className="border-yellow-200 bg-yellow-50/30"
				>
					<h3 className="text-lg font-bold mb-4 text-yellow-700 flex items-center gap-2">
						🕐 Time Expressions (Always Accusative)
					</h3>
					<div className="grid md:grid-cols-3 gap-4">
						{[
							{
								greek: "τη Δευτέρα",
								english: "on Monday",
								explanation: "Days of the week",
							},
							{
								greek: "το πρωί",
								english: "in the morning",
								explanation: "Parts of the day",
							},
							{
								greek: "την ώρα",
								english: "the time/hour",
								explanation: "Time references",
							},
							{
								greek: "το βράδυ",
								english: "in the evening",
								explanation: "Evening time",
							},
							{
								greek: "τη νύχτα",
								english: "at night",
								explanation: "Night time",
							},
							{
								greek: "το καλοκαίρι",
								english: "in summer",
								explanation: "Seasons",
							},
						].map((example, index) => (
							<div key={index} className="p-3 bg-yellow-100 rounded-lg">
								<MonoText variant="warning" size="lg" className="block mb-1">
									{example.greek}
								</MonoText>
								<div className="text-gray-700 text-sm mb-1">
									{example.english}
								</div>
								<div className="text-yellow-600 text-xs italic">
									{example.explanation}
								</div>
							</div>
						))}
					</div>
				</Card>

				{/* Family Relationships */}
				<Card
					variant="bordered"
					padding="lg"
					className="border-amber-200 bg-amber-50/30"
				>
					<h3 className="text-lg font-bold mb-4 text-amber-700 flex items-center gap-2">
						👨‍👩‍👧‍👦 Family & Relationships
					</h3>
					<div className="grid md:grid-cols-2 gap-4">
						{CASE_EXAMPLES.genitive
							.filter(
								(ex) =>
									ex.explanation.includes("family") ||
									ex.greek.includes("μητέρα") ||
									ex.greek.includes("αδελφός") ||
									ex.greek.includes("πατέρας") ||
									ex.greek.includes("φίλ"),
							)
							.map((example, index) => (
								<div key={index} className="p-3 bg-amber-100 rounded-lg">
									<MonoText variant="warning" size="lg" className="block mb-1">
										{example.greek}
									</MonoText>
									<div className="text-gray-700 text-sm mb-1">
										{example.english}
									</div>
									<div className="text-amber-600 text-xs italic">
										{example.explanation}
									</div>
								</div>
							))}
					</div>
				</Card>

				{/* Essential Prepositions - Very Common */}
				<Card
					variant="bordered"
					padding="lg"
					className="border-teal-200 bg-teal-50/30"
				>
					<h3 className="text-lg font-bold mb-4 text-teal-700 flex items-center gap-2">
						📍 Essential Preposition Patterns
					</h3>
					<div className="grid md:grid-cols-2 gap-4">
						{PREPOSITION_PATTERNS.map((pattern, index) => (
							<div
								key={index}
								className="p-4 bg-teal-100 rounded-lg border border-teal-200"
							>
								<div className="flex justify-between items-start mb-2">
									<MonoText variant="warning" size="lg" className="font-bold">
										{pattern.preposition}
									</MonoText>
									<Badge variant="warning" size="sm">
										{pattern.case}
									</Badge>
								</div>
								<MonoText size="md" className="block mb-1">
									{pattern.example}
								</MonoText>
								<div className="text-gray-600 text-sm">{pattern.english}</div>
							</div>
						))}
					</div>
				</Card>

				{/* Subjects - Basic but less frequent */}
				<Card
					variant="bordered"
					padding="lg"
					className="border-orange-200 bg-orange-50/30"
				>
					<h3 className="text-lg font-bold mb-4 text-orange-700 flex items-center gap-2">
						👤 Subjects: ο/η/το (Nominative)
					</h3>
					<div className="grid md:grid-cols-3 gap-4">
						{CASE_EXAMPLES.nominative.map((example, index) => (
							<div key={index} className="p-3 bg-orange-100 rounded-lg">
								<MonoText variant="secondary" size="lg" className="block mb-1">
									{example.greek}
								</MonoText>
								<div className="text-gray-700 text-sm mb-1">
									{example.english}
								</div>
								<div className="text-orange-600 text-xs italic">
									{example.explanation}
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>

			{/* ADVANCED PATTERNS (5% of usage) */}
			<div className="space-y-6">
				<div className="text-center">
					<h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
						🎓 Advanced Patterns (5% of usage)
					</h2>
					<p className="text-gray-600 mt-2">
						For advanced learners and formal contexts
					</p>
				</div>

				{/* Advanced Genitive Uses */}
				<Card
					variant="bordered"
					padding="lg"
					className="border-purple-200 bg-purple-50/20"
				>
					<h3 className="text-lg font-bold mb-4 text-purple-700">
						🔬 Advanced Genitive Uses
					</h3>
					<div className="grid md:grid-cols-2 gap-4">
						{CASE_EXAMPLES.genitive
							.filter(
								(ex) =>
									ex.explanation.includes("age") ||
									ex.explanation.includes("academic") ||
									ex.explanation.includes("formal") ||
									ex.greek.includes("χρονών"),
							)
							.map((example, index) => (
								<div key={index} className="p-3 bg-purple-100 rounded-lg">
									<MonoText
										variant="secondary"
										size="lg"
										className="block mb-1"
									>
										{example.greek}
									</MonoText>
									<div className="text-gray-700 text-sm mb-1">
										{example.english}
									</div>
									<div className="text-purple-600 text-xs italic">
										{example.explanation}
									</div>
								</div>
							))}
					</div>
				</Card>
			</div>

			{/* ENHANCED RECOGNITION PATTERNS & MEMORY DEVICES */}
			<div className="space-y-8">
				<div className="text-center">
					<h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
						🔍 Master Pattern Recognition
					</h2>
					<p className="text-gray-600 mt-2">
						Quick visual cues to instantly identify cases
					</p>
				</div>

				{/* Visual Recognition Shortcuts */}
				<Card
					variant="bordered"
					padding="lg"
					className="border-indigo-200 bg-indigo-50/30"
				>
					<h3 className="text-lg font-bold mb-4 text-indigo-700 flex items-center gap-2">
						👁️ Instant Visual Shortcuts
					</h3>
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-semibold text-indigo-600 mb-3">
								🔍 Ending Patterns
							</h4>
							<div className="space-y-3">
								<div className="p-3 bg-white rounded-lg border border-indigo-200">
									<div className="flex items-center gap-2 mb-1">
										<MonoText variant="error" size="lg" className="font-bold">
											-ν
										</MonoText>
										<span className="text-sm text-red-600">→ Accusative</span>
									</div>
									<div className="text-xs text-gray-600">
										τον, την, στον, στην, τους
									</div>
								</div>
								<div className="p-3 bg-white rounded-lg border border-indigo-200">
									<div className="flex items-center gap-2 mb-1">
										<MonoText variant="success" size="lg" className="font-bold">
											-ου, -ης
										</MonoText>
										<span className="text-sm text-green-600">→ Genitive</span>
									</div>
									<div className="text-xs text-gray-600">
										του, της (possession)
									</div>
								</div>
								<div className="p-3 bg-white rounded-lg border border-indigo-200">
									<div className="flex items-center gap-2 mb-1">
										<MonoText variant="primary" size="lg" className="font-bold">
											ο, η, το
										</MonoText>
										<span className="text-sm text-blue-600">→ Nominative</span>
									</div>
									<div className="text-xs text-gray-600">
										Basic form (subject)
									</div>
								</div>
							</div>
						</div>
						<div>
							<h4 className="font-semibold text-indigo-600 mb-3">
								🎯 Context Clues
							</h4>
							<div className="space-y-3">
								<div className="p-3 bg-white rounded-lg border border-indigo-200">
									<div className="font-semibold text-sm mb-1">
										Action words + object
									</div>
									<div className="text-xs text-gray-600 mb-2">
										βλέπω, τρώω, θέλω + ___
									</div>
									<MonoText variant="error" size="sm">
										→ Use τον/την/το
									</MonoText>
								</div>
								<div className="p-3 bg-white rounded-lg border border-indigo-200">
									<div className="font-semibold text-sm mb-1">
										Movement/location
									</div>
									<div className="text-xs text-gray-600 mb-2">
										πηγαίνω, είμαι + place
									</div>
									<MonoText variant="primary" size="sm">
										→ Use στον/στην/στο
									</MonoText>
								</div>
								<div className="p-3 bg-white rounded-lg border border-indigo-200">
									<div className="font-semibold text-sm mb-1">
										"Whose" or "of"
									</div>
									<div className="text-xs text-gray-600 mb-2">
										showing ownership
									</div>
									<MonoText variant="success" size="sm">
										→ Use του/της
									</MonoText>
								</div>
							</div>
						</div>
					</div>
				</Card>

				{/* Enhanced Memory Devices */}
				<div className="grid lg:grid-cols-3 gap-6">
					<InfoBox variant="warning" title='The "ν" Rule' icon="🧠">
						<div className="space-y-3">
							<p className="text-sm">
								Add "ν" to τον/την/το when the next word starts with:
							</p>
							<div className="p-3 bg-white/70 rounded-lg">
								<div className="font-bold text-yellow-700 text-sm mb-2">
									Remember: VOWEL-Κ-Π-Τ-Ξ-Ψ-ΓΚ-ΜΠ-ΝΤ
								</div>
								<div className="space-y-1 text-xs">
									<div>
										<MonoText variant="warning" size="sm">
											τον άντρα
										</MonoText>{" "}
										(ton andra)
									</div>
									<div>
										<MonoText variant="warning" size="sm">
											την ώρα
										</MonoText>{" "}
										(tin ora)
									</div>
									<div>
										<MonoText variant="warning" size="sm">
											τον καφέ
										</MonoText>{" "}
										(ton cafe)
									</div>
								</div>
							</div>
						</div>
					</InfoBox>

					<InfoBox variant="purple" title="WHO/WHAT/WHERE Memory" icon="🎯">
						<div className="space-y-3">
							<div className="p-2 bg-white/70 rounded text-center">
								<div className="font-bold text-purple-700 text-sm">
									WHO does it?
								</div>
								<MonoText variant="secondary" size="sm">
									ο/η/το
								</MonoText>
							</div>
							<div className="p-2 bg-white/70 rounded text-center">
								<div className="font-bold text-purple-700 text-sm">
									WHAT/WHERE to?
								</div>
								<MonoText variant="primary" size="sm">
									τον/την/το
								</MonoText>
							</div>
							<div className="p-2 bg-white/70 rounded text-center">
								<div className="font-bold text-purple-700 text-sm">
									WHOSE is it?
								</div>
								<MonoText variant="success" size="sm">
									του/της
								</MonoText>
							</div>
						</div>
					</InfoBox>

					<InfoBox variant="info" title="Common Mistakes Detector" icon="⚠️">
						<div className="space-y-3">
							<div className="p-2 bg-red-50 rounded border border-red-200">
								<div className="text-xs text-red-600 font-semibold">
									❌ Common Error:
								</div>
								<div className="text-xs">Using ο καφές as object</div>
								<div className="text-xs text-green-600 mt-1">
									✅ Correct: τον καφέ
								</div>
							</div>
							<div className="p-2 bg-red-50 rounded border border-red-200">
								<div className="text-xs text-red-600 font-semibold">
									❌ Common Error:
								</div>
								<div className="text-xs">Forgetting "ν" before vowels</div>
								<div className="text-xs text-green-600 mt-1">
									✅ Correct: τον άντρα
								</div>
							</div>
						</div>
					</InfoBox>
				</div>

				{/* Advanced Pattern Recognition */}
				<Card
					variant="bordered"
					padding="lg"
					className="border-cyan-200 bg-cyan-50/30"
				>
					<h3 className="text-lg font-bold mb-4 text-cyan-700 flex items-center gap-2">
						🎓 Advanced Recognition Patterns
					</h3>
					<div className="space-y-4">
						{CASE_RECOGNITION.patterns.map((pattern, index) => (
							<div
								key={index}
								className="p-3 bg-white rounded-lg border border-cyan-200"
							>
								<div className="flex items-start justify-between mb-2">
									<div className="font-semibold text-cyan-800">
										{pattern.pattern}
									</div>
									<Badge variant="secondary" size="sm">
										Advanced
									</Badge>
								</div>
								<div className="text-sm text-cyan-600 mb-2">{pattern.rule}</div>
								<div className="text-xs flex flex-wrap gap-2">
									{pattern.examples.map((ex) => (
										<MonoText
											key={ex}
											variant="secondary"
											size="xs"
											className="bg-cyan-100 px-2 py-1 rounded"
										>
											{ex}
										</MonoText>
									))}
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>

			{/* Common Mistakes - Critical for Learning */}
			<Card
				variant="bordered"
				padding="lg"
				className="bg-red-50 border-red-200"
			>
				<h2 className="text-xl font-bold mb-6 text-red-800 flex items-center gap-2">
					<span className="text-2xl">⚠️</span>
					Avoid These Common Mistakes
				</h2>
				<div className="space-y-4">
					{COMMON_MISTAKES.map((mistake, index) => (
						<div key={index} className="p-4 bg-white rounded-lg shadow-sm">
							<div className="grid md:grid-cols-2 gap-4 mb-2">
								<div>
									<div className="text-red-600 font-semibold text-sm mb-1">
										❌ Wrong:
									</div>
									<MonoText variant="error" size="lg">
										{mistake.wrong}
									</MonoText>
								</div>
								<div>
									<div className="text-green-600 font-semibold text-sm mb-1">
										✅ Correct:
									</div>
									<MonoText variant="success" size="lg">
										{mistake.correct}
									</MonoText>
								</div>
							</div>
							<div className="text-sm text-gray-600 italic">
								{mistake.explanation}
							</div>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
};

export default ArticlesAndCases;
