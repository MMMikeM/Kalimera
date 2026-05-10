import type React from "react";

const PHASE_TINT: Record<string, string> = {
	Doer: "text-ocean-600 border-ocean/50",
	Target: "text-terracotta-600 border-terracotta/50",
	Owner: "text-olive-600 border-olive/50",
	Review: "text-muted-foreground border-border",
};
export const PhaseSection = ({ phase, children }: { phase: string; children: React.ReactNode }) => {
	const tint = phase ? PHASE_TINT[phase] : null;
	return (
		<div>
			<h4
				className={`mb-2 border-b pb-2 font-sans text-sm font-bold tracking-widest uppercase ${tint ?? "border-border text-muted-foreground"}`}
			>
				{phase}
			</h4>
			<ul className="divide-y divide-border">{children}</ul>
		</div>
	);
};
