export interface TabInfo {
	id: string;
	label: string;
	icon: string;
}

// Navigation tabs configuration
export const TABS: TabInfo[] = [
	{ id: "core-rules", label: "Core Rules", icon: "FileText" },
	{ id: "daily-patterns", label: "Daily Patterns", icon: "Target" },
	{ id: "advanced-cases", label: "Advanced Cases", icon: "Layers" },
	{ id: "case-practice", label: "Case Practice", icon: "Lightbulb" },
	{ id: "present", label: "Present Tense", icon: "Users" },
	{ id: "other-tenses", label: "Other Tenses", icon: "Clock" },
	{ id: "vocabulary", label: "Essential Words", icon: "BookOpen" },
	{ id: "search", label: "Quick Search", icon: "Search" },
];
