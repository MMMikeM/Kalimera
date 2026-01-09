import { Sparkles } from "lucide-react";
import { TabHero } from "@/components/TabHero";
import type { PhrasesLoaderData } from "../shared";
import { PhraseSection, PhraseItemDisplay } from "../shared";

export const SurvivalTab = ({ data }: { data: PhrasesLoaderData }) => {
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

			<PhraseSection title="Essential Greetings" colorScheme="honey">
				{essential.map((phrase) => (
					<PhraseItemDisplay
						key={phrase.id}
						greek={phrase.greek}
						english={phrase.english}
					/>
				))}
			</PhraseSection>

			{survival.length > 0 && (
				<PhraseSection title="Survival Phrases" colorScheme="terracotta">
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
};
