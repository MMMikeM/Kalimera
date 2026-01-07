import type { DisplaySection } from "@/db.server/enums";

// Tag with section assignment (for UI display)
export interface ContentTag {
	slug: string;
	name: string;
	section: DisplaySection;
	displayOrder: number;
}

// Tag without section (lessons, etc.)
export interface LessonTag {
	slug: string;
	name: string;
}

// Content tags organized by section (these appear in UI)
export const CONTENT_TAGS = {
	// NOUNS SECTION
	people: { slug: "people", name: "People & Family", section: "nouns", displayOrder: 1 },
	nature: { slug: "nature", name: "Nature", section: "nouns", displayOrder: 2 },
	summer: { slug: "summer", name: "Summer & Beach", section: "nouns", displayOrder: 3 },
	shopping: { slug: "shopping", name: "Shopping & Groceries", section: "nouns", displayOrder: 4 },
	clothing: { slug: "clothing", name: "Clothing & Wardrobe", section: "nouns", displayOrder: 5 },
	household: { slug: "household", name: "Household & Home", section: "nouns", displayOrder: 6 },
	transportVehicle: { slug: "transport-vehicle", name: "Transport - Vehicles", section: "nouns", displayOrder: 7 },

	// VERBS SECTION
	transportAction: { slug: "transport-action", name: "Transport - Actions", section: "verbs", displayOrder: 1 },
	dailyCoffee: { slug: "daily-coffee", name: "Daily - Coffee & Food", section: "verbs", displayOrder: 2 },
	dailyHouse: { slug: "daily-house", name: "Daily - House & Location", section: "verbs", displayOrder: 3 },
	dailyTime: { slug: "daily-time", name: "Daily - Time & Schedule", section: "verbs", displayOrder: 4 },
	dailyFamily: { slug: "daily-family", name: "Daily - Family & Relationships", section: "verbs", displayOrder: 5 },
	likesSingular: { slug: "likes-singular", name: "Likes (Singular)", section: "verbs", displayOrder: 6 },
	likesPlural: { slug: "likes-plural", name: "Likes (Plural)", section: "verbs", displayOrder: 7 },

	// PHRASES SECTION
	essential: { slug: "essential", name: "Essential Phrases", section: "phrases", displayOrder: 1 },
	survival: { slug: "survival", name: "Survival Phrases", section: "phrases", displayOrder: 2 },
	request: { slug: "request", name: "Polite Requests", section: "phrases", displayOrder: 3 },
	expression: { slug: "expression", name: "Useful Expressions", section: "phrases", displayOrder: 4 },
	command: { slug: "command", name: "Commands", section: "phrases", displayOrder: 5 },
	question: { slug: "question", name: "Question Words", section: "phrases", displayOrder: 6 },
	discourseMarkers: { slug: "discourse-markers", name: "Discourse Markers", section: "phrases", displayOrder: 7 },
	discourseFiller: { slug: "discourse-filler", name: "Discourse Fillers & Connectors", section: "phrases", displayOrder: 8 },
	responses: { slug: "responses", name: "Common Responses", section: "phrases", displayOrder: 9 },
	opinions: { slug: "opinions", name: "Opinion & Feeling", section: "phrases", displayOrder: 10 },
	socialPhrase: { slug: "social-phrase", name: "Social Phrases", section: "phrases", displayOrder: 11 },
	conversationArriving: { slug: "conversation-arriving", name: "Arriving & Leaving", section: "phrases", displayOrder: 12 },
	conversationFood: { slug: "conversation-food", name: "Food & Hospitality", section: "phrases", displayOrder: 13 },
	conversationSmalltalk: { slug: "conversation-smalltalk", name: "Small Talk", section: "phrases", displayOrder: 14 },
	timeTelling: { slug: "time-telling", name: "Telling Time", section: "phrases", displayOrder: 15 },
	nameConstruction: { slug: "name-construction", name: "Name Construction", section: "phrases", displayOrder: 16 },

	// REFERENCE SECTION
	daysOfWeek: { slug: "days-of-week", name: "Days of the Week", section: "reference", displayOrder: 1 },
	months: { slug: "months", name: "Months of the Year", section: "reference", displayOrder: 2 },
	number: { slug: "number", name: "Numbers", section: "reference", displayOrder: 3 },
	color: { slug: "color", name: "Colors", section: "reference", displayOrder: 4 },
	timeOfDay: { slug: "time-of-day", name: "Times of Day", section: "reference", displayOrder: 5 },
	timeExpression: { slug: "time-expression", name: "Time Expressions", section: "reference", displayOrder: 6 },
	frequency: { slug: "frequency", name: "Frequency Adverbs", section: "reference", displayOrder: 7 },
	position: { slug: "position", name: "Position & Direction", section: "reference", displayOrder: 8 },
} as const satisfies Record<string, ContentTag>;

// Lesson tags (no section - not displayed in vocabulary pages UI)
export const LESSON_TAGS = {
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
} as const satisfies Record<string, LessonTag>;

// Combined for backward compatibility
export const SYSTEM_TAGS = { ...CONTENT_TAGS, ...LESSON_TAGS };
export type TagKey = keyof typeof SYSTEM_TAGS;
