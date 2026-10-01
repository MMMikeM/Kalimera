import { GreekText } from "kalimera";

export const Sizes = () => (
	<div className="flex flex-wrap items-baseline gap-6 p-4">
		<GreekText size="5xl">Καλημέρα</GreekText>
		<GreekText size="2xl">καλημέρα</GreekText>
		<GreekText size="lg">καλημέρα</GreekText>
		<GreekText size="sm">καλημέρα</GreekText>
	</div>
);

export const Tones = () => (
	<div className="flex flex-col gap-2 p-4 text-xl">
		<GreekText size="xl">θέλω τσάι</GreekText>
		<GreekText size="xl" tone="muted">
			θέλω τσάι
		</GreekText>
		<GreekText size="xl" tone="accent">
			θέλω τσάι
		</GreekText>
		<GreekText size="xl" tone="correct">
			θέλω τσάι
		</GreekText>
		<GreekText size="xl" tone="incorrect">
			θέλω τσάι
		</GreekText>
	</div>
);

export const Genders = () => (
	<div className="flex flex-wrap items-baseline gap-6 p-4">
		<GreekText size="xl" tone="masculine">
			ο φίλος
		</GreekText>
		<GreekText size="xl" tone="feminine">
			η μητέρα
		</GreekText>
		<GreekText size="xl" tone="neuter">
			το παιδί
		</GreekText>
	</div>
);

export const InProse = () => (
	<p className="max-w-md p-4 leading-relaxed text-stone-700">
		<strong className="font-semibold text-stone-900">The Doer usually drops out.</strong> The
		verb ending already says who: <GreekText>θέλω</GreekText> is “I want”. After a preposition,{" "}
		<GreekText size="sm">εμένα</GreekText> often loses its first{" "}
		<GreekText size="sm">ε</GreekText>: <GreekText size="sm">για μένα</GreekText>.
	</p>
);
