import { Fragment, type ReactNode } from "react";
import { cn } from "tailwind-variants";

import { GreekText } from "@/components/GreekText";
import { PageHeading } from "@/components/PageHeading";
import { type GrammarScheme, SCHEME } from "@/constants/grammar-palette";

interface ReferenceHeroDemoItem {
	greek: string;
	label: string;
	/** Grammar scheme driving colour on the Greek form + label. Omit for neutral. */
	scheme?: GrammarScheme;
}

interface ReferenceHeroProps {
	title: ReactNode;
	thesis: string;
	demo?: ReferenceHeroDemoItem[];
}

export const ReferenceHero = ({ title, thesis, demo }: ReferenceHeroProps) => (
	<header className="space-y-5">
		<PageHeading title={title}>
			<p>{thesis}</p>
		</PageHeading>

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
								<GreekText
									tone="accent"
									size="2xl"
									className={cn("leading-none", style ? style.text : "text-stone-800")}
								>
									{item.greek}
								</GreekText>
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
