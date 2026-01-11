import { ArrowLeft, Users } from "lucide-react";
import { Link } from "react-router";
import { Card } from "@/components/Card";
import { PracticeCTA } from "@/components/PracticeCTA";
import { TabHero } from "@/components/TabHero";
import { PronounsSection } from "../components/pronouns-section";

export function PronounsTab() {
	return (
		<div className="space-y-8">
			<TabHero
				title="Cases in action"
				greekPhrase="με, σε, μου, σου"
				colorScheme="ocean"
				icon={<Users size={18} />}
			>
				Pronouns are where you'll use cases most. Master these forms and cases
				click into place.
			</TabHero>

			<Card
				variant="bordered"
				padding="md"
				className="bg-stone-50 border-stone-200"
			>
				<Link
					to="/reference/cases"
					className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
				>
					<ArrowLeft size={16} />
					<span className="text-sm">Review the case system first</span>
				</Link>
			</Card>

			<PronounsSection />

			<PracticeCTA
				title="Practice pronouns"
				description="Build fluency with timed retrieval drills on Greek pronouns."
				topic="pronouns"
			/>
		</div>
	);
}
