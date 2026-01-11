import { Search, X } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { tv } from "tailwind-variants";

export const searchInputVariants = tv({
	base: "relative",
	variants: {
		size: {
			sm: "",
			md: "",
			lg: "",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const searchInputFieldVariants = tv({
	base: "w-full bg-white text-stone-900 placeholder:text-stone-600 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-300 focus:ring-offset-0 focus:border-terracotta transition-colors",
	variants: {
		size: {
			sm: "pl-8 pr-8 py-1.5 text-sm",
			md: "pl-10 pr-10 py-2 text-base",
			lg: "pl-12 pr-12 py-3 text-lg",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const searchInputIconVariants = tv({
	base: "absolute inset-y-0 flex items-center pointer-events-none text-stone-600",
	variants: {
		size: {
			sm: "left-2.5 [&>svg]:h-3.5 [&>svg]:w-3.5",
			md: "left-3 [&>svg]:h-4 [&>svg]:w-4",
			lg: "left-4 [&>svg]:h-5 [&>svg]:w-5",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const clearButtonVariants = tv({
	base: "absolute inset-y-0 flex items-center text-stone-600 hover:text-stone-600 focus:outline-none focus:text-stone-600 transition-colors",
	variants: {
		size: {
			sm: "right-2.5 [&>svg]:h-3.5 [&>svg]:w-3.5",
			md: "right-3 [&>svg]:h-4 [&>svg]:w-4",
			lg: "right-4 [&>svg]:h-5 [&>svg]:w-5",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export interface SearchInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
	size?: "sm" | "md" | "lg";
	icon?: ReactNode;
	containerClassName?: string;
	onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
	(
		{
			size,
			icon = <Search />,
			containerClassName,
			className,
			onClear,
			value,
			...props
		},
		ref,
	) => {
		const hasValue = value !== undefined && value !== "";

		return (
			<div
				className={searchInputVariants({ size, className: containerClassName })}
			>
				<div className={searchInputIconVariants({ size })}>{icon}</div>
				<input
					ref={ref}
					type="text"
					value={value}
					className={searchInputFieldVariants({ size, className })}
					{...props}
				/>
				{hasValue && onClear && (
					<button
						type="button"
						onClick={onClear}
						className={clearButtonVariants({ size })}
						aria-label="Clear search"
					>
						<X />
					</button>
				)}
			</div>
		);
	},
);

SearchInput.displayName = "SearchInput";
