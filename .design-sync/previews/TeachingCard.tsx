import { GreekText, TeachingCard } from "kalimera";

export const Neutral = () => (
	<div className="max-w-sm">
		<TeachingCard
			scheme="neutral"
			eyebrow="Pattern"
			title="Verbs in -άω"
			description="A second set of endings, stressed on the ending: αγαπάω, μιλάω, πεινάω."
			footer="Say μιλάς and μιλάει, never μιλείς."
		>
			<GreekText size="xl">μιλάω · μιλάς · μιλάει</GreekText>
		</TeachingCard>
	</div>
);

export const WithBadge = () => (
	<div className="max-w-sm">
		<TeachingCard
			scheme="verb-active"
			title={
				<GreekText tone="inherit" size="3xl">
					μου
				</GreekText>
			}
			badge="my, to me"
			description="After a noun it says whose; before a verb it says who it is for."
		>
			<GreekText size="lg">το σπίτι μου · μου αρέσει</GreekText>
		</TeachingCard>
	</div>
);

export const Decision = () => (
	<div className="max-w-sm">
		<TeachingCard
			scheme="decision"
			eyebrow="Choose"
			title="πολύ or πολλή?"
			description="πολύ before an adjective or a verb; πολλή before a feminine noun."
		>
			<GreekText size="lg">πολύ ωραία · πολλή δουλειά</GreekText>
		</TeachingCard>
	</div>
);
