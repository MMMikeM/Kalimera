import { colorStyles } from "@/lib/colors";
import type { GuideTone, SectionTone } from "@/types/guide";

interface ToneClasses {
	/** Section numbers and links. The `-ink` shade holds 7:1 on the page; `-text` is for tints. */
	accent: string;
	/** The colour strip beside each guide on the index. */
	bar: string;
	/** The wash behind the mark key. */
	panel: string;
	/** A section's header band. */
	header: string;
	/** A tinted table column, the key's labels, and boxes that sit on a card's wash. */
	column: string;
	/** Text on a `column` tint. */
	columnLabel: string;
	/** The line beside each example. */
	exampleRule: string;
	/** Practice links on hover. */
	link: string;
}

// The steps colors.ts doesn't carry, spelled out because Tailwind only generates classes it can see.
const OWN: Record<GuideTone, Pick<ToneClasses, "accent" | "header" | "exampleRule" | "link">> = {
	terracotta: {
		accent: "text-terracotta-ink",
		header: "border-terracotta-300 bg-terracotta-200",
		exampleRule: "border-terracotta-300",
		link: "hover:border-terracotta-400 hover:text-terracotta-text",
	},
	sunset: {
		accent: "text-sunset-ink",
		header: "border-sunset-300 bg-sunset-200",
		exampleRule: "border-sunset-300",
		link: "hover:border-sunset-400 hover:text-sunset-text",
	},
	olive: {
		accent: "text-olive-ink",
		header: "border-olive-300 bg-olive-200",
		exampleRule: "border-olive-300",
		link: "hover:border-olive-400 hover:text-olive-text",
	},
	ocean: {
		accent: "text-ocean-ink",
		header: "border-ocean-300 bg-ocean-200",
		exampleRule: "border-ocean-300",
		link: "hover:border-ocean-400 hover:text-ocean-text",
	},
	honey: {
		accent: "text-honey-ink",
		header: "border-honey-300 bg-honey-200",
		exampleRule: "border-honey-300",
		link: "hover:border-honey-400 hover:text-honey-text",
	},
	navy: {
		accent: "text-navy-ink",
		header: "border-navy-300 bg-navy-200",
		exampleRule: "border-navy-300",
		link: "hover:border-navy-400 hover:text-navy-text",
	},
	slate: {
		accent: "text-slate-ink",
		header: "border-slate-300 bg-slate-200",
		exampleRule: "border-slate-300",
		link: "hover:border-slate-400 hover:text-slate-text",
	},
	stone: {
		accent: "text-stone-700",
		header: "border-stone-300 bg-stone-200",
		exampleRule: "border-stone-300",
		link: "hover:border-stone-500 hover:text-stone-900",
	},
};

const toneClasses = (tone: GuideTone): ToneClasses => {
	const base = colorStyles[tone];
	return {
		...OWN[tone],
		bar: base.headerLight,
		panel: `${base.borderMuted} ${base.bg}`,
		column: base.bgMuted,
		columnLabel: base.text,
	};
};

// The gender scales have no -ink step; their -text step holds the same contrast.
const GENDER: Record<Exclude<SectionTone, GuideTone>, ToneClasses> = {
	"gender-masculine": {
		accent: "text-gender-masculine-text",
		bar: "bg-gender-masculine-400",
		panel: "border-gender-masculine-200 bg-gender-masculine-100",
		header: "border-gender-masculine-300 bg-gender-masculine-200",
		column: "bg-gender-masculine-100",
		columnLabel: "text-gender-masculine-text",
		exampleRule: "border-gender-masculine-300",
		link: "hover:border-gender-masculine-400 hover:text-gender-masculine-text",
	},
	"gender-feminine": {
		accent: "text-gender-feminine-text",
		bar: "bg-gender-feminine-400",
		panel: "border-gender-feminine-200 bg-gender-feminine-100",
		header: "border-gender-feminine-300 bg-gender-feminine-200",
		column: "bg-gender-feminine-100",
		columnLabel: "text-gender-feminine-text",
		exampleRule: "border-gender-feminine-300",
		link: "hover:border-gender-feminine-400 hover:text-gender-feminine-text",
	},
	"gender-neuter": {
		accent: "text-gender-neuter-text",
		bar: "bg-gender-neuter-400",
		panel: "border-gender-neuter-200 bg-gender-neuter-100",
		header: "border-gender-neuter-300 bg-gender-neuter-200",
		column: "bg-gender-neuter-100",
		columnLabel: "text-gender-neuter-text",
		exampleRule: "border-gender-neuter-300",
		link: "hover:border-gender-neuter-400 hover:text-gender-neuter-text",
	},
};

export const GUIDE_TONE: Record<SectionTone, ToneClasses> = {
	...(Object.fromEntries((Object.keys(OWN) as GuideTone[]).map((tone) => [tone, toneClasses(tone)])) as Record<
		GuideTone,
		ToneClasses
	>),
	...GENDER,
};
