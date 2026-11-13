import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "tailwind-variants";

import { PageHeading } from "@/components/PageHeading";
import { ProseWithGreek } from "@/components/ProseWithGreek";
import { GUIDE_TONE } from "@/routes/guides/components/guide-tone";
import type { SectionTone } from "@/types/guide";

import type { GuideSectionRef } from "../taught-in.data";

const TaughtIn = ({ refs }: { refs: GuideSectionRef[] }) => (
	<p className="flex flex-wrap items-center gap-x-4 text-sm text-stone-600">
		<span>Taught in:</span>
		{refs.map((ref) => (
			<Link
				key={ref.section}
				to="/guides/$guide"
				params={{ guide: ref.guide }}
				hash={ref.section}
				className="inline-flex min-h-11 items-center gap-1 font-medium text-ocean-text underline-offset-4 hover:underline"
			>
				<span>
					<ProseWithGreek text={ref.title} />
				</span>
				<ArrowRight aria-hidden size={14} strokeWidth={1.75} />
			</Link>
		))}
	</p>
);

/**
 * One table in the guides' section card: a tinted header, the table, and the guide
 * sections that teach it at the foot. A gender tone claims the table is about that
 * gender's nouns, as it does in the guides.
 */
export const LookupSection = ({
	title,
	tone,
	taughtIn,
	children,
}: {
	title: ReactNode;
	tone: SectionTone;
	taughtIn: GuideSectionRef[];
	children: ReactNode;
}) => (
	<section className="-mx-6 overflow-hidden border-y border-stone-300 sm:mx-0 sm:rounded-lg sm:border-x">
		<header className={cn("border-b px-6 py-3", GUIDE_TONE[tone].header)}>
			<h2 className="font-serif text-2xl text-stone-900">{title}</h2>
		</header>
		<div className="space-y-5 px-6 py-5 sm:py-6">
			{children}
			<footer className="border-t border-stone-200 pt-2">
				<TaughtIn refs={taughtIn} />
			</footer>
		</div>
	</section>
);

/** The title and the one-line lede every table page shares. */
export const LookupPage = ({ title, children }: { title: string; children: ReactNode }) => (
	<div className="max-w-3xl space-y-8">
		<PageHeading title={title}>
			<p>Tables for looking a form up. The rules are in the guides.</p>
		</PageHeading>
		{children}
	</div>
);
