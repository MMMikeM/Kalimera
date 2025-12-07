import { Card, DialogueScenario, ConversationHero, type DialogueLine } from "@/components";
import { LearningTips, variantStyles } from "./layout";
import { Hand } from "lucide-react";

// Quick Requests - realistic dialogue scenarios
const ASKING_FOR_HELP: DialogueLine[] = [
	{ speaker: "you", greek: "Συγγνώμη, μπορείτε να με βοηθήσετε;", english: "Excuse me, can you help me?" },
	{ speaker: "stranger", greek: "Βέβαια", english: "Of course" },
	{ speaker: "you", greek: "Πού είναι η στάση;", english: "Where is the stop?" },
	{ speaker: "stranger", greek: "Εκεί, δεξιά", english: "There, on the right" },
	{ speaker: "you", greek: "Ευχαριστώ πολύ", english: "Thank you very much" },
];

const INTRODUCTIONS: DialogueLine[] = [
	{ speaker: "stranger", greek: "Πώς σε λένε;", english: "What's your name?" },
	{ speaker: "you", greek: "Με λένε...", english: "My name is...", note: "Add your name" },
	{ speaker: "stranger", greek: "Χαίρω πολύ", english: "Nice to meet you" },
	{ speaker: "you", greek: "Κι εγώ", english: "Me too" },
];

const ASKING_OPINION: DialogueLine[] = [
	{ speaker: "friend", greek: "Τι σου φαίνεται;", english: "What do you think?" },
	{ speaker: "you", greek: "Μου φαίνεται καλό", english: "It seems good to me" },
	{ speaker: "friend", greek: "Σίγουρα;", english: "Are you sure?" },
	{ speaker: "you", greek: "Ναι, μ' αρέσει", english: "Yes, I like it" },
];

const MAKING_REQUESTS: DialogueLine[] = [
	{ speaker: "you", greek: "Περίμενέ με λίγο", english: "Wait for me a bit" },
	{ speaker: "friend", greek: "Εντάξει", english: "Okay" },
	{ speaker: "you", greek: "Άκουσέ με", english: "Listen to me" },
	{ speaker: "friend", greek: "Λέγε", english: "Go ahead", note: "Literally 'say'" },
	{ speaker: "you", greek: "Δώσε μου το νερό", english: "Give me the water" },
	{ speaker: "friend", greek: "Ορίστε", english: "Here you go" },
];

export default function RequestsRoute() {
	const styles = variantStyles.honey;

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<Hand size={24} />}
				title="Quick Requests"
				greekPhrase="Βοήθησέ με!"
				description="Practical phrases for everyday needs. Asking for help, making introductions, and simple requests."
				colorScheme="honey"
			/>

			<Card variant="bordered" padding="lg" className={styles.card}>

				<div className="space-y-8">
					<DialogueScenario
						title="Asking for help"
						description="Getting directions or assistance"
						dialogue={ASKING_FOR_HELP}
						colorScheme="honey"
					/>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Introducing yourself"
							description="When meeting someone new"
							dialogue={INTRODUCTIONS}
							colorScheme="honey"
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Asking for opinions"
							description="Getting someone's thoughts"
							dialogue={ASKING_OPINION}
							colorScheme="honey"
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Making simple requests"
							description="Common imperative phrases"
							dialogue={MAKING_REQUESTS}
							colorScheme="honey"
						/>
					</div>
				</div>
			</Card>

			<LearningTips />
		</div>
	);
}
