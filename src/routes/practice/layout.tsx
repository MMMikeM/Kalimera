import { useState, useEffect } from "react";
import {
	Users,
	BookOpen,
	ChevronDown,
	Lightbulb,
	UserPlus,
	Clock,
	Flame,
	Trophy,
	FileText,
	Zap,
} from "lucide-react";
import {
	Outlet,
	useSearchParams,
	useFetcher,
	useRevalidator,
	useLocation,
	Link,
} from "react-router";
import type { Route } from "./+types/layout";
import {
	getAllUsers,
	getItemsDueForReview,
	getNewVocabularyItems,
	getPracticeStats,
	actionHandlers,
	type ActionIntent,
	type VocabItemWithSkill,
	type PracticeStats,
} from "./data.server";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function meta() {
	return [
		{ title: "Practice - Greek Learning" },
		{
			name: "description",
			content: "Interactive drills for Greek grammar and vocabulary",
		},
	];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const userIdParam = url.searchParams.get("userId");
	const userId = userIdParam ? parseInt(userIdParam, 10) : null;

	const allUsers = await getAllUsers();

	let reviewItems: VocabItemWithSkill[] = [];
	let newVocabItems: VocabItemWithSkill[] = [];
	let stats: PracticeStats | null = null;

	if (userId) {
		[reviewItems, newVocabItems, stats] = await Promise.all([
			getItemsDueForReview(userId),
			getNewVocabularyItems(userId, 20),
			getPracticeStats(userId),
		]);
	}

	return { users: allUsers, reviewItems, newVocabItems, stats, userId };
};

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const intent = formData.get("intent") as string | null;

	if (!intent || !(intent in actionHandlers)) {
		return { success: false, error: "Unknown action" };
	}

	return actionHandlers[intent as ActionIntent](formData);
};

interface User {
	id: number;
	code: string;
	displayName: string;
	createdAt: Date;
}

const USER_STORAGE_KEY = "greek-practice-user";

interface UserSelectorProps {
	users: User[];
	onUserChange?: (userId: string) => void;
}

const UserSelector = ({ users, onUserChange }: UserSelectorProps) => {
	const [searchParams] = useSearchParams();
	const [selectedUserId, setSelectedUserId] = useState<string>(() => {
		const urlUserId = searchParams.get("userId");
		if (urlUserId) return urlUserId;
		if (typeof window !== "undefined") {
			return localStorage.getItem(USER_STORAGE_KEY) || "";
		}
		return "";
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [newName, setNewName] = useState("");
	const [newCode, setNewCode] = useState("");
	const fetcher = useFetcher();

	const handleUserChange = (value: string) => {
		if (value === "new") {
			setIsDialogOpen(true);
			return;
		}
		setSelectedUserId(value);
		localStorage.setItem(USER_STORAGE_KEY, value);
		onUserChange?.(value);
	};

	const handleCreateUser = () => {
		if (!newName.trim() || !newCode.trim()) return;

		fetcher.submit(
			{
				intent: "createUser",
				displayName: newName.trim(),
				code: newCode.trim().toLowerCase(),
			},
			{ method: "post" },
		);
	};

	useEffect(() => {
		if (fetcher.data?.success && fetcher.data?.user) {
			const newUserId = fetcher.data.user.id.toString();
			if (selectedUserId !== newUserId) {
				setSelectedUserId(newUserId);
				localStorage.setItem(USER_STORAGE_KEY, newUserId);
				onUserChange?.(newUserId);
				setIsDialogOpen(false);
				setNewName("");
				setNewCode("");
			}
		}
	}, [fetcher.data, selectedUserId, onUserChange]);

	const selectedUser = users.find((u) => u.id.toString() === selectedUserId);

	return (
		<div className="flex items-center gap-3">
			<span className="text-sm text-muted-foreground">Practicing as:</span>
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<Select value={selectedUserId} onValueChange={handleUserChange}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select user" />
					</SelectTrigger>
					<SelectContent>
						{users.map((user) => (
							<SelectItem key={user.id} value={user.id.toString()}>
								{user.displayName}
							</SelectItem>
						))}
						<DialogTrigger asChild>
							<button
								type="button"
								className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground text-primary"
								onClick={() => setIsDialogOpen(true)}
							>
								<UserPlus size={14} />
								Add new user
							</button>
						</DialogTrigger>
					</SelectContent>
				</Select>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New User</DialogTitle>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<label htmlFor="displayName" className="text-sm font-medium">
								Display Name
							</label>
							<Input
								id="displayName"
								placeholder="e.g., Mike"
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="code" className="text-sm font-medium">
								Code (unique identifier)
							</label>
							<Input
								id="code"
								placeholder="e.g., mike"
								value={newCode}
								onChange={(e) =>
									setNewCode(e.target.value.toLowerCase().replace(/\s/g, ""))
								}
							/>
							<p className="text-xs text-muted-foreground">
								A short code to identify you (no spaces, lowercase)
							</p>
						</div>
						{fetcher.data?.error && (
							<p className="text-sm text-destructive">{fetcher.data.error}</p>
						)}
						<Button
							onClick={handleCreateUser}
							disabled={
								!newName.trim() ||
								!newCode.trim() ||
								fetcher.state === "submitting"
							}
							className="w-full"
						>
							{fetcher.state === "submitting" ? "Creating..." : "Create User"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
			{selectedUser && (
				<span className="text-sm font-medium text-foreground">
					{selectedUser.displayName}
				</span>
			)}
		</div>
	);
};

export const PracticeStrategy = () => (
	<Collapsible>
		<CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left group border border-border">
			<Lightbulb size={18} className="text-honey" />
			<span className="font-medium text-foreground">
				How to Practice Effectively
			</span>
			<ChevronDown
				size={16}
				className="ml-auto text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
			/>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="mt-4 info-box-tip">
				<div className="grid md:grid-cols-3 gap-6 text-sm">
					<div>
						<h4 className="info-box-tip-title mb-2">Step 1: Foundation</h4>
						<ul className="space-y-1.5 text-foreground/80">
							<li>Start with Pronouns (most frequent words)</li>
							<li>Master object pronouns first (με, σε, τον...)</li>
							<li>Practice until 80%+ accuracy</li>
						</ul>
					</div>
					<div>
						<h4 className="info-box-tip-title mb-2">Step 2: Build Up</h4>
						<ul className="space-y-1.5 text-foreground/80">
							<li>Add Articles (τον/την/το patterns)</li>
							<li>Learn essential Verbs (έχω, θέλω, μπορώ)</li>
							<li>Connect grammar to real phrases</li>
						</ul>
					</div>
					<div>
						<h4 className="info-box-tip-title mb-2">Step 3: Apply</h4>
						<ul className="space-y-1.5 text-foreground/80">
							<li>Practice Vocabulary in context</li>
							<li>Return to weaker areas regularly</li>
							<li>Short daily sessions beat long cramming</li>
						</ul>
					</div>
				</div>
			</div>
		</CollapsibleContent>
	</Collapsible>
);

const StatsBanner = ({ stats }: { stats: PracticeStats }) => (
	<div className="grid grid-cols-3 gap-4">
		<div className="stat-card-streak">
			<Flame className="stat-card-streak-icon" size={24} />
			<div>
				<p className="stat-card-streak-value">{stats.streak}</p>
				<p className="stat-card-streak-label">Day Streak</p>
			</div>
		</div>
		<div className="stat-card-success">
			<Trophy className="stat-card-success-icon" size={24} />
			<div>
				<p className="stat-card-success-value">{stats.totalLearned}</p>
				<p className="stat-card-success-label">Learned</p>
			</div>
		</div>
		<div className="stat-card-due">
			<Clock className="stat-card-due-icon" size={24} />
			<div>
				<p className="stat-card-due-value">{stats.dueCount}</p>
				<p className="stat-card-due-label">Due Today</p>
			</div>
		</div>
	</div>
);

export type PracticeLoaderData = Awaited<ReturnType<typeof loader>>;

const TAB_COLORS = {
	pronouns: {
		active: "border-b-2 border-b-ocean text-ocean",
		icon: "text-ocean",
	},
	articles: {
		active: "border-b-2 border-b-olive text-olive",
		icon: "text-olive",
	},
	verbs: {
		active: "border-b-2 border-b-honey text-honey",
		icon: "text-honey",
	},
	vocabulary: {
		active: "border-b-2 border-b-ocean text-ocean",
		icon: "text-ocean",
	},
	review: {
		active: "border-b-2 border-b-terracotta text-terracotta",
		icon: "text-terracotta",
	},
} as const;

const TABS = [
	{ id: "pronouns", label: "Pronouns", shortLabel: "Pro", icon: Users },
	{ id: "articles", label: "Articles", shortLabel: "Art", icon: FileText },
	{ id: "verbs", label: "Verbs", shortLabel: "Vrb", icon: Zap },
	{
		id: "vocabulary",
		label: "Vocabulary",
		shortLabel: "Vocab",
		icon: BookOpen,
	},
	{ id: "review", label: "Review", shortLabel: "Rev", icon: Clock },
] as const;

export default function PracticeLayout({ loaderData }: Route.ComponentProps) {
	const { users, stats } = loaderData;
	const [searchParams, setSearchParams] = useSearchParams();
	const revalidator = useRevalidator();
	const location = useLocation();

	const pathSegments = location.pathname.split("/").filter(Boolean);
	const activeTab = pathSegments[1] || "pronouns";

	const handleUserChange = (userId: string) => {
		setSearchParams({ userId });
		revalidator.revalidate();
	};

	const buildTabUrl = (tabId: string) => {
		const userId = searchParams.get("userId");
		const base = `/practice/${tabId}`;
		return userId ? `${base}?userId=${userId}` : base;
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
				<div>
					<h2 className="text-2xl font-bold text-foreground">Practice</h2>
					<p className="text-muted-foreground mt-1">
						Interactive drills to build fluency
					</p>
				</div>
				<UserSelector users={users} onUserChange={handleUserChange} />
			</div>

			{stats && <StatsBanner stats={stats} />}

			<Tabs value={activeTab}>
				<TabsList className="flex-wrap h-auto gap-1">
					{TABS.map((tab) => {
						const isActive = activeTab === tab.id;
						const colors = TAB_COLORS[tab.id];
						return (
							<TabsTrigger
								key={tab.id}
								value={tab.id}
								asChild
								className={`gap-1.5 relative ${isActive ? colors.active : ""}`}
							>
								<Link to={buildTabUrl(tab.id)}>
									<tab.icon size={16} className={isActive ? colors.icon : ""} />
									<span className="hidden sm:inline">{tab.label}</span>
									<span className="sm:hidden">{tab.shortLabel}</span>
									{tab.id === "review" && stats && stats.dueCount > 0 && (
										<span className="absolute -top-1 -right-1 bg-terracotta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
											{stats.dueCount > 99 ? "99+" : stats.dueCount}
										</span>
									)}
								</Link>
							</TabsTrigger>
						);
					})}
				</TabsList>
			</Tabs>

			<Outlet context={loaderData} />
		</div>
	);
}
