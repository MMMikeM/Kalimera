import { useOutlet } from "react-router";
import type { Drill } from "../group-section";
import { GroupSection } from "../group-section";

export const drills: Drill[] = [
	// Doer (nominative)
	{ id: "articles-article-doer", href: "/practice/cases/nominative-article", title: "Article (Doer)", greek: "ο · η · το · οι · τα", minutes: 1, phase: "Doer" },
	{ id: "articles-noun-genders", href: "/practice/cases/nominative-noun", title: "Noun (Doer)", greek: "ο φίλος · η θάλασσα · το σπίτι", minutes: 1, phase: "Doer" },
	{ id: "adjectives-agreement", href: "/practice/cases/nominative-adjective", title: "Adjective (Doer)", greek: "καλός · καλή · καλό", minutes: 2, phase: "Doer" },
	{ id: "nominal-phrase-doer", href: "/practice/cases/nominative-phrase", title: "Doer phrase", greek: "ο καλός φίλος · η μεγάλη πόλη · το νέο σπίτι", minutes: 2, phase: "Doer" },
	// Target (accusative)
	{ id: "articles-article-target", href: "/practice/cases/accusative-article", title: "Article (Target)", greek: "τον · τη · το · τους · τις · τα", minutes: 1, phase: "Target" },
	{ id: "nominal-noun-target", href: "/practice/cases/accusative-noun", title: "Noun (Target)", greek: "τον φίλο · τη μέρα · το σπίτι", minutes: 1, phase: "Target" },
	{ id: "adjectives-agreement-target", href: "/practice/cases/accusative-adjective", title: "Adjective (Target)", greek: "καλό · καλή · καλό", minutes: 2, phase: "Target" },
	{ id: "nominal-phrase-target", href: "/practice/cases/accusative-phrase", title: "Target phrase", greek: "τον καλό φίλο · τη μεγάλη πόλη · το νέο σπίτι", minutes: 2, phase: "Target" },
	// Owner (genitive)
	{ id: "articles-article-owner", href: "/practice/cases/genitive-article", title: "Article (Owner)", greek: "του · της · του · των", minutes: 1, phase: "Owner" },
	{ id: "nominal-noun-owner", href: "/practice/cases/genitive-noun", title: "Noun (Owner)", greek: "του φίλου · της μέρας · του σπιτιού", minutes: 1, phase: "Owner" },
	{ id: "adjectives-agreement-owner", href: "/practice/cases/genitive-adjective", title: "Adjective (Owner)", greek: "καλού · καλής · καλού", minutes: 2, phase: "Owner" },
	{ id: "nominal-phrase-owner", href: "/practice/cases/genitive-phrase", title: "Owner phrase", greek: "του καλού φίλου · της μεγάλης πόλης · του νέου σπιτιού", minutes: 2, phase: "Owner" },
	// Review
	{ id: "articles-paradigm", href: "/practice/cases/all-articles", title: "All articles", greek: "ο, η, το, τον, την, του, της…", minutes: 1, phase: "Review" },
	{ id: "nominal-all-nouns", href: "/practice/cases/all-nouns", title: "All nouns", greek: "φίλος · φίλο · φίλου · φίλοι · …", minutes: 2, phase: "Review" },
	{ id: "nominal-all-adjectives", href: "/practice/cases/all-adjectives", title: "All adjectives", greek: "καλός · καλή · καλό · καλού · καλής · …", minutes: 2, phase: "Review" },
	{ id: "nominal-all-phrases", href: "/practice/cases/all-phrases", title: "All phrases", greek: "ο καλός φίλος · τη μεγάλη πόλη · του νέου σπιτιού", minutes: 2, phase: "Review" },
];

export default function CasesPage() {
	const outlet = useOutlet();
	if (outlet) return outlet;
	return (
		<div className="mx-auto max-w-2xl">
			<GroupSection title="The case system" drills={drills} />
		</div>
	);
}
