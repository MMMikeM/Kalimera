import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, Check, KeyRound, UserPlus } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { setStoredAuth } from "@/lib/auth-storage";
import { usePasskeyRegistration } from "@/lib/hooks/use-passkey-registration";
import { registerFn } from "@/server/fns/auth";

export const Route = createFileRoute("/(auth)/register")({
	component: RegisterRoute,
});

function RegisterRoute() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [registeredUser, setRegisteredUser] = useState<{ userId: number; username: string } | null>(
		null,
	);

	const passkey = usePasskeyRegistration({
		userId: registeredUser?.userId ?? 0,
		username: registeredUser?.username ?? "",
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
		const fd = new FormData(e.currentTarget);
		try {
			const result = await registerFn({
				data: {
					username: fd.get("username") as string,
					displayName: fd.get("displayName") as string,
					password: fd.get("password") as string,
					confirmPassword: fd.get("confirmPassword") as string,
				},
			});
			if (result.success) {
				setRegisteredUser({ userId: result.userId, username: result.username });
			} else {
				setError(result.error);
			}
		} catch (err) {
			if (err && typeof err === "object" && "to" in err) throw err;
			setError("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleComplete = () => {
		if (registeredUser) {
			setStoredAuth(registeredUser);
			router.invalidate().then(() => router.navigate({ to: "/" }));
		}
	};

	if (registeredUser) {
		return (
			<div className="flex min-h-page flex-col items-center justify-center space-y-8">
				<div className="space-y-2 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
						<Check size={32} className="text-green-600" />
					</div>
					<h1 className="font-serif text-3xl text-terracotta">Account Created</h1>
					<p className="text-stone-600">Welcome to Greek Learning!</p>
				</div>

				<Card className="w-full max-w-md p-6">
					<div className="space-y-6">
						<div className="text-center">
							<KeyRound size={48} className="mx-auto mb-3 text-terracotta" />
							<h2 className="text-xl font-medium">Set Up Passkey</h2>
							<p className="mt-1 text-sm text-stone-500">
								Use Face ID, Touch ID, or your device PIN for faster sign-in next time.
							</p>
						</div>

						{passkey.state === "error" && (
							<div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
								<AlertCircle size={16} />
								{passkey.error || "Failed to set up passkey"}
							</div>
						)}

						{passkey.state === "success" ? (
							<div className="space-y-4">
								<div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
									<Check size={16} />
									Passkey set up successfully!
								</div>
								<Button variant="primary" className="w-full" onClick={handleComplete}>
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
									disabled={passkey.state === "loading"}
								>
									Skip for Now
								</Button>
								<Button
									variant="primary"
									className="flex-1"
									onClick={passkey.register}
									disabled={passkey.state === "loading"}
								>
									{passkey.state === "loading" ? "Setting up..." : "Set Up Passkey"}
									{passkey.state !== "loading" && <KeyRound size={16} />}
								</Button>
							</div>
						)}
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex min-h-page flex-col items-center justify-center space-y-8">
			<div className="space-y-2 text-center">
				<h1 className="font-serif text-3xl text-terracotta">Create Account</h1>
				<p className="text-stone-600">Start your Greek learning journey</p>
			</div>

			<Card className="w-full max-w-md p-6">
				<form onSubmit={handleSubmit} className="space-y-4">
					<FormField
						name="username"
						label="Username"
						placeholder="Choose a username"
						autoComplete="username"
					/>
					<FormField
						name="displayName"
						label="Display Name"
						placeholder="How should we call you?"
						autoComplete="name"
					/>
					<FormField
						name="password"
						label="Password"
						type="password"
						placeholder="At least 6 characters"
						autoComplete="new-password"
					/>
					<FormField
						name="confirmPassword"
						label="Confirm Password"
						type="password"
						placeholder="Re-enter your password"
						autoComplete="new-password"
					/>

					{error && (
						<div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
							<AlertCircle size={16} />
							{error}
						</div>
					)}

					<Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Creating Account..." : "Create Account"}
						{!isSubmitting && <UserPlus size={16} />}
					</Button>
				</form>
			</Card>

			<p className="text-sm text-stone-500">
				Already have an account?{" "}
				<Link to="/login" className="font-medium text-terracotta hover:underline">
					Sign in
				</Link>
			</p>
		</div>
	);
}
