import { SimpleListDrill, type SimpleListItem } from "./components/SimpleListDrill";

const DAYS: SimpleListItem[] = [
	// Days of the week
	{ id: "monday", greek: "Δευτέρα", greeklish: "deftera", english: "Monday", label: "day", category: "days" },
	{ id: "tuesday", greek: "Τρίτη", greeklish: "triti", english: "Tuesday", label: "day", category: "days" },
	{ id: "wednesday", greek: "Τετάρτη", greeklish: "tetarti", english: "Wednesday", label: "day", category: "days" },
	{ id: "thursday", greek: "Πέμπτη", greeklish: "pempti", english: "Thursday", label: "day", category: "days" },
	{ id: "friday", greek: "Παρασκευή", greeklish: "paraskevi", english: "Friday", label: "day", category: "days" },
	{ id: "saturday", greek: "Σάββατο", greeklish: "savvato", english: "Saturday", label: "day (neuter)", category: "days" },
	{ id: "sunday", greek: "Κυριακή", greeklish: "kyriaki", english: "Sunday", label: "day", category: "days" },
	// Time expressions
	{ id: "yesterday", greek: "χτες", greeklish: "chtes", english: "yesterday", label: "time", category: "time" },
	{ id: "today", greek: "σήμερα", greeklish: "simera", english: "today", label: "time", category: "time" },
	{ id: "tomorrow", greek: "αύριο", greeklish: "avrio", english: "tomorrow", label: "time", category: "time" },
	{ id: "day-after", greek: "μεθαύριο", greeklish: "methavrio", english: "the day after tomorrow", label: "time", category: "time" },
	{ id: "last-week", greek: "την περασμένη εβδομάδα", greeklish: "tin perasmeni evdomada", english: "last week", label: "time expression", category: "time" },
	{ id: "next-week", greek: "την επόμενη εβδομάδα", greeklish: "tin epomeni evdomada", english: "next week", label: "time expression", category: "time" },
	{ id: "weekend", greek: "το Σαββατοκύριακο", greeklish: "to savvatokyriako", english: "the weekend", label: "time expression", category: "time" },
];

const CATEGORIES = [
	{ id: "days", label: "Days" },
	{ id: "time", label: "Time expressions" },
];

export default function DaysOfWeekDrill() {
	return (
		<SimpleListDrill
			items={DAYS}
			title="Days & Time"
			subtitle="14 forms / timed"
			colorTheme="olive"
			forwardTimeLimit={4000}
			forwardDesc="English → Greek"
			reverseDesc="Greek → English (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
