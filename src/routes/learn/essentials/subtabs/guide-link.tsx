import { createLink } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "tailwind-variants";

import { ProseWithGreek } from "@/components/ProseWithGreek";

const GUIDE_SECTIONS = {
	colours: { guide: "agreement", section: "colours", title: "Colours that never change" },
	numbers: { guide: "agreement", section: "numbers", title: "Numbers that agree" },
	time: { guide: "roles", section: "target", title: "The Target form: objects, times, prepositions" },
	position: { guide: "place", section: "position", title: "Next to, behind, far from" },
	frequency: { guide: "scales", section: "frequency", title: "How often, from ποτέ to πάντα" },
} as const;

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

export function GuideLink({ to }: { to: keyof typeof GUIDE_SECTIONS }) {
	const { guide, section, title } = GUIDE_SECTIONS[to];
	return (
		<ArrowLink to="/guides/$guide" params={{ guide }} hash={section} className="mx-3">
			<span>
				How these change: <ProseWithGreek text={title} />
			</span>
		</ArrowLink>
	);
}
