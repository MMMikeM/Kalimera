import { GreekText } from "@/components/GreekText";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";
import { NEUTRAL } from "../../components/engines/drill-constants";

interface GuideDrillProps {
	drillId: string;
	items: SimpleListItem[];
	guide: string;
	section: string;
	forwardDesc: string;
}

const shellProps = ({ items, guide, section }: GuideDrillProps) => ({
	subtitle: `${items.length} cards / timed`,
	sessionSize: 20,
	backTo: "/practice/guides",
	referenceHref: `/guides/${guide}#${section}`,
	referenceLabel: "The guide section →",
});

/**
 * A drill for one guide section where the answer is typed. The grader compares
 * sounds, so use it only when the right and wrong answers sound different.
 */
export const GuideDrill = (props: GuideDrillProps) => (
	<Drill
		drillId={props.drillId}
		items={props.items}
		{...shellProps(props)}
		forwardOnly
		forwardLabel="Type the Greek"
		forwardDesc={props.forwardDesc}
	/>
);

/**
 * A drill for one guide section where the learner picks the answer, for choices
 * that sound alike (καλή, καλεί) or that typing cannot test. Each card shows its
 * `reverseGreek`, a sentence with a ___ gap, and `dimension` names the right option.
 */
export const GuideChoiceDrill = ({ options, ...props }: GuideDrillProps & { options: string[] }) => (
	<Drill
		drillId={props.drillId}
		items={props.items}
		{...shellProps(props)}
		defaultMode="reverse"
		// forwardOnly only hides the mode picker; defaultMode makes the one mode this choice.
		forwardOnly
		forwardLabel="Pick the Greek"
		forwardDesc={props.forwardDesc}
		reverse={{
			kind: "single-select",
			options: options.map((option) => ({ id: option, label: option, ...NEUTRAL })),
			renderGreek: (form) => (
				<>
					{form.reverseGreek}
					<span lang="en" className="mt-3 block font-sans text-lg text-muted-foreground">
						{form.label}
					</span>
				</>
			),
			getExplanation: (form) => <GreekText>{form.greek}</GreekText>,
		}}
	/>
);
