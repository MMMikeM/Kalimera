import React from "react";
import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

export const tableVariants = tv({
	base: "w-full border-collapse",
	variants: {
		variant: {
			default: "border border-gray-300",
			bordered: "border-2 border-gray-400",
			minimal: "border-gray-200",
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
	base: "font-semibold text-center border border-gray-300 p-3",
	variants: {
		variant: {
			default: "bg-gray-100",
			dark: "bg-gray-800 text-white",
			light: "bg-gray-50",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export const tableCellVariants = tv({
	base: "border border-gray-300 p-3 text-center",
	variants: {
		hover: {
			true: "hover:bg-gray-50",
			false: "",
		},
	},
	defaultVariants: {
		hover: false,
	},
});

export const tableRowVariants = tv({
	base: "",
	variants: {
		hover: {
			true: "hover:bg-gray-50",
			false: "",
		},
		striped: {
			true: "even:bg-gray-50",
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
	rows: (string | ReactNode)[][];
	hover?: boolean;
	striped?: boolean;
	containerClassName?: string;
}

export const Table: React.FC<TableProps> = ({
	variant,
	size,
	headers,
	headerColors = [],
	rows,
	hover,
	striped,
	containerClassName,
	className,
	...props
}) => {
	// Helper function to create stable keys from content
	const createStableKey = (content: string | ReactNode): string => {
		if (typeof content === "string") {
			return content.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
		}
		// For React elements, use a combination of type and props
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
		<div className={`overflow-x-auto ${containerClassName}`} {...props}>
			<table className={tableVariants({ variant, size, className })}>
				{headers && (
					<thead>
						<tr>
							{headers.map((header, idx) => (
								<th
									key={header}
									className={`${tableHeaderVariants({ variant: "default" })} ${headerColors[idx] || ""}`}
									style={{ width: `${100 / headers.length}%` }}
								>
									{header}
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
										{cell}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
