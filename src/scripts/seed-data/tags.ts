// System tag definitions for organizing vocabulary

export interface TagDefinition {
	slug: string;
	name: string;
	description?: string;
}

export const SYSTEM_TAGS = {
	// Essential vocabulary
	essential: { slug: "essential", name: "Essential Phrases" },
	daysOfWeek: { slug: "days-of-week", name: "Days of the Week" },
	months: { slug: "months", name: "Months of the Year" },

	// Thematic tags
	summer: { slug: "summer", name: "Summer & Beach" },
	frequency: { slug: "frequency", name: "Frequency Adverbs" },
	position: { slug: "position", name: "Position & Direction" },
	timeOfDay: { slug: "time-of-day", name: "Times of Day" },
	timeExpression: { slug: "time-expression", name: "Time Expressions" },
	timeTelling: { slug: "time-telling", name: "Telling Time" },
	likesSingular: { slug: "likes-singular", name: "Likes (Singular)" },
	likesPlural: { slug: "likes-plural", name: "Likes (Plural)" },
	transportVehicle: { slug: "transport-vehicle", name: "Transport - Vehicles" },
	transportAction: { slug: "transport-action", name: "Transport - Actions" },
	expression: { slug: "expression", name: "Useful Expressions" },
	command: { slug: "command", name: "Commands" },
	question: { slug: "question", name: "Question Words" },
	number: { slug: "number", name: "Numbers" },
	color: { slug: "color", name: "Colors" },
	shopping: { slug: "shopping", name: "Shopping & Groceries" },
	clothing: { slug: "clothing", name: "Clothing & Wardrobe" },
	household: { slug: "household", name: "Household & Home" },
	people: { slug: "people", name: "People & Family" },
	nature: { slug: "nature", name: "Nature" },

	// Grammar pattern tags (for case drilling)
	dailyCoffee: { slug: "daily-coffee", name: "Daily - Coffee & Food" },
	dailyHouse: { slug: "daily-house", name: "Daily - House & Location" },
	dailyTime: { slug: "daily-time", name: "Daily - Time & Schedule" },
	dailyFamily: { slug: "daily-family", name: "Daily - Family & Relationships" },

	// Conversation context tags
	discourseMarkers: { slug: "discourse-markers", name: "Discourse Markers" },
	responses: { slug: "responses", name: "Common Responses" },
	opinions: { slug: "opinions", name: "Opinion & Feeling" },
	conversationArriving: { slug: "conversation-arriving", name: "Arriving & Leaving" },
	conversationFood: { slug: "conversation-food", name: "Food & Hospitality" },
	conversationSmalltalk: { slug: "conversation-smalltalk", name: "Small Talk" },

	// Name construction tags
	nameConstruction: { slug: "name-construction", name: "Name Construction" },

	// Semantic expression groups
	discourseFiller: { slug: "discourse-filler", name: "Discourse Fillers & Connectors" },
	socialPhrase: { slug: "social-phrase", name: "Social Phrases" },

	// Word type tags
	verb: { slug: "verb", name: "Verbs" },
	noun: { slug: "noun", name: "Nouns" },
	adverb: { slug: "adverb", name: "Adverbs" },
	adjective: { slug: "adjective", name: "Adjectives" },
	phrase: { slug: "phrase", name: "Phrases" },

	// Lesson tags (auto-generated per lesson date)
	// 2023
	lesson20231030: { slug: "lesson-2023-10-30", name: "Lesson: Basic Nouns" },
	lesson20231108: { slug: "lesson-2023-11-08", name: "Lesson: Articles & Places" },
	lesson20231209: { slug: "lesson-2023-12-09", name: "Lesson: Past Tense Intro" },
	lesson20231231: { slug: "lesson-2023-12-31", name: "Lesson: Advanced Vocab" },
	// 2024
	lesson20240325: { slug: "lesson-2024-03-25", name: "Lesson: Intro & Weather" },
	lesson20240404: { slug: "lesson-2024-04-04", name: "Lesson: Abstract Vocab" },
	lesson20240415: { slug: "lesson-2024-04-15", name: "Lesson: Pets & Actions" },
	lesson20240422: { slug: "lesson-2024-04-22", name: "Lesson: Questions" },
	lesson20240429: { slug: "lesson-2024-04-29", name: "Lesson: Frequency" },
	lesson20240506: { slug: "lesson-2024-05-06", name: "Lesson: Daily Activities" },
	lesson20240605: { slug: "lesson-2024-06-05", name: "Lesson: Summer Vacation" },
	lesson20240610: { slug: "lesson-2024-06-10", name: "Lesson: Quantity Words" },
	lesson20240617: { slug: "lesson-2024-06-17", name: "Lesson: Giving & Kissing" },
	lesson20240626: { slug: "lesson-2024-06-26", name: "Lesson: Shopping & Sleep" },
	lesson20240701: { slug: "lesson-2024-07-01", name: "Lesson: Daily Verbs" },
	lesson20240708: { slug: "lesson-2024-07-08", name: "Lesson: Likes & When" },
	lesson20240715: { slug: "lesson-2024-07-15", name: "Lesson: Directions" },
	lesson20240729: { slug: "lesson-2024-07-29", name: "Lesson: Deponent Verbs" },
	lesson20240805: { slug: "lesson-2024-08-05", name: "Lesson: Together/No one" },
	lesson20240812: { slug: "lesson-2024-08-12", name: "Lesson: Forgetting" },
	lesson20240910: { slug: "lesson-2024-09-10", name: "Lesson: Living Abroad" },
	lesson20241015: { slug: "lesson-2024-10-15", name: "Lesson: Work Vocab" },
	lesson20241111: { slug: "lesson-2024-11-11", name: "Lesson: Time & Schedules" },
	lesson20241128: { slug: "lesson-2024-11-28", name: "Lesson: Masculine -ος" },
	lesson20241202: { slug: "lesson-2024-12-02", name: "Lesson: Family Routines" },
} as const satisfies Record<string, TagDefinition>;

export type TagKey = keyof typeof SYSTEM_TAGS;
