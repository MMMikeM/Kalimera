import { Link, getRouteApi } from "@tanstack/react-router";
import { Zap } from "lucide-react";

import { drillHrefForTopic } from "@/lib/practice-links";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

const rootRoute = getRouteApi("__root__");

interface PracticeCTAProps {
	title?: string;
	description?: string;
	/** Resolved to a drill route, and to /register for logged-out readers. */
	topic?: string;
	/** Overrides the topic lookup when a tab needs a specific drill. */
	drillHref?: string;
	ctaLabel?: string;
}

export const PracticeCTA = ({
	title = "Ready to practice?",
	description = "Turn knowledge into fluency with timed retrieval drills.",
	topic,
	drillHref,
	ctaLabel = "Try a Drill",
}: PracticeCTAProps) => {
	const { auth } = rootRoute.useRouteContext();
	const href = drillHref ?? drillHrefForTopic(topic, Boolean(auth?.userId));

	return (
		<Card className="border-terracotta/20 bg-terracotta/5">
			<div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
				<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10">
					<Zap size={24} className="text-terracotta" />
				</div>
				<div className="flex-1 text-center sm:text-left">
					<h3 className="mb-1 font-medium text-stone-800">{title}</h3>
					<p className="text-sm text-stone-600">{description}</p>
				</div>
				<Link to={href} className="flex-shrink-0">
					<Button variant="primary">{ctaLabel}</Button>
				</Link>
			</div>
		</Card>
	);
};
