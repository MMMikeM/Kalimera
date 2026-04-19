import { Search, X } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { tv } from "tailwind-variants";

const searchInputVariants = tv({
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

const searchInputFieldVariants = tv({
	base: "w-full rounded-lg border border-stone-300 bg-white text-stone-900 transition-colors placeholder:text-stone-600 focus:border-terracotta focus:ring-2 focus:ring-terracotta-300 focus:ring-offset-0 focus:outline-none",
	variants: {
		size: {
			sm: "py-1.5 pr-8 pl-8 text-sm",
			md: "py-2 pr-10 pl-10 text-base",
			lg: "py-3 pr-12 pl-12 text-lg",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const searchInputIconVariants = tv({
	base: "pointer-events-none absolute inset-y-0 flex items-center text-stone-600",
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

const clearButtonVariants = tv({
	base: "absolute inset-y-0 flex items-center text-stone-600 transition-colors hover:text-stone-600 focus:text-stone-600 focus:outline-none",
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

interface SearchInputProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"size"
> {
	size?: "sm" | "md" | "lg";
	icon?: ReactNode;
	containerClassName?: string;
	onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
	({ size, icon = <Search />, containerClassName, className, onClear, value, ...props }, ref) => {
		const hasValue = value !== undefined && value !== "";

		return (
			<div className={searchInputVariants({ size, className: containerClassName })}>
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
