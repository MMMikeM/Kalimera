import { Heart } from "lucide-react";
import { TabHero } from "@/components/TabHero";
import type { PhrasesLoaderData } from "../components/shared";
import { PhraseItemDisplay, PhraseSection } from "../components/shared";

export const OpinionsTab = ({ data }: { data: PhrasesLoaderData }) => {
	const { opinions } = data.opinions;

	return (
		<div className="space-y-6">
			<TabHero
				title="Sharing opinions"
				greekPhrase="Νομίζω ότι..."
				colorScheme="terracotta"
				icon={<Heart size={18} />}
			>
				Move past "yes" and "no" into real conversation. These phrases let you
				agree, disagree, and share what you actually think.
			</TabHero>

			<PhraseSection title="Opinions & Feelings" colorScheme="olive">
				{opinions.map((phrase) => (
					<PhraseItemDisplay
						key={phrase.id}
						greek={phrase.greek}
						english={phrase.english}
					/>
				))}
			</PhraseSection>
		</div>
	);
};
