import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
	base: "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
	variants: {
		variant: {
			default: "border-transparent bg-stone-200 text-stone-800",
			primary: "border-transparent bg-ocean-200 text-ocean-text",
			secondary: "border-transparent bg-terracotta-200 text-terracotta-text",
			success: "border-transparent bg-olive-200 text-olive-text",
			warning: "border-transparent bg-honey-200 text-honey-text",
			error: "bg-incorrect-200 border-transparent text-incorrect",
			destructive:
				"border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
			outline:
				"border-stone-300 bg-white text-stone-700 [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
		},
		size: {
			xs: "px-1.5 py-0.5 text-xs",
			sm: "px-2 py-1 text-xs",
			md: "px-2.5 py-1.5 text-sm",
			lg: "px-3 py-2 text-base",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "xs",
	},
});

function Badge({
	className,
	variant,
	size,
	render = <span />,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { render?: useRender.RenderProp }) {
	return useRender({
		render,
		props: {
			"data-slot": "badge",
			className: badgeVariants({ variant, size, class: className }),
			...props,
		},
	});
}

export { Badge, badgeVariants };
