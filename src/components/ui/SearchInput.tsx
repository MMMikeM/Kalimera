import { Search } from "lucide-react";
import type { ReactNode } from "react";
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
	base: "w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
	variants: {
		size: {
			sm: "pl-8 pr-3 py-1.5 text-sm",
			md: "pl-10 pr-4 py-2 text-base",
			lg: "pl-12 pr-5 py-3 text-lg",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const searchInputIconVariants = tv({
	base: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none",
	variants: {
		size: {
			sm: "h-3 w-3",
			md: "h-4 w-4",
			lg: "h-5 w-5",
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
}

export const SearchInput: React.FC<SearchInputProps> = ({
	size,
	icon = <Search />,
	containerClassName,
	className,
	...props
}) => {
	return (
		<div
			className={searchInputVariants({ size, className: containerClassName })}
		>
			<div className={searchInputIconVariants({ size })}>{icon}</div>
			<input
				type="text"
				className={searchInputFieldVariants({ size, className })}
				{...props}
			/>
		</div>
	);
};
