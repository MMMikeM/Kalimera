import { SimpleListDrill, type SimpleListItem } from "./components/SimpleListDrill";

const NUMBERS: SimpleListItem[] = [
	// 1–10
	{ id: "n1", greek: "ένα", greeklish: "ena", english: "1", label: "one", category: "1-10" },
	{ id: "n2", greek: "δύο", greeklish: "dio", english: "2", label: "two", category: "1-10" },
	{ id: "n3", greek: "τρία", greeklish: "tria", english: "3", label: "three", category: "1-10" },
	{ id: "n4", greek: "τέσσερα", greeklish: "tessera", english: "4", label: "four", category: "1-10" },
	{ id: "n5", greek: "πέντε", greeklish: "pente", english: "5", label: "five", category: "1-10" },
	{ id: "n6", greek: "έξι", greeklish: "exi", english: "6", label: "six", category: "1-10" },
	{ id: "n7", greek: "εφτά", greeklish: "efta", english: "7", label: "seven", category: "1-10" },
	{ id: "n8", greek: "οχτώ", greeklish: "ochto", english: "8", label: "eight", category: "1-10" },
	{ id: "n9", greek: "εννέα", greeklish: "ennea", english: "9", label: "nine", category: "1-10" },
	{ id: "n10", greek: "δέκα", greeklish: "deka", english: "10", label: "ten", category: "1-10" },
	// 11–20
	{ id: "n11", greek: "έντεκα", greeklish: "endeka", english: "11", label: "eleven", category: "11-20" },
	{ id: "n12", greek: "δώδεκα", greeklish: "dodeka", english: "12", label: "twelve", category: "11-20" },
	{ id: "n13", greek: "δεκατρία", greeklish: "dekatria", english: "13", label: "thirteen", category: "11-20" },
	{ id: "n14", greek: "δεκατέσσερα", greeklish: "dekatessera", english: "14", label: "fourteen", category: "11-20" },
	{ id: "n15", greek: "δεκαπέντε", greeklish: "dekapente", english: "15", label: "fifteen", category: "11-20" },
	{ id: "n16", greek: "δεκαέξι", greeklish: "dekaexi", english: "16", label: "sixteen", category: "11-20" },
	{ id: "n17", greek: "δεκαεφτά", greeklish: "dekaefta", english: "17", label: "seventeen", category: "11-20" },
	{ id: "n18", greek: "δεκαοχτώ", greeklish: "dekaochto", english: "18", label: "eighteen", category: "11-20" },
	{ id: "n19", greek: "δεκαεννέα", greeklish: "dekaennea", english: "19", label: "nineteen", category: "11-20" },
	{ id: "n20", greek: "είκοσι", greeklish: "ikosi", english: "20", label: "twenty", category: "11-20" },
	// Decades
	{ id: "n30", greek: "τριάντα", greeklish: "trianta", english: "30", label: "thirty", category: "decades" },
	{ id: "n40", greek: "σαράντα", greeklish: "saranta", english: "40", label: "forty", category: "decades" },
	{ id: "n50", greek: "πενήντα", greeklish: "peninta", english: "50", label: "fifty", category: "decades" },
	{ id: "n60", greek: "εξήντα", greeklish: "exinta", english: "60", label: "sixty", category: "decades" },
	{ id: "n70", greek: "εβδομήντα", greeklish: "evdominta", english: "70", label: "seventy", category: "decades" },
	{ id: "n80", greek: "ογδόντα", greeklish: "ogdonta", english: "80", label: "eighty", category: "decades" },
	{ id: "n90", greek: "ενενήντα", greeklish: "eneninta", english: "90", label: "ninety", category: "decades" },
	{ id: "n100", greek: "εκατό", greeklish: "ekato", english: "100", label: "one hundred", category: "decades" },
];

const CATEGORIES = [
	{ id: "1-10", label: "1–10" },
	{ id: "11-20", label: "11–20" },
	{ id: "decades", label: "Decades" },
];

export default function NumbersDrill() {
	return (
		<SimpleListDrill
			items={NUMBERS}
			title="Numbers"
			subtitle="28 forms / timed"
			colorTheme="terracotta"
			forwardTimeLimit={3500}
			forwardDesc="Digit → Greek word"
			reverseDesc="Greek word → digit (self-assess)"
			categories={CATEGORIES}
		/>
	);
}
