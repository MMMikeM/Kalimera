import { useOutletContext } from "react-router";
import { Heart } from "lucide-react";
import type { PhrasesLoaderData } from "./shared";
import { PhraseSection, PhraseItemDisplay } from "./shared";

export default function OpinionsRoute() {
	const data = useOutletContext<PhrasesLoaderData>();
	const { opinions } = data.opinions;

	return (
		<div className="space-y-6">
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
