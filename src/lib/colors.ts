export type ColorScheme =
	| "ocean"
	| "terracotta"
	| "olive"
	| "honey"
	| "navy"
	| "slate";

export const colorStyles: Record<
	ColorScheme,
	{ border: string; header: string; bg: string }
> = {
	ocean: {
		border: "border-ocean-400",
		header: "bg-ocean-400",
		bg: "bg-ocean-50",
	},
	terracotta: {
		border: "border-terracotta-400",
		header: "bg-terracotta-400",
		bg: "bg-terracotta-50",
	},
	olive: {
		border: "border-olive-400",
		header: "bg-olive-400",
		bg: "bg-olive-50",
	},
	honey: {
		border: "border-honey-400",
		header: "bg-honey-400",
		bg: "bg-honey-50",
	},
	navy: {
		border: "border-navy-400",
		header: "bg-navy-400",
		bg: "bg-navy-50",
	},
	slate: {
		border: "border-slate-400",
		header: "bg-slate-400",
		bg: "bg-slate-50",
	},
};
