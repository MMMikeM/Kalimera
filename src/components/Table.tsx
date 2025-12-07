import type { ReactNode } from "react";
import React from "react";
import { tv } from "tailwind-variants";

/**
 * Table - General purpose data table
 *
 * Design principles:
 * - Clean, minimal styling (no gradients or excessive effects)
 * - Uses stone palette for neutrality
 * - Subtle hover states that don't distract from content
 */
export const tableVariants = tv({
	base: "w-full border-collapse overflow-hidden",
	variants: {
		variant: {
			default: "bg-white rounded-xl shadow-sm border border-stone-200",
			bordered: "border-2 border-stone-300 rounded-xl",
			minimal: "border-stone-100",
			none: "",
		},
		size: {
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
	},
});

export const tableHeaderVariants = tv({
	base: "font-semibold text-center p-4 first:rounded-tl-xl last:rounded-tr-xl",
	variants: {
		variant: {
			default: "bg-stone-50 text-stone-700 border-b border-stone-200",
			dark: "bg-stone-800 text-white",
			light: "bg-stone-50 text-stone-700 border-b border-stone-200",
			accent: "bg-terracotta-100 text-terracotta-text border-b border-terracotta-200",
		},
	},
	defaultVariants: {
		variant: "light",
	},
});

export const tableCellVariants = tv({
	base: "p-4 text-center border-b border-stone-100 last:border-b-0 transition-colors duration-200",
	variants: {
		hover: {
			true: "hover:bg-stone-50",
			false: "",
		},
	},
	defaultVariants: {
		hover: true,
	},
});

export const tableRowVariants = tv({
	base: "transition-all duration-200",
	variants: {
		hover: {
			true: "hover:bg-stone-50",
			false: "",
		},
		striped: {
			true: "even:bg-stone-50/50",
			false: "",
		},
	},
	defaultVariants: {
		hover: true,
		striped: false,
	},
});

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "bordered" | "minimal" | "none";
	size?: "sm" | "md" | "lg";
	headers?: string[];
	headerColors?: string[];
	headerVariant?: "default" | "dark" | "light" | "accent";
	rows: (string | ReactNode)[][];
	hover?: boolean;
	striped?: boolean;
	containerClassName?: string;
	title?: string;
}

export const Table: React.FC<TableProps> = ({
	variant,
	size,
	headers,
	headerColors = [],
	headerVariant = "light",
	rows,
	hover,
	striped,
	containerClassName,
	className,
	title,
	...props
}) => {
	const createStableKey = (content: string | ReactNode): string => {
		if (typeof content === "string") {
			return content.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
		}
		if (React.isValidElement(content)) {
			const props = content.props || {};
			const propsString = Object.entries(props)
				.map(([key, value]) => `${key}-${value}`)
				.join("-");
			return `${content.type}-${propsString}`
				.replace(/[^a-zA-Z0-9]/g, "-")
				.toLowerCase();
		}
		return `unknown-${Math.random().toString(36).substr(2, 9)}`;
	};

	return (
		<div className={`overflow-hidden ${containerClassName}`} {...props}>
			{title && (
				<h4 className="text-lg font-semibold text-stone-800 mb-3 px-1">
					{title}
				</h4>
			)}
			<div className="overflow-x-auto rounded-xl">
				<table className={tableVariants({ variant, size, className })}>
					{headers && (
						<thead>
							<tr>
								{headers.map((header, idx) => (
									<th
										key={header}
										className={`${tableHeaderVariants({ variant: headerVariant })} ${headerColors[idx] || ""}`}
										style={{ width: `${100 / headers.length}%` }}
									>
										<span className="font-medium tracking-wide">{header}</span>
									</th>
								))}
							</tr>
						</thead>
					)}
					<tbody>
						{rows.map((row, _rowIdx) => {
							const rowKey = row.map((cell) => createStableKey(cell)).join("-");
							return (
								<tr
									key={`row-${rowKey}`}
									className={tableRowVariants({ hover, striped })}
								>
									{row.map((cell, cellIdx) => (
										<td
											key={`cell-${createStableKey(cell)}-${cellIdx}`}
											className={tableCellVariants({ hover: false })}
											style={{ width: `${100 / row.length}%` }}
										>
											<div className="flex items-center justify-center min-h-[2.5rem]">
												{cell}
											</div>
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
