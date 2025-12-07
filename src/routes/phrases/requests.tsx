import { useOutletContext } from "react-router";
import { Hand, Volume2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { PhrasesLoaderData } from "./shared";
import { PhraseSection, PhraseItemDisplay } from "./shared";

export default function RequestsRoute() {
	const data = useOutletContext<PhrasesLoaderData>();
	const { requests, commands } = data.requests;

	return (
		<div className="space-y-6">
			<Alert variant="info">
				<AlertDescription>
					<strong>Tip:</strong> Adding "παρακαλώ" (please) to any request makes
					it more polite. Greeks appreciate the effort!
				</AlertDescription>
			</Alert>

			{requests.length > 0 && (
				<PhraseSection
					title="Polite Requests"
					icon={<Hand size={20} />}
					colorScheme="terracotta"
				>
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
				<PhraseSection
					title="Commands"
					icon={<Volume2 size={20} />}
					colorScheme="olive"
				>
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
}
