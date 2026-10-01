import { Button, GreekText } from "kalimera";

export const Primary = () => (
	<div className="max-w-sm p-4">
		<Button className="w-full">Begin</Button>
	</div>
);

export const Variants = () => (
	<div className="flex flex-wrap items-center gap-3 p-4">
		<Button variant="primary">Begin</Button>
		<Button variant="secondary">Drill again</Button>
		<Button variant="outline">Show answer</Button>
		<Button variant="ghost">Skip</Button>
	</div>
);

export const Sizes = () => (
	<div className="flex flex-wrap items-center gap-3 p-4">
		<Button size="sm">Check</Button>
		<Button size="md">Check</Button>
		<Button size="lg">Check</Button>
	</div>
);

export const SelfAssess = () => (
	<div className="max-w-sm space-y-4 p-4 text-center">
		<GreekText as="p" size="4xl">
			μιλάμε
		</GreekText>
		<p className="text-xl text-muted-foreground">we speak</p>
		<div className="flex gap-3">
			<Button
				variant="outline"
				className="flex-1 border-incorrect/30 text-incorrect-text hover:bg-incorrect/5"
			>
				Missed it
			</Button>
			<Button
				variant="outline"
				className="flex-1 border-correct/30 text-correct-text hover:bg-correct/5"
			>
				Got it
			</Button>
		</div>
	</div>
);

export const Active = () => (
	<div className="flex flex-wrap items-center gap-2 p-4">
		<Button variant="secondary" size="sm" active>
			Present
		</Button>
		<Button variant="secondary" size="sm">
			Aorist
		</Button>
		<Button variant="secondary" size="sm">
			Future
		</Button>
	</div>
);

export const Disabled = () => (
	<div className="max-w-sm p-4">
		<Button className="w-full" disabled>
			Signing in…
		</Button>
	</div>
);
