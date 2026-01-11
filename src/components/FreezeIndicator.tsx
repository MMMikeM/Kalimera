import { ShieldCheck, Snowflake } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

export type FreezeStatus = "available" | "recovering" | "none" | "just_used";

export interface FreezeIndicatorProps {
	freezeCount: number;
	status: FreezeStatus;
	hoursUntilRecovery?: number;
	daysUntilNextEarn?: number;
	protectedDate?: string;
	className?: string;
}

const freezeIndicatorVariants = tv({
	base: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
	variants: {
		status: {
			available: "bg-ocean-100 border border-ocean-300",
			recovering: "bg-stone-100 border border-stone-300",
			none: "bg-stone-50 border border-stone-200",
			just_used: "bg-olive-100 border border-olive-400",
		},
	},
	defaultVariants: {
		status: "none",
	},
});

const iconVariants = tv({
	base: "size-4 shrink-0",
	variants: {
		status: {
			available: "text-ocean-400",
			recovering: "text-stone-400",
			none: "text-stone-300",
			just_used: "text-olive-400",
		},
	},
	defaultVariants: {
		status: "none",
	},
});

const textVariants = tv({
	base: "font-medium",
	variants: {
		status: {
			available: "text-ocean-text",
			recovering: "text-stone-600",
			none: "text-stone-500",
			just_used: "text-olive-text",
		},
	},
	defaultVariants: {
		status: "none",
	},
});

const formatPlural = (count: number, singular: string, plural: string) =>
	count === 1 ? singular : plural;

export const FreezeIndicator = ({
	freezeCount,
	status,
	hoursUntilRecovery,
	daysUntilNextEarn,
	className,
}: FreezeIndicatorProps) => {
	const renderContent = () => {
		switch (status) {
			case "available":
				return (
					<>
						<Snowflake className={iconVariants({ status })} />
						<span className={textVariants({ status })}>
							{freezeCount} {formatPlural(freezeCount, "freeze", "freezes")}{" "}
							ready — miss a day, keep your streak
						</span>
					</>
				);

			case "recovering":
				return (
					<>
						<Snowflake className={cn(iconVariants({ status }), "opacity-60")} />
						<span className={textVariants({ status })}>
							Available in {hoursUntilRecovery}h
						</span>
					</>
				);

			case "none":
				return (
					<>
						<Snowflake className={cn(iconVariants({ status }), "opacity-50")} />
						<span className={textVariants({ status })}>
							{daysUntilNextEarn}{" "}
							{formatPlural(daysUntilNextEarn ?? 0, "day", "days")} to earn a
							streak freeze
						</span>
					</>
				);

			case "just_used":
				return (
					<>
						<ShieldCheck className={iconVariants({ status })} />
						<span className={textVariants({ status })}>
							Streak protected! Freeze saved your streak.
						</span>
					</>
				);
		}
	};

	return (
		<div
			className={freezeIndicatorVariants({ status, className })}
			title={
				status === "none"
					? "Practice 7 days in a row to earn a streak freeze. If you miss a day, it activates automatically."
					: undefined
			}
		>
			{renderContent()}
		</div>
	);
};

export type { VariantProps };
