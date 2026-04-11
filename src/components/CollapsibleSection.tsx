import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";
import { type ColorScheme, colorStyles } from "@/lib/colors";
import { cn } from "@/lib/utils";

export type CollapsibleColorScheme = ColorScheme;

export interface CollapsibleSectionProps {
	title: string;
	subtitle?: string;
	icon?: ReactNode;
	colorScheme?: CollapsibleColorScheme;
	defaultOpen?: boolean;
	children: ReactNode;
	className?: string;
}

export const CollapsibleSection = ({
	title,
	subtitle,
	icon,
	colorScheme = "stone",
	defaultOpen = false,
	children,
	className,
}: CollapsibleSectionProps) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	const colors = colorStyles[colorScheme];

	return (
		<CollapsiblePrimitive.Root open={isOpen} onOpenChange={setIsOpen} className={className}>
			<div className={cn("rounded-lg border overflow-hidden", colors.border)}>
				<CollapsiblePrimitive.Trigger
					className={cn(
						"flex items-center gap-2 w-full p-3 transition-colors text-left group cursor-pointer",
						colors.bgMuted,
						colors.hover,
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/30 focus-visible:ring-inset",
					)}
				>
					{icon && <span className={colors.accent}>{icon}</span>}
					<span className={cn("font-medium", colors.text)}>{title}</span>
					{subtitle && <span className="ml-1 text-sm text-stone-500">{subtitle}</span>}
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
							<div className="border-t border-stone-200/60 bg-cream-dark/50 p-4">{children}</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</CollapsiblePrimitive.Root>
	);
};
