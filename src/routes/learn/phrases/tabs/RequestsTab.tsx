import { Hand } from "lucide-react";

import { TabHero } from "@/components/TabHero";

import type { PhrasesLoaderData } from "../components/shared";
import { PhraseList } from "../components/shared";

export const RequestsTab = ({ data }: { data: PhrasesLoaderData }) => {
	const { requests, commands } = data.requests;

	return (
		<div className="space-y-6">
			<TabHero
				title="Ask politely, get results"
				greekPhrase="Παρακαλώ..."
				colorScheme="olive"
				icon={<Hand size={18} />}
			>
				Adding "παρακαλώ" (please) to any request makes it more polite. Greeks appreciate the effort
				— politeness goes a long way!
			</TabHero>

			<PhraseList title="Polite Requests" colorScheme="terracotta" phrases={requests} />
			<PhraseList title="Commands" colorScheme="olive" phrases={commands} />
		</div>
	);
};
