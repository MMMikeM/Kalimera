import type { LucideIcon } from "lucide-react";

export interface PromptFacet {
	icon: LucideIcon;
	label: string;
	colorText: string;
	ariaLabel?: string;
	muted?: boolean;
}

interface ForwardPromptCardProps {
	facets: PromptFacet[];
	caption?: React.ReactNode;
	gloss?: React.ReactNode;
}

export const ForwardPromptCard = ({ facets, caption, gloss }: ForwardPromptCardProps) => (
	<div className="mx-auto flex w-full max-w-[18rem] flex-col">
		{caption ? (
			<p className="mb-3 text-[10px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
				{caption}
			</p>
		) : null}
		<ul className="flex flex-col divide-y divide-stone-200/70">
			{facets.map((f, i) => {
				const Icon = f.icon;
				return (
					<li
						key={i}
						className={`flex items-center gap-5 py-4 ${f.colorText} ${f.muted ? "opacity-40" : ""}`}
						aria-label={f.ariaLabel ?? f.label}
					>
						<Icon size={32} strokeWidth={1.5} aria-hidden className="shrink-0" />
						<span className="font-serif text-[2.75rem] leading-none lowercase tracking-tight">
							{f.label}
						</span>
					</li>
				);
			})}
		</ul>
		{gloss ? (
			<p className="mt-4 font-serif text-base italic text-muted-foreground">{gloss}</p>
		) : null}
	</div>
);
