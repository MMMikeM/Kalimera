import { useOutletContext } from "react-router";
import { MessageCircle, Users } from "lucide-react";
import { TabHero } from "@/components/TabHero";
import type { PhrasesLoaderData } from "../components/shared";
import { PhraseSection, PhraseItemDisplay } from "../components/shared";

export function ResponsesTab() {
	const data = useOutletContext<PhrasesLoaderData>();
	const { responses, socialPhrases } = data.responses;

	return (
		<div className="space-y-6">
			<TabHero
				title="Keep the conversation flowing"
				greekPhrase="Ναι, βέβαια!"
				colorScheme="terracotta"
				icon={<MessageCircle size={18} />}
			>
				Quick responses that show you're following along. These short phrases
				buy you time while you process and keep the conversation natural.
			</TabHero>

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
