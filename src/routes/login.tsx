import { useState, useEffect } from "react";
import { useNavigate, useFetcher, Link } from "react-router";
import { LogIn, KeyRound, Loader2 } from "lucide-react";
import { startAuthentication } from "@simplewebauthn/browser";
import type { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/browser";
import type { Route } from "./+types/login";
import { findUserByUsername, getUserPasswordHash } from "@/db/queries/auth";
import { verifyPassword } from "@/lib/password";
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
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	if (!username || !password) {
		return { success: false, error: "Please enter username and password" };
	}

	const user = await findUserByUsername(username);
	if (!user) {
		return { success: false, error: "Invalid username or password" };
	}

	const passwordHash = await getUserPasswordHash(user.id);
	if (!passwordHash) {
		return { success: false, error: "Invalid username or password" };
	}

	const isValid = await verifyPassword(passwordHash, password);
	if (!isValid) {
		return { success: false, error: "Invalid username or password" };
	}

	return { success: true, userId: user.id, username: user.username };
};

export default function LoginRoute(_props: Route.ComponentProps) {
	const navigate = useNavigate();
	const fetcher = useFetcher<{
		success: boolean;
		userId?: number;
		username?: string;
		error?: string;
	}>();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passkeyError, setPasskeyError] = useState<string | null>(null);
	const [isPasskeyLoading, setIsPasskeyLoading] = useState(false);

	const isSubmitting = fetcher.state === "submitting";
	const error = fetcher.data?.error || passkeyError;

	useEffect(() => {
		if (fetcher.data?.success && fetcher.data?.userId && fetcher.data?.username) {
			localStorage.setItem(
				AUTH_STORAGE_KEY,
				JSON.stringify({ userId: fetcher.data.userId, username: fetcher.data.username }),
			);
			navigate("/");
		}
	}, [fetcher.data, navigate]);

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
				navigate("/");
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
						</div>
					</div>

					{error && (
						<p className="text-sm text-red-600 text-center">{error}</p>
					)}

					<div className="space-y-3">
						<Button
							type="submit"
							variant="primary"
							className="w-full"
							disabled={!username || !password || isSubmitting || isPasskeyLoading}
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
