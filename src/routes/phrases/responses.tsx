import { useOutletContext } from "react-router";
import { MessageCircle, Users } from "lucide-react";
import type { PhrasesLoaderData } from "./shared";
import { PhraseSection, PhraseItemDisplay } from "./shared";

export default function ResponsesRoute() {
	const data = useOutletContext<PhrasesLoaderData>();
	const { responses, socialPhrases } = data.responses;

	return (
		<div className="space-y-6">
			<PhraseSection
				title="Common Responses"
				icon={<MessageCircle size={20} />}
				colorScheme="terracotta"
			>
				{responses.map((phrase) => (
					<PhraseItemDisplay
						key={phrase.id}
						greek={phrase.greek}
						english={phrase.english}
					/>
				))}
			</PhraseSection>

			{socialPhrases.length > 0 && (
				<PhraseSection
					title="Social Phrases"
					icon={<Users size={20} />}
					colorScheme="olive"
				>
					{socialPhrases.map((phrase) => (
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
