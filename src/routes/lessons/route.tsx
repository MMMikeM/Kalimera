import { Outlet, createFileRoute, redirect, useParams } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { PageHeading } from "@/components/PageHeading";
import { canSeeLessons } from "@/lib/lessons-access";
import { pageTitle } from "@/lib/page-title";
import { getLessonsFn } from "@/server/fns/lessons";

import { LessonLedger } from "./components/lesson-ledger";

export const Route = createFileRoute("/lessons")({
	beforeLoad: async ({ context }) => {
		if (!canSeeLessons(context.auth)) throw redirect({ to: "/" });
	},
	loader: () => getLessonsFn(),
	head: () => ({ meta: [{ title: pageTitle("Lessons") }] }),
	component: LessonsLayout,
});

function LessonsLayout() {
	const lessons = Route.useLoaderData();
	const { date } = useParams({ strict: false });
	const openDate = date ?? lessons[0]?.date;
	const sheetRef = useRef<HTMLDivElement>(null);
	const previousDate = useRef(openDate);

	// The app scrolls inside .app-main, which the router's scroll restoration does not
	// reset, so a row picked low in the ledger would open its sheet out of sight.
	useEffect(() => {
		if (previousDate.current === openDate) return;
		previousDate.current = openDate;
		sheetRef.current?.scrollIntoView({ block: "start" });
	}, [openDate]);

	return (
		<div className="mx-auto max-w-6xl">
			<PageHeading title="Lessons" className="mb-8 sm:mb-10">
				<p>What each tutoring session covered, newest first.</p>
			</PageHeading>
			{lessons.length === 0 ? (
				<p className="text-stone-700">No lessons yet.</p>
			) : (
				<div className="grid gap-14 md:grid-cols-12 md:gap-10 lg:gap-14">
					<div ref={sheetRef} className="min-w-0 scroll-mt-6 md:order-2 md:col-span-8">
						<a
							href="#all-lessons"
							className="mb-6 inline-block text-sm text-ocean-text underline-offset-4 hover:underline md:hidden"
						>
							Jump to all lessons
						</a>
						<Outlet />
					</div>
					<LessonLedger lessons={lessons} openDate={openDate} className="min-w-0 md:order-1 md:col-span-4" />
				</div>
			)}
		</div>
	);
}
