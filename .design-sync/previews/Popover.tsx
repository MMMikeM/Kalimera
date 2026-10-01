import {
	GreekText,
	Popover,
	PopoverArrow,
	PopoverContent,
	PopoverPositioner,
	PopoverTrigger,
} from "kalimera";

const icon = {
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.5,
	strokeLinecap: "round",
	strokeLinejoin: "round",
	width: 16,
	height: 16,
	"aria-hidden": true,
} as const;

const menuRow =
	"flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-stone-100";

export const AccountMenu = () => (
	<div className="flex max-w-sm items-start justify-end p-4" style={{ minHeight: 220 }}>
		<Popover defaultOpen>
			<PopoverTrigger
				render={
					<button
						type="button"
						aria-label="Account menu"
						className="rounded-lg bg-terracotta/10 p-2 text-terracotta-700 outline-none"
					/>
				}
			>
				<svg {...icon} width={20} height={20}>
					<circle cx="12" cy="8" r="5" />
					<path d="M20 21a8 8 0 0 0-16 0" />
				</svg>
			</PopoverTrigger>
			<PopoverPositioner align="end" sideOffset={8}>
				<PopoverContent className="w-48 p-1" initialFocus={false}>
					<button type="button" className={menuRow}>
						<svg {...icon} className="text-stone-500">
							<path d="M12 20V10" />
							<path d="M18 20V4" />
							<path d="M6 20v-4" />
						</svg>
						<span className="text-stone-800">Progress</span>
					</button>
					<button type="button" className={menuRow}>
						<svg {...icon} className="text-stone-500">
							<circle cx="12" cy="12" r="10" />
							<path d="M12 16v-4" />
							<path d="M12 8h.01" />
						</svg>
						<span className="text-stone-800">About</span>
					</button>
					<div className="my-1 border-t border-stone-200" />
					<button type="button" className={menuRow}>
						<svg {...icon} className="text-stone-500">
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
							<path d="m16 17 5-5-5-5" />
							<path d="M21 12H9" />
						</svg>
						<span className="text-stone-800">Sign out</span>
					</button>
				</PopoverContent>
			</PopoverPositioner>
		</Popover>
	</div>
);

export const WhyThisForm = () => (
	<div className="p-4" style={{ minHeight: 240 }}>
		<Popover defaultOpen>
			<PopoverTrigger className="rounded-md px-2 py-1 text-sm text-stone-600 underline hover:text-stone-800">
				Why τον?
			</PopoverTrigger>
			<PopoverPositioner align="start" sideOffset={8}>
				<PopoverContent className="space-y-2" initialFocus={false}>
					<GreekText as="p" size="xl">
						Βλέπω τον φίλο.
					</GreekText>
					<p className="text-sm text-stone-700">
						The friend is the Target: the one being seen. A masculine Target takes τον, and the
						noun drops its final -ς.
					</p>
				</PopoverContent>
			</PopoverPositioner>
		</Popover>
	</div>
);

const InfoIcon = () => (
	<svg
		viewBox="0 0 24 24"
		width={16}
		height={16}
		fill="none"
		stroke="currentColor"
		strokeWidth={1.5}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 16v-4" />
		<path d="M12 8h.01" />
	</svg>
);

export const InlineHelp = () => (
	<div className="flex items-start p-6" style={{ minHeight: 320 }}>
		<div className="flex items-center gap-3">
			<GreekText size="xl">Βλέπω τον φίλο.</GreekText>
			<Popover defaultOpen>
				<PopoverTrigger
					className={(state) =>
						`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors outline-none ${
							state.open
								? "bg-terracotta/10 text-terracotta-700"
								: "text-stone-500 hover:text-stone-700"
						}`
					}
				>
					<InfoIcon />
					Why τον?
				</PopoverTrigger>
				<PopoverPositioner align="start" sideOffset={8}>
					<PopoverContent initialFocus={false}>
						<p className="text-sm text-stone-700">
							The friend is the Target: the one being seen. A masculine Target takes{" "}
							<GreekText size="inherit">τον</GreekText>, and the noun drops its final -ς.
						</p>
					</PopoverContent>
				</PopoverPositioner>
			</Popover>
		</div>
	</div>
);

export const AboveTheWord = () => (
	<div className="flex items-end justify-center p-6" style={{ minHeight: 360 }}>
		<div className="text-center" style={{ paddingBottom: 80 }}>
			<Popover defaultOpen>
				<PopoverTrigger className="rounded-md border border-stone-200 bg-card px-3 py-2 outline-none">
					<GreekText size="xl">πότε</GreekText>
				</PopoverTrigger>
				<PopoverPositioner side="top" align="center" sideOffset={12}>
					<PopoverContent initialFocus={false}>
						<p className="text-sm text-stone-700">
							<GreekText size="inherit" weight="bold">
								πότε
							</GreekText>{" "}
							means when? Move the accent and it means never:{" "}
							<GreekText size="inherit" weight="bold">
								ποτέ
							</GreekText>
							.
						</p>
					</PopoverContent>
				</PopoverPositioner>
			</Popover>
			<p className="mt-3 text-sm text-stone-500">Tap a word to check it.</p>
		</div>
	</div>
);

export const WordLookup = () => (
	<div className="flex items-start p-6" style={{ minHeight: 340 }}>
		<p className="text-lg text-stone-700">
			<GreekText size="inherit">Θέλω έναν </GreekText>
			<Popover defaultOpen>
				<PopoverTrigger className="rounded-sm bg-honey-100 px-1 text-honey-text outline-none">
					<GreekText size="inherit">καφέ</GreekText>
				</PopoverTrigger>
				<PopoverPositioner align="start" sideOffset={8}>
					<PopoverContent initialFocus={false}>
						<div className="space-y-3">
							<div>
								<GreekText as="p" size="xl" weight="bold">
									ο καφές
								</GreekText>
								<p className="text-sm text-stone-600">coffee · masculine</p>
							</div>
							<div className="space-y-1 border-t border-stone-200 pt-3 text-sm text-stone-700">
								<p>
									Here it is the Target, so it drops the final -ς:{" "}
									<GreekText size="inherit">έναν καφέ</GreekText>.
								</p>
							</div>
						</div>
					</PopoverContent>
				</PopoverPositioner>
			</Popover>
			<GreekText size="inherit">, παρακαλώ.</GreekText>
		</p>
	</div>
);

export const PointingAtTheWord = () => (
	<div className="flex items-start justify-center p-6" style={{ minHeight: 320 }}>
		<p className="text-xl text-stone-700">
			<GreekText size="inherit">Μένω με </GreekText>
			<Popover defaultOpen>
				<PopoverTrigger className="rounded-sm bg-honey-100 px-1 text-honey-text outline-none">
					<GreekText size="inherit">τους γονείς μου</GreekText>
				</PopoverTrigger>
				<PopoverPositioner align="center" sideOffset={10}>
					<PopoverContent initialFocus={false}>
						<PopoverArrow
							style={{
								width: 14,
								height: 14,
								top: -8,
								transform: "rotate(45deg)",
								background: "var(--color-popover)",
								borderTop: "1px solid var(--color-border)",
								borderLeft: "1px solid var(--color-border)",
							}}
						/>
						<p className="text-sm text-stone-700">
							<GreekText size="inherit">με</GreekText> takes the Target:{" "}
							<GreekText size="inherit">οι γονείς</GreekText> becomes{" "}
							<GreekText size="inherit">τους γονείς</GreekText>.
						</p>
					</PopoverContent>
				</PopoverPositioner>
			</Popover>
			<GreekText size="inherit">.</GreekText>
		</p>
	</div>
);
