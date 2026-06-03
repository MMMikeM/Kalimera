import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";

const DAYS: SimpleListItem[] = [
	// Days of the week
	{
		id: "monday",
		greek: "Δευτέρα",
		greeklish: "deftera",
		english: "Monday",
		label: "Monday",
		category: "days",
	},
	{
		id: "tuesday",
		greek: "Τρίτη",
		greeklish: "triti",
		english: "Tuesday",
		label: "Tuesday",
		category: "days",
	},
	{
		id: "wednesday",
		greek: "Τετάρτη",
		greeklish: "tetarti",
		english: "Wednesday",
		label: "Wednesday",
		category: "days",
	},
	{
		id: "thursday",
		greek: "Πέμπτη",
		greeklish: "pempti",
		english: "Thursday",
		label: "Thursday",
		category: "days",
	},
	{
		id: "friday",
		greek: "Παρασκευή",
		greeklish: "paraskevi",
		english: "Friday",
		label: "Friday",
		category: "days",
	},
	{
		id: "saturday",
		greek: "Σάββατο",
		greeklish: "savvato",
		english: "Saturday",
		label: "Saturday",
		category: "days",
	},
	{
		id: "sunday",
		greek: "Κυριακή",
		greeklish: "kyriaki",
		english: "Sunday",
		label: "Sunday",
		category: "days",
	},
	// Time expressions
	{
		id: "yesterday",
		greek: "χτες",
		greeklish: "chtes",
		english: "yesterday",
		label: "yesterday",
		category: "time",
	},
	{
		id: "today",
		greek: "σήμερα",
		greeklish: "simera",
		english: "today",
		label: "today",
		category: "time",
	},
	{
		id: "tomorrow",
		greek: "αύριο",
		greeklish: "avrio",
		english: "tomorrow",
		label: "tomorrow",
		category: "time",
	},
	{
		id: "day-after",
		greek: "μεθαύριο",
		greeklish: "methavrio",
		english: "the day after tomorrow",
		label: "the day after tomorrow",
		category: "time",
	},
	{
		id: "last-week",
		greek: "την περασμένη εβδομάδα",
		greeklish: "tin perasmeni evdomada",
		english: "last week",
		label: "last week",
		category: "time",
	},
	{
		id: "next-week",
		greek: "την επόμενη εβδομάδα",
		greeklish: "tin epomeni evdomada",
		english: "next week",
		label: "next week",
		category: "time",
	},
	{
		id: "weekend",
		greek: "το Σαββατοκύριακο",
		greeklish: "to savvatokyriako",
		english: "the weekend",
		label: "the weekend",
		category: "time",
	},
];

const CATEGORIES = [
	{ id: "days", label: "Days" },
	{ id: "time", label: "Time expressions" },
];

export const Route = createFileRoute("/practice/blocks/days-of-week")({
	component: DaysOfWeekDrill,
});

function DaysOfWeekDrill() {
	return (
		<Drill
			drillId="blocks-days-of-week"
			items={DAYS}
			title="Days & Time"
			subtitle="14 forms / timed"
			colorTheme="olive"
			forwardDesc="English → Greek"
			reverseDesc="Greek → English (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
