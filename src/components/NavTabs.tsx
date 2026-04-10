import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";
import { Link } from "react-router";
import { tv } from "tailwind-variants";

const navTabsVariants = tv({
	slots: {
		root: "flex w-full flex-col gap-2",
		list: "scrollbar-none flex h-auto w-full items-center gap-1 overflow-x-auto rounded-lg bg-muted p-[3px] text-muted-foreground",
		trigger:
			"relative flex h-[calc(100%-1px)] min-w-max flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		badge:
			"absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white",
	},
});

const triggerStateVariants = tv({
	base: "",
	variants: {
		active: {
			true: "bg-white text-foreground shadow-sm dark:border-input dark:bg-input/30",
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
	base: "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white",
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
					className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-6 bg-gradient-to-r from-stone-400/25 to-transparent"
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
								<span>{tab.label}</span>
								{tab.badge !== undefined && tab.badge !== 0 && (
									<span className={badgeColorVariants({ color })}>
										{typeof tab.badge === "number" && tab.badge > 99 ? "99+" : tab.badge}
									</span>
								)}
							</Link>
						);
					})}
				</div>

				<motion.div
					className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-6 bg-gradient-to-l from-stone-400/25 to-transparent"
					style={{ x: rightShadowX }}
				/>
			</div>
		</div>
	);
};

export type { NavTabsProps, NavTab, TabColor };
export { NavTabs, navTabsVariants, triggerStateVariants, badgeColorVariants };
