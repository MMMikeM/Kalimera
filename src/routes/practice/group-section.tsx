import { Link } from "react-router";

export interface Drill {
	id: string;
	href: string;
	title: string;
	greek: string;
	minutes: number;
	phase?: string;
}

const PHASE_TINT: Record<string, string> = {
	Doer: "text-ocean-600 border-ocean/50",
	Target: "text-terracotta-600 border-terracotta/50",
	Owner: "text-olive-600 border-olive/50",
	Review: "text-muted-foreground border-border",
};

export function GroupSection({
	title,
	subtitle,
	drills,
}: {
	title: string;
	subtitle?: string;
	drills: Drill[];
}) {
	const phases: { phase: string | null; drills: Drill[] }[] = [];
	for (const drill of drills) {
		const key = drill.phase ?? null;
		const last = phases.at(-1);
		if (last && last.phase === key) last.drills.push(drill);
		else phases.push({ phase: key, drills: [drill] });
	}

	return (
		<section>
			<Link to=".." className="mb-4 inline-block text-xs text-stone-400 hover:text-stone-600">
				← back
			</Link>
			<header className="mb-6">
				<h3 className="font-serif text-2xl font-semibold text-navy-text">{title}</h3>
				{subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
			</header>
			<div className="space-y-8">
				{phases.map((p, pi) => {
					const tint = p.phase ? PHASE_TINT[p.phase] : null;
					return (
						<div key={p.phase ?? `_${pi}`}>
							{p.phase && (
								<h4
									className={`mb-2 border-b pb-2 font-sans text-sm font-bold tracking-widest uppercase ${tint ?? "border-border text-muted-foreground"}`}
								>
									{p.phase}
								</h4>
							)}
							<ul className="divide-y divide-border">
								{p.drills.map((d) => (
									<li key={d.id}>
										<Link
											to={d.href}
											className="flex items-baseline justify-between gap-3 py-3 transition-colors hover:bg-foreground/5"
										>
											<div className="min-w-0 flex-1">
												<div className="mb-0.5 text-sm font-medium text-foreground">{d.title}</div>
												<p lang="el" className="greek-text truncate text-muted-foreground">
													{d.greek}
												</p>
											</div>
											<span className="shrink-0 text-xs text-muted-foreground tabular-nums">
												{d.minutes} min
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					);
				})}
			</div>
		</section>
	);
}
