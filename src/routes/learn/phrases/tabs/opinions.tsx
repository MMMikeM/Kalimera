import { useOutletContext } from "react-router";
import { Heart } from "lucide-react";
import { TabHero } from "@/components/TabHero";
import type { PhrasesLoaderData } from "../components/shared";
import { PhraseSection, PhraseItemDisplay } from "../components/shared";

export function OpinionsTab() {
	const data = useOutletContext<PhrasesLoaderData>();
	const { opinions } = data.opinions;

	return (
		<div className="space-y-6">
			<TabHero
				title="Express yourself"
				greekPhrase="Νομίζω ότι..."
				colorScheme="terracotta"
				icon={<Heart size={18} />}
			>
				Share your thoughts and feelings in Greek. These phrases help you
				participate in conversations beyond basic exchanges.
			</TabHero>

			<PhraseSection
				title="Opinions & Feelings"
				icon={<Heart size={20} />}
				colorScheme="olive"
			>
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
}
