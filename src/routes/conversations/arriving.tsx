import { Card, DialogueScenario, ConversationHero, type DialogueLine } from "@/components";
import { LearningTips, variantStyles } from "./layout";
import { DoorOpen } from "lucide-react";

// Arriving at someone's home - realistic dialogue scenarios
const ARRIVAL_DIALOGUE: DialogueLine[] = [
	{ speaker: "host", greek: "Καλώς ήρθατε!", english: "Welcome!" },
	{ speaker: "you", greek: "Γεια σας, ευχαριστούμε", english: "Hello, thank you" },
	{ speaker: "host", greek: "Πέρνα μέσα, πέρνα", english: "Come in, come in" },
	{ speaker: "you", greek: "Ευχαριστώ πολύ", english: "Thank you very much" },
	{ speaker: "host", greek: "Κάτσε, κάτσε", english: "Sit down, sit down" },
];

const LEAVING_DIALOGUE: DialogueLine[] = [
	{ speaker: "you", greek: "Πρέπει να φύγουμε", english: "We have to go", note: "Announcing you're leaving" },
	{ speaker: "host", greek: "Τόσο νωρίς;", english: "So early?" },
	{ speaker: "you", greek: "Δυστυχώς, ναι", english: "Unfortunately, yes" },
	{ speaker: "host", greek: "Να προσέχεις", english: "Take care" },
	{ speaker: "you", greek: "Τα λέμε", english: "See you" },
	{ speaker: "host", greek: "Καλό δρόμο!", english: "Have a good trip!" },
	{ speaker: "you", greek: "Ευχαριστούμε για όλα", english: "Thank you for everything" },
];

const CASUAL_GREETING: DialogueLine[] = [
	{ speaker: "friend", greek: "Γεια σου!", english: "Hi!" },
	{ speaker: "you", greek: "Γεια!", english: "Hi!" },
	{ speaker: "friend", greek: "Τι κάνεις;", english: "How are you?" },
	{ speaker: "you", greek: "Καλά, εσύ;", english: "Good, you?" },
	{ speaker: "friend", greek: "Μια χαρά", english: "Great", note: "Literally 'a joy'" },
];

export default function ArrivingRoute() {
	const styles = variantStyles.olive;

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<DoorOpen size={24} />}
				title="Arriving & Leaving"
				greekPhrase="Καλώς ήρθατε!"
				description="The warmth of Greek hospitality starts at the door. Expect enthusiastic welcomes and reluctant goodbyes."
				colorScheme="olive"
			/>

			<Card variant="bordered" padding="lg" className={styles.card}>

				<div className="space-y-8">
					<DialogueScenario
						title="Arriving at a Greek home"
						description="The host will enthusiastically welcome you"
						dialogue={ARRIVAL_DIALOGUE}
						colorScheme="olive"
					/>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Saying goodbye"
							description="Greeks often insist you stay longer!"
							dialogue={LEAVING_DIALOGUE}
							colorScheme="olive"
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Casual greeting (friends)"
							description="Informal greeting between friends"
							dialogue={CASUAL_GREETING}
							colorScheme="olive"
						/>
					</div>
				</div>
			</Card>

			<LearningTips />
		</div>
	);
}
