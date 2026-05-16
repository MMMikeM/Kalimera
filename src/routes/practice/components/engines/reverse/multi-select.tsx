import { useCallback, useEffect, useRef, useState } from "react";

import { drillActions, useDrillStore } from "../drill-store";
import { ReverseFeedback, SelectorButton } from "../shells";

type Selected<K extends string> = Partial<Record<K, string>>;

export interface DimensionSpec<K extends string> {
	key: K;
	values: readonly string[];
	label?: (v: string) => string;
	selectorStyle: (v: string) => { bg: string; text: string };
	shown?: (selected: Selected<K>) => boolean;
	required?: (selected: Selected<K>) => boolean;
}

interface MultiSelectReverseProps<K extends string> {
	dimensions: DimensionSpec<K>[];
}

export function MultiSelectReverse<K extends string>({ dimensions }: MultiSelectReverseProps<K>) {
	const phase = useDrillStore((s) => s.phase);
	const cardIndex = useDrillStore((s) => s.cardIndex);
	const deck = useDrillStore((s) => s.deck);
	const { recordAttempt } = drillActions;
	const currentForm = deck[cardIndex] as (typeof deck)[number] & Record<K, string>;

	const [selected, setSelected] = useState<Selected<K>>({});
	const startedAt = useRef(0);

	useEffect(() => {
		if (phase === "active") {
			setSelected({});
			startedAt.current = performance.now();
		}
	}, [phase, cardIndex]);

	const isRequired = (spec: DimensionSpec<K>, sel: Selected<K>) => {
		if (spec.required) return spec.required(sel);
		if (spec.shown) return spec.shown(sel);
		return true;
	};

	const allRequiredSelected = useCallback(
		(sel: Selected<K>) => {
			for (const d of dimensions) {
				if (isRequired(d, sel) && sel[d.key] === undefined) return false;
			}
			return true;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dimensions],
	);

	const handleSubmit = useCallback(
		(sel: Selected<K>) => {
			if (phase !== "active" || !currentForm) return;
			if (!allRequiredSelected(sel)) return;
			const timeTaken = performance.now() - startedAt.current;
			let isCorrect = true;
			for (const d of dimensions) {
				if (!isRequired(d, sel)) continue;
				if (sel[d.key] !== currentForm[d.key]) {
					isCorrect = false;
					break;
				}
			}
			recordAttempt(isCorrect, timeTaken, {
				prompt: currentForm.greek,
				correctAnswer: currentForm.label,
				userAnswer: Object.values(sel).join(","),
				weakAreaIdentifier: currentForm.weakAreaIdentifier ?? currentForm.id,
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[phase, currentForm, allRequiredSelected, startedAt, dimensions, recordAttempt],
	);

	// Auto-submit when all dimensions selected
	useEffect(() => {
		if (phase !== "active") return;
		if (!allRequiredSelected(selected)) return;
		handleSubmit(selected);
	}, [selected, phase, handleSubmit, allRequiredSelected]);

	if (!currentForm) return null;

	return (
		<>
			<div className="pt-2">
				<p lang="el" className="greek-text font-sans text-8xl leading-none text-foreground">
					{currentForm.greek}
				</p>
			</div>

			<div className="space-y-3">
				{dimensions.map((dim) => {
					if (dim.shown && !dim.shown(selected)) return null;
					return (
						<div key={dim.key} className="flex flex-wrap gap-2">
							{dim.values.map((v) => {
								const style = dim.selectorStyle(v);
								const label = dim.label ? dim.label(v) : v;
								return (
									<SelectorButton
										key={v}
										label={label}
										selected={selected[dim.key] === v}
										disabled={phase !== "active"}
										onClick={() =>
											setSelected((prev) => ({ ...prev, [dim.key]: v }) as Selected<K>)
										}
										selectedBg={style.bg}
										selectedText={style.text}
									/>
								);
							})}
						</div>
					);
				})}

				<ReverseFeedback />
			</div>
		</>
	);
}
