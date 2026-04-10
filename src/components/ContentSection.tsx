import { type ReactNode, useId } from "react";
import { type ColorScheme, colorStyles } from "@/lib/colors";
import { cn } from "@/lib/utils";

export type ContentColorScheme = ColorScheme;

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
				"border-2 rounded-lg pb-3 overflow-hidden",
				styles.border,
				styles.bg,
				className,
			)}
		>
			<header className={cn("px-3 py-2.5", styles.header)}>
				<div className="flex items-center gap-2">
					<h3 id={headingId} className="text-sm font-black tracking-wide text-white">
						{title}
					</h3>
					{badge && (
						<span className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
							{badge}
						</span>
					)}
				</div>
				{subtitle && <p className="mt-0.5 text-xs text-white/80">{subtitle}</p>}
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
				<span className="text-sm text-stone-500">
					{renderSecondary ? renderSecondary(item) : item.secondary}
				</span>
			</div>
		))}
	</div>
);
