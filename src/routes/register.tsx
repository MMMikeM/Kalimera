import { useState, useEffect } from "react";
import { Link, useNavigate, useFetcher } from "react-router";
import { UserPlus, KeyRound, ArrowRight, Check, AlertCircle } from "lucide-react";
import { startRegistration } from "@simplewebauthn/browser";
import type { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/browser";
import type { Route } from "./+types/register";
import { createUserWithPassword, findUserByUsername } from "@/db/queries/auth";
import { hashPassword } from "@/lib/password";
import { Card } from "@/components/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AUTH_STORAGE_KEY = "greek-authenticated-user";

export function meta() {
	return [
		{ title: "Register - Greek Learning" },
		{ name: "description", content: "Create an account to track your Greek learning progress" },
	];
}

export const loader = async () => {
	return {};
};

type ActionData = {
	success: boolean;
	userId?: number;
	username?: string;
	error?: string;
	fieldErrors?: {
		username?: string;
		displayName?: string;
		password?: string;
		confirmPassword?: string;
	};
};

export const action = async ({ request }: Route.ActionArgs): Promise<ActionData> => {
	const formData = await request.formData();
	const username = (formData.get("username") as string)?.trim();
	const displayName = (formData.get("displayName") as string)?.trim();
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	const fieldErrors: ActionData["fieldErrors"] = {};

	if (!username || username.length < 3) {
		fieldErrors.username = "Username must be at least 3 characters";
	} else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
		fieldErrors.username = "Username can only contain letters, numbers, underscores, and hyphens";
	}

	if (!displayName || displayName.length < 1) {
		fieldErrors.displayName = "Display name is required";
	}

	if (!password || password.length < 6) {
		fieldErrors.password = "Password must be at least 6 characters";
	}

	if (password !== confirmPassword) {
		fieldErrors.confirmPassword = "Passwords do not match";
	}

	if (Object.keys(fieldErrors).length > 0) {
		return { success: false, fieldErrors };
	}

	const existingUser = await findUserByUsername(username);
	if (existingUser) {
		return { success: false, fieldErrors: { username: "Username already taken" } };
	}

	try {
		const passwordHash = await hashPassword(password);
		const newUser = await createUserWithPassword(username, displayName, passwordHash);

		if (!newUser) {
			return { success: false, error: "Failed to create account" };
		}

		return { success: true, userId: newUser.id, username: newUser.username ?? username };
	} catch (error) {
		console.error("Registration error:", error);
		const message = error instanceof Error ? error.message : "Failed to create account";
		return { success: false, error: message };
	}
};

type PasskeySetupState = "idle" | "loading" | "success" | "error";

export default function RegisterRoute(_props: Route.ComponentProps) {
	const navigate = useNavigate();
	const fetcher = useFetcher<ActionData>();

	const [username, setUsername] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [registeredUser, setRegisteredUser] = useState<{ userId: number; username: string } | null>(null);
	const [passkeyState, setPasskeyState] = useState<PasskeySetupState>("idle");
	const [passkeyError, setPasskeyError] = useState<string | null>(null);

	const isSubmitting = fetcher.state === "submitting";

	useEffect(() => {
		if (fetcher.data?.success && fetcher.data?.userId && fetcher.data?.username) {
			setRegisteredUser({ userId: fetcher.data.userId, username: fetcher.data.username });
		}
	}, [fetcher.data]);

	const handlePasskeySetup = async () => {
		if (!registeredUser) return;

		setPasskeyState("loading");
		setPasskeyError(null);

		try {
			const optionsResponse = await fetch("/api/webauthn/register-options", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: registeredUser.userId,
					username: registeredUser.username,
				}),
			});

			if (!optionsResponse.ok) {
				const errorData = await optionsResponse.json() as { error?: string };
				throw new Error(errorData.error || "Failed to get registration options");
			}

			const options: PublicKeyCredentialCreationOptionsJSON = await optionsResponse.json();

			const attestation = await startRegistration({ optionsJSON: options });

			const verifyResponse = await fetch("/api/webauthn/register-verify", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: registeredUser.userId,
					response: attestation,
					challenge: options.challenge,
				}),
			});

			if (!verifyResponse.ok) {
				const errorData = await verifyResponse.json() as { error?: string };
				throw new Error(errorData.error || "Failed to verify passkey");
			}

			setPasskeyState("success");
		} catch (error) {
			console.error("Passkey setup error:", error);
			setPasskeyState("error");
			setPasskeyError(error instanceof Error ? error.message : "Failed to set up passkey");
		}
	};

	const handleComplete = () => {
		if (registeredUser) {
			localStorage.setItem(
				AUTH_STORAGE_KEY,
				JSON.stringify({ userId: registeredUser.userId, username: registeredUser.username }),
			);
			navigate("/");
		}
	};

	if (registeredUser) {
		return (
			<div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
				<div className="text-center space-y-2">
					<div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
						<Check size={32} className="text-green-600" />
					</div>
					<h1 className="text-3xl font-serif text-terracotta">Account Created</h1>
					<p className="text-stone-600">Welcome to Greek Learning!</p>
				</div>

				<Card className="w-full max-w-md p-6">
					<div className="space-y-6">
						<div className="text-center">
							<KeyRound size={48} className="text-terracotta mx-auto mb-3" />
							<h2 className="text-xl font-medium">Set Up Passkey</h2>
							<p className="text-sm text-stone-500 mt-1">
								Use Face ID, Touch ID, or your device PIN for faster sign-in next time.
							</p>
						</div>

						{passkeyState === "error" && (
							<div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
								<AlertCircle size={16} />
								{passkeyError || "Failed to set up passkey"}
							</div>
						)}

						{passkeyState === "success" ? (
							<div className="space-y-4">
								<div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
									<Check size={16} />
									Passkey set up successfully!
								</div>
								<Button
									variant="primary"
									className="w-full"
									onClick={handleComplete}
								>
									Continue to App
									<ArrowRight size={16} />
								</Button>
							</div>
						) : (
							<div className="flex gap-3">
								<Button
									variant="outline"
									className="flex-1"
									onClick={handleComplete}
									disabled={passkeyState === "loading"}
								>
									Skip for Now
								</Button>
								<Button
									variant="primary"
									className="flex-1"
									onClick={handlePasskeySetup}
									disabled={passkeyState === "loading"}
								>
									{passkeyState === "loading" ? "Setting up..." : "Set Up Passkey"}
									{passkeyState !== "loading" && <KeyRound size={16} />}
								</Button>
							</div>
						)}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
			<div className="text-center space-y-2">
				<h1 className="text-3xl font-serif text-terracotta">Create Account</h1>
				<p className="text-stone-600">Start your Greek learning journey</p>
			</div>

			<Card className="w-full max-w-md p-6">
				<fetcher.Form method="post" className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="username" className="text-sm font-medium text-stone-700">
							Username
						</label>
						<Input
							id="username"
							name="username"
							type="text"
							placeholder="Choose a username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							autoComplete="username"
							aria-invalid={!!fetcher.data?.fieldErrors?.username}
						/>
						{fetcher.data?.fieldErrors?.username && (
							<p className="text-sm text-red-600">{fetcher.data.fieldErrors.username}</p>
						)}
					</div>

					<div className="space-y-2">
						<label htmlFor="displayName" className="text-sm font-medium text-stone-700">
							Display Name
						</label>
						<Input
							id="displayName"
							name="displayName"
							type="text"
							placeholder="How should we call you?"
							value={displayName}
							onChange={(e) => setDisplayName(e.target.value)}
							autoComplete="name"
							aria-invalid={!!fetcher.data?.fieldErrors?.displayName}
						/>
						{fetcher.data?.fieldErrors?.displayName && (
							<p className="text-sm text-red-600">{fetcher.data.fieldErrors.displayName}</p>
						)}
					</div>

					<div className="space-y-2">
						<label htmlFor="password" className="text-sm font-medium text-stone-700">
							Password
						</label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="At least 6 characters"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="new-password"
							aria-invalid={!!fetcher.data?.fieldErrors?.password}
						/>
						{fetcher.data?.fieldErrors?.password && (
							<p className="text-sm text-red-600">{fetcher.data.fieldErrors.password}</p>
						)}
					</div>

					<div className="space-y-2">
						<label htmlFor="confirmPassword" className="text-sm font-medium text-stone-700">
							Confirm Password
						</label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							placeholder="Re-enter your password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							autoComplete="new-password"
							aria-invalid={!!fetcher.data?.fieldErrors?.confirmPassword}
						/>
						{fetcher.data?.fieldErrors?.confirmPassword && (
							<p className="text-sm text-red-600">{fetcher.data.fieldErrors.confirmPassword}</p>
						)}
					</div>

					{fetcher.data?.error && (
						<div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
							<AlertCircle size={16} />
							{fetcher.data.error}
						</div>
					)}

					<Button
						type="submit"
						variant="primary"
						className="w-full"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Creating Account..." : "Create Account"}
						{!isSubmitting && <UserPlus size={16} />}
					</Button>
				</fetcher.Form>
			</Card>

			<p className="text-sm text-stone-500">
				Already have an account?{" "}
				<Link to="/login" className="text-terracotta hover:underline font-medium">
					Sign in
				</Link>
			</p>
		</div>
	);
}
