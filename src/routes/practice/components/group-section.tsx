import { Link } from "@tanstack/react-router";
import type React from "react";

export interface Drill {
	id: string;
	to: `${"." | ".."}/${string}`;
	title: string;
	greek: string;
	minutes: number;
}

export function GroupSection({
	title,
	subtitle,
	returnTo,
	children,
}: {
	title: string;
	subtitle?: string;
	returnTo?: string;
	children: React.ReactNode;
}) {
	return (
		<section>
			<Link to={returnTo} className="mb-4 inline-block text-xs text-stone-400 hover:text-stone-600">
				← back
			</Link>
			<header className="mb-6">
				<h3 className="font-serif text-2xl font-semibold text-navy-text">{title}</h3>
				{subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
			</header>
			<div className="space-y-8">{children}</div>
		</section>
	);
}
