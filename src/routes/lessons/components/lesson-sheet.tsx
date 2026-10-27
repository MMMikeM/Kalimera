import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { GrammarMark } from "@/components/GrammarMark";
import { GreekText } from "@/components/GreekText";
import { formatLongDate, parsePlainDate } from "@/lib/time";
import { DrillList } from "@/routes/practice/components/drill-index";
import { DRILL_REGISTRY } from "@/routes/practice/drill-catalogue.data";
import type { LessonNoteView, LessonSheet as Sheet, LessonWord } from "@/server/fns/lessons.server";

const SheetSection = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
	<section aria-labelledby={id} className="mt-12">
		<h3 id={id} className="mb-4 font-serif text-2xl text-stone-900">
			{title}
		</h3>
		{children}
	</section>
);

const Note = ({ note }: { note: LessonNoteView }) => (
	<li className="py-5 first:pt-0 last:pb-0">
		<h4 className="font-semibold text-pretty text-stone-900">{note.pattern}</h4>
		<p className="mt-1 max-w-prose leading-relaxed text-pretty text-stone-700">{note.explanation}</p>
		{note.examples.length > 0 && (
			<ul className="mt-3 space-y-1.5">
				{note.examples.map((example) => (
					<li key={example}>
						<GreekText size="lg">{example}</GreekText>
					</li>
				))}
			</ul>
		)}
		{note.taughtIn && (
			<Link
				to="/guides/$guide"
				params={{ guide: note.taughtIn.guideSlug }}
				hash={note.taughtIn.sectionId}
				className="mt-3 inline-block text-sm text-pretty text-ocean-text underline-offset-4 hover:underline"
			>
				{note.taughtIn.guide}: {note.taughtIn.section}
				<ArrowRight aria-hidden size={14} strokeWidth={1.75} className="ml-1.5 inline align-middle" />
			</Link>
		)}
	</li>
);

const WordTable = ({ label, words }: { label: string; words: LessonWord[] }) =>
	words.length === 0 ? null : (
		<div className="mt-6 first:mt-0">
			<h4 className="mb-1 text-sm font-semibold text-stone-600">{label}</h4>
			<table className="w-full table-fixed text-left">
				<tbody className="divide-y divide-border border-y border-border">
					{words.map((word) => (
						<tr key={word.greek}>
							<td className="w-5/12 py-2.5 pr-6 align-baseline">
								{word.gender ? (
									<GrammarMark case="nominative" gender={word.gender} plural={word.plural} size="lg">
										{word.greek}
									</GrammarMark>
								) : (
									<GreekText size="lg">{word.greek}</GreekText>
								)}
							</td>
							<td className="py-2.5 align-baseline text-sm text-pretty text-stone-700">{word.english}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

const GenderKey = () => (
	<div className="mb-6 text-sm text-stone-600">
		<p>A noun&apos;s mark is coloured by its gender.</p>
		<ul className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
			{(["masculine", "feminine", "neuter"] as const).map((gender, i) => (
				<li key={gender} className="flex items-start gap-2">
					<GrammarMark case="nominative" gender={gender} size="base">
						{["ο", "η", "το"][i]!}
					</GrammarMark>
					<span className="pt-0.5">{gender}</span>
				</li>
			))}
		</ul>
	</div>
);

const countLine = (sheet: Sheet) => {
	const words =
		sheet.nouns.length + sheet.verbs.length + sheet.adjectives.length + sheet.otherWords.length;
	return [
		words > 0 && `${words} ${words === 1 ? "word" : "words"}`,
		sheet.phrases.length > 0 && `${sheet.phrases.length} ${sheet.phrases.length === 1 ? "phrase" : "phrases"}`,
		sheet.notes.length > 0 && `${sheet.notes.length} ${sheet.notes.length === 1 ? "note" : "notes"}`,
	]
		.filter(Boolean)
		.join(" · ");
};

/** One lesson: its homework, what was taught, its words and phrases, then the drills for it. */
export const LessonSheet = ({ sheet }: { sheet: Sheet }) => {
	const hasWords =
		sheet.nouns.length + sheet.verbs.length + sheet.adjectives.length + sheet.otherWords.length > 0;
	const drills = sheet.drillIds.flatMap((id) => DRILL_REGISTRY[id] ?? []);

	return (
		<article id="lesson-sheet" aria-labelledby="lesson-topic" className="scroll-mt-6">
			<header>
				<h2 id="lesson-topic" className="font-serif text-3xl leading-tight text-balance text-stone-900 sm:text-4xl">
					{sheet.topic}
				</h2>
				<p className="mt-2 text-sm text-muted-foreground">
					<time dateTime={sheet.date}>{formatLongDate(parsePlainDate(sheet.date))}</time>
					{countLine(sheet) && <> · {countLine(sheet)}</>}
				</p>
				{sheet.summary && (
					<p className="mt-4 max-w-prose leading-relaxed text-pretty text-stone-700">{sheet.summary}</p>
				)}
			</header>

			{sheet.homework && (
				<section aria-labelledby="lesson-homework" className="mt-8 rounded-lg border border-honey-200 bg-honey-50 p-4 sm:p-5">
					<h3 id="lesson-homework" className="text-sm font-semibold text-honey-text">
						Homework
					</h3>
					<p className="mt-1.5 max-w-prose leading-relaxed text-pretty text-stone-800">{sheet.homework}</p>
				</section>
			)}

			{sheet.notes.length > 0 && (
				<SheetSection id="lesson-taught" title="What was taught">
					<ol className="divide-y divide-border">
						{sheet.notes.map((note) => (
							<Note key={note.pattern} note={note} />
						))}
					</ol>
				</SheetSection>
			)}

			{hasWords && (
				<SheetSection id="lesson-words" title="Words">
					{sheet.nouns.length > 0 && <GenderKey />}
					<WordTable label="Nouns" words={sheet.nouns} />
					<WordTable label="Verbs" words={sheet.verbs} />
					<WordTable label="Describing words" words={sheet.adjectives} />
					<WordTable label="Other words" words={sheet.otherWords} />
				</SheetSection>
			)}

			{sheet.phrases.length > 0 && (
				<SheetSection id="lesson-phrases" title="Phrases">
					<ul className="divide-y divide-border border-y border-border">
						{sheet.phrases.map((phrase) => (
							<li key={phrase.greek} className="py-3">
								<GreekText as="p" size="lg">
									{phrase.greek}
								</GreekText>
								<p className="mt-0.5 text-sm text-pretty text-stone-600">{phrase.english}</p>
							</li>
						))}
					</ul>
				</SheetSection>
			)}

			{drills.length > 0 && (
				<SheetSection id="lesson-drills" title="Drill this lesson">
					<DrillList drills={drills} />
				</SheetSection>
			)}
		</article>
	);
};
