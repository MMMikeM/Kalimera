import type React from "react";

export const BandHeading: React.FC<{ kicker: string; title: string; lede?: string }> = ({
	kicker,
	title,
	lede,
}) => (
	<div className="space-y-1">
		<div className="text-xs font-semibold tracking-widest text-stone-500 uppercase">{kicker}</div>
		<h3 className="font-serif text-2xl text-stone-900">{title}</h3>
		{lede ? <p className="max-w-2xl text-sm text-stone-600">{lede}</p> : null}
	</div>
);
