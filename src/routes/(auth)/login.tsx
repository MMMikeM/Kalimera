import { createFileRoute, isRedirect } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { KeyRound, Loader2, LogIn } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { usePasskeyAuth } from "@/lib/hooks/use-passkey-auth";
import { loginFn, setupPasswordFn } from "@/server/fns/auth";

export const Route = createFileRoute("/(auth)/login")({
	component: LoginRoute,
});

function LoginRoute() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [needsPasswordSetup, setNeedsPasswordSetup] = useState<{
		userId: number;
		userCode: string;
		displayName: string | null;
	} | null>(null);

	const passkey = usePasskeyAuth({
		getUsername: () => {
			const el = document.querySelector<HTMLInputElement>('input[name="username"]');
			return el?.value || undefined;
		},
	});

	const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
		const fd = new FormData(e.currentTarget);
		try {
			const result = await loginFn({
				data: {
					username: fd.get("username") as string,
					password: (fd.get("password") as string) || undefined,
				},
			});
			// loginFn throws redirect on success — only reach here on error/needsSetup
			if ("needsPasswordSetup" in result && result.needsPasswordSetup) {
				setNeedsPasswordSetup({
					userId: result.userId,
					userCode: result.userCode,
					displayName: result.displayName,
				});
			} else if (!result.success) {
				setError(result.error);
			}
		} catch (err) {
			// redirect throws are handled by TanStack Router, re-throw them
			if (isRedirect(err)) throw err;
			setError("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handlePasswordSetupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
		const fd = new FormData(e.currentTarget);
		try {
			await setupPasswordFn({
				data: {
					newPassword: fd.get("newPassword") as string,
					confirmPassword: fd.get("confirmPassword") as string,
					userId: fd.get("userId") as string,
					username: fd.get("username") as string,
				},
			});
		} catch (err) {
			if (isRedirect(err)) throw err;
			setError("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const displayError = error || passkey.error;

	if (needsPasswordSetup) {
		return (
			<div className="flex min-h-page flex-col items-center justify-center space-y-8 px-4">
				<div className="space-y-2 text-center">
					<h1 className="font-serif text-3xl text-terracotta">Set Up Your Password</h1>
					<p className="text-stone-600">
						Welcome back
						{needsPasswordSetup.displayName ? `, ${needsPasswordSetup.displayName}` : ""}! Please
						create a password for your account.
					</p>
				</div>

				<Card className="w-full max-w-sm p-6">
					<form onSubmit={handlePasswordSetupSubmit} className="space-y-6">
						<input type="hidden" name="userId" value={needsPasswordSetup.userId} />
						<input type="hidden" name="username" value={needsPasswordSetup.userCode} />

						<div className="space-y-4">
							<FormField
								name="newPassword"
								label="New Password"
								type="password"
								autoComplete="new-password"
								placeholder="Choose a password"
								disabled={isSubmitting}
							/>
							<FormField
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								autoComplete="new-password"
								placeholder="Confirm your password"
								disabled={isSubmitting}
							/>
						</div>

						{displayError && <p className="text-center text-sm text-red-600">{displayError}</p>}

						<Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
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
					</form>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex min-h-page flex-col items-center justify-center space-y-8 px-4">
			<div className="space-y-2 text-center">
				<h1 className="font-serif text-3xl text-terracotta">Welcome Back</h1>
				<p className="text-stone-600">Sign in to continue learning Greek</p>
			</div>

			<Card className="w-full max-w-sm p-6">
				<form onSubmit={handleLoginSubmit} className="space-y-6">
					<div className="space-y-4">
						<FormField
							name="username"
							label="Username"
							autoComplete="username"
							autoCapitalize="none"
							autoCorrect="off"
							placeholder="Enter your username"
							disabled={isSubmitting || passkey.isLoading}
						/>

						<div className="space-y-2">
							<FormField
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								placeholder="Enter your password"
								disabled={isSubmitting || passkey.isLoading}
							/>
						</div>
					</div>

					{displayError && <p className="text-center text-sm text-red-600">{displayError}</p>}

					<div className="space-y-3">
						<Button
							type="submit"
							variant="primary"
							className="w-full"
							disabled={isSubmitting || passkey.isLoading}
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
							onClick={passkey.authenticate}
							disabled={isSubmitting || passkey.isLoading}
						>
							{passkey.isLoading ? (
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
				</form>

				<div className="mt-6 text-center text-sm text-stone-600">
					Don't have an account?{" "}
					<Link to="/register" className="font-medium text-terracotta hover:text-terracotta-dark">
						Create one
					</Link>
				</div>
			</Card>
		</div>
	);
}
