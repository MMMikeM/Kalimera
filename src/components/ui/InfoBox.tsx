import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

export const infoBoxVariants = tv({
	base: "p-6 rounded-xl border-l-4 backdrop-blur-sm relative overflow-hidden",
	variants: {
		variant: {
			info: "bg-gradient-to-r from-blue-50 via-blue-50 to-indigo-50 border-blue-400 shadow-lg shadow-blue-100/50",
			warning:
				"bg-gradient-to-r from-yellow-50 via-yellow-50 to-orange-50 border-yellow-400 shadow-lg shadow-yellow-100/50",
			success:
				"bg-gradient-to-r from-green-50 via-green-50 to-emerald-50 border-green-400 shadow-lg shadow-green-100/50",
			error:
				"bg-gradient-to-r from-red-50 via-red-50 to-pink-50 border-red-400 shadow-lg shadow-red-100/50",
			purple:
				"bg-gradient-to-r from-purple-50 via-purple-50 to-violet-50 border-purple-400 shadow-lg shadow-purple-100/50",
		},
		size: {
			sm: "p-4",
			md: "p-6",
			lg: "p-8",
		},
	},
	defaultVariants: {
		variant: "info",
		size: "md",
	},
});

export const infoBoxTitleVariants = tv({
	base: "font-bold flex items-center gap-3 text-lg tracking-wide",
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
	base: "mt-3 leading-relaxed",
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
			{/* Decorative background pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-current transform translate-x-16 -translate-y-16"></div>
				<div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-current transform -translate-x-12 translate-y-12"></div>
			</div>

			<div className="relative z-10">
				{title && (
					<h3 className={infoBoxTitleVariants({ variant })}>
						{icon && <span className="flex-shrink-0">{icon}</span>}
						{title}
					</h3>
				)}
				<div className={infoBoxContentVariants({ variant })}>{children}</div>
			</div>
		</div>
	);
};
