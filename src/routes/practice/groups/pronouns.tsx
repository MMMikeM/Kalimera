import { useOutlet } from "react-router";
import type { Drill } from "../group-section";
import { GroupSection } from "../group-section";

export const drills: Drill[] = [
	{ id: "pronouns-object", href: "/practice/pronouns/object", title: "Object pronouns", greek: "με, σε, τον, την, μας, σας…", minutes: 1 },
	{ id: "pronouns-placement", href: "/practice/pronouns/placement", title: "Placement", greek: "Με βλέπει · Δες με! · Θα με δει", minutes: 2 },
	{ id: "pronouns-possessives", href: "/practice/pronouns/possessives", title: "Possessives", greek: "μου, σου, του, της, μας…", minutes: 1 },
];

export default function PronounsPage() {
	const outlet = useOutlet();
	if (outlet) return outlet;
	return (
		<div className="mx-auto max-w-2xl">
			<GroupSection
				title="Pronouns"
				subtitle="Object forms, possessives, and where they sit in a sentence."
				drills={drills}
			/>
		</div>
	);
}
