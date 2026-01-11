import { Utensils } from "lucide-react";
import { ConversationHero } from "@/components/ConversationHero";
import type { DialogueLine } from "@/components/DialogueExchange";
import { LearningTips, ScenarioCard, useConversationContext } from "../layout";

const OFFERING_FOOD: DialogueLine[] = [
	{ speaker: "host", greek: "Θέλεις κάτι;", english: "Do you want something?" },
	{ speaker: "you", greek: "Τι έχεις;", english: "What do you have?" },
	{
		speaker: "host",
		greek: "Καφέ, τσάι, νερό...",
		english: "Coffee, tea, water...",
	},
	{
		speaker: "you",
		greek: "Ένα καφέ, ευχαριστώ",
		english: "A coffee, thank you",
	},
	{
		speaker: "host",
		greek: "Γλυκό, μέτριο, σκέτο;",
		english: "Sweet, medium, no sugar?",
		note: "Greek coffee options",
	},
	{ speaker: "you", greek: "Μέτριο, παρακαλώ", english: "Medium, please" },
];

const DURING_MEAL: DialogueLine[] = [
	{ speaker: "host", greek: "Φάε, φάε!", english: "Eat, eat!" },
	{
		speaker: "you",
		greek: "Είναι πολύ νόστιμο",
		english: "It's very delicious",
	},
	{ speaker: "host", greek: "Πάρε λίγο ακόμα", english: "Take some more" },
	{ speaker: "you", greek: "Χόρτασα", english: "I'm full" },
	{ speaker: "host", greek: "Σίγουρα;", english: "Are you sure?" },
	{
		speaker: "you",
		greek: "Ναι, ευχαριστώ πολύ",
		english: "Yes, thank you very much",
	},
];

const COMPLIMENTING_FOOD: DialogueLine[] = [
	{ speaker: "host", greek: "Άρεσε;", english: "Did you like it?" },
	{
		speaker: "you",
		greek: "Πολύ! Τι είναι αυτό;",
		english: "A lot! What is this?",
	},
	{ speaker: "host", greek: "Μουσακάς", english: "Moussaka" },
	{ speaker: "you", greek: "Είναι τέλειο", english: "It's perfect" },
	{
		speaker: "host",
		greek: "Θα σου δώσω τη συνταγή",
		english: "I'll give you the recipe",
	},
];

const CAFE_ORDER: DialogueLine[] = [
	{ speaker: "waiter", greek: "Τι θα πάρετε;", english: "What will you have?" },
	{
		speaker: "you",
		greek: "Έναν καφέ φραπέ, παρακαλώ",
		english: "A frappe, please",
	},
	{ speaker: "waiter", greek: "Με γάλα;", english: "With milk?" },
	{ speaker: "you", greek: "Ναι, με γάλα", english: "Yes, with milk" },
	{ speaker: "waiter", greek: "Τίποτα άλλο;", english: "Anything else?" },
	{ speaker: "you", greek: "Όχι, ευχαριστώ", english: "No, thank you" },
	{ speaker: "waiter", greek: "Αμέσως", english: "Right away" },
];

export function FoodTab() {
	const { mode } = useConversationContext();

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<Utensils size={24} />}
				title="Food & Hospitality"
				greekPhrase="Φάε, φάε!"
				description="Greek hospitality means constantly offering food and drink. Learn to accept graciously and politely decline when full."
				colorScheme="terracotta"
			/>

			<ScenarioCard
				title="Being offered refreshments"
				description="Greeks will always offer you something to drink"
				formality="mixed"
				dialogue={OFFERING_FOOD}
				mode={mode}
			/>

			<ScenarioCard
				title="During a meal"
				description="Expect to be encouraged to eat more!"
				formality="informal"
				dialogue={DURING_MEAL}
				mode={mode}
			/>

			<ScenarioCard
				title="Complimenting the food"
				description="Show appreciation for home cooking"
				formality="informal"
				dialogue={COMPLIMENTING_FOOD}
				mode={mode}
			/>

			<ScenarioCard
				title="At a cafe"
				description="Ordering at a Greek kafeneio"
				formality="formal"
				dialogue={CAFE_ORDER}
				mode={mode}
			/>

			<LearningTips
				patterns={{
					title: "Patterns to Notice",
					items: [
						"Coffee options: γλυκό (sweet), μέτριο (medium), σκέτο (plain)",
						"Imperative repetition: Φάε, φάε! Πάρε, πάρε!",
						"Χόρτασα literally means 'I'm satisfied' - stronger than 'full'",
					],
				}}
				tips={{
					title: "Cultural Tips",
					items: [
						"Always accept at least a small amount - refusing is impolite",
						"Complimenting food is expected and appreciated",
					],
				}}
				commonMistake={{
					wrong: "Είμαι γεμάτος",
					right: "Χόρτασα",
					explanation:
						"Είμαι γεμάτος sounds odd in Greek - use χόρτασα for 'I'm full'",
				}}
			/>
		</div>
	);
}
