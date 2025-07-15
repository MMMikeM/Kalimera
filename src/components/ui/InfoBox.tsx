import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

export const infoBoxVariants = tv({
	base: "p-4 rounded-lg border-l-4",
	variants: {
		variant: {
			info: "bg-blue-50 border-blue-400",
			warning: "bg-yellow-50 border-yellow-400",
			success: "bg-green-50 border-green-400",
			error: "bg-red-50 border-red-400",
			purple: "bg-purple-50 border-purple-400",
		},
		size: {
			sm: "p-3",
			md: "p-4",
			lg: "p-6",
		},
	},
	defaultVariants: {
		variant: "info",
		size: "md",
	},
});

export const infoBoxTitleVariants = tv({
	base: "font-bold flex items-center gap-2",
	variants: {
		variant: {
			info: "text-blue-800",
			warning: "text-yellow-800",
			success: "text-green-800",
			error: "text-red-800",
			purple: "text-purple-800",
		},
	},
	defaultVariants: {
		variant: "info",
	},
});

export const infoBoxContentVariants = tv({
	base: "mt-2",
	variants: {
		variant: {
			info: "text-blue-700",
			warning: "text-yellow-700",
			success: "text-green-700",
			error: "text-red-700",
			purple: "text-purple-700",
		},
	},
	defaultVariants: {
		variant: "info",
	},
});

export interface InfoBoxProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
	variant?: "info" | "warning" | "success" | "error" | "purple";
	size?: "sm" | "md" | "lg";
	title?: ReactNode;
	icon?: ReactNode;
	children: ReactNode;
}

export const InfoBox: React.FC<InfoBoxProps> = ({
	variant,
	size,
	title,
	icon,
	className,
	children,
	...props
}) => {
	return (
		<div className={infoBoxVariants({ variant, size, className })} {...props}>
			{title && (
				<h3 className={infoBoxTitleVariants({ variant })}>
					{icon}
					{title}
				</h3>
			)}
			<div className={infoBoxContentVariants({ variant })}>{children}</div>
		</div>
	);
};
