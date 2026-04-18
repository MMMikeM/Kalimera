import { Link } from "react-router";

import { DRILLS, GROUP_META, GROUP_ORDER, MODE_META } from "./drills";

export default function PracticeHome() {
	return (
		<div className="mx-auto max-w-2xl space-y-12">
			{GROUP_ORDER.map((group) => {
				const meta = GROUP_META[group];
				const drills = DRILLS.filter((d) => d.group === group);

				return (
					<section key={group}>
						<header className="mb-3 flex items-baseline justify-between border-b border-border pb-2">
							<h3 className="font-serif text-lg font-semibold text-navy-text">{meta.label}</h3>
							<span className="text-xs text-muted-foreground tabular-nums">
								{drills.length} drills
							</span>
						</header>
						<ul className="divide-y divide-border">
							{drills.map((d) => {
								const mode = MODE_META[d.mode];
								return (
									<li key={d.id}>
										<Link
											to={d.href}
											className="flex items-baseline justify-between gap-3 py-3 transition-colors hover:bg-muted/50"
										>
											<div className="min-w-0 flex-1">
												<div className="mb-0.5 flex items-baseline gap-2">
													<span className="text-sm font-medium text-foreground">
														{d.title}
													</span>
													<span
														className={`rounded border px-1.5 py-px text-[10px] tracking-wide uppercase ${mode.tone}`}
													>
														{mode.label}
													</span>
												</div>
												<p
													lang="el"
													className="greek-text truncate text-xs text-muted-foreground"
												>
													{d.greek}
												</p>
											</div>
											<span className="shrink-0 text-xs text-muted-foreground tabular-nums">
												{d.minutes} min
											</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</section>
				);
			})}
		</div>
	);
}
