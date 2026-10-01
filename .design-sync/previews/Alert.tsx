import {
	Alert,
	AlertDescription,
	AlertTitle,
	GreekText,
} from "kalimera";

const CircleAlertIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<circle cx="12" cy="12" r="10" />
		<line x1="12" x2="12" y1="8" y2="12" />
		<line x1="12" x2="12.01" y1="16" y2="16" />
	</svg>
);

const LightbulbIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
		<path d="M9 18h6" />
		<path d="M10 22h4" />
	</svg>
);

const CheckIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M20 6 9 17l-5-5" />
	</svg>
);

export const SignInError = () => (
	<div className="max-w-sm p-4">
		<Alert variant="error">
			<CircleAlertIcon />
			<AlertDescription>That username and password don't match. Check both and try again.</AlertDescription>
		</Alert>
	</div>
);

export const Pattern = () => (
	<div className="max-w-sm p-4">
		<Alert variant="info">
			<AlertDescription>
				<p>
					<strong>Pattern:</strong> the Target drops the final -ς.
				</p>
				<GreekText as="p" size="inherit" tone="inherit">
					ο φίλος → τον φίλο
				</GreekText>
			</AlertDescription>
		</Alert>
	</div>
);

export const AccentWarning = () => (
	<div className="max-w-sm p-4">
		<Alert variant="warning">
			<LightbulbIcon />
			<AlertDescription>
				<p>The accent changes meaning completely!</p>
				<p>
					<GreekText size="inherit" tone="inherit">πότε</GreekText> when? ·{" "}
					<GreekText size="inherit" tone="inherit">ποτέ</GreekText> never
				</p>
			</AlertDescription>
		</Alert>
	</div>
);

export const PasskeyReady = () => (
	<div className="max-w-sm p-4">
		<Alert variant="success">
			<CheckIcon />
			<AlertDescription>Passkey set up. Next time, sign in with it instead of a password.</AlertDescription>
		</Alert>
	</div>
);

export const WithTitle = () => (
	<div className="max-w-sm p-4">
		<Alert>
			<CircleAlertIcon />
			<AlertTitle>Before you start</AlertTitle>
			<AlertDescription>
				This set drills the Target only. The Doer comes in the next one.
			</AlertDescription>
		</Alert>
	</div>
);

export const Exception = () => (
	<div className="max-w-sm p-4">
		<Alert variant="purple">
			<AlertTitle>Exception</AlertTitle>
			<AlertDescription>
				<p>
					In the Owner plural the stress moves to the ending:{" "}
					<GreekText size="inherit" tone="inherit">των γυναικών</GreekText>.
				</p>
			</AlertDescription>
		</Alert>
	</div>
);

export const WithIcon = () => (
	<div className="max-w-sm p-4">
		<Alert variant="info">
			<CircleAlertIcon />
			<AlertTitle>Before you start</AlertTitle>
			<AlertDescription>This set drills the Target only. The Doer comes in the next one.</AlertDescription>
		</Alert>
	</div>
);

export const WithoutIcon = () => (
	<div className="max-w-sm p-4">
		<Alert variant="purple">
			<AlertTitle>Exception</AlertTitle>
			<AlertDescription>
				<p>
					In the Owner plural the stress moves to the ending:{" "}
					<GreekText size="inherit" tone="inherit">των γυναικών</GreekText>.
				</p>
			</AlertDescription>
		</Alert>
	</div>
);

export const TitleOnly = () => (
	<div className="max-w-sm p-4">
		<Alert variant="success">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
				<path d="M20 6 9 17l-5-5" />
			</svg>
			<AlertTitle>Password changed</AlertTitle>
		</Alert>
	</div>
);

export const NoTitle = () => (
	<div className="max-w-sm p-4">
		<Alert variant="warning">
			<CircleAlertIcon />
			<AlertDescription>
				Your session has ended. Sign in again to carry on where you left off.
			</AlertDescription>
		</Alert>
	</div>
);

export const OneLine = () => (
	<div className="max-w-sm p-4">
		<Alert variant="error">
			<CircleAlertIcon />
			<AlertDescription>That username and password don't match. Check both and try again.</AlertDescription>
		</Alert>
	</div>
);

export const Paragraphs = () => (
	<div className="max-w-sm p-4">
		<Alert variant="warning">
			<LightbulbIcon />
			<AlertDescription>
				<p>The accent changes the meaning.</p>
				<p>
					<GreekText size="inherit" tone="inherit">πότε</GreekText> when? ·{" "}
					<GreekText size="inherit" tone="inherit">ποτέ</GreekText> never
				</p>
			</AlertDescription>
		</Alert>
	</div>
);

export const UnderATitle = () => (
	<div className="max-w-sm p-4">
		<Alert variant="info">
			<AlertTitle>Pattern</AlertTitle>
			<AlertDescription>
				<p>A masculine Target drops the final -ς.</p>
				<GreekText as="p" size="inherit" tone="inherit">
					ο φίλος → τον φίλο
				</GreekText>
			</AlertDescription>
		</Alert>
	</div>
);
