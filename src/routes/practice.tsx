import { useState, useEffect } from "react";
import { Users, BookOpen, Languages, MessageCircle, ChevronDown, Lightbulb, UserPlus, Clock, Flame, Trophy } from "lucide-react";
import { useSearchParams, useFetcher, useRevalidator } from "react-router";
import type { Route } from "./+types/practice";
import { eq } from "drizzle-orm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
import PronounDrill from "./practice/PronounDrill";
import VerbDrill from "./practice/VerbDrill";
import ArticleDrill from "./practice/ArticleDrill";
import VocabularyDrill from "./practice/VocabularyDrill";
import ReviewDrill from "./practice/ReviewDrill";
import type { VocabItemWithSkill, PracticeStats } from "./practice/queries.server";

export function meta() {
	return [
		{ title: "Practice - Greek Learning" },
		{ name: "description", content: "Interactive drills for Greek grammar and vocabulary" },
	];
}

export const loader = async ({ context, request }: Route.LoaderArgs) => {
	const db = context?.db ?? (await import("../db")).db;
	const { users } = await import("../db/schema");
	const { getItemsDueForReview, getPracticeStats } = await import("./practice/queries.server");

	const url = new URL(request.url);
	const userIdParam = url.searchParams.get("userId");
	const userId = userIdParam ? parseInt(userIdParam, 10) : null;

	const allUsers = await db.select().from(users).orderBy(users.displayName);

	// If a user is selected, get their review items and stats
	let reviewItems: VocabItemWithSkill[] = [];
	let stats: PracticeStats | null = null;

	if (userId) {
		reviewItems = await getItemsDueForReview(db, userId);
		stats = await getPracticeStats(db, userId);
	}

	return { users: allUsers, reviewItems, stats };
};

export const action = async ({ request, context }: Route.ActionArgs) => {
	const db = context?.db ?? (await import("../db")).db;
	const { users } = await import("../db/schema");
	const { startSession, recordAttempt, completeSession } = await import("./practice/actions.server");

	const formData = await request.formData();
	const intent = formData.get("intent");

	if (intent === "createUser") {
		const displayName = formData.get("displayName") as string;
		const code = formData.get("code") as string;

		if (!displayName || !code) {
			return { error: "Name and code are required" };
		}

		const existingUser = await db.select().from(users).where(eq(users.code, code.toLowerCase()));
		if (existingUser.length > 0) {
			return { error: "A user with this code already exists" };
		}

		const [newUser] = await db
			.insert(users)
			.values({
				displayName,
				code: code.toLowerCase(),
			})
			.returning();

		return { success: true, user: newUser };
	}

	if (intent === "startSession") {
		const userId = parseInt(formData.get("userId") as string, 10);
		const sessionType = formData.get("sessionType") as string;

		const session = await startSession(db, {
			userId,
			sessionType: sessionType as "vocab_quiz" | "case_drill" | "conjugation_drill" | "weak_area_focus",
			category: formData.get("category") as string || undefined,
			focusArea: formData.get("focusArea") as string || undefined,
		});

		return { success: true, session };
	}

	if (intent === "recordAttempt") {
		const userId = parseInt(formData.get("userId") as string, 10);
		const sessionId = formData.get("sessionId") ? parseInt(formData.get("sessionId") as string, 10) : undefined;
		const vocabularyId = formData.get("vocabularyId") ? parseInt(formData.get("vocabularyId") as string, 10) : undefined;

		const attempt = await recordAttempt(db, {
			userId,
			sessionId,
			vocabularyId,
			questionText: formData.get("questionText") as string,
			correctAnswer: formData.get("correctAnswer") as string,
			userAnswer: formData.get("userAnswer") as string,
			isCorrect: formData.get("isCorrect") === "true",
			timeTaken: parseInt(formData.get("timeTaken") as string, 10),
			skillType: (formData.get("skillType") as "recognition" | "production") || "recognition",
			weakAreaType: formData.get("weakAreaType") as "case" | "gender" | "verb_family" | undefined,
			weakAreaIdentifier: formData.get("weakAreaIdentifier") as string || undefined,
		});

		return { success: true, attempt };
	}

	if (intent === "completeSession") {
		const sessionId = parseInt(formData.get("sessionId") as string, 10);
		const totalQuestions = parseInt(formData.get("totalQuestions") as string, 10);
		const correctAnswers = parseInt(formData.get("correctAnswers") as string, 10);

		const session = await completeSession(db, {
			sessionId,
			totalQuestions,
			correctAnswers,
		});

		return { success: true, session };
	}

	return { error: "Unknown action" };
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
		// Check URL first, then localStorage
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
			{ method: "post" }
		);
	};

	// Auto-select newly created user
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
			<span className="text-sm text-gray-500">Practicing as:</span>
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
								className="relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground text-blue-600"
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
								onChange={(e) => setNewCode(e.target.value.toLowerCase().replace(/\s/g, ""))}
							/>
							<p className="text-xs text-gray-500">
								A short code to identify you (no spaces, lowercase)
							</p>
						</div>
						{fetcher.data?.error && (
							<p className="text-sm text-red-600">{fetcher.data.error}</p>
						)}
						<Button
							onClick={handleCreateUser}
							disabled={!newName.trim() || !newCode.trim() || fetcher.state === "submitting"}
							className="w-full"
						>
							{fetcher.state === "submitting" ? "Creating..." : "Create User"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
			{selectedUser && (
				<span className="text-sm font-medium text-gray-700">{selectedUser.displayName}</span>
			)}
		</div>
	);
};

const PracticeStrategy = () => (
	<Collapsible>
		<CollapsibleTrigger className="flex items-center gap-2 w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left group border border-gray-200">
			<Lightbulb size={18} className="text-amber-600" />
			<span className="font-medium text-gray-700">How to Practice Effectively</span>
			<ChevronDown size={16} className="ml-auto text-gray-500 transition-transform group-data-[state=open]:rotate-180" />
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="mt-4 p-4 rounded-lg bg-amber-50/50 border border-amber-200">
				<div className="grid md:grid-cols-3 gap-6 text-sm">
					<div>
						<h4 className="font-semibold text-amber-800 mb-2">Step 1: Foundation</h4>
						<ul className="space-y-1.5 text-gray-700">
							<li>Start with Pronouns (most frequent words)</li>
							<li>Master object pronouns first (με, σε, τον...)</li>
							<li>Practice until 80%+ accuracy</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-amber-800 mb-2">Step 2: Build Up</h4>
						<ul className="space-y-1.5 text-gray-700">
							<li>Add Articles (τον/την/το patterns)</li>
							<li>Learn essential Verbs (έχω, θέλω, μπορώ)</li>
							<li>Connect grammar to real phrases</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-amber-800 mb-2">Step 3: Apply</h4>
						<ul className="space-y-1.5 text-gray-700">
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
		<div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
			<Flame className="text-orange-500" size={24} />
			<div>
				<p className="text-2xl font-bold text-orange-700">{stats.streak}</p>
				<p className="text-xs text-orange-600">Day Streak</p>
			</div>
		</div>
		<div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
			<Trophy className="text-green-500" size={24} />
			<div>
				<p className="text-2xl font-bold text-green-700">{stats.itemsMastered}</p>
				<p className="text-xs text-green-600">Mastered</p>
			</div>
		</div>
		<div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
			<Clock className="text-purple-500" size={24} />
			<div>
				<p className="text-2xl font-bold text-purple-700">{stats.dueCount}</p>
				<p className="text-xs text-purple-600">Due Today</p>
			</div>
		</div>
	</div>
);

export default function PracticeRoute({ loaderData }: Route.ComponentProps) {
	const { users, reviewItems, stats } = loaderData;
	const [searchParams, setSearchParams] = useSearchParams();
	const revalidator = useRevalidator();
	const activeTab = searchParams.get("tab") || "pronouns";

	const handleTabChange = (value: string) => {
		const userId = searchParams.get("userId");
		const newParams: Record<string, string> = { tab: value };
		if (userId) newParams.userId = userId;
		setSearchParams(newParams);
	};

	const handleUserChange = (userId: string) => {
		const tab = searchParams.get("tab") || "pronouns";
		setSearchParams({ tab, userId });
		// Revalidate to get user-specific data
		revalidator.revalidate();
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
				<div>
					<h2 className="text-2xl font-bold text-gray-800">Practice</h2>
					<p className="text-gray-600 mt-1">Interactive drills to build fluency</p>
				</div>
				<UserSelector users={users} onUserChange={handleUserChange} />
			</div>

			{stats && <StatsBanner stats={stats} />}

			<Tabs value={activeTab} onValueChange={handleTabChange}>
				<TabsList className="flex-wrap h-auto gap-1">
					<TabsTrigger value="pronouns" className="gap-1.5">
						<Users size={16} />
						<span className="hidden sm:inline">Pronouns</span>
						<span className="sm:hidden">Pro</span>
					</TabsTrigger>
					<TabsTrigger value="articles" className="gap-1.5">
						<BookOpen size={16} />
						<span className="hidden sm:inline">Articles</span>
						<span className="sm:hidden">Art</span>
					</TabsTrigger>
					<TabsTrigger value="verbs" className="gap-1.5">
						<Languages size={16} />
						<span className="hidden sm:inline">Verbs</span>
						<span className="sm:hidden">Vrb</span>
					</TabsTrigger>
					<TabsTrigger value="vocabulary" className="gap-1.5">
						<MessageCircle size={16} />
						<span className="hidden sm:inline">Vocabulary</span>
						<span className="sm:hidden">Vocab</span>
					</TabsTrigger>
					<TabsTrigger value="review" className="gap-1.5 relative">
						<Clock size={16} />
						<span className="hidden sm:inline">Review</span>
						<span className="sm:hidden">Rev</span>
						{stats && stats.dueCount > 0 && (
							<span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
								{stats.dueCount > 99 ? "99+" : stats.dueCount}
							</span>
						)}
					</TabsTrigger>
				</TabsList>

				<TabsContent value="pronouns">
					<div className="space-y-4">
						<PronounDrill />
						<PracticeStrategy />
					</div>
				</TabsContent>

				<TabsContent value="articles">
					<div className="space-y-4">
						<ArticleDrill />
						<PracticeStrategy />
					</div>
				</TabsContent>

				<TabsContent value="verbs">
					<div className="space-y-4">
						<VerbDrill />
						<PracticeStrategy />
					</div>
				</TabsContent>

				<TabsContent value="vocabulary">
					<div className="space-y-4">
						<VocabularyDrill />
						<PracticeStrategy />
					</div>
				</TabsContent>

				<TabsContent value="review">
					<div className="space-y-4">
						{searchParams.get("userId") ? (
							<ReviewDrill items={reviewItems} />
						) : (
							<div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
								<div className="text-5xl mb-4">👤</div>
								<h3 className="text-xl font-semibold text-gray-700 mb-2">Select a user</h3>
								<p className="text-gray-600">Choose a user from the dropdown above to see your review items.</p>
							</div>
						)}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
