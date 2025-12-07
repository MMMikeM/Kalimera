import { Card, DialogueScenario, ConversationHero, type DialogueLine } from "@/components";
import { LearningTips, variantStyles } from "./layout";
import { Utensils } from "lucide-react";

// Food & Hospitality - realistic dialogue scenarios
const OFFERING_FOOD: DialogueLine[] = [
	{ speaker: "host", greek: "Θέλεις κάτι;", english: "Do you want something?" },
	{ speaker: "you", greek: "Τι έχεις;", english: "What do you have?" },
	{ speaker: "host", greek: "Καφέ, τσάι, νερό...", english: "Coffee, tea, water..." },
	{ speaker: "you", greek: "Ένα καφέ, ευχαριστώ", english: "A coffee, thank you" },
	{ speaker: "host", greek: "Γλυκό, μέτριο, σκέτο;", english: "Sweet, medium, no sugar?", note: "Greek coffee options" },
	{ speaker: "you", greek: "Μέτριο, παρακαλώ", english: "Medium, please" },
];

const DURING_MEAL: DialogueLine[] = [
	{ speaker: "host", greek: "Φάε, φάε!", english: "Eat, eat!" },
	{ speaker: "you", greek: "Είναι πολύ νόστιμο", english: "It's very delicious" },
	{ speaker: "host", greek: "Πάρε λίγο ακόμα", english: "Take some more" },
	{ speaker: "you", greek: "Χόρτασα", english: "I'm full" },
	{ speaker: "host", greek: "Σίγουρα;", english: "Are you sure?" },
	{ speaker: "you", greek: "Ναι, ευχαριστώ πολύ", english: "Yes, thank you very much" },
];

const COMPLIMENTING_FOOD: DialogueLine[] = [
	{ speaker: "host", greek: "Άρεσε;", english: "Did you like it?" },
	{ speaker: "you", greek: "Πολύ! Τι είναι αυτό;", english: "A lot! What is this?" },
	{ speaker: "host", greek: "Μουσακάς", english: "Moussaka" },
	{ speaker: "you", greek: "Είναι τέλειο", english: "It's perfect" },
	{ speaker: "host", greek: "Θα σου δώσω τη συνταγή", english: "I'll give you the recipe" },
];

export default function FoodRoute() {
	const styles = variantStyles.terracotta;

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<Utensils size={24} />}
				title="Food & Hospitality"
				greekPhrase="Φάε, φάε!"
				description="Greek hospitality means constantly offering food and drink. Learn to accept graciously and politely decline when full."
				colorScheme="terracotta"
			/>

			<Card variant="bordered" padding="lg" className={styles.card}>

				<div className="space-y-8">
					<DialogueScenario
						title="Being offered refreshments"
						description="Greeks will always offer you something to drink"
						dialogue={OFFERING_FOOD}
						colorScheme="terracotta"
					/>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="During a meal"
							description="Expect to be encouraged to eat more!"
							dialogue={DURING_MEAL}
							colorScheme="terracotta"
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Complimenting the food"
							description="Show appreciation for home cooking"
							dialogue={COMPLIMENTING_FOOD}
							colorScheme="terracotta"
						/>
					</div>
				</div>
			</Card>

			<LearningTips />
		</div>
	);
}
