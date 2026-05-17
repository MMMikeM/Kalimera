import { useCallback, useEffect, useRef, useState } from "react";

import { drillActions, useDrillStore } from "../drill-store";
import { ReverseFeedback, SelectorButton } from "../shells";

interface SelectOption {
	id: string;
	label: string;
	selectorBg: string;
	selectorText: string;
}

interface SingleSelectReverseProps {
	options: SelectOption[];
	getCorrectId: (form: Record<string, unknown>) => string;
}

export function SingleSelectReverse({ options, getCorrectId }: SingleSelectReverseProps) {
	const phase = useDrillStore((s) => s.phase);
	const cardIndex = useDrillStore((s) => s.cardIndex);
	const deck = useDrillStore((s) => s.deck);
	const { recordAttempt } = drillActions;
	const currentForm = deck[cardIndex];

	const [selected, setSelected] = useState<string | null>(null);
	const startedAt = useRef(0);

	useEffect(() => {
		if (phase === "active") {
			setSelected(null);
			startedAt.current = performance.now();
		}
	}, [phase, cardIndex]);

	const handleSelect = useCallback(
		(id: string) => {
			if (phase !== "active" || !currentForm) return;
			setSelected(id);
			const timeTaken = performance.now() - startedAt.current;
			const correctId = getCorrectId(currentForm as unknown as Record<string, unknown>);
			const isCorrect = correctId === id;
			recordAttempt(isCorrect, timeTaken, {
				prompt: currentForm.greek,
				correctAnswer: correctId,
				userAnswer: id,
			});
		},
		[phase, currentForm, getCorrectId, recordAttempt],
	);

	if (!currentForm) return null;

	return (
		<>
			<div>
				<p lang="el" className="greek-text text-4xl text-foreground">
					{currentForm.greek}
				</p>
			</div>

			<div className="flex flex-wrap gap-2">
				{options.map((opt) => (
					<SelectorButton
						key={opt.id}
						label={opt.label}
						selected={selected === opt.id}
						disabled={phase !== "active"}
						onClick={() => handleSelect(opt.id)}
						selectedBg={opt.selectorBg}
						selectedText={opt.selectorText}
					/>
				))}
			</div>

			<ReverseFeedback />
		</>
	);
}
