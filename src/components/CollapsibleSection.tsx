import { type ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type CollapsibleColorScheme =
	| "honey"
	| "ocean"
	| "olive"
	| "terracotta"
	| "santorini"
	| "navy"
	| "default";

export interface CollapsibleSectionProps {
	title: string;
	subtitle?: string;
	icon?: ReactNode;
	colorScheme?: CollapsibleColorScheme;
	defaultOpen?: boolean;
	children: ReactNode;
	className?: string;
}

const colorMap: Record<
	CollapsibleColorScheme,
	{ bg: string; hover: string; border: string; text: string; icon: string }
> = {
	honey: {
		bg: "bg-honey-100",
		hover: "hover:bg-honey-200",
		border: "border-honey-400",
		text: "text-honey-text",
		icon: "text-honey",
	},
	ocean: {
		bg: "bg-ocean-100",
		hover: "hover:bg-ocean-200",
		border: "border-ocean-400",
		text: "text-ocean-text",
		icon: "text-ocean",
	},
	olive: {
		bg: "bg-olive-100",
		hover: "hover:bg-olive-200",
		border: "border-olive-400",
		text: "text-olive-text",
		icon: "text-olive",
	},
	terracotta: {
		bg: "bg-terracotta-100",
		hover: "hover:bg-terracotta-200",
		border: "border-terracotta-400",
		text: "text-terracotta-text",
		icon: "text-terracotta",
	},
	santorini: {
		bg: "bg-santorini-100",
		hover: "hover:bg-santorini-200",
		border: "border-santorini-400",
		text: "text-santorini-text",
		icon: "text-santorini",
	},
	navy: {
		bg: "bg-navy-100",
		hover: "hover:bg-navy-200",
		border: "border-navy-400",
		text: "text-navy-text",
		icon: "text-navy",
	},
	default: {
		bg: "bg-stone-50",
		hover: "hover:bg-stone-100",
		border: "border-stone-200",
		text: "text-stone-700",
		icon: "text-stone-600",
	},
};

export const CollapsibleSection = ({
	title,
	subtitle,
	icon,
	colorScheme = "default",
	defaultOpen = false,
	children,
	className,
}: CollapsibleSectionProps) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	const colors = colorMap[colorScheme];

	return (
		<CollapsiblePrimitive.Root
			open={isOpen}
			onOpenChange={setIsOpen}
			className={className}
		>
			<div className={cn("rounded-lg border overflow-hidden", colors.border)}>
				<CollapsiblePrimitive.Trigger
					className={cn(
						"flex items-center gap-2 w-full p-3 transition-colors text-left group cursor-pointer",
						colors.bg,
						colors.hover,
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/30 focus-visible:ring-inset",
					)}
				>
					{icon && <span className={colors.icon}>{icon}</span>}
					<span className={cn("font-medium", colors.text)}>{title}</span>
					{subtitle && (
						<span className="text-sm text-stone-500 ml-1">{subtitle}</span>
					)}
					<span className="ml-auto flex items-center gap-1.5">
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={isOpen ? "hide" : "show"}
								initial={{ opacity: 0, y: -4 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 4 }}
								transition={{ duration: 0.15 }}
								className="text-xs text-stone-500"
							>
								{isOpen ? "Hide" : "Show"}
							</motion.span>
						</AnimatePresence>
						<motion.div
							animate={{ rotate: isOpen ? 180 : 0 }}
							transition={{ duration: 0.2, ease: "easeInOut" }}
						>
							<ChevronDown size={16} className={colors.text} />
						</motion.div>
					</span>
				</CollapsiblePrimitive.Trigger>

				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{
								height: "auto",
								opacity: 1,
								transition: {
									height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
									opacity: { duration: 0.2, delay: 0.05 },
								},
							}}
							exit={{
								height: 0,
								opacity: 0,
								transition: {
									height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
									opacity: { duration: 0.1 },
								},
							}}
							className="overflow-hidden"
						>
							<div className="p-4 border-t border-stone-200/60 bg-white/50">
								{children}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</CollapsiblePrimitive.Root>
	);
};
