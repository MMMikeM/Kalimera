import { type ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";

import { PageHeading } from "@/components/PageHeading";
import { Button, ButtonLink } from "@/components/ui/button";

interface StatusPageProps {
	title: string;
	children: ReactNode;
	actions?: ReactNode;
	detail?: ReactNode;
}

const StatusPage = ({ title, children, actions, detail }: StatusPageProps) => (
	<section className="py-16 md:py-24">
		<PageHeading title={title}>{children}</PageHeading>
		{actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
		{detail}
	</section>
);

const reportError = (error: Error) => {
	fetch("/api/errors", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			message: error.message,
			stack: error.stack,
			url: window.location.href,
			userAgent: navigator.userAgent,
			timestamp: new Date().toISOString(),
		}),
	}).catch(() => {});
};

/** Drizzle puts the SQL in `message`, so the raw error only ever renders in dev. */
const DevErrorDetail = ({ error }: { error: Error }) => {
	if (!import.meta.env.DEV) return null;
	const cause = error.cause instanceof Error ? error.cause.message : undefined;
	return (
		<details className="mt-10 text-sm text-stone-600">
			<summary className="cursor-pointer">Error detail (dev only)</summary>
			{cause ? <p className="mt-3 font-medium text-stone-700">{cause}</p> : null}
			<pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-stone-100 p-3 text-xs whitespace-pre-wrap">
				{error.message}
			</pre>
		</details>
	);
};

const useReportedError = (error: Error) => {
	useEffect(() => reportError(error), [error]);
};

/** A page inside the app failed; the header and navigation around it still work. */
export const RouteError = ({ error }: ErrorComponentProps) => {
	const router = useRouter();
	useReportedError(error);
	return (
		<StatusPage
			title="Couldn't load this page."
			actions={
				<>
					<Button onClick={() => router.invalidate()}>Try again</Button>
					<ButtonLink to="/" variant="secondary">
						Go home
					</ButtonLink>
				</>
			}
			detail={<DevErrorDetail error={error} />}
		>
			<p>Something failed while it was loading. Trying again usually fixes it.</p>
		</StatusPage>
	);
};

/** The app shell itself failed to load, so there is no header to fall back on. */
export const RootError = ({ error }: ErrorComponentProps) => {
	useReportedError(error);
	return (
		<div className="min-h-dvh bg-cream px-6">
			<StatusPage
				title="Kalimera couldn't load."
				actions={<Button onClick={() => window.location.reload()}>Reload</Button>}
				detail={<DevErrorDetail error={error} />}
			>
				<p>Something failed before the app could start. Reloading usually fixes it.</p>
			</StatusPage>
		</div>
	);
};

export const NotFound = () => (
	<StatusPage
		title="There's no page here."
		actions={
			<>
				<ButtonLink to="/">Go home</ButtonLink>
				<ButtonLink to="/reference" variant="secondary">
					Browse the reference
				</ButtonLink>
			</>
		}
	>
		<p>The address may be mistyped, or the page may have moved.</p>
	</StatusPage>
);
