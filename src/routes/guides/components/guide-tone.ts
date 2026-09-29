import { colorStyles } from "@/lib/colors";
import type { GuideTone } from "@/types/guide";

interface ToneClasses {
	/** Section numbers and links. The `-ink` shade holds 7:1 on the page; `-text` is for tints. */
	accent: string;
	/** The short bar above each section heading, and the index's colour strip. */
	bar: string;
	/** The wash behind each section card, and the mark key. */
	panel: string;
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
const OWN: Record<GuideTone, Pick<ToneClasses, "accent" | "exampleRule" | "link">> = {
	terracotta: {
		accent: "text-terracotta-ink",
		exampleRule: "border-terracotta-300",
		link: "hover:border-terracotta-400 hover:text-terracotta-text",
	},
	sunset: {
		accent: "text-sunset-ink",
		exampleRule: "border-sunset-300",
		link: "hover:border-sunset-400 hover:text-sunset-text",
	},
	olive: {
		accent: "text-olive-ink",
		exampleRule: "border-olive-300",
		link: "hover:border-olive-400 hover:text-olive-text",
	},
	ocean: {
		accent: "text-ocean-ink",
		exampleRule: "border-ocean-300",
		link: "hover:border-ocean-400 hover:text-ocean-text",
	},
	honey: {
		accent: "text-honey-ink",
		exampleRule: "border-honey-300",
		link: "hover:border-honey-400 hover:text-honey-text",
	},
	navy: {
		accent: "text-navy-ink",
		exampleRule: "border-navy-300",
		link: "hover:border-navy-400 hover:text-navy-text",
	},
	slate: {
		accent: "text-slate-ink",
		exampleRule: "border-slate-300",
		link: "hover:border-slate-400 hover:text-slate-text",
	},
	stone: {
		accent: "text-stone-700",
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

export const GUIDE_TONE = Object.fromEntries(
	(Object.keys(OWN) as GuideTone[]).map((tone) => [tone, toneClasses(tone)]),
) as Record<GuideTone, ToneClasses>;
