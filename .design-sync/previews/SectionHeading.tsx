import { SectionHeading } from "kalimera";

export const Section = () => (
	<div className="max-w-2xl p-4">
		<SectionHeading
			title="Prepositions"
			subtitle="Four words cover most situations. One rule applies to all."
		/>
	</div>
);

export const Subsection = () => (
	<div className="max-w-2xl p-4">
		<SectionHeading
			level="h3"
			title="Conjugations"
			subtitle="Every tense of this verb, one table at a time."
		/>
	</div>
);

export const Minor = () => (
	<div className="max-w-2xl p-4">
		<SectionHeading
			level="h4"
			title="Aorists no rule predicts"
			subtitle="Learn these by heart: είδα, ήρθα, είπα."
		/>
	</div>
);

export const TitleOnly = () => (
	<div className="max-w-2xl p-4">
		<SectionHeading title="Future Tense" />
	</div>
);
