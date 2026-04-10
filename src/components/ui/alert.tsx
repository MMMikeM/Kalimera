import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const alertVariants = tv({
	base: "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
	variants: {
		variant: {
			default: "bg-card text-card-foreground",
			destructive:
				"bg-card text-destructive *:data-[slot=alert-description]:text-destructive [&>svg]:text-current",
			info: "border-ocean-400 bg-ocean-100 text-ocean-text *:data-[slot=alert-description]:text-ocean-text *:data-[slot=alert-title]:text-ocean-text [&>svg]:text-ocean",
			warning:
				"border-honey-400 bg-honey-100 text-honey-text *:data-[slot=alert-description]:text-honey-text *:data-[slot=alert-title]:text-honey-text [&>svg]:text-honey",
			success:
				"border-olive-400 bg-olive-100 text-olive-text *:data-[slot=alert-description]:text-olive-text *:data-[slot=alert-title]:text-olive-text [&>svg]:text-olive",
			error:
				"bg-incorrect-100 border-incorrect-400 text-incorrect *:data-[slot=alert-description]:text-incorrect *:data-[slot=alert-title]:text-incorrect [&>svg]:text-incorrect",
			purple:
				"border-terracotta-400 bg-terracotta-100 text-terracotta-text *:data-[slot=alert-description]:text-terracotta-text *:data-[slot=alert-title]:text-terracotta-text [&>svg]:text-terracotta",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={alertVariants({ variant, class: className })}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				"col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				"col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
				className,
			)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle, AlertDescription };
