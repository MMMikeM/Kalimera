// Articles and cases
import {
	DEFINITE_ARTICLES,
	CASE_EXAMPLES,
	PREPOSITION_PATTERNS,
} from "../constants/articles";

// Verbs
import {
	VERB_CONJUGATIONS,
	FUTURE_TENSE_EXAMPLES,
	PAST_TENSE_EXAMPLES,
	VERB_CATEGORIES,
} from "../constants/verbs";

// Recognition and learning aids
import { CASE_RECOGNITION, COMMON_MISTAKES } from "../constants/recognition";

// Vocabulary
import {
	TIMES_OF_DAY,
	FREQUENCY_ADVERBS,
	LIKES_CONSTRUCTION,
	SUMMER_VOCABULARY,
	TIME_EXPRESSIONS,
	NUMBERS,
	COLORS,
	USEFUL_EXPRESSIONS,
	TRANSPORTATION,
} from "../constants/vocabulary";
import type { ArticleForm, VerbConjugation } from "../types/greek-reference";

// Utility to escape markdown special characters
const escapeMarkdown = (text: string): string => {
	return text.replace(/([*_`~\\[\]()>#+\-!|])/g, "\\$1");
};

// Convert array to markdown table
const arrayToMarkdownTable = (
	headers: string[],
	rows: (string | any)[][],
): string => {
	const cleanHeaders = headers.map((h) => escapeMarkdown(h));
	const headerRow = `| ${cleanHeaders.join(" | ")} |`;
	const separatorRow = `| ${cleanHeaders.map(() => "---").join(" | ")} |`;

	const dataRows = rows.map((row) => {
		const cleanCells = row.map((cell) => {
			if (typeof cell === "string") {
				return escapeMarkdown(cell);
			}
			// Extract text content from React elements or objects
			if (cell && typeof cell === "object") {
				if (cell.props && cell.props.children) {
					return escapeMarkdown(String(cell.props.children));
				}
				return escapeMarkdown(String(cell));
			}
			return escapeMarkdown(String(cell));
		});
		return `| ${cleanCells.join(" | ")} |`;
	});

	return [headerRow, separatorRow, ...dataRows].join("\n");
};

// Convert article forms to markdown table rows
const articleFormToRow = (form: ArticleForm): string[] => [
	form.case,
	form.masculine,
	form.feminine,
	form.neuter,
];

// Convert verb conjugation to markdown table rows
const verbConjugationToRow = (conj: VerbConjugation): string[] => [
	conj.person,
	conj.form,
	conj.english,
];

export const exportArticlesSection = (): string => {
	let markdown = "# Articles & Cases\n\n";

	// Quick rules first - most important
	markdown += "## 🎯 Quick Case Rules - Master These First!\n\n";
	CASE_RECOGNITION.quickRules.forEach((rule) => {
		markdown += `### ${rule.question} → ${rule.answer}\n`;
		markdown += `**Example:** ${rule.example}\n\n`;
	});

	markdown += '## The "Tin Tis Toun" Mystery Solved!\n\n';
	markdown +=
		'These are all forms of "the" - they change based on gender, number, and case! Focus on **accusative (objects)** and **genitive (possession)** first.\n\n';

	// Article tables - reorganized by importance
	markdown += "### 🔥 Most Important: Accusative & Genitive Forms\n\n";
	const importantForms = DEFINITE_ARTICLES.singular.filter(
		(form) => form.case.includes("Acc") || form.case.includes("Gen"),
	);
	const importantRows = importantForms.map(articleFormToRow);
	markdown += arrayToMarkdownTable(
		["Case", "Masculine", "Feminine", "Neuter"],
		importantRows,
	);
	markdown += "\n\n";

	// Complete singular table
	markdown += "### Complete Singular Forms\n\n";
	const singularRows = DEFINITE_ARTICLES.singular.map(articleFormToRow);
	markdown += arrayToMarkdownTable(
		["Case", "Masculine", "Feminine", "Neuter"],
		singularRows,
	);
	markdown += "\n\n";

	// Plural articles table
	markdown += "### Plural Forms\n\n";
	const pluralRows = DEFINITE_ARTICLES.plural.map(articleFormToRow);
	markdown += arrayToMarkdownTable(
		["Case", "Masculine", "Feminine", "Neuter"],
		pluralRows,
	);
	markdown += "\n\n";

	// Practical examples by case - THE CORE LEARNING SECTION
	markdown += "## 💡 How to Actually Use Each Case\n\n";

	// Accusative examples
	markdown +=
		"### Accusative (τον/την/το) - Objects & Directions [MOST USED]\n\n";
	CASE_EXAMPLES.accusative.forEach((example) => {
		markdown += `- **${example.greek}** - ${example.english}\n`;
		markdown += `  *${example.explanation}*\n\n`;
	});

	// Genitive examples
	markdown += '### Genitive (του/της) - Possession & "Of" [ESSENTIAL]\n\n';
	CASE_EXAMPLES.genitive.forEach((example) => {
		markdown += `- **${example.greek}** - ${example.english}\n`;
		markdown += `  *${example.explanation}*\n\n`;
	});

	// Nominative examples
	markdown += "### Nominative (ο/η/το) - Subjects\n\n";
	CASE_EXAMPLES.nominative.forEach((example) => {
		markdown += `- **${example.greek}** - ${example.english}\n`;
		markdown += `  *${example.explanation}*\n\n`;
	});

	// Preposition patterns
	markdown += "## 📍 Essential Preposition Patterns\n\n";
	PREPOSITION_PATTERNS.forEach((pattern) => {
		markdown += `### ${pattern.preposition} + ${pattern.case}\n`;
		markdown += `**${pattern.example}** - ${pattern.english}\n\n`;
	});

	// Memory aids
	markdown += '## 🧠 Memory Aid: The "ν" Rule\n\n';
	markdown +=
		'Add "ν" to τον/την/το when the next word starts with: vowel, κ, π, τ, ξ, ψ, γκ, μπ, ντ\n\n';
	markdown += "**Examples:**\n";
	markdown += "- **τον άντρα** (ton andra)\n";
	markdown += "- **την ώρα** (tin ora)\n\n";

	// Recognition patterns
	markdown += "## 🔍 Quick Recognition Tips\n\n";
	CASE_RECOGNITION.patterns.forEach((pattern) => {
		markdown += `### ${pattern.pattern}\n`;
		markdown += `${pattern.rule}\n`;
		markdown += `Examples: ${pattern.examples.join(", ")}\n\n`;
	});

	// Common mistakes
	markdown += "## ⚠️ Avoid These Common Mistakes\n\n";
	COMMON_MISTAKES.forEach((mistake) => {
		markdown += `### ❌ Wrong: ${mistake.wrong}\n`;
		markdown += `### ✅ Correct: ${mistake.correct}\n`;
		markdown += `**Why:** ${mistake.explanation}\n\n`;
	});

	return markdown;
};

export const exportPresentTenseSection = (): string => {
	let markdown = "# Present Tense\n\n";

	markdown += "## Two Main Families\n\n";
	markdown +=
		"Almost every Greek verb fits into one of these two patterns!\n\n";

	// Family 1: Active verbs
	markdown += "## Family 1: Active (-ω verbs)\n\n";
	markdown += "**The Rhythm:** -ω, -εις, -ει, -ουμε, -ετε, -ουν(ε)\n\n";

	// Type A: κάνω
	markdown += "### Type A: κάνω (I do) - stress on stem\n\n";
	const kanoRows = VERB_CONJUGATIONS.kano.map(verbConjugationToRow);
	markdown += arrayToMarkdownTable(["Person", "Greek", "English"], kanoRows);
	markdown += "\n\n";

	// Type B: μιλάω
	markdown += "### Type B: μιλάω (I speak) - stress on ending\n\n";
	const milaoRows = VERB_CONJUGATIONS.milao.map(verbConjugationToRow);
	markdown += arrayToMarkdownTable(["Person", "Greek", "English"], milaoRows);
	markdown += "\n\n";

	// Family 2: Passive verbs
	markdown += "## Family 2: Passive (-ομαι verbs)\n\n";
	markdown += "**The Rhythm:** -ομαι, -εσαι, -εται, -όμαστε, -εστε, -ονται\n\n";

	// Type A: έρχομαι
	markdown += "### Type A: έρχομαι (I come)\n\n";
	const erhomaiRows = VERB_CONJUGATIONS.erhomai.map(verbConjugationToRow);
	markdown += arrayToMarkdownTable(["Person", "Greek", "English"], erhomaiRows);
	markdown += "\n\n";

	// Type B: θυμάμαι
	markdown += "### Type B: θυμάμαι (I remember)\n\n";
	const thymamaiRows = VERB_CONJUGATIONS.thymamai.map(verbConjugationToRow);
	markdown += arrayToMarkdownTable(
		["Person", "Greek", "English"],
		thymamaiRows,
	);
	markdown += "\n\n";

	// Memory tips
	markdown += "## Memory Tips\n\n";
	markdown += "- **Active verbs (-ω):** Someone DOES something\n";
	markdown +=
		"- **Passive verbs (-ομαι):** Look passive but often mean active actions\n";
	markdown +=
		'- **Pattern recognition:** Learn the "I" form (εγώ) and you know the family!\n';
	markdown += "- **έρχομαι = -ομαι family**\n";
	markdown += "- **κάνω = -ω family**\n\n";

	// Irregular verbs
	markdown += "## Irregular Verbs - Must Memorize!\n\n";
	markdown +=
		"These don't follow the standard patterns - learn them individually!\n\n";

	markdown += "### πάω (I go)\n\n";
	const paoRows = VERB_CONJUGATIONS.pao.map(verbConjugationToRow);
	markdown += arrayToMarkdownTable(["Person", "Greek", "English"], paoRows);
	markdown += "\n\n";

	markdown += "### λέω (I say)\n\n";
	const leoRows = VERB_CONJUGATIONS.leo.map(verbConjugationToRow);
	markdown += arrayToMarkdownTable(["Person", "Greek", "English"], leoRows);
	markdown += "\n\n";

	markdown += "### τρώω (I eat) - drops ω\n\n";
	const trooRows = VERB_CONJUGATIONS.troo.map(verbConjugationToRow);
	markdown += arrayToMarkdownTable(["Person", "Greek", "English"], trooRows);
	markdown += "\n\n";

	markdown += "### είμαι (I am)\n\n";
	const eimaiRows = VERB_CONJUGATIONS.eimai.map(verbConjugationToRow);
	markdown += arrayToMarkdownTable(["Person", "Greek", "English"], eimaiRows);
	markdown += "\n\n";

	markdown += "### Memory Notes\n";
	markdown +=
		"- **πάω:** Alternative form is πηγαίνω (follows normal Type A pattern)\n";
	markdown += "- **λέω:** Notice how it drops the final ω in most forms\n";
	markdown += "- **τρώω:** Similar to λέω - drops the final ω\n";
	markdown += '- **τα λέμε:** "see ya later" (literally "we say them")\n\n';

	return markdown;
};

export const exportOtherTensesSection = (): string => {
	let markdown = "# Other Tenses\n\n";

	markdown += "## Future Reference - Key Patterns\n\n";
	markdown +=
		"These follow the same base patterns as present tense, just with different markers.\n\n";

	// Simple Future
	markdown += "### Simple Future (θα + present)\n\n";
	markdown += "**Formula:** θα + present tense forms\n\n";
	const futureRows = FUTURE_TENSE_EXAMPLES.map(verbConjugationToRow);
	markdown += arrayToMarkdownTable(
		["Person", "θα κάνω", "English"],
		futureRows,
	);
	markdown += "\n\n";

	// Past Simple
	markdown += "### Past Simple - Basic Pattern\n\n";
	markdown += "**Key:** Often starts with έ- and changes endings\n\n";
	const pastRows = PAST_TENSE_EXAMPLES.map(verbConjugationToRow);
	markdown += arrayToMarkdownTable(["Person", "έκανα", "English"], pastRows);
	markdown += "\n\n";

	markdown += "## Focus on Present First!\n\n";
	markdown +=
		"Master the present tense patterns before diving deep into other tenses. The same verb families apply - just with different time markers.\n\n";

	return markdown;
};

export const exportVocabularySection = (): string => {
	let markdown = "# Essential Words\n\n";

	markdown += "## Quick Verb Reference\n\n";
	markdown +=
		"From your Greek learning materials - organized by conjugation pattern.\n\n";

	// Verb categories
	VERB_CATEGORIES.forEach((category) => {
		markdown += `### ${category.title}\n\n`;
		category.verbs.forEach((verb) => {
			markdown += `- **${verb.greek}** - ${verb.english} *(${verb.pattern})*\n`;
		});
		markdown += "\n";
	});

	// Telling time
	markdown += "## Telling Time - Τι ώρα είναι;\n\n";
	markdown += "**Pattern:** Είναι + time / Η ώρα είναι + time\n\n";

	markdown += "### Basic Time Structure\n";
	markdown += "- **είναι μία** - it's one o'clock\n";
	markdown += "- **είναι δύο** - it's two o'clock\n";
	markdown += "- **είναι μία ακριβώς** - it's exactly one\n";
	markdown += "- **τι ώρα είναι;** - what time is it?\n\n";

	markdown += "### Minutes & Fractions\n";
	markdown += "- **και τέταρτο** - quarter past\n";
	markdown += "- **και μισή** - half past\n";
	markdown += "- **παρά τέταρτο** - quarter to\n";
	markdown += "- **παρά πέντε** - five to\n";
	markdown += "- **και είκοσι πέντε** - twenty-five past\n\n";

	markdown +=
		'**"At" times:** στη μία (at one), στις τρεις (at three), στις τέσσερις (at four)\n\n';

	// Times of day
	markdown += "### Times of Day\n\n";
	TIMES_OF_DAY.forEach((time) => {
		markdown += `- **${time.greek}** - ${time.english} *(${time.timeRange})*\n`;
	});
	markdown += "\n";

	// Transportation
	markdown += "## Transportation Vocabulary\n\n";
	markdown += "### Vehicles\n";
	TRANSPORTATION.vehicles.forEach((vehicle) => {
		markdown += `- **${vehicle.greek}** - ${vehicle.english}\n`;
	});
	markdown += "\n### Actions\n";
	TRANSPORTATION.actions.forEach((action) => {
		markdown += `- **${action.greek}** - ${action.english}\n`;
	});
	markdown += "\n";

	// Frequency adverbs
	markdown += "## Adverbs of Frequency\n\n";
	markdown += "**Remember:** ποτέ = never, πότε = when (question)\n\n";
	FREQUENCY_ADVERBS.forEach((adverb) => {
		markdown += `- **${adverb.greek}** - ${adverb.english}\n`;
	});
	markdown += "\n";

	// Likes construction
	markdown += "## Likes Construction - μου αρέσει/αρέσουν\n\n";
	markdown +=
		"**Pattern:** [Person] αρέσει (for one thing) / αρέσουν (for many things)\n\n";

	markdown += "### Single thing (αρέσει)\n";
	LIKES_CONSTRUCTION.singular.forEach((like) => {
		markdown += `- **${like.greek}** - ${like.english}\n`;
	});
	markdown += "\n### Multiple things (αρέσουν)\n";
	LIKES_CONSTRUCTION.plural.forEach((like) => {
		markdown += `- **${like.greek}** - ${like.english}\n`;
	});
	markdown += "\n";

	// Additional vocabulary sections
	markdown += "## Summer & Beach Vocabulary\n\n";
	SUMMER_VOCABULARY.forEach((word) => {
		markdown += `- **${word.greek}** - ${word.english}\n`;
	});
	markdown += "\n";

	markdown += "## Time Expressions\n\n";
	TIME_EXPRESSIONS.forEach((expr) => {
		markdown += `- **${expr.greek}** - ${expr.english}\n`;
	});
	markdown += "\n";

	markdown += "## Numbers (1-10)\n\n";
	NUMBERS.forEach((number, index) => {
		markdown += `${index + 1}. ${number}\n`;
	});
	markdown += "\n";

	markdown += "## Colors\n\n";
	COLORS.forEach((color) => {
		markdown += `- ${color}\n`;
	});
	markdown += "\n";

	markdown += "## Useful Expressions\n\n";
	USEFUL_EXPRESSIONS.forEach((expr) => {
		markdown += `- **${expr.greek}** - ${expr.english}\n`;
	});
	markdown += "\n";

	return markdown;
};

export const exportCompleteGuide = (): string => {
	let markdown = "# Greek Conjugation Reference\n\n";
	markdown += "*Your comprehensive pattern-based guide to Greek grammar*\n\n";
	markdown += "---\n\n";

	markdown += exportArticlesSection();
	markdown += "\n---\n\n";

	markdown += exportPresentTenseSection();
	markdown += "\n---\n\n";

	markdown += exportOtherTensesSection();
	markdown += "\n---\n\n";

	markdown += exportVocabularySection();

	markdown += "\n---\n\n";
	markdown += "## 💡 Remember\n\n";
	markdown +=
		"**Patterns over memorization!** Once you know the family, you know the conjugation.\n\n";
	markdown += "*Generated from Greek Reference App*\n";

	return markdown;
};

// Download function
export const downloadMarkdown = (content: string, filename: string): void => {
	const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};

// Export options for the UI
export const exportOptions = [
	{
		id: "complete",
		label: "Complete Study Guide",
		filename: "greek-reference-complete.md",
		exportFunction: exportCompleteGuide,
	},
	{
		id: "articles",
		label: "Articles & Cases",
		filename: "greek-articles-cases.md",
		exportFunction: exportArticlesSection,
	},
	{
		id: "present",
		label: "Present Tense",
		filename: "greek-present-tense.md",
		exportFunction: exportPresentTenseSection,
	},
	{
		id: "other-tenses",
		label: "Other Tenses",
		filename: "greek-other-tenses.md",
		exportFunction: exportOtherTensesSection,
	},
	{
		id: "vocabulary",
		label: "Essential Words",
		filename: "greek-vocabulary.md",
		exportFunction: exportVocabularySection,
	},
] as const;
