import { useCallback, type ReactNode } from "react";

import { GreekText } from "@/components/GreekText";

import type { DrillForm } from "../deck";
import { useCardState } from "../drill-hooks";
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
	renderGreek?: (form: DrillForm) => ReactNode;
	getExplanation?: (form: DrillForm) => ReactNode;
}

export function SingleSelectReverse({
	options,
	renderGreek,
	getExplanation,
}: SingleSelectReverseProps) {
	const phase = useDrillStore((s) => s.phase);
	const cardIndex = useDrillStore((s) => s.cardIndex);
	const deck = useDrillStore((s) => s.deck);
	const { recordAttempt } = drillActions;
	const currentForm = deck[cardIndex];

	const [selected, setSelected] = useCardState<string | null>(null);

	const handleSelect = useCallback(
		(id: string) => {
			if (phase !== "active" || !currentForm) return;
			setSelected(id);
			const correctId = currentForm.dimension ?? "";
			const isCorrect = correctId === id;
			recordAttempt(isCorrect, {
				prompt: currentForm.reverseGreek ?? currentForm.greek,
				correctAnswer: correctId,
				userAnswer: id,
			});
		},
		[phase, currentForm, recordAttempt, setSelected],
	);

	if (!currentForm) return null;

	return (
		<>
			<div>
				<GreekText as="p" size="4xl">
					{renderGreek ? renderGreek(currentForm) : (currentForm.reverseGreek ?? currentForm.greek)}
				</GreekText>
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

			<ReverseFeedback detail={getExplanation?.(currentForm)} />
		</>
	);
}
