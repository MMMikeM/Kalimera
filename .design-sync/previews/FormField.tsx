import { Button, Card, FormField } from "kalimera";

export const SignIn = () => (
	<div className="p-4">
		<Card className="w-full max-w-sm p-6">
			<form className="space-y-6">
				<div className="space-y-4">
					<FormField
						name="username"
						label="Username"
						autoComplete="username"
						autoCapitalize="none"
						autoCorrect="off"
						placeholder="Enter your username"
					/>
					<FormField
						name="password"
						label="Password"
						type="password"
						autoComplete="current-password"
						placeholder="Enter your password"
					/>
				</div>
				<Button type="submit" variant="primary" className="w-full">
					Sign in
				</Button>
			</form>
		</Card>
	</div>
);

export const WithError = () => (
	<div className="max-w-sm p-4">
		<FormField
			name="confirmPassword"
			label="Confirm password"
			type="password"
			defaultValue="kalimera"
			error="The two passwords don't match."
		/>
	</div>
);

export const Disabled = () => (
	<div className="max-w-sm p-4">
		<FormField name="username" label="Username" defaultValue="eleni" disabled />
	</div>
);
