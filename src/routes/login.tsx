import { useState, useEffect } from "react";
import { useFetcher, Link } from "react-router";
import { LogIn, KeyRound, Loader2 } from "lucide-react";
import { startAuthentication } from "@simplewebauthn/browser";
import type { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/browser";
import type { Route } from "./+types/login";
import {
	findUserByCode,
	findUserByUsername,
	getUserPasswordHash,
	setUserPassword,
} from "@/db/queries/auth";
import { hashPassword, verifyPassword } from "@/lib/password";
import { Card } from "@/components/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AUTH_STORAGE_KEY = "greek-authenticated-user";

export function meta() {
	return [
		{ title: "Login - Greek Learning" },
		{ name: "description", content: "Sign in to track your Greek learning progress" },
	];
}

export const loader = async () => {
	return {};
};

export const action = async ({ request }: Route.ActionArgs) => {
	const formData = await request.formData();
	const intent = formData.get("intent") as string;
	const identifier = formData.get("username") as string;
	const password = formData.get("password") as string;

	if (!identifier) {
		return { success: false, error: "Please enter username" };
	}

	// Handle password setup for existing users
	if (intent === "setup-password") {
		const newPassword = formData.get("newPassword") as string;
		const confirmPassword = formData.get("confirmPassword") as string;
		const userId = formData.get("userId") as string;

		if (!newPassword || newPassword.length < 4) {
			return {
				success: false,
				error: "Password must be at least 4 characters",
				needsPasswordSetup: true,
				userId: Number(userId),
				userCode: identifier,
			};
		}

		if (newPassword !== confirmPassword) {
			return {
				success: false,
				error: "Passwords do not match",
				needsPasswordSetup: true,
				userId: Number(userId),
				userCode: identifier,
			};
		}

		const hash = await hashPassword(newPassword);
		await setUserPassword(Number(userId), hash, identifier);

		return { success: true, userId: Number(userId), username: identifier.toLowerCase() };
	}

	// Try to find user by username first, then by code (for legacy users)
	let user = await findUserByUsername(identifier);
	if (!user) {
		user = await findUserByCode(identifier);
	}

	if (!user) {
		return { success: false, error: "User not found" };
	}

	const passwordHash = await getUserPasswordHash(user.id);

	// User exists but has no password - needs to set one up
	if (!passwordHash) {
		return {
			success: false,
			needsPasswordSetup: true,
			userId: user.id,
			userCode: user.code,
			displayName: user.displayName,
		};
	}

	// Normal login flow
	if (!password) {
		return { success: false, error: "Please enter your password" };
	}

	const isValid = await verifyPassword(passwordHash, password);
	if (!isValid) {
		return { success: false, error: "Invalid password" };
	}

	return { success: true, userId: user.id, username: user.username || user.code };
};

export default function LoginRoute(_props: Route.ComponentProps) {
	const fetcher = useFetcher<{
		success: boolean;
		userId?: number;
		username?: string;
		error?: string;
		needsPasswordSetup?: boolean;
		userCode?: string;
		displayName?: string;
	}>();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passkeyError, setPasskeyError] = useState<string | null>(null);
	const [isPasskeyLoading, setIsPasskeyLoading] = useState(false);

	const isSubmitting = fetcher.state === "submitting";
	const error = fetcher.data?.error || passkeyError;
	const needsPasswordSetup = fetcher.data?.needsPasswordSetup;

	useEffect(() => {
		if (fetcher.data?.success && fetcher.data?.userId && fetcher.data?.username) {
			localStorage.setItem(
				AUTH_STORAGE_KEY,
				JSON.stringify({ userId: fetcher.data.userId, username: fetcher.data.username }),
			);
			// Full page reload to ensure Root remounts and reads fresh auth state
			window.location.href = "/";
		}
	}, [fetcher.data]);

	const handlePasskeyLogin = async () => {
		setPasskeyError(null);
		setIsPasskeyLoading(true);

		try {
			const optionsResponse = await fetch("/api/webauthn/auth-options", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: username || undefined }),
			});

			if (!optionsResponse.ok) {
				const errorData = (await optionsResponse.json()) as { error?: string };
				throw new Error(errorData.error || "Failed to get authentication options");
			}

			const options: PublicKeyCredentialRequestOptionsJSON = await optionsResponse.json();

			const authResponse = await startAuthentication({ optionsJSON: options });

			const verifyResponse = await fetch("/api/webauthn/auth-verify", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					response: authResponse,
					challenge: options.challenge,
				}),
			});

			if (!verifyResponse.ok) {
				const errorData = (await verifyResponse.json()) as { error?: string };
				throw new Error(errorData.error || "Authentication failed");
			}

			const result = (await verifyResponse.json()) as {
				verified: boolean;
				userId: number;
				username?: string;
			};

			if (result.verified && result.userId) {
				localStorage.setItem(
					AUTH_STORAGE_KEY,
					JSON.stringify({ userId: result.userId, username: result.username || "user" }),
				);
				// Full page reload to ensure Root remounts and reads fresh auth state
				window.location.href = "/";
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "Passkey authentication failed";
			if (message.includes("not allowed") || message.includes("AbortError")) {
				setPasskeyError("Authentication was cancelled");
			} else {
				setPasskeyError(message);
			}
		} finally {
			setIsPasskeyLoading(false);
		}
	};

	// Password setup form for existing users
	if (needsPasswordSetup) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 px-4">
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-serif text-terracotta">Set Up Your Password</h1>
					<p className="text-stone-600">
						Welcome back{fetcher.data?.displayName ? `, ${fetcher.data.displayName}` : ""}! Please create a password for your account.
					</p>
				</div>

				<Card className="w-full max-w-sm p-6">
					<fetcher.Form method="post" className="space-y-6">
						<input type="hidden" name="intent" value="setup-password" />
						<input type="hidden" name="userId" value={fetcher.data?.userId} />
						<input type="hidden" name="username" value={fetcher.data?.userCode || username} />

						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="newPassword">New Password</Label>
								<Input
									id="newPassword"
									name="newPassword"
									type="password"
									autoComplete="new-password"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									disabled={isSubmitting}
									placeholder="Choose a password"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
								<Input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									autoComplete="new-password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									disabled={isSubmitting}
									placeholder="Confirm your password"
								/>
							</div>
						</div>

						{error && <p className="text-sm text-red-600 text-center">{error}</p>}

						<Button
							type="submit"
							variant="primary"
							className="w-full"
							disabled={!newPassword || !confirmPassword || isSubmitting}
						>
							{isSubmitting ? (
								<>
									<Loader2 size={16} className="animate-spin" />
									Setting up...
								</>
							) : (
								<>
									Set Password
									<LogIn size={16} />
								</>
							)}
						</Button>
					</fetcher.Form>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 px-4">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-serif text-terracotta">Welcome Back</h1>
				<p className="text-stone-600">Sign in to continue learning Greek</p>
			</div>

			<Card className="w-full max-w-sm p-6">
				<fetcher.Form method="post" className="space-y-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								name="username"
								type="text"
								autoComplete="username"
								autoCapitalize="none"
								autoCorrect="off"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								disabled={isSubmitting || isPasskeyLoading}
								placeholder="Enter your username"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isSubmitting || isPasskeyLoading}
								placeholder="Enter your password"
							/>
							<div className="mt-3 p-3 bg-ocean-100 border border-ocean-300 rounded-lg">
								<p className="text-sm text-ocean-800 font-medium">
									Existing user? Enter your code without a password to set one up.
								</p>
							</div>
						</div>
					</div>

					{error && <p className="text-sm text-red-600 text-center">{error}</p>}

					<div className="space-y-3">
						<Button
							type="submit"
							variant="primary"
							className="w-full"
							disabled={!username || isSubmitting || isPasskeyLoading}
						>
							{isSubmitting ? (
								<>
									<Loader2 size={16} className="animate-spin" />
									Signing in...
								</>
							) : (
								<>
									Sign in
									<LogIn size={16} />
								</>
							)}
						</Button>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t border-stone-200" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-white px-2 text-stone-500">or</span>
							</div>
						</div>

						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={handlePasskeyLogin}
							disabled={isSubmitting || isPasskeyLoading}
						>
							{isPasskeyLoading ? (
								<>
									<Loader2 size={16} className="animate-spin" />
									Authenticating...
								</>
							) : (
								<>
									<KeyRound size={16} />
									Sign in with passkey
								</>
							)}
						</Button>
					</div>
				</fetcher.Form>

				<div className="mt-6 text-center text-sm text-stone-600">
					Don't have an account?{" "}
					<Link
						to="/register"
						className="text-terracotta hover:text-terracotta-dark font-medium"
					>
						Create one
					</Link>
				</div>
			</Card>
		</div>
	);
}
