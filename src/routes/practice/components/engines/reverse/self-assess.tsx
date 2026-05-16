import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { drillActions, useDrillStore } from "../drill-store";
import { ReverseFeedback } from "../shells";

export function SelfAssessReverse() {
	const phase = useDrillStore((s) => s.phase);
	const cardIndex = useDrillStore((s) => s.cardIndex);
	const deck = useDrillStore((s) => s.deck);
	const { recordAttempt } = drillActions;
	const currentForm = deck[cardIndex];

	const [revealedAnswer, setRevealedAnswer] = useState(false);
	const startedAt = useRef(0);

	useEffect(() => {
		if (phase === "active") {
			setRevealedAnswer(false);
			startedAt.current = performance.now();
		}
	}, [phase, cardIndex]);

	const handleSelfAssess = (isCorrect: boolean) => {
		if (!currentForm) return;
		const timeTaken = performance.now() - startedAt.current;
		recordAttempt(isCorrect, timeTaken, {
			prompt: currentForm.greek,
			correctAnswer: currentForm.label,
			userAnswer: isCorrect ? "self:correct" : "self:wrong",
			weakAreaIdentifier: currentForm.weakAreaIdentifier ?? currentForm.id,
		});
	};

	if (!currentForm) return null;

	return (
		<>
			<div>
				<p lang="el" className="greek-text text-4xl text-foreground">
					{currentForm.greek}
				</p>
			</div>

			{phase === "active" && !revealedAnswer && (
				<Button variant="outline" onClick={() => setRevealedAnswer(true)} className="w-full">
					Show answer
				</Button>
			)}

			{phase === "active" && revealedAnswer && (
				<>
					<p className="text-xl text-muted-foreground">{currentForm.label}</p>
					<div className="flex gap-3">
						<Button
							variant="outline"
							onClick={() => handleSelfAssess(false)}
							className="flex-1 border-incorrect/30 text-incorrect hover:bg-incorrect/5"
						>
							Missed it
						</Button>
						<Button
							variant="outline"
							onClick={() => handleSelfAssess(true)}
							className="flex-1 border-correct/30 text-correct hover:bg-correct/5"
						>
							Got it
						</Button>
					</div>
				</>
			)}

			<ReverseFeedback />
		</>
	);
}
