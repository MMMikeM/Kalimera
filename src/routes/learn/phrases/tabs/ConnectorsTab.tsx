import { Link2 } from "lucide-react";

import { TabHero } from "@/components/TabHero";

import type { PhrasesLoaderData } from "../components/shared";
import { PhraseList } from "../components/shared";

export const ConnectorsTab = ({ data }: { data: PhrasesLoaderData }) => {
	const { discourseMarkers, discourseFillers } = data.connectors;

	return (
		<div className="space-y-6">
			<TabHero
				title="The glue of natural speech"
				greekPhrase="Λοιπόν..."
				colorScheme="ocean"
				icon={<Link2 size={18} />}
			>
				Greeks use connectors constantly — mastering them will make your Greek sound much more
				fluent. These small words hold conversations together.
			</TabHero>

			<PhraseList title="Discourse Markers" colorScheme="olive" phrases={discourseMarkers} />
			<PhraseList title="Fillers & Connectors" colorScheme="ocean" phrases={discourseFillers} />
		</div>
	);
};
