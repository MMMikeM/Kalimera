import { createLink } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const buttonVariants = tv({
	base: "inline-flex transform items-center justify-center gap-2 rounded-xl font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:ring-2 focus:ring-terracotta-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
	variants: {
		variant: {
			// -600, not the base -500: white on -500 is 3.99:1, under AA for button-sized text.
			primary: "bg-terracotta-600 text-white hover:bg-terracotta-700",
			secondary:
				"border border-stone-200 bg-card text-stone-700 hover:border-stone-300",
			outline:
				"border-2 border-stone-300 bg-card/50 text-stone-700 hover:border-stone-400 hover:bg-stone-50",
			ghost: "text-stone-700 hover:bg-card/60",
		},
		size: {
			sm: "px-3 py-1.5 text-sm",
			md: "px-4 py-2 text-base",
			lg: "px-6 py-3 text-lg",
		},
		active: {
			true: "",
			false: "",
		},
	},
	compoundVariants: [
		{
			variant: "secondary",
			active: true,
			class:
				"border-terracotta bg-terracotta-600 text-white shadow-md hover:bg-terracotta-700",
		},
		{
			variant: "primary",
			active: true,
			class: "shadow-md",
		},
	],
	defaultVariants: {
		variant: "primary",
		size: "md",
		active: false,
	},
});

type ButtonStyle = {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyle {
	active?: boolean;
	children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	variant,
	size,
	active,
	className,
	children,
	...props
}) => {
	return (
		<button className={buttonVariants({ variant, size, active, className })} {...props}>
			{children}
		</button>
	);
};

const ButtonAnchor = ({
	variant,
	size,
	className,
	children,
	...props
}: React.ComponentPropsWithRef<"a"> & ButtonStyle) => (
	<a className={buttonVariants({ variant, size, className })} {...props}>
		{children}
	</a>
);

/** Navigation styled as a button. A `<Button>` inside a `<Link>` is two tab stops and invalid HTML. */
export const ButtonLink = createLink(ButtonAnchor);
