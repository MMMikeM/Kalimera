import { useOutletContext } from "react-router";
import { Sparkles, AlertTriangle } from "lucide-react";
import { CategoryCard, MonoText } from "@/components";
import type { PhrasesLoaderData, PhraseItem } from "./shared";
import { PhraseSection, PhraseItemDisplay } from "./shared";

const EssentialPhraseCard: React.FC<{ phrase: PhraseItem }> = ({ phrase }) => (
	<div className="flex items-baseline gap-3 p-3 bg-white/60 rounded-lg border border-honey-200">
		<MonoText variant="greek" size="lg">
			{phrase.greek}
		</MonoText>
		<span className="text-stone-600">{phrase.english}</span>
	</div>
);

export default function SurvivalRoute() {
	const data = useOutletContext<PhrasesLoaderData>();
	const { essential, survival } = data.survival;

	return (
		<div className="space-y-6">
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

			<div className="p-4 bg-ocean-50 rounded-lg border border-ocean-200">
				<h4 className="font-semibold text-ocean-text mb-2 flex items-center gap-2">
					<Sparkles size={16} />
					Learning Tip
				</h4>
				<p className="text-sm text-stone-600">
					These phrases will get you through most situations. Practice them until
					they're automatic - when someone says "Γεια σας", your response should
					be instant. Listen for these phrases everywhere you go.
				</p>
			</div>
		</div>
	);
}
