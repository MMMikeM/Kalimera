// System tag definitions for organizing vocabulary

export interface TagDefinition {
	slug: string;
	name: string;
	description?: string;
}

export const SYSTEM_TAGS = {
	// Thematic tags
	summer: { slug: "summer", name: "Summer & Beach" },
	frequency: { slug: "frequency", name: "Frequency Adverbs" },
	position: { slug: "position", name: "Position & Direction" },
	timeOfDay: { slug: "time-of-day", name: "Times of Day" },
	timeExpression: { slug: "time-expression", name: "Time Expressions" },
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

	// Word type tags
	verb: { slug: "verb", name: "Verbs" },
	noun: { slug: "noun", name: "Nouns" },
	adverb: { slug: "adverb", name: "Adverbs" },
	adjective: { slug: "adjective", name: "Adjectives" },
	phrase: { slug: "phrase", name: "Phrases" },
} as const satisfies Record<string, TagDefinition>;

export type TagKey = keyof typeof SYSTEM_TAGS;
