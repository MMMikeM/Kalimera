import type { ReactNode } from "react";

import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import { cn } from "@/lib/utils";

interface CalloutProps {
	scheme: GrammarScheme;
	title?: ReactNode;
	icon?: ReactNode;
	footer?: ReactNode;
	className?: string;
	children: ReactNode;
}

export const Callout = ({
	scheme,
	title,
	icon,
	footer,
	className,
	children,
}: CalloutProps) => {
	const style = SCHEME[scheme];
	return (
		<div
			className={cn(
				"rounded-lg border p-4",
				style.bgSoft,
				style.borderSoft,
				className,
			)}
		>
			{title ? (
				<h4 className={cn("mb-2 flex items-center gap-2 font-semibold", style.text)}>
					{icon}
					{title}
				</h4>
			) : null}
			<div className="space-y-2 text-sm">{children}</div>
			{footer ? (
				<div className={cn("mt-3 border-t pt-3 text-sm text-stone-500", style.borderSoft)}>
					{footer}
				</div>
			) : null}
		</div>
	);
};
