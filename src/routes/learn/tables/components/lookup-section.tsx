import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { PageHeading } from "@/components/PageHeading";
import { ProseWithGreek } from "@/components/ProseWithGreek";

export interface GuideSectionRef {
	guide: string;
	section: string;
	title: string;
}

/** Where each table's rule is taught. `guide-forms.test.ts` checks every title against the guide. */
export const TAUGHT_IN = {
	article: { guide: "roles", section: "articles", title: "The article ο, η, το" },
	articlePlural: {
		guide: "roles",
		section: "plural",
		title: "The article in the plural: οι, τους, τις, τα",
	},
	masculineNouns: { guide: "nouns", section: "families", title: "Masculine nouns: -ος, -ας, -ης" },
	feminineNouns: { guide: "nouns", section: "families-a-i", title: "Feminine nouns: -α, -η" },
	neuterNouns: { guide: "nouns", section: "families-o-i", title: "Neuter nouns: -ο, -ι, -μα" },
	adjectives: { guide: "agreement", section: "adjectives", title: "Adjectives copy the noun" },
	adjectiveShapes: { guide: "agreement", section: "adjective-shapes", title: "Adjectives in -α and -ύς" },
	pronounForms: {
		guide: "little-words",
		section: "forms",
		title: "The same forms for my and to me",
	},
	pronounObjects: { guide: "little-words", section: "objects", title: "τον, την, το for him, her and it" },
	pronounLong: {
		guide: "little-words",
		section: "long-forms",
		title: "The long forms εγώ, εμένα and αυτός",
	},
	colours: { guide: "agreement", section: "colours", title: "Colours that never change" },
	numbers: { guide: "agreement", section: "numbers", title: "Numbers that agree" },
	time: { guide: "roles", section: "target", title: "The Target form: objects, times, prepositions" },
	position: { guide: "place", section: "position", title: "Next to, behind, far from" },
	frequency: { guide: "scales", section: "frequency", title: "How often, from ποτέ to πάντα" },
	presentEndings: { guide: "verbs", section: "present", title: "Present endings" },
	oVerbs: { guide: "verbs", section: "o-verbs", title: "Verbs in -ώ, like μπορώ" },
	maiVerbs: { guide: "verbs", section: "mai-verbs", title: "Verbs ending in -μαι" },
	amaiVerbs: { guide: "verbs", section: "amai-verbs", title: "Verbs in -άμαι, like θυμάμαι" },
	eimai: { guide: "verbs", section: "eimai", title: "είμαι in the present, past and future" },
	pastEndings: { guide: "past", section: "past-endings", title: "Simple past endings and stress" },
	pastStem: { guide: "past", section: "past-shapes", title: "The simple past stem: add σ" },
	pastOwn: { guide: "past", section: "past-own", title: "Verbs with a past of their own" },
	ongoingPast: {
		guide: "past",
		section: "ongoing-past",
		title: "Past continuous for was doing and used to do",
	},
	future: {
		guide: "future-commands",
		section: "future",
		title: "Simple future with θα and the short form",
	},
	keepShape: {
		guide: "future-commands",
		section: "keep-shape",
		title: "Verbs with no separate short form",
	},
} as const satisfies Record<string, GuideSectionRef>;

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

/** The title and the one-line lede every Reference tab shares. */
export const LookupPage = ({ title, children }: { title: string; children: ReactNode }) => (
	<div className="space-y-10">
		<PageHeading title={title}>
			<p>Tables for looking a form up. The rules are in the guides.</p>
		</PageHeading>
		{children}
	</div>
);
