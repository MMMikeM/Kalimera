import { createFileRoute } from "@tanstack/react-router";

import { greekToPhonetic } from "@/lib/greek-transliteration";

import type { SimpleListItem } from "../../components/engines/deck";
import { Drill } from "../../components/engines/drill";

const item = (
	id: string,
	greek: string,
	english: string,
	label: string,
	category: string,
): SimpleListItem => ({
	id,
	greek,
	greeklish: greekToPhonetic(greek),
	english,
	label,
	category,
});

export const HOW_MANY_FORMS: SimpleListItem[] = [
	// How much (singular)
	item("qw-posos", "πόσος", "how much?", "how much? (he-word — καιρός, κόσμος)", "singular"),
	item("qw-posi", "πόση", "how much?", "how much? (she-word — ζάχαρη, ώρα)", "singular"),
	item("qw-poso-n", "πόσο", "how much?", "how much? (it-word — γάλα, ψωμί)", "singular"),
	item("qw-poso-adv", "πόσο", "how much?", "how much? (cost, degree — on its own)", "singular"),

	// How many (plural)
	item("qw-posoi", "πόσοι", "how many?", "how many? (he-words)", "plural"),
	item("qw-poses", "πόσες", "how many?", "how many? (she-words)", "plural"),
	item("qw-posa", "πόσα", "how many?", "how many? (it-words)", "plural"),
];

const CATEGORIES = [
	{ id: "singular", label: "How much (sg)" },
	{ id: "plural", label: "How many (pl)" },
];

const PARADIGM: { label: string; forms: [string, string] }[] = [
	{ label: "he-word (m)", forms: ["πόσος", "πόσοι"] },
	{ label: "she-word (f)", forms: ["πόση", "πόσες"] },
	{ label: "it-word (n)", forms: ["πόσο", "πόσα"] },
];

const Paradigm = () => (
	<div className="mb-6 overflow-x-auto">
		<p className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">πόσος agrees</p>
		<table className="w-full border-collapse text-sm">
			<thead>
				<tr>
					<th
						aria-label="Gender"
						className="py-1 pr-4 text-left text-xs font-normal text-muted-foreground"
					/>
					<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">
						How much
					</th>
					<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">
						How many
					</th>
				</tr>
			</thead>
			<tbody>
				{PARADIGM.map((row) => (
					<tr key={row.label} className="border-t border-stone-100">
						<td className="py-1.5 pr-4 text-xs font-medium text-terracotta-text">{row.label}</td>
						{row.forms.map((form, i) => (
							<td
								key={`${row.label}-${i}`}
								lang="el"
								className="greek-text px-3 py-1.5 text-center text-base text-foreground"
							>
								{form}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
		<p className="mt-2 text-xs text-muted-foreground">
			On its own,{" "}
			<span lang="el" className="greek-text text-sm text-foreground">
				πόσο
			</span>{" "}
			asks price or degree —{" "}
			<span lang="el" className="greek-text text-sm text-foreground">
				πόσο κάνει;
			</span>
		</p>
	</div>
);

export const Route = createFileRoute("/practice/blocks/question-words/how-many-forms")({
	component: HowManyFormsDrill,
});

function HowManyFormsDrill() {
	return (
		<Drill
			drillId="blocks-qw-how-many-forms"
			items={HOW_MANY_FORMS}
			title="How much — forms"
			subtitle={`${HOW_MANY_FORMS.length} forms / timed`}
			colorTheme="terracotta"
			backTo="/practice/blocks/question-words/"
			forwardDesc="English → Greek"
			reverseDesc="Greek → recall meaning (self-assess)"
			categories={CATEGORIES}
			configExtras={<Paradigm />}
		/>
	);
}
