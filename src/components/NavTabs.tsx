import { useRef, useEffect, type ReactNode } from "react";
import { Link } from "react-router";
import { tv } from "tailwind-variants";
import { motion, useScroll, useTransform, useMotionValue } from "motion/react";

const navTabsVariants = tv({
	slots: {
		root: "flex flex-col gap-2 w-full",
		list: "bg-muted text-muted-foreground flex h-auto w-full items-center rounded-lg p-[3px] gap-1 overflow-x-auto scrollbar-none",
		trigger:
			"relative flex h-[calc(100%-1px)] flex-1 min-w-max items-center justify-center gap-1.5 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
		{
			active: true,
			color: "ocean",
			class: "border-b-2 border-b-ocean text-ocean",
		},
		{
			active: true,
			color: "olive",
			class: "border-b-2 border-b-olive text-olive",
		},
		{
			active: true,
			color: "honey",
			class: "border-b-2 border-b-honey text-honey",
		},
		{
			active: true,
			color: "terracotta",
			class: "border-b-2 border-b-terracotta text-terracotta",
		},
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

const NavTabs = ({ tabs, activeTab, buildUrl, className }: NavTabsProps) => {
	const { root, list, trigger } = navTabsVariants();
	const scrollRef = useRef<HTMLDivElement>(null);

	const { scrollX } = useScroll({ container: scrollRef });
	const rightDistance = useMotionValue(0);
	const threshold = useMotionValue(40); // 10% of scrollable width

	// Track distance from right edge and dynamic threshold
	useEffect(() => {
		const container = scrollRef.current;
		if (!container) return;

		const update = () => {
			const maxScroll = container.scrollWidth - container.clientWidth;
			rightDistance.set(maxScroll - container.scrollLeft);
			threshold.set(Math.max(maxScroll * 0.2, 20)); // 10% of scrollable width, min 20px
		};

		update();

		const unsubscribeScroll = scrollX.on("change", update);
		const resizeObserver = new ResizeObserver(update);
		resizeObserver.observe(container);

		return () => {
			unsubscribeScroll();
			resizeObserver.disconnect();
		};
	}, [scrollX, rightDistance, threshold]);

	// Left shadow: slides in as we scroll away from start
	const leftShadowX = useTransform(
		[scrollX, threshold],
		([x, t]) => `${Math.min(0, ((x as number) / (t as number)) * 100 - 100)}%`,
	);

	// Right shadow: slides in as we scroll away from end
	const rightShadowX = useTransform(
		[rightDistance, threshold],
		([d, t]) => `${Math.max(0, 100 - ((d as number) / (t as number)) * 100)}%`,
	);

	return (
		<div className={root({ className })}>
			<div className="relative overflow-hidden rounded-lg">
				<motion.div
					className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-stone-400/25 to-transparent z-10 pointer-events-none"
					style={{ x: leftShadowX }}
				/>

				<div ref={scrollRef} className={list()}>
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

				<motion.div
					className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-stone-400/25 to-transparent z-10 pointer-events-none"
					style={{ x: rightShadowX }}
				/>
			</div>
		</div>
	);
};

export type { NavTabsProps, NavTab, TabColor };
export { NavTabs, navTabsVariants, triggerStateVariants, badgeColorVariants };
