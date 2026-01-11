import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
	"relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
	{
		variants: {
			variant: {
				default: "bg-card text-card-foreground",
				destructive:
					"text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive",
				info: "bg-ocean-100 border-ocean-400 text-ocean-text [&>svg]:text-ocean *:data-[slot=alert-title]:text-ocean-text *:data-[slot=alert-description]:text-ocean-text",
				warning:
					"bg-honey-100 border-honey-400 text-honey-text [&>svg]:text-honey *:data-[slot=alert-title]:text-honey-text *:data-[slot=alert-description]:text-honey-text",
				success:
					"bg-olive-100 border-olive-400 text-olive-text [&>svg]:text-olive *:data-[slot=alert-title]:text-olive-text *:data-[slot=alert-description]:text-olive-text",
				error:
					"bg-incorrect-100 border-incorrect-400 text-incorrect [&>svg]:text-incorrect *:data-[slot=alert-title]:text-incorrect *:data-[slot=alert-description]:text-incorrect",
				purple:
					"bg-terracotta-100 border-terracotta-400 text-terracotta-text [&>svg]:text-terracotta *:data-[slot=alert-title]:text-terracotta-text *:data-[slot=alert-description]:text-terracotta-text",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
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
