import { useOutletContext } from "react-router";
import { Link2, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { PhrasesLoaderData } from "./shared";
import { PhraseSection, PhraseItemDisplay } from "./shared";

export default function ConnectorsRoute() {
	const data = useOutletContext<PhrasesLoaderData>();
	const { discourseMarkers, discourseFillers } = data.connectors;

	return (
		<div className="space-y-6">
			<Alert variant="info">
				<AlertDescription>
					<strong>Why these matter:</strong> Connectors are the glue of natural
					speech. Greeks use these constantly - mastering them will make your
					Greek sound much more fluent.
				</AlertDescription>
			</Alert>

			{discourseMarkers.length > 0 && (
				<PhraseSection
					title="Discourse Markers"
					icon={<Link2 size={20} />}
					colorScheme="olive"
				>
					{discourseMarkers.map((phrase) => (
						<PhraseItemDisplay
							key={phrase.id}
							greek={phrase.greek}
							english={phrase.english}
						/>
					))}
				</PhraseSection>
			)}

			{discourseFillers.length > 0 && (
				<PhraseSection
					title="Fillers & Connectors"
					icon={<Zap size={20} />}
					colorScheme="ocean"
				>
					{discourseFillers.map((phrase) => (
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
