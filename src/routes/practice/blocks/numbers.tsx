import { createFileRoute } from "@tanstack/react-router";

import type { SimpleListItem } from "../components/engines/deck";
import { Drill } from "../components/engines/drill";

const NUMBERS: SimpleListItem[] = [
	// 1–10
	{ id: "n1", greek: "ένα", english: "1", label: "one", category: "1-10" },
	{ id: "n2", greek: "δύο", english: "2", label: "two", category: "1-10" },
	{ id: "n3", greek: "τρία", english: "3", label: "three", category: "1-10" },
	{
		id: "n4",
		greek: "τέσσερα",
		english: "4",
		label: "four",
		category: "1-10",
	},
	{ id: "n5", greek: "πέντε", english: "5", label: "five", category: "1-10" },
	{ id: "n6", greek: "έξι", english: "6", label: "six", category: "1-10" },
	{ id: "n7", greek: "εφτά", english: "7", label: "seven", category: "1-10" },
	{ id: "n8", greek: "οχτώ", english: "8", label: "eight", category: "1-10" },
	{ id: "n9", greek: "εννέα", english: "9", label: "nine", category: "1-10" },
	{ id: "n10", greek: "δέκα", english: "10", label: "ten", category: "1-10" },
	// 11–20
	{
		id: "n11",
		greek: "έντεκα",
		english: "11",
		label: "eleven",
		category: "11-20",
	},
	{
		id: "n12",
		greek: "δώδεκα",
		english: "12",
		label: "twelve",
		category: "11-20",
	},
	{
		id: "n13",
		greek: "δεκατρία",
		english: "13",
		label: "thirteen",
		category: "11-20",
	},
	{
		id: "n14",
		greek: "δεκατέσσερα",
		english: "14",
		label: "fourteen",
		category: "11-20",
	},
	{
		id: "n15",
		greek: "δεκαπέντε",
		english: "15",
		label: "fifteen",
		category: "11-20",
	},
	{
		id: "n16",
		greek: "δεκαέξι",
		english: "16",
		label: "sixteen",
		category: "11-20",
	},
	{
		id: "n17",
		greek: "δεκαεφτά",
		english: "17",
		label: "seventeen",
		category: "11-20",
	},
	{
		id: "n18",
		greek: "δεκαοχτώ",
		english: "18",
		label: "eighteen",
		category: "11-20",
	},
	{
		id: "n19",
		greek: "δεκαεννέα",
		english: "19",
		label: "nineteen",
		category: "11-20",
	},
	{
		id: "n20",
		greek: "είκοσι",
		english: "20",
		label: "twenty",
		category: "11-20",
	},
	// Decades
	{
		id: "n30",
		greek: "τριάντα",
		english: "30",
		label: "thirty",
		category: "decades",
	},
	{
		id: "n40",
		greek: "σαράντα",
		english: "40",
		label: "forty",
		category: "decades",
	},
	{
		id: "n50",
		greek: "πενήντα",
		english: "50",
		label: "fifty",
		category: "decades",
	},
	{
		id: "n60",
		greek: "εξήντα",
		english: "60",
		label: "sixty",
		category: "decades",
	},
	{
		id: "n70",
		greek: "εβδομήντα",
		english: "70",
		label: "seventy",
		category: "decades",
	},
	{
		id: "n80",
		greek: "ογδόντα",
		english: "80",
		label: "eighty",
		category: "decades",
	},
	{
		id: "n90",
		greek: "ενενήντα",
		english: "90",
		label: "ninety",
		category: "decades",
	},
	{
		id: "n100",
		greek: "εκατό",
		english: "100",
		label: "one hundred",
		category: "decades",
	},
];

const CATEGORIES = [
	{ id: "1-10", label: "1–10" },
	{ id: "11-20", label: "11–20" },
	{ id: "decades", label: "Decades" },
];

export const Route = createFileRoute("/practice/blocks/numbers")({
	component: NumbersDrill,
});

function NumbersDrill() {
	return (
		<Drill
			drillId="blocks-numbers"
			items={NUMBERS}
			title="Numbers"
			subtitle="28 forms / timed"
			colorTheme="terracotta"
			backTo="/practice/blocks"
			forwardDesc="Digit → Greek word"
			reverseDesc="Greek word → digit (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
