export type ColorScheme =
	| "ocean"
	| "terracotta"
	| "sunset"
	| "olive"
	| "honey"
	| "navy"
	| "slate"
	| "stone"
	| "masculine"
	| "feminine"
	| "neuter";

export const colorStyles: Record<
	ColorScheme,
	{
		bg: string;
		bgMuted: string;
		border: string;
		borderMuted: string;
		header: string;
		headerLight: string;
		text: string;
		accent: string;
		hover: string;
	}
> = {
	ocean: {
		bg: "bg-ocean-50",
		bgMuted: "bg-ocean-100",
		border: "border-ocean-400",
		borderMuted: "border-ocean-200",
		header: "bg-ocean-400",
		headerLight: "bg-ocean-300",
		text: "text-ocean-text",
		accent: "text-ocean",
		hover: "hover:bg-ocean-200",
	},
	terracotta: {
		bg: "bg-terracotta-50",
		bgMuted: "bg-terracotta-100",
		border: "border-terracotta-400",
		borderMuted: "border-terracotta-200",
		header: "bg-terracotta-400",
		headerLight: "bg-terracotta-300",
		text: "text-terracotta-text",
		accent: "text-terracotta",
		hover: "hover:bg-terracotta-200",
	},
	sunset: {
		bg: "bg-sunset-50",
		bgMuted: "bg-sunset-100",
		border: "border-sunset-400",
		borderMuted: "border-sunset-200",
		header: "bg-sunset-400",
		headerLight: "bg-sunset-300",
		text: "text-sunset-text",
		accent: "text-sunset",
		hover: "hover:bg-sunset-200",
	},
	olive: {
		bg: "bg-olive-50",
		bgMuted: "bg-olive-100",
		border: "border-olive-400",
		borderMuted: "border-olive-200",
		header: "bg-olive-400",
		headerLight: "bg-olive-300",
		text: "text-olive-text",
		accent: "text-olive",
		hover: "hover:bg-olive-200",
	},
	honey: {
		bg: "bg-honey-50",
		bgMuted: "bg-honey-100",
		border: "border-honey-400",
		borderMuted: "border-honey-200",
		header: "bg-honey-400",
		headerLight: "bg-honey-300",
		text: "text-honey-text",
		accent: "text-honey",
		hover: "hover:bg-honey-200",
	},
	navy: {
		bg: "bg-navy-50",
		bgMuted: "bg-navy-100",
		border: "border-navy-400",
		borderMuted: "border-navy-200",
		header: "bg-navy-400",
		headerLight: "bg-navy-300",
		text: "text-navy-text",
		accent: "text-navy",
		hover: "hover:bg-navy-200",
	},
	slate: {
		bg: "bg-slate-50",
		bgMuted: "bg-slate-100",
		border: "border-slate-400",
		borderMuted: "border-slate-200",
		header: "bg-slate-400",
		headerLight: "bg-slate-300",
		text: "text-slate-text",
		accent: "text-slate",
		hover: "hover:bg-slate-200",
	},
	stone: {
		bg: "bg-stone-50",
		bgMuted: "bg-stone-100",
		border: "border-stone-200",
		borderMuted: "border-stone-200",
		header: "bg-stone-400",
		headerLight: "bg-stone-300",
		text: "text-stone-700",
		accent: "text-stone-600",
		hover: "hover:bg-stone-100",
	},
	masculine: {
		bg: "bg-navy-50",
		bgMuted: "bg-navy-100",
		border: "border-navy-400",
		borderMuted: "border-navy-200",
		header: "bg-navy-400",
		headerLight: "bg-navy-300",
		text: "text-navy-text",
		accent: "text-navy",
		hover: "hover:bg-navy-200",
	},
	feminine: {
		bg: "bg-sunset-50",
		bgMuted: "bg-sunset-100",
		border: "border-sunset-400",
		borderMuted: "border-sunset-200",
		header: "bg-sunset-400",
		headerLight: "bg-sunset-300",
		text: "text-sunset-text",
		accent: "text-sunset",
		hover: "hover:bg-sunset-200",
	},
	neuter: {
		bg: "bg-slate-50",
		bgMuted: "bg-slate-100",
		border: "border-slate-400",
		borderMuted: "border-slate-200",
		header: "bg-slate-400",
		headerLight: "bg-slate-300",
		text: "text-slate-text",
		accent: "text-slate",
		hover: "hover:bg-slate-200",
	},
};
