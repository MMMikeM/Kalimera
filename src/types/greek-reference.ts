export interface VerbInfo {
	id: string;
	greek: string;
	english: string;
	pattern: string;
}

export interface VerbCategory {
	id: string;
	title: string;
	verbs: VerbInfo[];
}

export interface WordInfo {
	id: string;
	greek: string;
	english: string;
	type: string;
	family?: string;
}

export interface TabInfo {
	id: string;
	label: string;
	icon: string;
}

export interface ArticleForm {
	case: string;
	masculine: string;
	feminine: string;
	neuter: string;
}

export interface VerbConjugation {
	person: string;
	form: string;
	highlighted?: string;
	english: string;
}

export interface ConjugationSet {
	[key: string]: VerbConjugation[];
}

export interface TableData {
	headers?: string[];
	rows: string[][];
	headerColors?: string[];
}

export interface StandardTableProps {
	headers?: string[];
	rows: (string | React.ReactNode)[][];
	className?: string;
	headerColors?: string[];
}

export interface TimeOfDay {
	id: string;
	greek: string;
	english: string;
	timeRange: string;
}

export interface FrequencyAdverb {
	id: string;
	greek: string;
	english: string;
}

export interface LikeConstruction {
	id: string;
	greek: string;
	english: string;
}

export interface VocabularyItem {
	id: string;
	greek: string;
	english: string;
}

export interface TransportationData {
	vehicles: VocabularyItem[];
	actions: VocabularyItem[];
}

export type TabId =
	| "articles"
	| "present"
	| "other-tenses"
	| "vocabulary"
	| "search";
