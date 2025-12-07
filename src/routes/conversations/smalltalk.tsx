import { Card, DialogueScenario, ConversationHero, type DialogueLine } from "@/components";
import { LearningTips, variantStyles } from "./layout";
import { MessageCircle } from "lucide-react";

// Small Talk - realistic dialogue scenarios
const WEATHER_CHAT: DialogueLine[] = [
	{ speaker: "friend", greek: "Κάνει πολύ ζέστη σήμερα!", english: "It's very hot today!" },
	{ speaker: "you", greek: "Ναι, δεν αντέχω", english: "Yes, I can't stand it" },
	{ speaker: "friend", greek: "Θέλεις νερό;", english: "Do you want water?" },
	{ speaker: "you", greek: "Ναι, ευχαριστώ", english: "Yes, thank you" },
];

const WORK_CHAT: DialogueLine[] = [
	{ speaker: "friend", greek: "Τι κάνεις στη δουλειά;", english: "How's work?" },
	{ speaker: "you", greek: "Καλά, πολύ δουλειά όμως", english: "Good, but a lot of work" },
	{ speaker: "friend", greek: "Κουράστηκες;", english: "Are you tired?" },
	{ speaker: "you", greek: "Λίγο", english: "A little" },
];

const WEEKEND_PLANS: DialogueLine[] = [
	{ speaker: "friend", greek: "Τι θα κάνεις το Σαββατοκύριακο;", english: "What are you doing this weekend?" },
	{ speaker: "you", greek: "Δεν ξέρω ακόμα", english: "I don't know yet" },
	{ speaker: "friend", greek: "Θέλεις να πάμε για καφέ;", english: "Do you want to go for coffee?" },
	{ speaker: "you", greek: "Ναι, καλή ιδέα!", english: "Yes, good idea!" },
	{ speaker: "friend", greek: "Το Σάββατο;", english: "Saturday?" },
	{ speaker: "you", greek: "Εντάξει", english: "Okay" },
];

const FAMILY_CHAT: DialogueLine[] = [
	{ speaker: "friend", greek: "Πώς είναι τα παιδιά;", english: "How are the kids?" },
	{ speaker: "you", greek: "Πολύ καλά, ευχαριστώ", english: "Very good, thank you" },
	{ speaker: "friend", greek: "Πάνε σχολείο;", english: "Do they go to school?" },
	{ speaker: "you", greek: "Ναι, τους αρέσει πολύ", english: "Yes, they like it a lot" },
];

export default function SmalltalkRoute() {
	const styles = variantStyles.aegean;

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<MessageCircle size={24} />}
				title="Small Talk"
				greekPhrase="Τι κάνεις;"
				description="Casual conversation with friends and acquaintances. Weather, work, family - the universal topics that connect us."
				colorScheme="aegean"
			/>

			<Card variant="bordered" padding="lg" className={styles.card}>

				<div className="space-y-8">
					<DialogueScenario
						title="Talking about the weather"
						description="A universal conversation starter"
						dialogue={WEATHER_CHAT}
						colorScheme="aegean"
					/>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Asking about work"
							description="Common friendly question"
							dialogue={WORK_CHAT}
							colorScheme="aegean"
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Weekend plans"
							description="Making plans with friends"
							dialogue={WEEKEND_PLANS}
							colorScheme="aegean"
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Asking about family"
							description="Greeks love to ask about family"
							dialogue={FAMILY_CHAT}
							colorScheme="aegean"
						/>
					</div>
				</div>
			</Card>

			<LearningTips />
		</div>
	);
}
