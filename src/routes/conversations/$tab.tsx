import type React from "react";
import type { Route } from "./+types/$tab";
import { DoorOpen, Utensils, MessageCircle, Hand } from "lucide-react";
import {
	Card,
	DialogueScenario,
	ConversationHero,
	type DialogueLine,
} from "@/components";
import { LearningTips, variantStyles, useConversationContext } from "./layout";

const VALID_TABS = ["arriving", "food", "smalltalk", "requests"] as const;
type TabId = (typeof VALID_TABS)[number];

export function loader({ params }: Route.LoaderArgs) {
	const tab = params.tab as string;

	if (!VALID_TABS.includes(tab as TabId)) {
		throw new Response("Not Found", { status: 404 });
	}

	return { tab: tab as TabId };
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARRIVING TAB
// ═══════════════════════════════════════════════════════════════════════════════
const ARRIVAL_DIALOGUE: DialogueLine[] = [
	{ speaker: "host", greek: "Καλώς ήρθατε!", english: "Welcome!" },
	{
		speaker: "you",
		greek: "Γεια σας, ευχαριστούμε",
		english: "Hello, thank you",
	},
	{ speaker: "host", greek: "Πέρνα μέσα, πέρνα", english: "Come in, come in" },
	{ speaker: "you", greek: "Ευχαριστώ πολύ", english: "Thank you very much" },
	{ speaker: "host", greek: "Κάτσε, κάτσε", english: "Sit down, sit down" },
];

const LEAVING_DIALOGUE: DialogueLine[] = [
	{
		speaker: "you",
		greek: "Πρέπει να φύγουμε",
		english: "We have to go",
		note: "Announcing you're leaving",
	},
	{ speaker: "host", greek: "Τόσο νωρίς;", english: "So early?" },
	{ speaker: "you", greek: "Δυστυχώς, ναι", english: "Unfortunately, yes" },
	{ speaker: "host", greek: "Να προσέχεις", english: "Take care" },
	{ speaker: "you", greek: "Τα λέμε", english: "See you" },
	{ speaker: "host", greek: "Καλό δρόμο!", english: "Have a good trip!" },
	{
		speaker: "you",
		greek: "Ευχαριστούμε για όλα",
		english: "Thank you for everything",
	},
];

const CASUAL_GREETING: DialogueLine[] = [
	{ speaker: "friend", greek: "Γεια σου!", english: "Hi!" },
	{ speaker: "you", greek: "Γεια!", english: "Hi!" },
	{ speaker: "friend", greek: "Τι κάνεις;", english: "How are you?" },
	{ speaker: "you", greek: "Καλά, εσύ;", english: "Good, you?" },
	{
		speaker: "friend",
		greek: "Μια χαρά",
		english: "Great",
		note: "Literally 'a joy'",
	},
];

const ArrivingTab: React.FC = () => {
	const styles = variantStyles.olive;
	const { mode } = useConversationContext();

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
						mode={mode}
					/>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Saying goodbye"
							description="Greeks often insist you stay longer!"
							dialogue={LEAVING_DIALOGUE}
							colorScheme="olive"
							mode={mode}
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Casual greeting (friends)"
							description="Informal greeting between friends"
							dialogue={CASUAL_GREETING}
							colorScheme="olive"
							mode={mode}
						/>
					</div>
				</div>
			</Card>

			<LearningTips />
		</div>
	);
};

// ═══════════════════════════════════════════════════════════════════════════════
// FOOD TAB
// ═══════════════════════════════════════════════════════════════════════════════
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

const FoodTab: React.FC = () => {
	const styles = variantStyles.terracotta;
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

			<Card variant="bordered" padding="lg" className={styles.card}>
				<div className="space-y-8">
					<DialogueScenario
						title="Being offered refreshments"
						description="Greeks will always offer you something to drink"
						dialogue={OFFERING_FOOD}
						colorScheme="terracotta"
						mode={mode}
					/>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="During a meal"
							description="Expect to be encouraged to eat more!"
							dialogue={DURING_MEAL}
							colorScheme="terracotta"
							mode={mode}
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Complimenting the food"
							description="Show appreciation for home cooking"
							dialogue={COMPLIMENTING_FOOD}
							colorScheme="terracotta"
							mode={mode}
						/>
					</div>
				</div>
			</Card>

			<LearningTips />
		</div>
	);
};

// ═══════════════════════════════════════════════════════════════════════════════
// SMALLTALK TAB
// ═══════════════════════════════════════════════════════════════════════════════
const WEATHER_CHAT: DialogueLine[] = [
	{
		speaker: "friend",
		greek: "Κάνει πολύ ζέστη σήμερα!",
		english: "It's very hot today!",
	},
	{
		speaker: "you",
		greek: "Ναι, δεν αντέχω",
		english: "Yes, I can't stand it",
	},
	{ speaker: "friend", greek: "Θέλεις νερό;", english: "Do you want water?" },
	{ speaker: "you", greek: "Ναι, ευχαριστώ", english: "Yes, thank you" },
];

const WORK_CHAT: DialogueLine[] = [
	{
		speaker: "friend",
		greek: "Τι κάνεις στη δουλειά;",
		english: "How's work?",
	},
	{
		speaker: "you",
		greek: "Καλά, πολύ δουλειά όμως",
		english: "Good, but a lot of work",
	},
	{ speaker: "friend", greek: "Κουράστηκες;", english: "Are you tired?" },
	{ speaker: "you", greek: "Λίγο", english: "A little" },
];

const WEEKEND_PLANS: DialogueLine[] = [
	{
		speaker: "friend",
		greek: "Τι θα κάνεις το Σαββατοκύριακο;",
		english: "What are you doing this weekend?",
	},
	{ speaker: "you", greek: "Δεν ξέρω ακόμα", english: "I don't know yet" },
	{
		speaker: "friend",
		greek: "Θέλεις να πάμε για καφέ;",
		english: "Do you want to go for coffee?",
	},
	{ speaker: "you", greek: "Ναι, καλή ιδέα!", english: "Yes, good idea!" },
	{ speaker: "friend", greek: "Το Σάββατο;", english: "Saturday?" },
	{ speaker: "you", greek: "Εντάξει", english: "Okay" },
];

const FAMILY_CHAT: DialogueLine[] = [
	{
		speaker: "friend",
		greek: "Πώς είναι τα παιδιά;",
		english: "How are the kids?",
	},
	{
		speaker: "you",
		greek: "Πολύ καλά, ευχαριστώ",
		english: "Very good, thank you",
	},
	{
		speaker: "friend",
		greek: "Πάνε σχολείο;",
		english: "Do they go to school?",
	},
	{
		speaker: "you",
		greek: "Ναι, τους αρέσει πολύ",
		english: "Yes, they like it a lot",
	},
];

const SmalltalkTab: React.FC = () => {
	const styles = variantStyles.ocean;
	const { mode } = useConversationContext();

	return (
		<div className="space-y-4">
			<ConversationHero
				icon={<MessageCircle size={24} />}
				title="Small Talk"
				greekPhrase="Τι κάνεις;"
				description="Casual conversation with friends and acquaintances. Weather, work, family - the universal topics that connect us."
				colorScheme="ocean"
			/>

			<Card variant="bordered" padding="lg" className={styles.card}>
				<div className="space-y-8">
					<DialogueScenario
						title="Talking about the weather"
						description="A universal conversation starter"
						dialogue={WEATHER_CHAT}
						colorScheme="ocean"
						mode={mode}
					/>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Asking about work"
							description="Common friendly question"
							dialogue={WORK_CHAT}
							colorScheme="ocean"
							mode={mode}
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Weekend plans"
							description="Making plans with friends"
							dialogue={WEEKEND_PLANS}
							colorScheme="ocean"
							mode={mode}
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Asking about family"
							description="Greeks love to ask about family"
							dialogue={FAMILY_CHAT}
							colorScheme="ocean"
							mode={mode}
						/>
					</div>
				</div>
			</Card>

			<LearningTips />
		</div>
	);
};

// ═══════════════════════════════════════════════════════════════════════════════
// REQUESTS TAB
// ═══════════════════════════════════════════════════════════════════════════════
const ASKING_FOR_HELP: DialogueLine[] = [
	{
		speaker: "you",
		greek: "Συγγνώμη, μπορείτε να με βοηθήσετε;",
		english: "Excuse me, can you help me?",
	},
	{ speaker: "stranger", greek: "Βέβαια", english: "Of course" },
	{
		speaker: "you",
		greek: "Πού είναι η στάση;",
		english: "Where is the stop?",
	},
	{ speaker: "stranger", greek: "Εκεί, δεξιά", english: "There, on the right" },
	{ speaker: "you", greek: "Ευχαριστώ πολύ", english: "Thank you very much" },
];

const INTRODUCTIONS: DialogueLine[] = [
	{ speaker: "stranger", greek: "Πώς σε λένε;", english: "What's your name?" },
	{
		speaker: "you",
		greek: "Με λένε...",
		english: "My name is...",
		note: "Add your name",
	},
	{ speaker: "stranger", greek: "Χαίρω πολύ", english: "Nice to meet you" },
	{ speaker: "you", greek: "Κι εγώ", english: "Me too" },
];

const ASKING_OPINION: DialogueLine[] = [
	{
		speaker: "friend",
		greek: "Τι σου φαίνεται;",
		english: "What do you think?",
	},
	{
		speaker: "you",
		greek: "Μου φαίνεται καλό",
		english: "It seems good to me",
	},
	{ speaker: "friend", greek: "Σίγουρα;", english: "Are you sure?" },
	{ speaker: "you", greek: "Ναι, μ' αρέσει", english: "Yes, I like it" },
];

const MAKING_REQUESTS: DialogueLine[] = [
	{ speaker: "you", greek: "Περίμενέ με λίγο", english: "Wait for me a bit" },
	{ speaker: "friend", greek: "Εντάξει", english: "Okay" },
	{ speaker: "you", greek: "Άκουσέ με", english: "Listen to me" },
	{
		speaker: "friend",
		greek: "Λέγε",
		english: "Go ahead",
		note: "Literally 'say'",
	},
	{ speaker: "you", greek: "Δώσε μου το νερό", english: "Give me the water" },
	{ speaker: "friend", greek: "Ορίστε", english: "Here you go" },
];

const RequestsTab: React.FC = () => {
	const styles = variantStyles.honey;
	const { mode } = useConversationContext();

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
						mode={mode}
					/>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Introducing yourself"
							description="When meeting someone new"
							dialogue={INTRODUCTIONS}
							colorScheme="honey"
							mode={mode}
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Asking for opinions"
							description="Getting someone's thoughts"
							dialogue={ASKING_OPINION}
							colorScheme="honey"
							mode={mode}
						/>
					</div>

					<div className="border-t border-stone-200 pt-6">
						<DialogueScenario
							title="Making simple requests"
							description="Common imperative phrases"
							dialogue={MAKING_REQUESTS}
							colorScheme="honey"
							mode={mode}
						/>
					</div>
				</div>
			</Card>

			<LearningTips />
		</div>
	);
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function TabRoute({ loaderData }: Route.ComponentProps) {
	const { tab } = loaderData;

	switch (tab) {
		case "arriving":
			return <ArrivingTab />;
		case "food":
			return <FoodTab />;
		case "smalltalk":
			return <SmalltalkTab />;
		case "requests":
			return <RequestsTab />;
		default:
			return null;
	}
}
