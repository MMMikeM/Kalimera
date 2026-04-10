import { AlertTriangle } from "lucide-react";
import { type ColorScheme, colorStyles } from "@/lib/colors";
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

type StemColor = Extract<ColorScheme, "ocean" | "terracotta" | "olive">;

interface StemBoxProps {
	label: string;
	stem: string;
	color: StemColor;
}

const StemBox = ({ label, stem, color }: StemBoxProps) => {
	const styles = colorStyles[color];
	return (
		<div
			className={cn(
				"flex flex-col items-center p-3 rounded-lg border",
				styles.bgMuted,
				styles.borderMuted,
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

	const honey = colorStyles.honey;

	return (
		<div
			className={cn(
				"rounded-lg border-2 p-4",
				honey.borderMuted,
				honey.bg,
				className,
			)}
		>
			<div className="mb-3 flex items-center gap-2">
				<AlertTriangle size={18} className={honey.text} />
				<h4 className={cn("font-semibold", honey.text)}>Suppletive Verb</h4>
			</div>

			<p className="mb-4 text-sm text-stone-600">
				This verb uses different roots for different tenses. This is similar to
				English "go / went / gone" - the stems are unrelated and must be
				memorized separately.
			</p>

			<div className="flex flex-wrap items-center justify-center gap-2">
				{hasPresent && (
					<StemBox
						label="Present"
						stem={stems.present as string}
						color="ocean"
					/>
				)}
				{hasPresent && hasAorist && <Arrow />}
				{hasAorist && (
					<StemBox
						label="Aorist"
						stem={stems.aorist as string}
						color="terracotta"
					/>
				)}
				{hasAorist && hasFuture && <Arrow />}
				{!hasAorist && hasPresent && hasFuture && <Arrow />}
				{hasFuture && (
					<StemBox label="Future" stem={stems.future as string} color="olive" />
				)}
			</div>
		</div>
	);
};
