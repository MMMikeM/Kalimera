import { Link } from "@tanstack/react-router";
import { cn } from "tailwind-variants";

import { formatDayMonth, parsePlainDate } from "@/lib/time";
import type { LessonSummary } from "@/server/fns/lessons.server";

const byYear = (lessons: LessonSummary[]) => {
	const years = new Map<string, LessonSummary[]>();
	for (const lesson of lessons) {
		const year = lesson.date.slice(0, 4);
		years.set(year, [...(years.get(year) ?? []), lesson]);
	}
	return [...years.entries()];
};

const countLine = ({ wordCount, noteCount }: LessonSummary) =>
	[
		wordCount > 0 && `${wordCount} ${wordCount === 1 ? "word" : "words"}`,
		noteCount > 0 && `${noteCount} ${noteCount === 1 ? "note" : "notes"}`,
	]
		.filter(Boolean)
		.join(" · ");

interface LessonLedgerProps {
	lessons: LessonSummary[];
	openDate: string | undefined;
	className?: string;
}

/** Every lesson as one dated row, grouped by year, the open one marked. */
export const LessonLedger = ({ lessons, openDate, className }: LessonLedgerProps) => {
	const latest = lessons[0]?.date;
	return (
		<nav aria-label="All lessons" className={cn("space-y-8", className)}>
			{byYear(lessons).map(([year, rows]) => (
				<section key={year} aria-labelledby={`lessons-${year}`}>
					<h2 id={`lessons-${year}`} className="mb-2 font-serif text-xl text-stone-900">
						{year}
					</h2>
					<ol className="divide-y divide-border border-y border-border">
						{rows.map((lesson) => {
							const open = lesson.date === openDate;
							return (
								<li key={lesson.date}>
									<Link
										to={lesson.date === latest ? "/lessons" : "/lessons/$date"}
										params={lesson.date === latest ? undefined : { date: lesson.date }}
										aria-current={open ? "page" : undefined}
										className={cn(
											"flex gap-4 px-2 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-600",
											open ? "bg-terracotta/10" : "hover:bg-foreground/5",
										)}
									>
										<span
											className={cn(
												"w-14 shrink-0 text-sm tabular-nums",
												open ? "font-semibold text-terracotta-text" : "text-muted-foreground",
											)}
										>
											{formatDayMonth(parsePlainDate(lesson.date))}
										</span>
										<span className="min-w-0 flex-1">
											<span className="block text-sm leading-snug text-pretty text-stone-900">{lesson.topic}</span>
											<span className="mt-0.5 block text-xs text-muted-foreground">{countLine(lesson)}</span>
										</span>
									</Link>
								</li>
							);
						})}
					</ol>
				</section>
			))}
		</nav>
	);
};
