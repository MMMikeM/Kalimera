
import {Lightbulb, Target } from "lucide-react";
import type React from "react";
import { Badge, Card, InfoBox, MonoText } from "../components/ui";

export function meta() {
  return [
    { title: "Daily Patterns - Greek Conjugation Reference" },
    { name: "description", content: "Common Greek phrases and daily usage patterns" },
  ];
}



const DailyPatterns: React.FC = () => {
	return (
		<div className="space-y-10">
			{/* Priority Banner */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200"
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-emerald-800">
						🚀 Essential Daily Patterns
					</h2>
					<Badge variant="success" size="lg">
						Priority #1 - 80% Daily Use
					</Badge>
				</div>
				<InfoBox variant="success" title="Learning Strategy" className="mb-6">
					Master these high-frequency patterns first! They appear in 80% of
					daily conversations. Focus on{" "}
					<strong>recognition over memorization</strong> - see the pattern,
					understand the context.
				</InfoBox>
			</Card>

			{/* Essential Daily Patterns (80% - Most Used) */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200"
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-orange-800">
						🎯 Daily Essentials
					</h2>
					<Badge variant="warning" size="lg">
						Learn These First!
					</Badge>
				</div>

				<div className="grid lg:grid-cols-2 gap-8">
					{/* Coffee & Food */}
					<Card
						variant="bordered"
						padding="lg"
						className="border-orange-200 bg-orange-50/30"
					>
						<h3 className="text-lg font-bold mb-4 text-orange-700 flex items-center gap-2">
							☕ Coffee & Food
						</h3>
						<div className="space-y-3">
							{[
								{
									greek: "τον καφέ",
									english: "the coffee (object)",
									explanation: "Ordering, buying",
									whyThisCase: "direct object → accusative",
								},
								{
									greek: "το τσάι",
									english: "the tea",
									explanation: "Common drink",
									whyThisCase: "neuter = same form",
								},
								{
									greek: "το ψωμί",
									english: "the bread",
									explanation: "Basic food",
									whyThisCase: "direct object → accusative",
								},
								{
									greek: "το νερό",
									english: "the water",
									explanation: "Essential daily",
									whyThisCase: "direct object → accusative",
								},
								{
									greek: "τη μπίρα",
									english: "the beer",
									explanation: "Common drink",
									whyThisCase: "direct object → accusative (no ν before μ)",
								},
							].map((example, index) => (
								<div key={index} className="p-3 bg-orange-100 rounded-lg">
									<MonoText variant="warning" size="lg" className="block mb-1">
										{example.greek}
									</MonoText>
									<div className="text-gray-700 text-sm mb-1">
										{example.english}
									</div>
									<div className="text-orange-600 text-xs italic mb-1">
										{example.explanation}
									</div>
									<div className="text-orange-800 text-xs font-medium bg-orange-50 px-2 py-1 rounded">
										💡 {(example as any).whyThisCase}
									</div>
								</div>
							))}
						</div>
					</Card>

					{/* House & Location */}
					<Card
						variant="bordered"
						padding="lg"
						className="border-blue-200 bg-blue-50/30"
					>
						<h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center gap-2">
							🏠 House & Location
						</h3>
						<div className="space-y-3">
							{[
								{
									greek: "πηγαίνω στο σπίτι",
									english: "I go to the house",
									explanation: "direction/location with στο",
									whyThisCase: "σε + το = στο (direction)",
								},
								{
									greek: "στη δουλειά",
									english: "to/at work",
									explanation: "common destination",
									whyThisCase: "σε + τη = στη (location)",
								},
								{
									greek: "στο σχολείο",
									english: "to/at school",
									explanation: "education context",
									whyThisCase: "σε + το = στο (neuter)",
								},
								{
									greek: "στον κήπο",
									english: "in the garden",
									explanation: "home location",
									whyThisCase: "σε + τον = στον (masculine)",
								},
								{
									greek: "στη θάλασσα",
									english: "to/at the sea",
									explanation: "vacation/leisure",
									whyThisCase: "σε + τη = στη (no ν before θ)",
								},
							].map((example, index) => (
								<div key={index} className="p-3 bg-blue-100 rounded-lg">
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
									<div className="text-blue-600 text-xs italic mb-1">
										{example.explanation}
									</div>
									<div className="text-blue-800 text-xs font-medium bg-blue-50 px-2 py-1 rounded">
										💡 {(example as any).whyThisCase}
									</div>
								</div>
							))}
						</div>
					</Card>

					{/* Time & Daily Schedule */}
					<Card
						variant="bordered"
						padding="lg"
						className="border-yellow-200 bg-yellow-50/30"
					>
						<h3 className="text-lg font-bold mb-4 text-yellow-700 flex items-center gap-2">
							🕐 Time & Daily Schedule
						</h3>
						<div className="space-y-3">
							{[
								{
									greek: "το πρωί",
									english: "in the morning",
									explanation: "Parts of the day",
									whyThisCase: "time expressions use accusative",
								},
								{
									greek: "τη νύχτα",
									english: "at night",
									explanation: "Night time",
									whyThisCase: "time period → accusative",
								},
								{
									greek: "το βράδυ",
									english: "in the evening",
									explanation: "Evening time",
									whyThisCase: "time expressions → accusative",
								},
								{
									greek: "τη Δευτέρα",
									english: "on Monday",
									explanation: "Days of the week",
									whyThisCase: "specific day → accusative",
								},
								{
									greek: "το καλοκαίρι",
									english: "in summer",
									explanation: "Seasons",
									whyThisCase: "season/time → accusative",
								},
							].map((example, index) => (
								<div key={index} className="p-3 bg-yellow-100 rounded-lg">
									<MonoText variant="warning" size="lg" className="block mb-1">
										{example.greek}
									</MonoText>
									<div className="text-gray-700 text-sm mb-1">
										{example.english}
									</div>
									<div className="text-yellow-600 text-xs italic mb-1">
										{example.explanation}
									</div>
									<div className="text-yellow-800 text-xs font-medium bg-yellow-50 px-2 py-1 rounded">
										💡 {(example as any).whyThisCase}
									</div>
								</div>
							))}
						</div>
					</Card>

					{/* Family & Relationships */}
					<Card
						variant="bordered"
						padding="lg"
						className="border-amber-200 bg-amber-50/30"
					>
						<h3 className="text-lg font-bold mb-4 text-amber-700 flex items-center gap-2">
							👨‍👩‍👧‍👦 Family & Relationships
						</h3>
						<div className="space-y-3">
							{[
								{
									greek: "η μητέρα της Μαρίας",
									english: "Maria's mother",
									explanation: "family relationships",
									whyThisCase: "possession → genitive",
								},
								{
									greek: "ο αδελφός της Μαρίας",
									english: "Maria's brother",
									explanation: "family relationships - daily use",
									whyThisCase: "belonging to Maria → genitive",
								},
								{
									greek: "το σπίτι του πατέρα",
									english: "father's house",
									explanation: "family possession - very common",
									whyThisCase: "whose house? → genitive",
								},
								{
									greek: "η δουλειά του φίλου μου",
									english: "my friend's job",
									explanation: "social relationships",
									whyThisCase: "friend's something → genitive",
								},
								{
									greek: "το κλειδί της πόρτας",
									english: "the door key",
									explanation: "everyday objects",
									whyThisCase: "key of what? → genitive",
								},
							].map((example, index) => (
								<div key={index} className="p-3 bg-amber-100 rounded-lg">
									<MonoText variant="warning" size="lg" className="block mb-1">
										{example.greek}
									</MonoText>
									<div className="text-gray-700 text-sm mb-1">
										{example.english}
									</div>
									<div className="text-amber-600 text-xs italic mb-1">
										{example.explanation}
									</div>
									<div className="text-amber-800 text-xs font-medium bg-amber-50 px-2 py-1 rounded">
										💡 {(example as any).whyThisCase}
									</div>
								</div>
							))}
						</div>
					</Card>
				</div>
			</Card>

			{/* Practice Tips */}
			<Card
				variant="elevated"
				padding="lg"
				className="bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200"
			>
				<h2 className="text-xl font-bold text-center mb-4 text-purple-800 flex items-center justify-center gap-2">
					<Target size={20} />💪 Practice Strategy
				</h2>
				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<h3 className="text-lg font-bold text-purple-700 mb-3">
							✨ Daily Practice
						</h3>
						<ul className="space-y-2 text-sm text-gray-700">
							<li>
								• Start with <strong>one theme per day</strong> (Coffee & Food
								Monday, etc.)
							</li>
							<li>
								• <strong>Say examples out loud</strong> - hearing helps memory
							</li>
							<li>
								• <strong>Focus on context</strong> - when would you say this?
							</li>
							<li>
								• <strong>Notice the "why"</strong> hints - they build pattern
								recognition
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold text-purple-700 mb-3">
							🎯 Next Steps
						</h3>
						<ul className="space-y-2 text-sm text-gray-700">
							<li>
								• When confused, check <strong>"Core Rules"</strong> tab for
								grammar
							</li>
							<li>
								• Use <strong>"Case Practice"</strong> to test yourself
							</li>
							<li>
								• Try <strong>"Search Words"</strong> to find specific examples
							</li>
							<li>
								• Remember: <strong>patterns over memorization!</strong>
							</li>
						</ul>
					</div>
				</div>
			</Card>

			{/* Cross-Reference Note */}
			<InfoBox
				variant="info"
				title="Need the Grammar Rules?"
				icon={<Lightbulb size={18} />}
			>
				Confused about why we use τον vs την vs το? Head to the{" "}
				<strong>"Core Rules"</strong> tab for the complete grammar reference,
				then come back here to practice!
			</InfoBox>
		</div>
	);
};



export default function DailyPatternsRoute() {
  return <DailyPatterns />;
}
