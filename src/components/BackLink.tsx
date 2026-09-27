import { createLink } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { cn } from "tailwind-variants";

/** Never labelled with the current page's name: "Learn" or "Exit", not "Phrases". */
const BackAnchor = ({ className, children, ...props }: React.ComponentPropsWithRef<"a">) => (
	<a
		className={cn(
			"-ml-1 inline-flex min-h-11 items-center gap-1 pr-2 text-sm text-stone-600 transition-colors hover:text-stone-900",
			className,
		)}
		{...props}
	>
		<ChevronLeft size={16} aria-hidden="true" />
		{children}
	</a>
);

export const BackLink = createLink(BackAnchor);
