import { GreekGloss, Verdict } from "kalimera";

export const AfterAnAnswer = () => (
	<div className="max-w-sm p-4">
		<Verdict isCorrect />
		<GreekGloss greek="μιλάμε" size="2xl" className="mt-1" />
	</div>
);

export const MistakeRow = () => (
	<ul className="max-w-sm space-y-2 p-4">
		<li className="rounded-lg border bg-card p-3">
			<div className="flex flex-wrap items-baseline gap-x-2">
				<GreekGloss greek="τον άντρα" size="lg" />
				<span className="text-xs text-muted-foreground">Target · masculine</span>
			</div>
			<p className="mt-1 text-xs text-muted-foreground">
				You typed <span className="font-mono text-incorrect-text">το άντρα</span>
			</p>
		</li>
		<li className="rounded-lg border bg-card p-3">
			<div className="flex flex-wrap items-baseline gap-x-2">
				<GreekGloss greek="της γυναίκας" size="lg" />
				<span className="text-xs text-muted-foreground">Owner · feminine</span>
			</div>
		</li>
	</ul>
);

export const WithLabel = () => (
	<div className="flex flex-col gap-2 p-4">
		<GreekGloss label="ending" greek="-ουμε" size="xl" />
		<GreekGloss label="verb" greek="κάνουμε" size="xl" />
	</div>
);

export const Sizes = () => (
	<div className="flex flex-col gap-2 p-4">
		<GreekGloss greek="καλησπέρα" size="2xl" />
		<GreekGloss greek="καλησπέρα" size="lg" />
		<GreekGloss greek="καλησπέρα" size="base" />
		<GreekGloss greek="καλησπέρα" size="sm" />
	</div>
);
