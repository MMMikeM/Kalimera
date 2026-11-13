import { createLink } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "tailwind-variants";

import { ProseWithGreek } from "@/components/ProseWithGreek";
import { TAUGHT_IN } from "@/routes/reference/components/lookup-section";

const ArrowAnchor = ({ className, children, ...props }: React.ComponentPropsWithRef<"a">) => (
	<a
		className={cn(
			"inline-flex min-h-11 items-center gap-1 text-sm text-ocean-text underline-offset-4 hover:underline",
			className,
		)}
		{...props}
	>
		{children}
		<ArrowRight aria-hidden size={14} strokeWidth={1.75} />
	</a>
);

export const ArrowLink = createLink(ArrowAnchor);

export function GuideLink({ to }: { to: keyof typeof TAUGHT_IN }) {
	const { guide, section, title } = TAUGHT_IN[to];
	return (
		<ArrowLink to="/guides/$guide" params={{ guide }} hash={section} className="mx-3">
			<span>
				How these change: <ProseWithGreek text={title} />
			</span>
		</ArrowLink>
	);
}
