import { useState, useEffect } from "react";
import { useNavigate, useFetcher } from "react-router";
import { LogIn, User } from "lucide-react";
import type { Route } from "./+types/login";
import { getAllUsers, validateUserPin, userHasPin } from "@/db/queries";
import { Card } from "@/components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AUTH_STORAGE_KEY = "greek-authenticated-user";

export function meta() {
	return [
		{ title: "Login - Greek Learning" },
		{ name: "description", content: "Sign in to track your Greek learning progress" },
	];
}

export const loader = async () => {
	const users = await getAllUsers();
	const usersWithPinStatus = await Promise.all(
		users.map(async (user) => ({
			...user,
			hasPin: await userHasPin(user.id),
		}))
	);
	return { users: usersWithPinStatus };
};

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const userId = formData.get("userId") as string;
	const pin = formData.get("pin") as string;

	if (!userId) {
		return { success: false, error: "Please select a user" };
	}

	const userIdNum = parseInt(userId, 10);
	const hasPin = await userHasPin(userIdNum);

	if (hasPin) {
		if (!pin) {
			return { success: false, error: "Please enter your PIN", needsPin: true };
		}
		const result = await validateUserPin(userIdNum, pin);
		if (!result.valid) {
			return { success: false, error: result.error || "Invalid PIN", needsPin: true };
		}
	}

	return { success: true, userId: userIdNum };
};

export default function LoginRoute({ loaderData }: Route.ComponentProps) {
	const { users } = loaderData;
	const navigate = useNavigate();
	const fetcher = useFetcher<{
		success: boolean;
		userId?: number;
		error?: string;
		needsPin?: boolean;
	}>();

	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
	const [pin, setPin] = useState("");
	const [showPinInput, setShowPinInput] = useState(false);

	const selectedUser = users.find((u) => u.id === selectedUserId);

	useEffect(() => {
		if (fetcher.data?.success && fetcher.data?.userId) {
			localStorage.setItem(AUTH_STORAGE_KEY, fetcher.data.userId.toString());
			navigate("/");
		}
		if (fetcher.data?.needsPin) {
			setShowPinInput(true);
		}
	}, [fetcher.data, navigate]);

	const handleUserSelect = (userId: number) => {
		const user = users.find((u) => u.id === userId);
		setSelectedUserId(userId);
		setPin("");

		if (user?.hasPin) {
			setShowPinInput(true);
		} else {
			fetcher.submit({ userId: userId.toString() }, { method: "post" });
		}
	};

	const handlePinSubmit = () => {
		if (!selectedUserId) return;
		fetcher.submit(
			{ userId: selectedUserId.toString(), pin },
			{ method: "post" }
		);
	};

	const handleBack = () => {
		setSelectedUserId(null);
		setShowPinInput(false);
		setPin("");
	};

	const isSubmitting = fetcher.state === "submitting";

	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-serif text-terracotta">Welcome Back</h1>
				<p className="text-stone-600">Select your profile to continue learning</p>
			</div>

			{!showPinInput && (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
					{users.map((user) => (
						<button
							key={user.id}
							type="button"
							onClick={() => handleUserSelect(user.id)}
							disabled={isSubmitting}
							className="group"
						>
							<Card
								hover
								className="p-6 text-center transition-all group-hover:border-terracotta-300"
							>
								<div className="flex flex-col items-center gap-3">
									<div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-terracotta-50 transition-colors">
										<User
											size={32}
											className="text-stone-400 group-hover:text-terracotta-500 transition-colors"
										/>
									</div>
									<span className="font-medium text-lg">{user.displayName}</span>
								</div>
							</Card>
						</button>
					))}
				</div>
			)}

			{showPinInput && selectedUser && (
				<Card className="w-full max-w-sm p-6">
					<div className="space-y-6">
						<div className="text-center">
							<div className="w-16 h-16 rounded-full bg-terracotta-50 flex items-center justify-center mx-auto mb-3">
								<User size={32} className="text-terracotta-500" />
							</div>
							<h2 className="text-xl font-medium">{selectedUser.displayName}</h2>
							<p className="text-sm text-stone-500 mt-1">Enter your PIN to continue</p>
						</div>

						<div className="space-y-4">
							<Input
								type="password"
								inputMode="numeric"
								pattern="[0-9]*"
								maxLength={4}
								placeholder="Enter 4-digit PIN"
								value={pin}
								onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
								onKeyDown={(e) => {
									if (e.key === "Enter" && pin.length === 4) {
										handlePinSubmit();
									}
								}}
								autoFocus
								className="text-center text-2xl tracking-[0.5em] font-mono"
							/>

							{fetcher.data?.error && (
								<p className="text-sm text-red-600 text-center">
									{fetcher.data.error}
								</p>
							)}

							<div className="flex gap-3">
								<Button
									variant="outline"
									className="flex-1"
									onClick={handleBack}
									disabled={isSubmitting}
								>
									Back
								</Button>
								<Button
									variant="primary"
									className="flex-1"
									onClick={handlePinSubmit}
									disabled={pin.length < 4 || isSubmitting}
								>
									{isSubmitting ? "..." : "Continue"}
									{!isSubmitting && <LogIn size={16} />}
								</Button>
							</div>
						</div>
					</div>
				</Card>
			)}
		</div>
	);
}
