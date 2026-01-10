import { Link } from "react-router";
import { Scale, ArrowRight } from "lucide-react";
import { TabHero } from "@/components/TabHero";
import { Card } from "@/components/Card";
import { CasesSection } from "../components/cases-section";

export function CasesTab() {
	return (
		<div className="space-y-8">
			<TabHero
				title="Foundation of Greek grammar"
				greekPhrase="Ποιος; Τι; Ποιου;"
				colorScheme="ocean"
				icon={<Scale size={18} />}
			>
				Cases show a word's role in a sentence. Master these three questions
				and word endings make sense.
			</TabHero>

			<CasesSection />

			<Card
				variant="bordered"
				padding="md"
				className="bg-ocean-50 border-ocean-300"
			>
				<Link
					to="/reference/pronouns"
					className="flex items-center justify-between group"
				>
					<div>
						<h4 className="font-bold text-ocean-text">
							Continue to Pronouns
						</h4>
						<p className="text-sm text-stone-600">
							See cases in action with the words you'll use most
						</p>
					</div>
					<ArrowRight
						size={20}
						className="text-ocean-text group-hover:translate-x-1 transition-transform"
					/>
				</Link>
			</Card>
		</div>
	);
}
