import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";

import { BackLink } from "@/components/BackLink";
import { GreekText } from "@/components/GreekText";
import { Pronunciation } from "@/components/Pronunciation";
import { Button } from "@/components/ui/button";
import type { PathStep } from "@/constants/drills";
import type { UnitItem, UnitWord } from "@/lib/units";
import { recordStepSessionFn } from "@/server/fns/steps";

import { StepResult, type StepSessionResult } from "./step-result";

const rootRoute = getRouteApi("__root__");

/** Three new words to a screen: the most a first look can take in. */
const CARDS_PER_PAGE = 3;

const MeetCard = ({
	word,
	meaning,
}: {
	word: UnitWord;
	meaning: string;
}) => (
	<li className="rounded-lg border border-stone-300 bg-card px-5 py-4">
		<GreekText as="p" size="3xl" weight="semibold">
			{word.greek}
		</GreekText>
		<Pronunciation greek={word.greek} className="mt-1 block" />
		<p className="mt-2 text-lg text-foreground">{meaning}</p>
		<div className="mt-3 border-t border-border pt-3">
			<GreekText as="p">{word.example.greek}</GreekText>
			<p className="text-sm text-muted-foreground">{word.example.english}</p>
		</div>
	</li>
);

/**
 * A unit's first showing: every word with its meaning and an example, nothing
 * asked. Looking through it is the whole step.
 */
export const MeetWords = ({
	step,
	path,
	words,
	items,
}: {
	step: PathStep;
	path: readonly PathStep[];
	words: readonly UnitWord[];
	items: readonly UnitItem[];
}) => {
	const { auth } = rootRoute.useRouteContext();
	const [page, setPage] = useState(0);
	const [result, setResult] = useState<StepSessionResult>();
	const meanings = new Map(items.map((item) => [item.dimension, item.label]));
	const pages = Math.ceil(words.length / CARDS_PER_PAGE);
	const shown = words.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);
	const lastPage = page === pages - 1;

	const finish = () => {
		const score = { correct: 1, total: 1 };
		if (!auth?.userId) return;
		recordStepSessionFn({ data: { stepId: step.id, ...score } })
			.then((recorded) => setResult({ ...recorded, score }))
			.catch(() => {});
	};

	return (
		<div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-6 pb-6">
			<div className="flex items-center justify-between gap-4">
				<BackLink to="/practice/path">Exit</BackLink>
				<h1 className="min-w-0 truncate text-sm text-muted-foreground">{step.title}</h1>
				<span className="shrink-0 text-sm text-muted-foreground tabular-nums">
					{page + 1} of {pages}
				</span>
			</div>
			<ul className="flex flex-col gap-4">
				{shown.map((word) => (
					<MeetCard key={word.greek} word={word} meaning={meanings.get(word.greek) ?? ""} />
				))}
			</ul>
			{result ? (
				<StepResult step={step} path={path} result={result} />
			) : (
				<div className="flex justify-between gap-4">
					{page > 0 ? (
						<Button variant="outline" onClick={() => setPage(page - 1)}>
							Back
						</Button>
					) : (
						<span />
					)}
					{lastPage ? (
						<Button onClick={finish}>Done</Button>
					) : (
						<Button onClick={() => setPage(page + 1)}>Next</Button>
					)}
				</div>
			)}
		</div>
	);
};
