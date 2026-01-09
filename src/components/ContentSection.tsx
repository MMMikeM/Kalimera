import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ContentColorScheme = "ocean" | "terracotta" | "olive" | "honey";

const colorStyles: Record<ContentColorScheme, { border: string; bg: string }> = {
	ocean: { border: "border-ocean-400", bg: "bg-ocean-400" },
	terracotta: { border: "border-terracotta-400", bg: "bg-terracotta-400" },
	olive: { border: "border-olive-400", bg: "bg-olive-400" },
	honey: { border: "border-honey-400", bg: "bg-honey-400" },
};

// ─── Section Header ─────────────────────────────────────────────────────────

export interface ContentSectionProps {
	title: string;
	subtitle?: string;
	badge?: string;
	colorScheme?: ContentColorScheme;
	children: ReactNode;
	className?: string;
}

export const ContentSection = ({
	title,
	subtitle,
	badge,
	colorScheme = "honey",
	children,
	className,
}: ContentSectionProps) => {
	const headingId = useId();
	const styles = colorStyles[colorScheme];

	return (
		<section
			aria-labelledby={headingId}
			className={cn(
				"border-2 rounded-lg pb-3 overflow-hidden bg-white",
				styles.border,
				className,
			)}
		>
			<header className={cn("px-3 py-2.5", styles.bg)}>
				<div className="flex items-center gap-2">
					<h3
						id={headingId}
						className="font-black uppercase tracking-wider text-white text-sm"
					>
						{title}
					</h3>
					{badge && (
						<span className="text-xs px-2 py-0.5 rounded bg-white/20 text-white font-medium">
							{badge}
						</span>
					)}
				</div>
				{subtitle && (
					<p className="text-white/80 text-xs mt-0.5">{subtitle}</p>
				)}
			</header>
			{children}
		</section>
	);
};

// ─── Two Column List ────────────────────────────────────────────────────────

export interface TwoColumnItem {
	id: string | number;
	primary: string;
	secondary: string;
}

export interface TwoColumnListProps<T extends TwoColumnItem> {
	items: T[];
	/** Custom render for primary text */
	renderPrimary?: (item: T) => ReactNode;
	/** Custom render for secondary text */
	renderSecondary?: (item: T) => ReactNode;
	className?: string;
}

export const TwoColumnList = <T extends TwoColumnItem>({
	items,
	renderPrimary,
	renderSecondary,
	className,
}: TwoColumnListProps<T>) => (
	<div className={cn("divide-y divide-stone-200/60", className)}>
		{items.map((item) => (
			<div
				key={item.id}
				className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-x-4 py-2.5 pl-3"
			>
				<span className="text-lg font-semibold text-stone-900">
					{renderPrimary ? renderPrimary(item) : item.primary}
				</span>
				<span className="text-stone-500 text-sm">
					{renderSecondary ? renderSecondary(item) : item.secondary}
				</span>
			</div>
		))}
	</div>
);

// ─── Convenience: Section + List Combined ───────────────────────────────────

export interface ContentListSectionProps<T extends TwoColumnItem>
	extends Omit<ContentSectionProps, "children">,
		Omit<TwoColumnListProps<T>, "className"> {
	listClassName?: string;
}

export const ContentListSection = <T extends TwoColumnItem>({
	title,
	colorScheme = "honey",
	items,
	renderPrimary,
	renderSecondary,
	className,
	listClassName,
}: ContentListSectionProps<T>) => (
	<ContentSection title={title} colorScheme={colorScheme} className={className}>
		<TwoColumnList
			items={items}
			renderPrimary={renderPrimary}
			renderSecondary={renderSecondary}
			className={listClassName}
		/>
	</ContentSection>
);
