import type { GuideTone } from "@/types/guide";

interface ToneClasses {
	/** The guide's name and section numbers. */
	accent: string;
	/** The short bar above each section heading. */
	bar: string;
	/** The line beside each example. */
	exampleRule: string;
	/** A quiet panel: the don't-confuse box and the mark key. */
	panel: string;
	/** Practice links on hover. */
	link: string;
}

// Spelled out in full because Tailwind only generates classes it can see written.
export const GUIDE_TONE: Record<GuideTone, ToneClasses> = {
	terracotta: {
		accent: "text-terracotta-text",
		bar: "bg-terracotta-300",
		exampleRule: "border-terracotta-300",
		panel: "border-terracotta-200 bg-terracotta-50",
		link: "hover:border-terracotta-400 hover:text-terracotta-text",
	},
	sunset: {
		accent: "text-sunset-text",
		bar: "bg-sunset-300",
		exampleRule: "border-sunset-300",
		panel: "border-sunset-200 bg-sunset-50",
		link: "hover:border-sunset-400 hover:text-sunset-text",
	},
	olive: {
		accent: "text-olive-text",
		bar: "bg-olive-300",
		exampleRule: "border-olive-300",
		panel: "border-olive-200 bg-olive-50",
		link: "hover:border-olive-400 hover:text-olive-text",
	},
	ocean: {
		accent: "text-ocean-text",
		bar: "bg-ocean-300",
		exampleRule: "border-ocean-300",
		panel: "border-ocean-200 bg-ocean-50",
		link: "hover:border-ocean-400 hover:text-ocean-text",
	},
	honey: {
		accent: "text-honey-text",
		bar: "bg-honey-300",
		exampleRule: "border-honey-300",
		panel: "border-honey-200 bg-honey-50",
		link: "hover:border-honey-400 hover:text-honey-text",
	},
	navy: {
		accent: "text-navy-text",
		bar: "bg-navy-300",
		exampleRule: "border-navy-300",
		panel: "border-navy-200 bg-navy-50",
		link: "hover:border-navy-400 hover:text-navy-text",
	},
	slate: {
		accent: "text-slate-text",
		bar: "bg-slate-300",
		exampleRule: "border-slate-300",
		panel: "border-slate-200 bg-slate-50",
		link: "hover:border-slate-400 hover:text-slate-text",
	},
	stone: {
		accent: "text-stone-700",
		bar: "bg-stone-400",
		exampleRule: "border-stone-300",
		panel: "border-stone-200 bg-stone-50",
		link: "hover:border-stone-500 hover:text-stone-900",
	},
};
