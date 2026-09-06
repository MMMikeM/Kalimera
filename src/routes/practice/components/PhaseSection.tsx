import type React from "react";

import { SCHEME } from "@/constants/grammar-palette";

/**
 * A phase heading names a case role, so it takes that role's tokens. Review
 * mixes the roles and claims none of them.
 */
const PHASE_TINT: Record<string, string> = {
	Doer: `${SCHEME["case-nominative"].text} ${SCHEME["case-nominative"].border}`,
	Target: `${SCHEME["case-accusative"].text} ${SCHEME["case-accusative"].border}`,
	Owner: `${SCHEME["case-genitive"].text} ${SCHEME["case-genitive"].border}`,
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
