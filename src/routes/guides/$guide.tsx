import { createFileRoute, notFound } from "@tanstack/react-router";

import { pageTitle } from "@/lib/page-title";

import { GuidePage } from "./components/guide-page";
import { findGuide } from "./guides.data";

export const Route = createFileRoute("/guides/$guide")({
	loader: ({ params }) => {
		const guide = findGuide(params.guide);
		if (!guide) throw notFound();
		return { slug: guide.slug };
	},
	head: ({ params }) => ({
		meta: [{ title: pageTitle(findGuide(params.guide)?.title ?? "Guides") }],
	}),
	component: GuideRoute,
});

function GuideRoute() {
	const { slug } = Route.useLoaderData();
	const guide = findGuide(slug);
	if (!guide) return null;
	return <GuidePage guide={guide} />;
}
