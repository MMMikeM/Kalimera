import type React from "react";
import { Link } from "react-router";

export interface Section {
	id: string;
	label: string;
	description: string;
	icon: React.ReactNode;
	href: string;
	color: string;
}

export const SectionCard = ({ section }: { section: Section }) => (
	<Link
		to={section.href}
		className={`flex items-center gap-4 rounded-xl border-2 p-4 ${section.color} transition-shadow hover:shadow-md`}
	>
		<div className="shrink-0">{section.icon}</div>
		<div>
			<h2 className="font-semibold">{section.label}</h2>
			<p className="text-sm opacity-80">{section.description}</p>
		</div>
	</Link>
);
