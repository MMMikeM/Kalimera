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

export const WHICH_FORMS: SimpleListItem[] = [
	// Doer
	item("qw-poios", "ποιος", "who / which?", "which? (about a he-word)", "doer"),
	item("qw-poia", "ποια", "who / which?", "which? (about a she-word)", "doer"),
	item("qw-poio", "ποιο", "which?", "which? (about an it-word)", "doer"),

	// Target
	item("qw-poion", "ποιον", "whom / which?", "which? (he-word as the target)", "target"),

	// Owner
	item("qw-poianou", "ποιανού", "whose?", "whose? (he- or it-word)", "owner"),
	item("qw-poianis", "ποιανής", "whose?", "whose? (she-word)", "owner"),
	item("qw-poianon", "ποιανών", "whose?", "whose? (more than one)", "owner"),
	item("qw-poianou-einai", "ποιανού είναι", "whose is it?", "whose is it?", "owner"),

	// Plural
	item("qw-poioi", "ποιοι", "which ones?", "which ones? (he-words)", "plural"),
	item("qw-poies", "ποιες", "which ones?", "which ones? (she-words)", "plural"),
	item("qw-poia-pl", "ποια", "which ones?", "which ones? (it-words)", "plural"),
];

const CATEGORIES = [
	{ id: "doer", label: "Doer" },
	{ id: "target", label: "Target" },
	{ id: "owner", label: "Owner" },
	{ id: "plural", label: "Plural" },
];

const PARADIGM: { label: string; forms: [string, string, string, string] }[] = [
	{ label: "he-word (m)", forms: ["ποιος", "ποιον", "ποιανού", "ποιοι"] },
	{ label: "she-word (f)", forms: ["ποια", "ποια", "ποιανής", "ποιες"] },
	{ label: "it-word (n)", forms: ["ποιο", "ποιο", "ποιανού", "ποια"] },
];

const Paradigm = () => (
	<div className="mb-6 overflow-x-auto">
		<p className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">ποιος agrees</p>
		<table className="w-full border-collapse text-sm">
			<thead>
				<tr>
					<th
						aria-label="Gender"
						className="py-1 pr-4 text-left text-xs font-normal text-muted-foreground"
					/>
					<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">Doer</th>
					<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">
						Target
					</th>
					<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">Owner</th>
					<th className="px-3 py-1 text-center text-xs font-medium text-muted-foreground">
						Plural
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
			Owner plural, every gender:{" "}
			<span lang="el" className="greek-text text-sm text-foreground">
				ποιανών
			</span>{" "}
			· colloquial stand-in for ποιανού:{" "}
			<span lang="el" className="greek-text text-sm text-foreground">
				τίνος
			</span>
		</p>
	</div>
);

export const Route = createFileRoute("/practice/blocks/question-words/which-forms")({
	component: WhichFormsDrill,
});

function WhichFormsDrill() {
	return (
		<Drill
			drillId="blocks-qw-which-forms"
			items={WHICH_FORMS}
			title="Which — forms"
			subtitle={`${WHICH_FORMS.length} forms / timed`}
			colorTheme="terracotta"
			backTo="/practice/blocks/question-words/"
			forwardDesc="English → Greek"
			reverseDesc="Greek → recall meaning (self-assess)"
			categories={CATEGORIES}
			configExtras={<Paradigm />}
		/>
	);
}
