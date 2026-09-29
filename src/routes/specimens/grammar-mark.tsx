import { createFileRoute, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { GrammarMark } from "@/components/GrammarMark";
import { GreekText } from "@/components/GreekText";
import { PageHeading } from "@/components/PageHeading";
import { pageTitle } from "@/lib/page-title";
import type { Gender, GrammaticalCase } from "@/server/db/enums";

// A specimen sheet for the grammar mark: every case, gender and number, and the
// edge cases the visual tests in e2e/grammar-mark.spec.ts photograph. Dev only.

const PARADIGM: { case: GrammaticalCase; label: string; one: string[]; many: string[] }[] = [
	{ case: "nominative", label: "Doer", one: ["ο άντρας", "η γυναίκα", "το παιδί"], many: ["οι άντρες", "οι γυναίκες", "τα παιδιά"] },
	{ case: "accusative", label: "Target", one: ["τον άντρα", "τη γυναίκα", "το παιδί"], many: ["τους άντρες", "τις γυναίκες", "τα παιδιά"] },
	{ case: "genitive", label: "Owner", one: ["του άντρα", "της γυναίκας", "του παιδιού"], many: ["των αντρών", "των γυναικών", "των παιδιών"] },
	{ case: "vocative", label: "Calling", one: ["άντρα", "γυναίκα", "παιδί"], many: ["άντρες", "γυναίκες", "παιδιά"] },
];

const GENDERS: Gender[] = ["masculine", "feminine", "neuter"];

const Specimen = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
	<section data-testid={id} className="space-y-3 rounded-lg border border-stone-300 p-5">
		<h2 className="font-serif text-xl text-stone-900">{title}</h2>
		{children}
	</section>
);

const Paradigm = ({ plural, outlined }: { plural: boolean; outlined: boolean }) => (
	<table className="w-full border-collapse text-left">
		<thead>
			<tr className="border-b border-stone-300 text-xs text-stone-600">
				<th className="py-2 font-medium">
					<span className="sr-only">Job</span>
				</th>
				{GENDERS.map((g) => (
					<th key={g} className="py-2 font-medium capitalize">
						{g}
					</th>
				))}
			</tr>
		</thead>
		<tbody>
			{PARADIGM.map((row) => (
				<tr key={row.case} className="border-b border-stone-200">
					<td className="py-3 pr-3 text-sm text-stone-600">{row.label}</td>
					{(plural ? row.many : row.one).map((phrase, i) => (
						<td key={phrase} className="py-3 pr-3">
							<GrammarMark case={row.case} gender={GENDERS[i]} plural={plural} outlined={outlined} size="lg">
								{phrase}
							</GrammarMark>
						</td>
					))}
				</tr>
			))}
		</tbody>
	</table>
);

export const Route = createFileRoute("/specimens/grammar-mark")({
	beforeLoad: () => {
		if (!import.meta.env.DEV) throw notFound();
	},
	head: () => ({ meta: [{ title: pageTitle("Grammar mark specimens") }] }),
	component: GrammarMarkSpecimens,
});

function GrammarMarkSpecimens() {
	return (
		<div className="space-y-6">
			<PageHeading title="Grammar mark">
				<p>End shape is the case, colour is the gender, one line or two is one or more than one.</p>
			</PageHeading>

			<Specimen id="filled-one" title="Filled, one">
				<Paradigm plural={false} outlined={false} />
			</Specimen>
			<Specimen id="filled-many" title="Filled, more than one">
				<Paradigm plural outlined={false} />
			</Specimen>
			<Specimen id="outlined-one" title="Outlined, one">
				<Paradigm plural={false} outlined />
			</Specimen>
			<Specimen id="outlined-many" title="Outlined, more than one">
				<Paradigm plural outlined />
			</Specimen>

			<Specimen id="neutral" title="No gender: the mark claims case and number only">
				<div className="flex flex-wrap gap-6">
					{PARADIGM.map((row) => (
						<GrammarMark key={row.case} case={row.case} size="lg">
							{row.one[0] ?? ""}
						</GrammarMark>
					))}
					<GrammarMark case="accusative" plural size="lg">
						τις γυναίκες
					</GrammarMark>
				</div>
			</Specimen>

			<Specimen id="short" title="Short words keep two distinct ends">
				<div className="flex flex-wrap items-end gap-5">
					<GrammarMark case="nominative" gender="masculine">ο</GrammarMark>
					<GrammarMark case="nominative" gender="feminine">η</GrammarMark>
					<GrammarMark case="accusative" gender="neuter">το</GrammarMark>
					<GrammarMark case="accusative" gender="neuter" plural>τα</GrammarMark>
					<GrammarMark case="genitive" gender="masculine">του</GrammarMark>
					<GrammarMark case="genitive" gender="feminine" plural>των</GrammarMark>
					<GrammarMark case="vocative" gender="masculine">φίλε</GrammarMark>
					<GrammarMark case="vocative" gender="feminine" plural outlined>
						φίλες
					</GrammarMark>
				</div>
			</Specimen>

			<Specimen id="sizes" title="Text sizes: the mark stays 9px tall and stretches with the phrase">
				<div className="flex flex-wrap items-end gap-6">
					{(["sm", "base", "lg", "2xl", "4xl"] as const).map((size) => (
						<GrammarMark key={size} case="genitive" gender="feminine" plural size={size}>
							των γυναικών
						</GrammarMark>
					))}
				</div>
			</Specimen>

			<Specimen id="long" title="Long phrases and capitals with accents">
				<div className="flex flex-wrap items-end gap-6">
					<GrammarMark case="genitive" gender="neuter" size="lg">
						του καινούργιου αυτοκινήτου
					</GrammarMark>
					<GrammarMark case="nominative" gender="feminine" plural size="lg">
						Οι Ελληνίδες φίλες μου
					</GrammarMark>
					<GrammarMark case="accusative" gender="masculine" size="lg">
						Άγγελο
					</GrammarMark>
				</div>
			</Specimen>

			<Specimen id="wrapping" title="In a narrow column, whole phrases move to the next line">
				<GreekText as="p" size="lg" className="w-56 leading-relaxed">
					<GrammarMark case="nominative" gender="masculine">
						Ο Γιάννης
					</GrammarMark>{" "}
					βλέπει{" "}
					<GrammarMark case="accusative" gender="masculine">
						τον καλό του φίλο
					</GrammarMark>{" "}
					και{" "}
					<GrammarMark case="accusative" gender="feminine" plural>
						τις αδερφές
					</GrammarMark>{" "}
					<GrammarMark case="genitive" gender="feminine">
						της Μαρίας
					</GrammarMark>
					.
				</GreekText>
			</Specimen>

			<Specimen id="overflow" title="Narrower than the phrase: it overflows rather than splitting">
				<div className="w-20 border border-dashed border-stone-400">
					<GrammarMark case="genitive" gender="neuter" plural>
						των παιδιών μας
					</GrammarMark>
				</div>
			</Specimen>

			<Specimen id="sentence" title="In a sentence, with punctuation outside the mark">
				<GreekText as="p" size="xl" className="leading-loose">
					<GrammarMark case="accusative" gender="masculine">
						Τον Γιάννη
					</GrammarMark>{" "}
					βλέπει{" "}
					<GrammarMark case="nominative" gender="feminine">
						η Μαρία
					</GrammarMark>
					. Τι κάνεις,{" "}
					<GrammarMark case="vocative" gender="masculine">
						φίλε
					</GrammarMark>
					;
				</GreekText>
			</Specimen>
		</div>
	);
}
