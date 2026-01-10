import type React from "react";
import { useOutletContext } from "react-router";
import { Sparkles, AlertTriangle } from "lucide-react";
import { MonoText } from "@/components/MonoText";
import { CategoryCard } from "@/components/CategoryCard";
import { TabHero } from "@/components/TabHero";
import type { PhrasesLoaderData, PhraseItem } from "../components/shared";
import { PhraseSection, PhraseItemDisplay } from "../components/shared";

const EssentialPhraseCard: React.FC<{ phrase: PhraseItem }> = ({ phrase }) => (
	<div className="flex items-baseline gap-3 p-3 bg-white/60 rounded-lg border border-honey-200">
		<MonoText variant="greek" size="lg">
			{phrase.greek}
		</MonoText>
		<span className="text-stone-600">{phrase.english}</span>
	</div>
);

export function SurvivalTab() {
	const data = useOutletContext<PhrasesLoaderData>();
	const { essential, survival } = data.survival;

	return (
		<div className="space-y-6">
			<TabHero
				title="Start with the basics"
				greekPhrase="Γεια σας!"
				colorScheme="honey"
				icon={<Sparkles size={18} />}
			>
				These phrases will get you through most situations. Practice them until
				they're automatic — when someone says "Γεια σας", your response should
				be instant.
			</TabHero>

			<CategoryCard
				title="Essential Greetings"
				subtitle="The phrases you'll use every single day"
				colorScheme="honey"
				priority="primary"
				badge="Start Here"
			>
				<div className="grid md:grid-cols-2 gap-3">
					{essential.map((phrase) => (
						<EssentialPhraseCard key={phrase.id} phrase={phrase} />
					))}
				</div>
			</CategoryCard>

			{survival.length > 0 && (
				<PhraseSection
					title="Survival Phrases"
					icon={<AlertTriangle size={20} />}
					colorScheme="terracotta"
				>
					{survival.map((phrase) => (
						<PhraseItemDisplay
							key={phrase.id}
							greek={phrase.greek}
							english={phrase.english}
						/>
					))}
				</PhraseSection>
			)}
		</div>
	);
}
