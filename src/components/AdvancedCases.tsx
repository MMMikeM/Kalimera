import React from "react";
import { Lightbulb } from "lucide-react";
import { CASE_EXAMPLES, PREPOSITION_PATTERNS } from "../constants/articles";
import { Card, InfoBox, Badge, MonoText } from "./ui";

const AdvancedCases: React.FC = () => {
	return (
		<div className="space-y-10">
			{/* Common Vocabulary Themes (15% - Occasionally Used) */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200"
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-yellow-800">
						📚 Common Vocabulary Themes
					</h2>
					<Badge variant="warning" size="lg">
						15% Common Use
					</Badge>
				</div>

				<InfoBox variant="warning" title="Priority #2" className="mb-8">
					Important patterns that come up regularly - learn after mastering the
					basics!
				</InfoBox>

				<div className="grid md:grid-cols-2 gap-6">
					{/* Business & Work */}
					<Card
						variant="bordered"
						padding="lg"
						className="border-purple-200 bg-purple-50/30"
					>
						<h3 className="text-lg font-bold mb-4 text-purple-700 flex items-center gap-2">
							💼 Business & Work
						</h3>
						<div className="space-y-3">
							{[
								{
									greek: "στο γραφείο",
									english: "to/at the office",
									explanation: "workplace location",
								},
								{
									greek: "την παρουσίαση",
									english: "the presentation",
									explanation: "business meeting",
								},
								{
									greek: "του διευθυντή",
									english: "the manager's",
									explanation: "workplace hierarchy",
								},
								{
									greek: "την εταιρεία",
									english: "the company",
									explanation: "business context",
								},
								{
									greek: "το συνέδριο",
									english: "the conference",
									explanation: "professional events",
								},
							].map((example, index) => (
								<div key={index} className="p-3 bg-purple-100 rounded-lg">
									<MonoText
										variant="highlighted"
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

					{/* Travel & Transport */}
					<Card
						variant="bordered"
						padding="lg"
						className="border-indigo-200 bg-indigo-50/30"
					>
						<h3 className="text-lg font-bold mb-4 text-indigo-700 flex items-center gap-2">
							✈️ Travel & Transport
						</h3>
						<div className="space-y-3">
							{[
								{
									greek: "το αεροπλάνο",
									english: "the airplane",
									explanation: "transportation mode",
								},
								{
									greek: "στον σταθμό",
									english: "to/at the station",
									explanation: "transport hub",
								},
								{
									greek: "το ταξίδι",
									english: "the trip/journey",
									explanation: "travel planning",
								},
								{
									greek: "την βαλίτσα",
									english: "the suitcase",
									explanation: "travel gear",
								},
								{
									greek: "του ξενοδοχείου",
									english: "the hotel's",
									explanation: "accommodation",
								},
							].map((example, index) => (
								<div key={index} className="p-3 bg-indigo-100 rounded-lg">
									<MonoText
										variant="highlighted"
										size="lg"
										className="block mb-1"
									>
										{example.greek}
									</MonoText>
									<div className="text-gray-700 text-sm mb-1">
										{example.english}
									</div>
									<div className="text-indigo-600 text-xs italic">
										{example.explanation}
									</div>
								</div>
							))}
						</div>
					</Card>

					{/* Sports & Hobbies */}
					<Card
						variant="bordered"
						padding="lg"
						className="border-green-200 bg-green-50/30"
					>
						<h3 className="text-lg font-bold mb-4 text-green-700 flex items-center gap-2">
							⚽ Sports & Hobbies
						</h3>
						<div className="space-y-3">
							{[
								{
									greek: "το ποδόσφαιρο",
									english: "football/soccer",
									explanation: "popular sport",
								},
								{
									greek: "την κιθάρα",
									english: "the guitar",
									explanation: "musical hobby",
								},
								{
									greek: "στο γυμναστήριο",
									english: "to/at the gym",
									explanation: "fitness activity",
								},
								{
									greek: "την ταινία",
									english: "the movie",
									explanation: "entertainment",
								},
								{
									greek: "του παιχνιδιού",
									english: "the game's",
									explanation: "leisure activity",
								},
							].map((example, index) => (
								<div key={index} className="p-3 bg-green-100 rounded-lg">
									<MonoText
										variant="success"
										size="lg"
										className="block mb-1"
									>
										{example.greek}
									</MonoText>
									<div className="text-gray-700 text-sm mb-1">
										{example.english}
									</div>
									<div className="text-green-600 text-xs italic">
										{example.explanation}
									</div>
								</div>
							))}
						</div>
					</Card>

					{/* Shopping & Money */}
					<Card
						variant="bordered"
						padding="lg"
						className="border-rose-200 bg-rose-50/30"
					>
						<h3 className="text-lg font-bold mb-4 text-rose-700 flex items-center gap-2">
							🛒 Shopping & Money
						</h3>
						<div className="space-y-3">
							{[
								{
									greek: "η τιμή του ψωμιού",
									english: "the price of bread",
									explanation: "shopping - daily use",
								},
								{
									greek: "στο μαγαζί",
									english: "to/at the store",
									explanation: "shopping location",
								},
								{
									greek: "τα χρήματα",
									english: "the money",
									explanation: "payment method",
								},
								{
									greek: "του προϊόντος",
									english: "the product's",
									explanation: "merchandise",
								},
								{
									greek: "την απόδειξη",
									english: "the receipt",
									explanation: "purchase proof",
								},
							].map((example, index) => (
								<div key={index} className="p-3 bg-rose-100 rounded-lg">
									<MonoText variant="error" size="lg" className="block mb-1">
										{example.greek}
									</MonoText>
									<div className="text-gray-700 text-sm mb-1">
										{example.english}
									</div>
									<div className="text-rose-600 text-xs italic">
										{example.explanation}
									</div>
								</div>
							))}
						</div>
					</Card>
				</div>
			</Card>

			{/* Essential Preposition Patterns */}
			<Card
				variant="bordered"
				padding="lg"
				className="border-teal-200 bg-teal-50/30"
			>
				<h2 className="text-xl font-bold mb-6 text-teal-700 flex items-center gap-2">
					📍 Essential Preposition Patterns
				</h2>
				<InfoBox variant="info" title="Key Learning Tip" className="mb-6">
					Each preposition "demands" a specific case - memorize these
					combinations!
				</InfoBox>

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
							<div className="text-sm text-teal-600">{pattern.english}</div>
						</div>
					))}
				</div>
			</Card>

			{/* Advanced Topics (5% - Rarely Used) */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200"
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-slate-800">
						🎓 Advanced Topics
					</h2>
					<Badge variant="secondary" size="lg">
						5% Advanced Use
					</Badge>
				</div>

				<InfoBox variant="info" title="Priority #3" className="mb-8">
					Complex patterns for advanced learners - focus on these after
					mastering the essentials!
				</InfoBox>

				<div className="grid md:grid-cols-2 gap-6">
					{/* Academic & Formal */}
					<Card
						variant="bordered"
						padding="lg"
						className="border-slate-200 bg-slate-50/30"
					>
						<h3 className="text-lg font-bold mb-4 text-slate-700 flex items-center gap-2">
							🎓 Academic & Formal
						</h3>
						<div className="space-y-3">
							{CASE_EXAMPLES.genitive
								.filter(
									(ex) =>
										ex.explanation.includes("formal") ||
										ex.explanation.includes("academic") ||
										ex.explanation.includes("literature") ||
										ex.explanation.includes("complex"),
								)
								.slice(0, 4)
								.map((example, index) => (
									<div key={index} className="p-3 bg-slate-100 rounded-lg">
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
										<div className="text-slate-600 text-xs italic">
											{example.explanation}
										</div>
									</div>
								))}
						</div>
					</Card>

					{/* Complex Constructions */}
					<Card
						variant="bordered"
						padding="lg"
						className="border-gray-200 bg-gray-50/30"
					>
						<h3 className="text-lg font-bold mb-4 text-gray-700 flex items-center gap-2">
							🔧 Complex Constructions
						</h3>
						<div className="space-y-3">
							{CASE_EXAMPLES.accusative
								.filter(
									(ex) =>
										ex.explanation.includes("complex") ||
										ex.explanation.includes("advanced") ||
										ex.explanation.includes("construction") ||
										ex.explanation.includes("specialized"),
								)
								.slice(0, 4)
								.map((example, index) => (
									<div key={index} className="p-3 bg-gray-100 rounded-lg">
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
										<div className="text-gray-600 text-xs italic">
											{example.explanation}
										</div>
									</div>
								))}
						</div>
					</Card>
				</div>

				<InfoBox
					variant="info"
					title="Learning Strategy"
					icon={<Lightbulb size={20} />}
					className="mt-6"
				>
					Don't worry about these advanced topics until you're comfortable with
					daily and common vocabulary themes. They're used in formal writing,
					literature, and specialized contexts.
				</InfoBox>
			</Card>
		</div>
	);
};

export default AdvancedCases;
