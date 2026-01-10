import { useOutletContext } from "react-router";
import { Link2, Zap } from "lucide-react";
import { TabHero } from "@/components/TabHero";
import type { PhrasesLoaderData } from "../components/shared";
import { PhraseSection, PhraseItemDisplay } from "../components/shared";

export function ConnectorsTab() {
	const data = useOutletContext<PhrasesLoaderData>();
	const { discourseMarkers, discourseFillers } = data.connectors;

	return (
		<div className="space-y-6">
			<TabHero
				title="The glue of natural speech"
				greekPhrase="Λοιπόν..."
				colorScheme="ocean"
				icon={<Link2 size={18} />}
			>
				Greeks use connectors constantly — mastering them will make your Greek
				sound much more fluent. These small words hold conversations together.
			</TabHero>

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
