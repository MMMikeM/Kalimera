import { useOutlet } from "react-router";
import type { Drill } from "../group-section";
import { GroupSection } from "../group-section";

export const drills: Drill[] = [
	{ id: "blocks-chunks", href: "/practice/blocks/chunks", title: "Survival phrases", greek: "Γεια σου · Ευχαριστώ · Θα ήθελα", minutes: 1 },
	{ id: "blocks-numbers", href: "/practice/blocks/numbers", title: "Numbers", greek: "ένα, δύο, δέκα, είκοσι, τριάντα…", minutes: 1 },
	{ id: "blocks-days-of-week", href: "/practice/blocks/days-of-week", title: "Days & time", greek: "Δευτέρα · Τρίτη · χτες · αύριο", minutes: 1 },
];

export default function BlocksPage() {
	const outlet = useOutlet();
	if (outlet) return outlet;
	return (
		<div className="mx-auto max-w-2xl">
			<GroupSection
				title="Building blocks"
				subtitle="Phrases, numbers, and time words you reach for every day."
				drills={drills}
			/>
		</div>
	);
}
