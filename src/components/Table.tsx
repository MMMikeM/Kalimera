import type { ReactNode } from "react";
import React from "react";
import { tv } from "tailwind-variants";

export const tableVariants = tv({
	base: "w-full border-collapse overflow-hidden",
	variants: {
		variant: {
			default: "bg-white rounded-xl shadow-sm border border-gray-100",
			bordered: "border-2 border-gray-200 rounded-xl",
			minimal: "border-gray-100",
			none: "",
			modern:
				"bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100",
		},
		size: {
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
		},
	},
	defaultVariants: {
		variant: "modern",
		size: "md",
	},
});

export const tableHeaderVariants = tv({
	base: "font-semibold text-center p-4 first:rounded-tl-xl last:rounded-tr-xl",
	variants: {
		variant: {
			default:
				"bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-b border-gray-200",
			dark: "bg-gradient-to-r from-gray-800 to-gray-900 text-white",
			light:
				"bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 border-b border-blue-100",
			colorful: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
		},
	},
	defaultVariants: {
		variant: "light",
	},
});

export const tableCellVariants = tv({
	base: "p-4 text-center border-b border-gray-100 last:border-b-0 transition-colors duration-200",
	variants: {
		hover: {
			true: "hover:bg-blue-50",
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
			true: "hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-sm",
			false: "",
		},
		striped: {
			true: "even:bg-gray-25",
			false: "",
		},
	},
	defaultVariants: {
		hover: true,
		striped: false,
	},
});

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "bordered" | "minimal" | "none" | "modern";
	size?: "sm" | "md" | "lg";
	headers?: string[];
	headerColors?: string[];
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
	rows,
	hover,
	striped,
	containerClassName,
	className,
	title,
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
		<div className={`overflow-hidden ${containerClassName}`} {...props}>
			{title && (
				<h4 className="text-lg font-semibold text-gray-800 mb-3 px-1">
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
										className={`${tableHeaderVariants({ variant: "light" })} ${headerColors[idx] || ""}`}
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
