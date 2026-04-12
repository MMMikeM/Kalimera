import { Sparkles } from "lucide-react";

import { TabHero } from "@/components/TabHero";

import type { PhrasesLoaderData } from "../components/shared";
import { PhraseList } from "../components/shared";

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
				These phrases will get you through most situations. Practice them until they're automatic —
				when someone says "Γεια σας", your response should be instant.
			</TabHero>

			<PhraseList title="Essential Greetings" colorScheme="honey" phrases={essential} alwaysShow />
			<PhraseList title="Survival Phrases" colorScheme="terracotta" phrases={survival} />
		</div>
	);
};
