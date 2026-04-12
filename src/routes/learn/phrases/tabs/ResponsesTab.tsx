import { MessageCircle } from "lucide-react";

import { TabHero } from "@/components/TabHero";

import type { PhrasesLoaderData } from "../components/shared";
import { PhraseList } from "../components/shared";

export const ResponsesTab = ({ data }: { data: PhrasesLoaderData }) => {
	const { responses, socialPhrases } = data.responses;

	return (
		<div className="space-y-6">
			<TabHero
				title="Keep the conversation flowing"
				greekPhrase="Ναι, βέβαια!"
				colorScheme="terracotta"
				icon={<MessageCircle size={18} />}
			>
				Quick responses that show you're following along. These short phrases buy you time while you
				process and keep the conversation natural.
			</TabHero>

			<PhraseList title="Common Responses" colorScheme="terracotta" phrases={responses} alwaysShow />
			<PhraseList title="Social Phrases" colorScheme="olive" phrases={socialPhrases} />
		</div>
	);
};
