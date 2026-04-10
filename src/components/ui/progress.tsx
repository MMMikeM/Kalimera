import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

function Progress({
	className,
	indicatorClassName,
	children,
	...props
}: ProgressPrimitive.Root.Props & { indicatorClassName?: string }) {
	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			className={cn("relative w-full", className)}
			{...props}
		>
			{children ? (
				children
			) : (
				<ProgressTrack>
					<ProgressIndicator className={indicatorClassName} />
				</ProgressTrack>
			)}
		</ProgressPrimitive.Root>
	);
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
	return (
		<ProgressPrimitive.Track
			data-slot="progress-track"
			className={cn(
				"bg-stone-200 w-full h-2 overflow-hidden rounded-full",
				className,
			)}
			{...props}
		/>
	);
}

function ProgressIndicator({
	className,
	...props
}: ProgressPrimitive.Indicator.Props) {
	return (
		<ProgressPrimitive.Indicator
			data-slot="progress-indicator"
			className={cn(
				"bg-primary h-full w-full flex-1 transition-all",
				className,
			)}
			{...props}
		/>
	);
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
	return (
		<ProgressPrimitive.Label
			data-slot="progress-label"
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
	return (
		<ProgressPrimitive.Value
			data-slot="progress-value"
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	Progress,
	ProgressIndicator,
	ProgressLabel,
	ProgressTrack,
	ProgressValue,
};
