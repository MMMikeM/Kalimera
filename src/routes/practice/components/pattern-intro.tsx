import { Link } from "@tanstack/react-router";

import { GrammarTable } from "@/components/GrammarTable";
import { GreekText } from "@/components/GreekText";
import { type PatternId, type Unit, type WordForms, isNoun, lemmaOf } from "@/lib/units";

import { PATTERNS } from "../path/patterns.data";

const BREAK = "*";

type Forms = Readonly<Record<string, WordForms>>;

const verbsOf = (unit: Unit) => unit.words.filter((w) => !isNoun(w));
const nounsOf = (unit: Unit) => unit.words.filter(isNoun);

/** Each pattern's table, as rows of this unit's words and the forms the drill will ask for. */
const TABLES: Record<PatternId, (unit: Unit, forms: Forms) => { columns: string[]; rows: Array<{ word: string; cells: string[] }> }> = {
	"persons-singular": (unit, forms) => ({
		columns: ["I", "you", "he / she"],
		rows: verbsOf(unit).map((w) => {
			const p = forms[lemmaOf(w)]?.present;
			return { word: w.greek, cells: p ? [p.sg1, p.sg2, p.sg3] : [] };
		}),
	}),
	"target-form": (unit, forms) => ({
		columns: ["Its name", "After a verb"],
		rows: nounsOf(unit).map((w) => {
			const n = forms[lemmaOf(w)]?.noun;
			return { word: w.greek, cells: n ? [n.name, n.target] : [] };
		}),
	}),
	"saying-no": (unit, forms) => ({
		columns: ["Yes", "No"],
		rows: verbsOf(unit).map((w) => {
			const sg1 = forms[lemmaOf(w)]?.present?.sg1 ?? w.greek;
			return { word: w.greek, cells: [sg1, `δεν ${sg1}`] };
		}),
	}),
};

const PatternTable = ({
	id,
	unit,
	forms,
	isNew,
}: {
	id: PatternId;
	unit: Unit;
	forms: Forms;
	isNew: boolean;
}) => {
	const pattern = PATTERNS[id];
	const { columns, rows } = TABLES[id](unit, forms);
	if (rows.length === 0) return null;
	const breaks = rows.filter((r) => pattern.breaks[r.word]);
	return (
		<section className="rounded-lg border border-stone-300 bg-card px-4 py-4">
			<h2 className="text-base font-semibold text-foreground">
				{pattern.name}
				{isNew && <span className="ml-2 text-xs font-medium text-muted-foreground">New</span>}
			</h2>
			<p className="mt-1 text-sm text-muted-foreground">{pattern.rule}</p>
			<GrammarTable
				className="mt-3"
				rowHeaderLabel="Word"
				columns={columns.map((label) => ({ key: label, label }))}
				rows={rows.map((r) => ({
					key: r.word,
					label: (
						<GreekText weight="semibold">
							{r.word}
							{pattern.breaks[r.word] && BREAK}
						</GreekText>
					),
				}))}
				cells={rows.map((r) => r.cells.map((cell) => <GreekText key={cell}>{cell}</GreekText>))}
			/>
			{breaks.length > 0 && (
				<ul className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
					{breaks.map((r) => (
						<li key={r.word}>
							{BREAK} <GreekText>{r.word}</GreekText>: {pattern.breaks[r.word]}
						</li>
					))}
				</ul>
			)}
			<Link
				to="/guides/$guide"
				params={{ guide: pattern.guide.slug }}
				hash={pattern.guide.section}
				className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-navy-text underline-offset-2 hover:underline"
			>
				More in the guide →
			</Link>
		</section>
	);
};

/**
 * Every form the session will ask for, shown first: the pattern this unit
 * introduces, and the earlier ones applied to this unit's words.
 */
export const PatternIntro = ({
	unit,
	patterns,
	forms,
}: {
	unit: Unit;
	patterns: readonly PatternId[];
	forms: Forms;
}) => (
	<div className="mb-8 flex flex-col gap-4">
		{patterns.map((id) => (
			<PatternTable key={id} id={id} unit={unit} forms={forms} isNew={id === unit.pattern} />
		))}
	</div>
);
