import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuPositioner,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	GreekText,
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

const ChevronDownIcon = () => (
	<svg {...icon}>
		<path d="m6 9 6 6 6-6" />
	</svg>
);

const BarChartIcon = () => (
	<svg {...icon}>
		<path d="M12 20V10" />
		<path d="M18 20V4" />
		<path d="M6 20v-4" />
	</svg>
);

const InfoIcon = () => (
	<svg {...icon}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 16v-4" />
		<path d="M12 8h.01" />
	</svg>
);

const LogOutIcon = () => (
	<svg {...icon}>
		<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
		<path d="m16 17 5-5-5-5" />
		<path d="M21 12H9" />
	</svg>
);

export const AccountMenu = () => (
	<div className="flex max-w-sm items-start justify-end p-4" style={{ minHeight: 220 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				Account
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="end">
				<DropdownMenuContent className="w-48 outline-none">
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
						<BarChartIcon />
						Progress
					</DropdownMenuItem>
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
						<InfoIcon />
						About
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
						<LogOutIcon />
						Sign out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

export const DrillOptions = () => (
	<div className="flex items-start p-4" style={{ minHeight: 220 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				Show
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-48 outline-none">
					<DropdownMenuGroup>
						<DropdownMenuLabel>While drilling</DropdownMenuLabel>
						<DropdownMenuCheckboxItem checked>Pronunciation</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem checked>English gloss</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem checked={false}>Grammar marks</DropdownMenuCheckboxItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

const families = [
	{ ending: "-ω", example: "γράφω" },
	{ ending: "-άω", example: "μιλάω" },
	{ ending: "-ώ", example: "οδηγώ" },
	{ ending: "-ομαι", example: "έρχομαι" },
	{ ending: "-άμαι", example: "θυμάμαι" },
];

export const Submenu = () => (
	<div className="flex items-start p-4" style={{ minHeight: 300 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				Verbs
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-48 outline-none">
					<DropdownMenuItem>All verbs</DropdownMenuItem>
					<DropdownMenuSub open>
						<DropdownMenuSubTrigger>By family</DropdownMenuSubTrigger>
						<DropdownMenuPositioner alignOffset={-5}>
							<DropdownMenuSubContent className="w-48 outline-none">
								{families.map(({ ending, example }) => (
									<DropdownMenuItem key={ending}>
										<GreekText size="inherit" tone="inherit" weight="medium">
											{ending}
										</GreekText>
										<GreekText size="inherit" tone="muted" className="ml-auto">
											{example}
										</GreekText>
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuPositioner>
					</DropdownMenuSub>
					<DropdownMenuItem>Irregular verbs</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

const Tense = ({ greek, english }: { greek: string; english: string }) => (
	<>
		<GreekText size="inherit" tone="inherit">
			{greek}
		</GreekText>
		<span className="ml-auto text-xs text-muted-foreground">{english}</span>
	</>
);

export const RadioChoice = () => (
	<div className="flex items-start p-4" style={{ minHeight: 260 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				<GreekText size="inherit" tone="inherit">
					Αόριστος
				</GreekText>
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-56 outline-none">
					<DropdownMenuGroup>
						<DropdownMenuLabel>Conjugate in</DropdownMenuLabel>
						<DropdownMenuRadioGroup defaultValue="aorist">
							<DropdownMenuRadioItem value="present">
								<Tense greek="Ενεστώτας" english="present" />
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="imperfect">
								<Tense greek="Παρατατικός" english="ongoing past" />
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="aorist">
								<Tense greek="Αόριστος" english="simple past" />
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="future">
								<Tense greek="Μέλλοντας" english="future" />
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

const triggerClass = (state: { open: boolean }) =>
	`flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-stone-100 hover:text-stone-800 ${
		state.open ? "bg-stone-100 text-stone-800" : "text-stone-600"
	}`;

export const HeaderTrigger = () => (
	<div className="max-w-xl p-4" style={{ minHeight: 240 }}>
		<div className="flex items-center justify-between border-b border-stone-200 pb-2">
			<span className="font-serif text-xl text-stone-800">Kalimera</span>
			<nav className="flex items-center gap-1 text-sm text-stone-600">
				<span className="px-3 py-2">Learn</span>
				<span className="px-3 py-2">Practice</span>
				<span className="px-3 py-2">Reference</span>
				<DropdownMenu defaultOpen modal={false}>
					<DropdownMenuTrigger className={triggerClass}>
						Account
						<ChevronDownIcon />
					</DropdownMenuTrigger>
					<DropdownMenuPositioner align="end">
						<DropdownMenuContent className="w-48 outline-none">
							<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
								Progress
							</DropdownMenuItem>
							<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
								About
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
								Sign out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenuPositioner>
				</DropdownMenu>
			</nav>
		</div>
	</div>
);

const ClockIcon = () => (
	<svg {...icon}>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 6v6l4 2" />
	</svg>
);

export const PracticeMenu = () => (
	<div className="flex items-start p-4" style={{ minHeight: 300 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				Practice
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-56 outline-none">
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
						<ClockIcon />
						Review due cards
						<span className="ml-auto text-xs text-stone-500">12</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuLabel>Drills</DropdownMenuLabel>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
							Doer, Target, Owner
						</DropdownMenuItem>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
							Pronouns
						</DropdownMenuItem>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
							Verb endings
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

const BookIcon = () => (
	<svg {...icon}>
		<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
	</svg>
);

const DownloadIcon = () => (
	<svg {...icon}>
		<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
		<path d="m7 10 5 5 5-5" />
		<path d="M12 15V3" />
	</svg>
);

const RotateIcon = () => (
	<svg {...icon}>
		<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
		<path d="M3 3v5h5" />
	</svg>
);

export const ItemStates = () => (
	<div className="flex items-start p-4" style={{ minHeight: 260 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				Progress
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-56 outline-none">
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
						<ClockIcon />
						Review due cards
					</DropdownMenuItem>
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
						<BookIcon />
						Words you have met
					</DropdownMenuItem>
					<DropdownMenuItem disabled className="flex cursor-pointer items-center gap-2">
						<DownloadIcon />
						Export progress
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive" className="flex cursor-pointer items-center gap-2">
						<RotateIcon />
						Reset all progress
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

export const GroupedDrills = () => (
	<div className="flex items-start p-4" style={{ minHeight: 340 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				Drill
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-56 outline-none">
					<DropdownMenuGroup>
						<DropdownMenuLabel>Nouns</DropdownMenuLabel>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">Doer</DropdownMenuItem>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">Target</DropdownMenuItem>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">Owner</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuLabel>Verbs</DropdownMenuLabel>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">Present</DropdownMenuItem>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">Past</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

export const SignedInLabel = () => (
	<div className="flex max-w-sm items-start justify-end p-4" style={{ minHeight: 260 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				Account
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="end">
				<DropdownMenuContent className="w-56 outline-none">
					<DropdownMenuGroup>
						<DropdownMenuLabel>
							<span className="block text-xs font-normal text-stone-500">Signed in as</span>
							<span className="block text-stone-800">eleni@example.com</span>
						</DropdownMenuLabel>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">Progress</DropdownMenuItem>
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">About</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">Sign out</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

export const SplitGroups = () => (
	<div className="flex items-start p-4" style={{ minHeight: 240 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				This card
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-48 outline-none">
					<DropdownMenuGroup>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">Show a hint</DropdownMenuItem>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">Reveal the answer</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">Skip this card</DropdownMenuItem>
						<DropdownMenuItem className="flex cursor-pointer items-center gap-2">End the session</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

export const Shortcuts = () => (
	<div className="flex items-start p-4" style={{ minHeight: 260 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				This card
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-56 outline-none">
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
						Check my answer
						<DropdownMenuShortcut>Enter</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
						Show a hint
						<DropdownMenuShortcut>H</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
						Skip this card
						<DropdownMenuShortcut>S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
						End the session
						<DropdownMenuShortcut>Esc</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

export const TensesToDrill = () => (
	<div className="flex items-start p-4" style={{ minHeight: 260 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				Tenses
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-56 outline-none">
					<DropdownMenuGroup>
						<DropdownMenuLabel>Drill these tenses</DropdownMenuLabel>
						<DropdownMenuCheckboxItem checked>
							<Tense greek="Ενεστώτας" english="present" />
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem checked>
							<Tense greek="Αόριστος" english="simple past" />
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem checked={false}>
							<Tense greek="Παρατατικός" english="ongoing past" />
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem checked={false}>
							<Tense greek="Μέλλοντας" english="future" />
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem checked={false} disabled>
							<Tense greek="Υπερσυντέλικος" english="had done" />
						</DropdownMenuCheckboxItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

export const RoundSettings = () => (
	<div className="flex items-start p-4" style={{ minHeight: 320 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				Round
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-56 outline-none">
					<DropdownMenuGroup>
						<DropdownMenuLabel>Prompt in</DropdownMenuLabel>
						<DropdownMenuRadioGroup defaultValue="greek">
							<DropdownMenuRadioItem value="greek">Greek, answer in English</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="english">English, answer in Greek</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="mixed">Mixed</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuLabel>Cards per round</DropdownMenuLabel>
						<DropdownMenuRadioGroup defaultValue="20">
							<DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="40">40</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

export const PractiseByCase = () => (
	<div className="flex items-start p-4" style={{ minHeight: 260 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				Practise
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-48 outline-none">
					<DropdownMenuItem>Vocabulary</DropdownMenuItem>
					<DropdownMenuSub open>
						<DropdownMenuSubTrigger>Cases</DropdownMenuSubTrigger>
						<DropdownMenuPositioner alignOffset={-5}>
							<DropdownMenuSubContent className="w-48 outline-none">
								<DropdownMenuItem>Doer</DropdownMenuItem>
								<DropdownMenuItem>Target</DropdownMenuItem>
								<DropdownMenuItem>Owner</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPositioner>
					</DropdownMenuSub>
					<DropdownMenuItem>Verbs</DropdownMenuItem>
					<DropdownMenuItem>Pronouns</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Mixed review</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

const topics = [
	{ name: "Verb family", greek: true, options: ["-ω", "-άω", "-ώ", "-ομαι"] },
	{ name: "Tense", greek: true, options: ["Ενεστώτας", "Αόριστος", "Μέλλοντας"] },
	{ name: "Case", greek: false, options: ["Doer", "Target", "Owner"] },
	{ name: "Person", greek: false, options: ["I", "you", "he, she, it", "we", "you all", "they"] },
];

export const DrillBy = () => (
	<div className="flex items-start p-4" style={{ minHeight: 240 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
				Filter
				<ChevronDownIcon />
			</DropdownMenuTrigger>
			<DropdownMenuPositioner align="start">
				<DropdownMenuContent className="w-48 outline-none">
					<DropdownMenuGroup>
						<DropdownMenuLabel>Drill by</DropdownMenuLabel>
						{topics.map(({ name, greek, options }) => (
							<DropdownMenuSub key={name}>
								<DropdownMenuSubTrigger>{name}</DropdownMenuSubTrigger>
								<DropdownMenuPositioner alignOffset={-5}>
									<DropdownMenuSubContent className="outline-none">
										{options.map((option) => (
											<DropdownMenuItem key={option}>
												{greek ? (
													<GreekText size="inherit" tone="inherit">
														{option}
													</GreekText>
												) : (
													option
												)}
											</DropdownMenuItem>
										))}
									</DropdownMenuSubContent>
								</DropdownMenuPositioner>
							</DropdownMenuSub>
						))}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenuPositioner>
		</DropdownMenu>
	</div>
);

const ChevronUpIcon = () => (
	<svg {...icon}>
		<path d="m18 15-6-6-6 6" />
	</svg>
);

export const OpensAboveDrillBar = () => (
	<div className="flex max-w-sm flex-col justify-end p-4" style={{ minHeight: 340 }}>
		<div className="flex items-center justify-between border-t border-stone-200 pt-3">
			<span className="text-sm text-stone-600">
				Card 7 of 20 ·{" "}
				<GreekText size="inherit" tone="inherit">
					το σπίτι
				</GreekText>
			</span>
			<DropdownMenu defaultOpen modal={false}>
				<DropdownMenuTrigger className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800">
					Options
					<ChevronUpIcon />
				</DropdownMenuTrigger>
				<DropdownMenuPositioner side="top" align="end" sideOffset={16}>
					<DropdownMenuContent className="w-48 outline-none">
						<DropdownMenuItem>Show the answer</DropdownMenuItem>
						<DropdownMenuItem>Skip this card</DropdownMenuItem>
						<DropdownMenuItem>Mark as known</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>End the round</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenuPositioner>
			</DropdownMenu>
		</div>
	</div>
);

const MoreIcon = () => (
	<svg {...icon}>
		<circle cx="5" cy="12" r="1" />
		<circle cx="12" cy="12" r="1" />
		<circle cx="19" cy="12" r="1" />
	</svg>
);

const RepeatIcon = () => (
	<svg {...icon}>
		<path d="m17 2 4 4-4 4" />
		<path d="M3 11v-1a4 4 0 0 1 4-4h14" />
		<path d="m7 22-4-4 4-4" />
		<path d="M21 13v1a4 4 0 0 1-4 4H3" />
	</svg>
);

const EyeOffIcon = () => (
	<svg {...icon}>
		<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
		<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
		<path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
		<path d="m2 2 20 20" />
	</svg>
);

export const EscapesClippedCard = () => (
	<div className="flex max-w-sm items-start p-4" style={{ minHeight: 220 }}>
		<div
			className="flex w-full items-center justify-between overflow-hidden rounded-xl border border-stone-200 bg-stone-50 px-4"
			style={{ height: 64 }}
		>
			<div>
				<GreekText as="p" size="lg">
					η θάλασσα
				</GreekText>
				<p className="text-xs text-stone-500">the sea</p>
			</div>
			<DropdownMenu defaultOpen modal={false}>
				<DropdownMenuTrigger
					aria-label="Word options"
					className="flex items-center rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-800"
				>
					<MoreIcon />
				</DropdownMenuTrigger>
				<DropdownMenuPortal>
					<DropdownMenuPositioner align="end">
						<DropdownMenuContent className="w-48 outline-none">
							<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
								<BookIcon />
								Open in reference
							</DropdownMenuItem>
							<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
								<RepeatIcon />
								Drill this word
							</DropdownMenuItem>
							<DropdownMenuItem className="flex cursor-pointer items-center gap-2">
								<EyeOffIcon />
								Hide from review
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenuPositioner>
				</DropdownMenuPortal>
			</DropdownMenu>
		</div>
	</div>
);
