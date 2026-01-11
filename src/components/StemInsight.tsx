import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MonoText } from "./MonoText";

export interface StemInsightProps {
	isSuppletive: boolean;
	stems: {
		present?: string | null;
		aorist?: string | null;
		future?: string | null;
	};
	className?: string;
}

interface StemBoxProps {
	label: string;
	stem: string;
	colorScheme: "ocean" | "terracotta" | "olive";
}

const colorStyles = {
	ocean: {
		bg: "bg-ocean-100",
		border: "border-ocean-300",
		text: "text-ocean-text",
	},
	terracotta: {
		bg: "bg-terracotta-100",
		border: "border-terracotta-300",
		text: "text-terracotta-text",
	},
	olive: {
		bg: "bg-olive-100",
		border: "border-olive-300",
		text: "text-olive-text",
	},
};

const StemBox = ({ label, stem, colorScheme }: StemBoxProps) => {
	const styles = colorStyles[colorScheme];
	return (
		<div
			className={cn(
				"flex flex-col items-center p-3 rounded-lg border",
				styles.bg,
				styles.border,
			)}
		>
			<span className={cn("text-xs font-medium mb-1", styles.text)}>
				{label}
			</span>
			<MonoText variant="greek" size="xl" weight="bold">
				{stem}-
			</MonoText>
		</div>
	);
};

const Arrow = () => (
	<div className="flex items-center justify-center px-2">
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			className="text-stone-400"
			aria-hidden="true"
			role="presentation"
		>
			<path
				d="M5 12h14m-4-4l4 4-4 4"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	</div>
);

export const StemInsight = ({
	isSuppletive,
	stems,
	className,
}: StemInsightProps) => {
	if (!isSuppletive) {
		return null;
	}

	const hasPresent = stems.present != null;
	const hasAorist = stems.aorist != null;
	const hasFuture = stems.future != null;

	const stemCount = [hasPresent, hasAorist, hasFuture].filter(Boolean).length;
	if (stemCount < 2) {
		return null;
	}

	return (
		<div
			className={cn(
				"rounded-lg border-2 border-honey-300 bg-honey-50 p-4",
				className,
			)}
		>
			<div className="flex items-center gap-2 mb-3">
				<AlertTriangle size={18} className="text-honey-text" />
				<h4 className="font-semibold text-honey-text">Suppletive Verb</h4>
			</div>

			<p className="text-sm text-stone-600 mb-4">
				This verb uses different roots for different tenses. This is similar to
				English "go / went / gone" - the stems are unrelated and must be
				memorized separately.
			</p>

			<div className="flex flex-wrap items-center justify-center gap-2">
				{hasPresent && (
					<StemBox
						label="Present"
						stem={stems.present as string}
						colorScheme="ocean"
					/>
				)}
				{hasPresent && hasAorist && <Arrow />}
				{hasAorist && (
					<StemBox
						label="Aorist"
						stem={stems.aorist as string}
						colorScheme="terracotta"
					/>
				)}
				{hasAorist && hasFuture && <Arrow />}
				{!hasAorist && hasPresent && hasFuture && <Arrow />}
				{hasFuture && (
					<StemBox
						label="Future"
						stem={stems.future as string}
						colorScheme="olive"
					/>
				)}
			</div>
		</div>
	);
};
