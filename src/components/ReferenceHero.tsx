import { Fragment } from "react";

import { MonoText } from "@/components/MonoText";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";
import { cn } from "@/lib/utils";

export interface ReferenceHeroDemoItem {
	greek: string;
	label: string;
	/** Grammar scheme driving colour on the Greek form + label. Omit for neutral. */
	scheme?: GrammarScheme;
}

interface ReferenceHeroProps {
	eyebrow: string;
	title: string;
	thesis: string;
	demo?: ReferenceHeroDemoItem[];
}

export const ReferenceHero = ({ eyebrow, title, thesis, demo }: ReferenceHeroProps) => (
	<header className="space-y-5">
		<p className="text-xs font-semibold tracking-[0.22em] text-stone-500 uppercase">{eyebrow}</p>

		<div className="space-y-3">
			<h1 className="font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">{title}</h1>
			<p className="max-w-2xl text-base leading-relaxed text-stone-700">{thesis}</p>
		</div>

		{demo && demo.length > 0 ? (
		<div className="flex flex-wrap items-start gap-x-5 gap-y-4 pt-1">
			{demo.map((item, i) => {
				const style = item.scheme ? SCHEME[item.scheme] : null;
				return (
					<Fragment key={`${item.greek}-${item.label}`}>
						{i > 0 ? (
							<span className="pt-1 text-stone-300" aria-hidden="true">
								·
							</span>
						) : null}
						<div className="flex flex-col items-start gap-1">
							<MonoText
								variant="greek"
								size="2xl"
								className={cn("leading-none", style ? style.text : "text-stone-800")}
							>
								{item.greek}
							</MonoText>
							<span
								className={cn(
									"text-xs font-medium tracking-wide",
									style ? style.text : "text-stone-500",
								)}
							>
								{item.label}
							</span>
						</div>
					</Fragment>
				);
			})}
		</div>
		) : null}
	</header>
);
