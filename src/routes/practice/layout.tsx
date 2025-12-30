import { useState, useEffect } from "react";
import {
	Users,
	BookOpen,
	UserPlus,
	Clock,
	FileText,
	Zap,
} from "lucide-react";
import {
	Outlet,
	useSearchParams,
	useFetcher,
	useRevalidator,
	useLocation,
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
import { NavTabs, type NavTab } from "@/components";
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

	// Sync localStorage userId to URL on mount if URL doesn't have it
	useEffect(() => {
		const urlUserId = searchParams.get("userId");
		if (!urlUserId && selectedUserId) {
			onUserChange?.(selectedUserId);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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

export type PracticeLoaderData = Awaited<ReturnType<typeof loader>>;

const PRACTICE_TABS: NavTab[] = [
	{ id: "speed", label: "Speed Drill", shortLabel: "Speed", icon: <Zap size={16} />, color: "terracotta" },
	{ id: "pronouns", label: "Pronouns", shortLabel: "Pro", icon: <Users size={16} />, color: "ocean" },
	{ id: "articles", label: "Articles", shortLabel: "Art", icon: <FileText size={16} />, color: "olive" },
	{ id: "verbs", label: "Verbs", shortLabel: "Vrb", icon: <Zap size={16} />, color: "honey" },
	{ id: "vocabulary", label: "Vocabulary", shortLabel: "Vocab", icon: <BookOpen size={16} />, color: "ocean" },
	{ id: "review", label: "Review", shortLabel: "Rev", icon: <Clock size={16} />, color: "terracotta" },
];

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
		<div className="space-y-4">
			{/* Compact header - just tabs and user selector */}
			<div className="flex items-center justify-between gap-4">
				<NavTabs
					tabs={PRACTICE_TABS.map((tab) =>
						tab.id === "review" && stats?.dueCount
							? { ...tab, badge: stats.dueCount }
							: tab
					)}
					activeTab={activeTab}
					buildUrl={buildTabUrl}
				/>
				<UserSelector users={users} onUserChange={handleUserChange} />
			</div>

			{/* Drill content - takes full available space */}
			<Outlet context={loaderData} />
		</div>
	);
}
