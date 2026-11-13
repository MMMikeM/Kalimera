import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { PageHeading } from "@/components/PageHeading";
import { ProseWithGreek } from "@/components/ProseWithGreek";

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

/** One table, its heading and the guide sections that teach it. */
export const LookupSection = ({
	title,
	taughtIn,
	children,
}: {
	title: ReactNode;
	taughtIn: GuideSectionRef[];
	children: ReactNode;
}) => (
	<section className="space-y-3">
		<h2 className="font-serif text-2xl text-stone-900">{title}</h2>
		<div className="-mx-4 overflow-x-auto px-4">{children}</div>
		<TaughtIn refs={taughtIn} />
	</section>
);

/** The title and the one-line lede every table page shares. */
export const LookupPage = ({ title, children }: { title: string; children: ReactNode }) => (
	<div className="space-y-10">
		<PageHeading title={title}>
			<p>Tables for looking a form up. The rules are in the guides.</p>
		</PageHeading>
		{children}
	</div>
);
