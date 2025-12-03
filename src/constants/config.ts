export interface TabInfo {
	id: string;
	label: string;
	icon: string;
}

// Navigation tabs configuration
export const TABS: TabInfo[] = [
	{ id: "conversations", label: "Conversations", icon: "Target" },
	{ id: "quick-reference", label: "Quick Reference", icon: "FileText" },
	{ id: "practice", label: "Practice", icon: "Lightbulb" },
	{ id: "vocabulary", label: "Vocabulary", icon: "BookOpen" },
	{ id: "search", label: "Search", icon: "Search" },
];
