import { Card, GreekText } from "kalimera";

export const Default = () => (
	<div className="max-w-sm">
		<Card>
			<h3 className="mb-1 font-medium text-stone-800">Spread the word</h3>
			<p className="text-sm text-stone-600">
				Share it with someone learning Greek. Word of mouth helps the most.
			</p>
		</Card>
	</div>
);

export const Bordered = () => (
	<div className="max-w-sm">
		<Card variant="bordered" padding="lg">
			<h3 className="mb-3 font-medium text-stone-800">What's next</h3>
			<ul className="space-y-2 text-sm text-stone-600">
				<li>More vocabulary and phrases from real conversations</li>
				<li>Verb conjugation drills</li>
				<li>More grammar reference content</li>
			</ul>
		</Card>
	</div>
);

export const Elevated = () => (
	<div className="max-w-sm">
		<Card variant="elevated" padding="lg">
			<GreekText size="2xl" className="block">
				Καλημέρα
			</GreekText>
			<p className="mt-1 text-sm text-stone-600">Good morning, until about noon.</p>
		</Card>
	</div>
);

export const Paddings = () => (
	<div className="flex max-w-sm flex-col gap-3">
		<Card padding="sm">
			<p className="text-sm text-stone-700">
				<span className="font-medium">sm</span> for a single line
			</p>
		</Card>
		<Card padding="md">
			<p className="text-sm text-stone-700">
				<span className="font-medium">md</span>, the default
			</p>
		</Card>
		<Card padding="lg">
			<p className="text-sm text-stone-700">
				<span className="font-medium">lg</span> for a card that stands alone
			</p>
		</Card>
	</div>
);
