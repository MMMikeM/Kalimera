import { Hand } from "lucide-react";
import { TabHero } from "@/components/TabHero";
import type { PhrasesLoaderData } from "../components/shared";
import { PhraseSection, PhraseItemDisplay } from "../components/shared";

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
				Adding "παρακαλώ" (please) to any request makes it more polite. Greeks
				appreciate the effort — politeness goes a long way!
			</TabHero>

			{requests.length > 0 && (
				<PhraseSection title="Polite Requests" colorScheme="terracotta">
					{requests.map((phrase) => (
						<PhraseItemDisplay
							key={phrase.id}
							greek={phrase.greek}
							english={phrase.english}
						/>
					))}
				</PhraseSection>
			)}

			{commands.length > 0 && (
				<PhraseSection title="Commands" colorScheme="olive">
					{commands.map((phrase) => (
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
