import type { TabInfo, TabId } from "../types/greek-reference";

// Navigation tabs configuration
export const TABS: TabInfo[] = [
	{ id: "articles", label: "Articles & Cases", icon: "FileText" },
	{ id: "present", label: "Present Tense", icon: "Users" },
	{ id: "other-tenses", label: "Other Tenses", icon: "Clock" },
	{ id: "vocabulary", label: "Essential Words", icon: "BookOpen" },
	{ id: "search", label: "Quick Search", icon: "Search" },
];

// Default tab ID
export const DEFAULT_TAB: TabId = "articles";
