import type { ReactNode } from "react";
import { Link } from "react-router";
import { tv, } from "tailwind-variants";

const navTabsVariants = tv({
	slots: {
		root: "flex flex-col gap-2 w-full",
		list: "bg-muted text-muted-foreground flex h-auto w-full items-center rounded-lg p-[3px] gap-1",
		trigger:
			"relative flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		badge:
			"absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
	},
});

const triggerStateVariants = tv({
	base: "",
	variants: {
		active: {
			true: "bg-white dark:bg-input/30 shadow-sm dark:border-input text-foreground",
			false: "text-foreground dark:text-muted-foreground",
		},
		color: {
			ocean: "",
			olive: "",
			honey: "",
			terracotta: "",
			neutral: "",
		},
	},
	compoundVariants: [
		{ active: true, color: "ocean", class: "border-b-2 border-b-ocean text-ocean" },
		{ active: true, color: "olive", class: "border-b-2 border-b-olive text-olive" },
		{ active: true, color: "honey", class: "border-b-2 border-b-honey text-honey" },
		{ active: true, color: "terracotta", class: "border-b-2 border-b-terracotta text-terracotta" },
	],
	defaultVariants: {
		active: false,
		color: "neutral",
	},
});

const badgeColorVariants = tv({
	base: "absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
	variants: {
		color: {
			ocean: "bg-ocean",
			olive: "bg-olive",
			honey: "bg-honey",
			terracotta: "bg-terracotta",
			neutral: "bg-muted-foreground",
		},
	},
	defaultVariants: {
		color: "terracotta",
	},
});

type TabColor = "ocean" | "olive" | "honey" | "terracotta" | "neutral";

interface NavTab {
	id: string;
	label: string;
	shortLabel?: string;
	icon?: ReactNode;
	color?: TabColor;
	badge?: number | string;
}

interface NavTabsProps {
	tabs: NavTab[];
	activeTab: string;
	buildUrl: (tabId: string) => string;
	className?: string;
}

const NavTabs = ({
	tabs,
	activeTab,
	buildUrl,
	className,
}: NavTabsProps) => {
	const { root, list, trigger } = navTabsVariants();

	return (
		<div className={root({ className })}>
			<div className={list()}>
				{tabs.map((tab) => {
					const isActive = activeTab === tab.id;
					const color = tab.color ?? "neutral";

					return (
						<Link
							key={tab.id}
							to={buildUrl(tab.id)}
							className={`${trigger()} ${triggerStateVariants({ active: isActive, color })}`}
						>
							{tab.icon}
							{tab.shortLabel ? (
								<>
									<span className="hidden sm:inline">{tab.label}</span>
									<span className="sm:hidden">{tab.shortLabel}</span>
								</>
							) : (
								<span>{tab.label}</span>
							)}
							{tab.badge !== undefined && tab.badge !== 0 && (
								<span className={badgeColorVariants({ color })}>
									{typeof tab.badge === "number" && tab.badge > 99
										? "99+"
										: tab.badge}
								</span>
							)}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export type { NavTabsProps, NavTab, TabColor };
export { NavTabs, navTabsVariants, triggerStateVariants, badgeColorVariants };
