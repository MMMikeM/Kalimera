import type { ReactNode } from "react";
import { cn } from "tailwind-variants";

interface PageHeadingProps {
	title: ReactNode;
	children?: ReactNode;
	className?: string;
}

/** The page title and its lede, set the same way on every page that has one. */
export const PageHeading = ({ title, children, className }: PageHeadingProps) => (
	<div className={cn("space-y-3", className)}>
		<h1 className="font-serif text-4xl leading-tight text-balance text-stone-900 sm:text-5xl">
			{title}
		</h1>
		{children ? (
			<div className="max-w-2xl space-y-3 leading-relaxed text-pretty text-stone-700">{children}</div>
		) : null}
	</div>
);
