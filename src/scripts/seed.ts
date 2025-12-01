import { db } from "../db";
import type { NewTag, NewVocabulary, NewVocabularyTag } from "../db/schema";

// All vocabulary data defined inline for seeding (single source of truth is DB)

const SEED_VERBS = [
	{ greek: "κάνω", english: "I do/make", pattern: "-ω family" },
	{ greek: "έχω", english: "I have", pattern: "-ω family" },
	{ greek: "μιλάω", english: "I speak", pattern: "-άω/-ώ family" },
	{ greek: "έρχομαι", english: "I come", pattern: "-ομαι family" },
	{ greek: "θυμάμαι", english: "I remember", pattern: "-άμαι family" },
	{ greek: "είμαι", english: "I am", pattern: "Irregular" },
	{ greek: "πάω", english: "I go", pattern: "Irregular" },
	{ greek: "λέω", english: "I say", pattern: "Irregular" },
	{ greek: "τρώω", english: "I eat", pattern: "Irregular" },
];

const FREQUENCY_ADVERBS = [
	{ greek: "ποτέ", english: "never" },
	{ greek: "σχεδόν ποτέ", english: "almost never" },
	{ greek: "σπάνια", english: "rarely" },
	{ greek: "καμιά φορά", english: "sometimes" },
	{ greek: "κάπου κάπου", english: "from time to time" },
	{ greek: "πότε πότε", english: "occasionally" },
	{ greek: "μερικές φορές", english: "sometimes" },
	{ greek: "συχνά", english: "often" },
	{ greek: "πολλές φορές", english: "many times" },
	{ greek: "συνήθως", english: "usually" },
	{ greek: "σχεδόν πάντα", english: "almost always" },
	{ greek: "πάντα", english: "always" },
];

const TIMES_OF_DAY = [
	{ greek: "πρωί", english: "morning", timeRange: "(5:00-12:00)" },
	{ greek: "μεσημέρι", english: "midday", timeRange: "(12:00-15:00)" },
	{ greek: "απόγευμα", english: "afternoon", timeRange: "(15:00-19:00)" },
	{ greek: "βράδυ", english: "evening", timeRange: "(19:00-24:00)" },
	{ greek: "νύχτα", english: "night", timeRange: "(24:00-5:00)" },
];

const LIKES_CONSTRUCTION = {
	singular: [
		{ greek: "μου αρέσει", english: "I like" },
		{ greek: "σου αρέσει", english: "you like" },
		{ greek: "του/της αρέσει", english: "he/she likes" },
		{ greek: "μας αρέσει", english: "we like" },
		{ greek: "σας αρέσει", english: "you like" },
		{ greek: "τους αρέσει", english: "they like" },
	],
	plural: [
		{ greek: "μου αρέσουν", english: "I like (them)" },
		{ greek: "σου αρέσουν", english: "you like (them)" },
		{ greek: "του/της αρέσουν", english: "he/she likes (them)" },
		{ greek: "μας αρέσουν", english: "we like (them)" },
		{ greek: "σας αρέσουν", english: "you like (them)" },
		{ greek: "τους αρέσουν", english: "they like (them)" },
	],
};

const TRANSPORTATION = {
	vehicles: [
		{ greek: "το τρένο", english: "train" },
		{ greek: "το ταξί", english: "taxi" },
		{ greek: "ο ταξιτζής", english: "taxi driver" },
		{ greek: "το αεροπλάνο", english: "airplane" },
		{ greek: "το τρόλεϊ", english: "trolley" },
	],
	actions: [
		{ greek: "ξεκινάει", english: "departs/starts" },
		{ greek: "φεύγει", english: "leaves" },
		{ greek: "περιμένει", english: "waits" },
		{ greek: "παίρνω", english: "I take" },
		{ greek: "δουλεύει", english: "works" },
	],
};

const SUMMER_VOCABULARY = [
	{ greek: "το καλοκαίρι", english: "summer" },
	{ greek: "η θάλασσα", english: "sea" },
	{ greek: "η παραλία", english: "beach" },
	{ greek: "ο ήλιος", english: "sun" },
	{ greek: "η ζέστη", english: "warmth" },
	{ greek: "το μαγιό", english: "swimming costume" },
	{ greek: "το καπέλο", english: "hat" },
	{ greek: "η ξαπλώστρα", english: "sunbed" },
	{ greek: "το παγωτό", english: "ice cream" },
	{ greek: "το καρπούζι", english: "watermelon" },
];

const TIME_EXPRESSIONS = [
	{ greek: "κάθε μέρα", english: "every day" },
	{ greek: "η μέρα", english: "day" },
	{ greek: "το μεσημέρι", english: "midday" },
	{ greek: "το απόγευμα", english: "afternoon" },
	{ greek: "το βράδυ", english: "evening" },
	{ greek: "η νύχτα", english: "night" },
	{ greek: "οι διακοπές", english: "holidays" },
	{ greek: "το ταξίδι", english: "journey/trip" },
];

const USEFUL_EXPRESSIONS = [
	{ greek: "φυσικά", english: "of course" },
	{ greek: "επίσης", english: "also" },
	{ greek: "κάτι", english: "something" },
	{ greek: "τα πάντα", english: "everything" },
	{ greek: "τι γίνεται;", english: "what's happening?" },
	{ greek: "τα λέμε", english: "see ya" },
];

const NUMBERS = [
	"ένα (1)",
	"δύο (2)",
	"τρία (3)",
	"τέσσερα (4)",
	"πέντε (5)",
	"έξι (6)",
	"επτά (7)",
	"οκτώ (8)",
	"εννέα (9)",
	"δέκα (10)",
];

const COLORS = [
	"άσπρο (white)",
	"μαύρο (black)",
	"κόκκινο (red)",
	"μπλε (blue)",
	"πράσινο (green)",
	"κίτρινο (yellow)",
];

// System tags to create
const SYSTEM_TAGS: NewTag[] = [
	{ slug: "summer", name: "Summer & Beach", display_order: 10, is_system: true },
	{ slug: "frequency", name: "Frequency Adverbs", display_order: 20, is_system: true },
	{ slug: "time-of-day", name: "Times of Day", display_order: 30, is_system: true },
	{ slug: "time-expression", name: "Time Expressions", display_order: 40, is_system: true },
	{ slug: "likes-singular", name: "Likes (Singular)", display_order: 50, is_system: true },
	{ slug: "likes-plural", name: "Likes (Plural)", display_order: 51, is_system: true },
	{ slug: "transport-vehicle", name: "Transport - Vehicles", display_order: 60, is_system: true },
	{ slug: "transport-action", name: "Transport - Actions", display_order: 61, is_system: true },
	{ slug: "expression", name: "Useful Expressions", display_order: 70, is_system: true },
	{ slug: "number", name: "Numbers", display_order: 80, is_system: true },
	{ slug: "color", name: "Colors", display_order: 90, is_system: true },
	{ slug: "daily-coffee", name: "Daily - Coffee & Food", display_order: 100, is_system: true },
	{ slug: "daily-house", name: "Daily - House & Location", display_order: 101, is_system: true },
	{ slug: "daily-time", name: "Daily - Time & Schedule", display_order: 102, is_system: true },
	{ slug: "daily-family", name: "Daily - Family & Relationships", display_order: 103, is_system: true },
	{ slug: "verb", name: "Verbs", display_order: 200, is_system: true },
	{ slug: "noun", name: "Nouns", display_order: 201, is_system: true },
	{ slug: "adverb", name: "Adverbs", display_order: 202, is_system: true },
	{ slug: "phrase", name: "Phrases", display_order: 203, is_system: true },
];

// Daily patterns inline data (extracted from daily-patterns.tsx)
const DAILY_COFFEE_FOOD = [
	{ greek: "τον καφέ", english: "the coffee (object)", explanation: "Ordering, buying", whyThisCase: "direct object → accusative" },
	{ greek: "το τσάι", english: "the tea", explanation: "Common drink", whyThisCase: "neuter = same form" },
	{ greek: "το ψωμί", english: "the bread", explanation: "Basic food", whyThisCase: "direct object → accusative" },
	{ greek: "το νερό", english: "the water", explanation: "Essential daily", whyThisCase: "direct object → accusative" },
	{ greek: "τη μπίρα", english: "the beer", explanation: "Common drink", whyThisCase: "direct object → accusative (no ν before μ)" },
];

const DAILY_HOUSE_LOCATION = [
	{ greek: "πηγαίνω στο σπίτι", english: "I go to the house", explanation: "direction/location with στο", whyThisCase: "σε + το = στο (direction)" },
	{ greek: "στη δουλειά", english: "to/at work", explanation: "common destination", whyThisCase: "σε + τη = στη (location)" },
	{ greek: "στο σχολείο", english: "to/at school", explanation: "education context", whyThisCase: "σε + το = στο (neuter)" },
	{ greek: "στον κήπο", english: "in the garden", explanation: "home location", whyThisCase: "σε + τον = στον (masculine)" },
	{ greek: "στη θάλασσα", english: "to/at the sea", explanation: "vacation/leisure", whyThisCase: "σε + τη = στη (no ν before θ)" },
];

const DAILY_TIME_SCHEDULE = [
	{ greek: "το πρωί", english: "in the morning", explanation: "Parts of the day", whyThisCase: "time expressions use accusative" },
	{ greek: "τη νύχτα", english: "at night", explanation: "Night time", whyThisCase: "time period → accusative" },
	{ greek: "το βράδυ", english: "in the evening", explanation: "Evening time", whyThisCase: "time expressions → accusative" },
	{ greek: "τη Δευτέρα", english: "on Monday", explanation: "Days of the week", whyThisCase: "specific day → accusative" },
	{ greek: "το καλοκαίρι", english: "in summer", explanation: "Seasons", whyThisCase: "season/time → accusative" },
];

const DAILY_FAMILY = [
	{ greek: "η μητέρα της Μαρίας", english: "Maria's mother", explanation: "family relationships", whyThisCase: "possession → genitive" },
	{ greek: "ο αδελφός της Μαρίας", english: "Maria's brother", explanation: "family relationships - daily use", whyThisCase: "belonging to Maria → genitive" },
	{ greek: "το σπίτι του πατέρα", english: "father's house", explanation: "family possession - very common", whyThisCase: "whose house? → genitive" },
	{ greek: "η δουλειά του φίλου μου", english: "my friend's job", explanation: "social relationships", whyThisCase: "friend's something → genitive" },
	{ greek: "το κλειδί της πόρτας", english: "the door key", explanation: "everyday objects", whyThisCase: "key of what? → genitive" },
];

// Helper to extract gender from Greek article prefix
const extractGender = (greek: string): "masculine" | "feminine" | "neuter" | null => {
	if (greek.startsWith("ο ")) return "masculine";
	if (greek.startsWith("η ")) return "feminine";
	if (greek.startsWith("το ")) return "neuter";
	if (greek.startsWith("οι ")) return "masculine"; // plural masculine
	if (greek.startsWith("τα ")) return "neuter"; // plural neuter
	return null;
};

// Determine word type from content
const inferWordType = (greek: string, english: string): NewVocabulary["word_type"] => {
	const lowerEnglish = english.toLowerCase();
	if (lowerEnglish.includes("i ") && (lowerEnglish.includes(" do") || lowerEnglish.includes(" go") || lowerEnglish.includes(" make"))) {
		return "verb";
	}
	if (greek.includes(" ")) {
		return "phrase";
	}
	if (extractGender(greek)) {
		return "noun";
	}
	return null;
};

async function seed() {
	console.log("Seeding database with vocabulary and tags...");

	await db.transaction().execute(async (trx) => {
		// Clear existing data in correct order (respecting FK constraints)
		console.log("Clearing existing data...");
		await trx.deleteFrom("vocabulary_tags").execute();
		await trx.deleteFrom("tags").execute();
		await trx.deleteFrom("verb_details").execute();
		await trx.deleteFrom("vocabulary").execute();
		console.log("Cleared existing data.");

		// Step 1: Create system tags
		console.log("Creating system tags...");
		const insertedTags = await trx
			.insertInto("tags")
			.values(SYSTEM_TAGS)
			.returningAll()
			.execute();
		console.log(`Created ${insertedTags.length} system tags.`);

		const tagMap = new Map(insertedTags.map((t) => [t.slug, t.id]));

		// Track inserted vocabulary to avoid duplicates
		const vocabMap = new Map<string, number>(); // greek_text -> vocab_id
		const vocabTagLinks: NewVocabularyTag[] = [];

		// Helper to insert vocabulary and track it
		const insertOrGetVocab = async (
			vocab: NewVocabulary
		): Promise<number> => {
			const existing = vocabMap.get(vocab.greek_text);
			if (existing) {
				return existing;
			}

			const [inserted] = await trx
				.insertInto("vocabulary")
				.values(vocab)
				.returningAll()
				.execute();

			vocabMap.set(vocab.greek_text, inserted.id);
			return inserted.id;
		};

		// Helper to link vocab to tag
		const linkTag = (vocabId: number, tagSlug: string, displayOrder: number) => {
			const tagId = tagMap.get(tagSlug);
			if (tagId) {
				vocabTagLinks.push({
					vocabulary_id: vocabId,
					tag_id: tagId,
					display_order: displayOrder,
				});
			}
		};

		// Step 2: Seed FREQUENCY_ADVERBS
		console.log("Seeding frequency adverbs...");
		for (let i = 0; i < FREQUENCY_ADVERBS.length; i++) {
			const adverb = FREQUENCY_ADVERBS[i];
			const vocabId = await insertOrGetVocab({
				greek_text: adverb.greek,
				english_translation: adverb.english,
				word_type: "adverb",
				status: "processed",
			});
			linkTag(vocabId, "frequency", (i + 1) * 10);
			linkTag(vocabId, "adverb", (i + 1) * 10);
		}

		// Step 3: Seed TIMES_OF_DAY (with metadata)
		console.log("Seeding times of day...");
		for (let i = 0; i < TIMES_OF_DAY.length; i++) {
			const time = TIMES_OF_DAY[i];
			const vocabId = await insertOrGetVocab({
				greek_text: time.greek,
				english_translation: time.english,
				word_type: "noun",
				status: "processed",
				metadata: { timeRange: time.timeRange },
			});
			linkTag(vocabId, "time-of-day", (i + 1) * 10);
			linkTag(vocabId, "noun", (i + 1) * 10);
		}

		// Step 4: Seed LIKES_CONSTRUCTION
		console.log("Seeding likes construction...");
		for (let i = 0; i < LIKES_CONSTRUCTION.singular.length; i++) {
			const like = LIKES_CONSTRUCTION.singular[i];
			const vocabId = await insertOrGetVocab({
				greek_text: like.greek,
				english_translation: like.english,
				word_type: "phrase",
				status: "processed",
			});
			linkTag(vocabId, "likes-singular", (i + 1) * 10);
			linkTag(vocabId, "phrase", (i + 1) * 10);
		}
		for (let i = 0; i < LIKES_CONSTRUCTION.plural.length; i++) {
			const like = LIKES_CONSTRUCTION.plural[i];
			const vocabId = await insertOrGetVocab({
				greek_text: like.greek,
				english_translation: like.english,
				word_type: "phrase",
				status: "processed",
			});
			linkTag(vocabId, "likes-plural", (i + 1) * 10);
			linkTag(vocabId, "phrase", (i + 1) * 10);
		}

		// Step 5: Seed TRANSPORTATION
		console.log("Seeding transportation vocabulary...");
		for (let i = 0; i < TRANSPORTATION.vehicles.length; i++) {
			const vehicle = TRANSPORTATION.vehicles[i];
			const vocabId = await insertOrGetVocab({
				greek_text: vehicle.greek,
				english_translation: vehicle.english,
				word_type: "noun",
				gender: extractGender(vehicle.greek),
				status: "processed",
			});
			linkTag(vocabId, "transport-vehicle", (i + 1) * 10);
			linkTag(vocabId, "noun", (i + 1) * 10);
		}
		for (let i = 0; i < TRANSPORTATION.actions.length; i++) {
			const action = TRANSPORTATION.actions[i];
			const wordType = action.english.startsWith("I ") ? "verb" : "phrase";
			const vocabId = await insertOrGetVocab({
				greek_text: action.greek,
				english_translation: action.english,
				word_type: wordType,
				status: "processed",
			});
			linkTag(vocabId, "transport-action", (i + 1) * 10);
			if (wordType === "verb") {
				linkTag(vocabId, "verb", (i + 1) * 10);
			}
		}

		// Step 6: Seed SUMMER_VOCABULARY
		console.log("Seeding summer vocabulary...");
		for (let i = 0; i < SUMMER_VOCABULARY.length; i++) {
			const word = SUMMER_VOCABULARY[i];
			const vocabId = await insertOrGetVocab({
				greek_text: word.greek,
				english_translation: word.english,
				word_type: "noun",
				gender: extractGender(word.greek),
				status: "processed",
			});
			linkTag(vocabId, "summer", (i + 1) * 10);
			linkTag(vocabId, "noun", (i + 1) * 10);
		}

		// Step 7: Seed TIME_EXPRESSIONS
		console.log("Seeding time expressions...");
		for (let i = 0; i < TIME_EXPRESSIONS.length; i++) {
			const expr = TIME_EXPRESSIONS[i];
			const wordType = expr.greek.includes(" ") ? "phrase" : "noun";
			const vocabId = await insertOrGetVocab({
				greek_text: expr.greek,
				english_translation: expr.english,
				word_type: wordType,
				gender: extractGender(expr.greek),
				status: "processed",
			});
			linkTag(vocabId, "time-expression", (i + 1) * 10);
		}

		// Step 8: Seed USEFUL_EXPRESSIONS
		console.log("Seeding useful expressions...");
		for (let i = 0; i < USEFUL_EXPRESSIONS.length; i++) {
			const expr = USEFUL_EXPRESSIONS[i];
			const vocabId = await insertOrGetVocab({
				greek_text: expr.greek,
				english_translation: expr.english,
				word_type: "phrase",
				status: "processed",
			});
			linkTag(vocabId, "expression", (i + 1) * 10);
			linkTag(vocabId, "phrase", (i + 1) * 10);
		}

		// Step 9: Seed NUMBERS (these are just strings, need parsing)
		console.log("Seeding numbers...");
		for (let i = 0; i < NUMBERS.length; i++) {
			const numStr = NUMBERS[i];
			// Format: "ένα (1)" - extract Greek and number
			const match = numStr.match(/^(.+?) \((\d+)\)$/);
			if (match) {
				const [, greek, digit] = match;
				const vocabId = await insertOrGetVocab({
					greek_text: greek,
					english_translation: digit,
					word_type: "noun",
					status: "processed",
					metadata: { numericValue: Number.parseInt(digit, 10) },
				});
				linkTag(vocabId, "number", (i + 1) * 10);
			}
		}

		// Step 10: Seed COLORS (these are also strings needing parsing)
		console.log("Seeding colors...");
		for (let i = 0; i < COLORS.length; i++) {
			const colorStr = COLORS[i];
			// Format: "άσπρο (white)" - extract Greek and English
			const match = colorStr.match(/^(.+?) \((.+)\)$/);
			if (match) {
				const [, greek, english] = match;
				const vocabId = await insertOrGetVocab({
					greek_text: greek,
					english_translation: english,
					word_type: "adjective",
					status: "processed",
				});
				linkTag(vocabId, "color", (i + 1) * 10);
			}
		}

		// Step 11: Seed verbs
		console.log("Seeding verbs...");
		for (let i = 0; i < SEED_VERBS.length; i++) {
			const verb = SEED_VERBS[i];
			const vocabId = await insertOrGetVocab({
				greek_text: verb.greek,
				english_translation: verb.english,
				word_type: "verb",
				status: "processed",
			});
			linkTag(vocabId, "verb", (i + 1) * 10);

			// Also insert verb_details
			await trx
				.insertInto("verb_details")
				.values({
					vocab_id: vocabId,
					infinitive: verb.greek,
					conjugation_family: verb.pattern || "unknown",
				})
				.onConflict((oc) => oc.column("vocab_id").doNothing())
				.execute();
		}

		// Step 12: Seed Daily Patterns (extracted from daily-patterns.tsx)
		console.log("Seeding daily patterns...");

		// Coffee & Food
		for (let i = 0; i < DAILY_COFFEE_FOOD.length; i++) {
			const item = DAILY_COFFEE_FOOD[i];
			const vocabId = await insertOrGetVocab({
				greek_text: item.greek,
				english_translation: item.english,
				word_type: inferWordType(item.greek, item.english) || "phrase",
				status: "processed",
				metadata: { explanation: item.explanation, whyThisCase: item.whyThisCase },
			});
			linkTag(vocabId, "daily-coffee", (i + 1) * 10);
		}

		// House & Location
		for (let i = 0; i < DAILY_HOUSE_LOCATION.length; i++) {
			const item = DAILY_HOUSE_LOCATION[i];
			const vocabId = await insertOrGetVocab({
				greek_text: item.greek,
				english_translation: item.english,
				word_type: inferWordType(item.greek, item.english) || "phrase",
				status: "processed",
				metadata: { explanation: item.explanation, whyThisCase: item.whyThisCase },
			});
			linkTag(vocabId, "daily-house", (i + 1) * 10);
		}

		// Time & Schedule
		for (let i = 0; i < DAILY_TIME_SCHEDULE.length; i++) {
			const item = DAILY_TIME_SCHEDULE[i];
			const vocabId = await insertOrGetVocab({
				greek_text: item.greek,
				english_translation: item.english,
				word_type: inferWordType(item.greek, item.english) || "phrase",
				status: "processed",
				metadata: { explanation: item.explanation, whyThisCase: item.whyThisCase },
			});
			linkTag(vocabId, "daily-time", (i + 1) * 10);
		}

		// Family & Relationships
		for (let i = 0; i < DAILY_FAMILY.length; i++) {
			const item = DAILY_FAMILY[i];
			const vocabId = await insertOrGetVocab({
				greek_text: item.greek,
				english_translation: item.english,
				word_type: "phrase",
				status: "processed",
				metadata: { explanation: item.explanation, whyThisCase: item.whyThisCase },
			});
			linkTag(vocabId, "daily-family", (i + 1) * 10);
		}

		// Step 13: Insert all vocabulary_tags links
		console.log("Creating vocabulary-tag associations...");
		if (vocabTagLinks.length > 0) {
			// Deduplicate links (same vocab_id + tag_id should only appear once)
			const uniqueLinks = new Map<string, NewVocabularyTag>();
			for (const link of vocabTagLinks) {
				const key = `${link.vocabulary_id}-${link.tag_id}`;
				if (!uniqueLinks.has(key)) {
					uniqueLinks.set(key, link);
				}
			}

			const linksArray = Array.from(uniqueLinks.values());
			await trx.insertInto("vocabulary_tags").values(linksArray).execute();
			console.log(`Created ${linksArray.length} vocabulary-tag associations.`);
		}

		console.log(`Total vocabulary items: ${vocabMap.size}`);
	});

	console.log("Seeding complete.");
	process.exit(0);
}

seed().catch((err) => {
	console.error("Seeding failed:", err);
	process.exit(1);
});
