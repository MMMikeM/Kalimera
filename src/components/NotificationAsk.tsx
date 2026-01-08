import { useState, useEffect, useCallback } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";
import {
	isPushSupported,
	getNotificationPermission,
	requestNotificationPermission,
	subscribeToPush,
	getCurrentSubscription,
	serializeSubscription,
} from "@mmmike/web-push/client";

interface NotificationAskProps {
	userId: number;
	sessionCount?: number;
	streakDays?: number;
	isLapsedReturn?: boolean;
}

const STORAGE_KEY = "notification-ask-dismissed";
const DISMISS_DAYS = 7;

const isDismissed = (): boolean => {
	const dismissed = localStorage.getItem(STORAGE_KEY);
	if (!dismissed) return false;
	const dismissedAt = new Date(dismissed);
	const daysSince =
		(Date.now() - dismissedAt.getTime()) / (1000 * 60 * 60 * 24);
	return daysSince < DISMISS_DAYS;
};

const setDismissed = () => {
	localStorage.setItem(STORAGE_KEY, new Date().toISOString());
};

export const NotificationAsk = ({
	userId,
	sessionCount = 0,
	streakDays = 0,
	isLapsedReturn = false,
}: NotificationAskProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isSubscribing, setIsSubscribing] = useState(false);
	const [subscribed, setSubscribed] = useState(false);

	useEffect(() => {
		const checkVisibility = async () => {
			if (!isPushSupported()) return;
			if (getNotificationPermission() === "denied") return;

			const existing = await getCurrentSubscription();
			if (existing) return;

			if (isDismissed()) return;

			const shouldShow =
				sessionCount >= 3 || streakDays >= 3 || isLapsedReturn;
			setIsVisible(shouldShow);
		};

		checkVisibility();
	}, [sessionCount, streakDays, isLapsedReturn]);

	const handleEnable = useCallback(async () => {
		setIsSubscribing(true);
		try {
			const permission = await requestNotificationPermission();
			if (permission !== "granted") {
				setIsVisible(false);
				return;
			}

			const keyResponse = await fetch("/api/push/vapid-key");
			if (!keyResponse.ok) return;
			const { vapidPublicKey } = (await keyResponse.json()) as {
				vapidPublicKey: string;
			};

			const subscription = await subscribeToPush(vapidPublicKey);
			if (!subscription) return;

			const serialized = serializeSubscription(subscription);
			await fetch("/api/push/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId,
					endpoint: serialized.endpoint,
					keys: serialized.keys,
				}),
			});

			setSubscribed(true);
			setTimeout(() => setIsVisible(false), 2000);
		} finally {
			setIsSubscribing(false);
		}
	}, [userId]);

	const handleDismiss = () => {
		setDismissed();
		setIsVisible(false);
	};

	if (!isVisible) return null;

	if (subscribed) {
		return (
			<Card className="bg-olive-50 border-olive-200 p-4">
				<div className="flex items-center gap-3">
					<Bell className="text-olive-600" size={20} />
					<p className="text-olive-800 font-medium">Reminders enabled!</p>
				</div>
			</Card>
		);
	}

	const getCopy = () => {
		if (isLapsedReturn) {
			return {
				headline: "Welcome back!",
				body: "Want a reminder so you don't drift away again?",
			};
		}
		if (streakDays >= 3) {
			return {
				headline: "You're building a habit",
				body: "Want a gentle nudge at 8pm if you haven't practised?",
			};
		}
		return {
			headline: "Stay on track",
			body: "Get a reminder at 8pm if you haven't practised.",
		};
	};

	const { headline, body } = getCopy();

	return (
		<Card className="bg-ocean-50 border-ocean-200 p-4 relative">
			<button
				type="button"
				onClick={handleDismiss}
				className="absolute top-3 right-3 text-ocean-400 hover:text-ocean-600"
				aria-label="Dismiss"
			>
				<X size={16} />
			</button>
			<div className="flex items-start gap-3">
				<Bell className="text-ocean-500 mt-0.5" size={20} />
				<div className="flex-1">
					<p className="font-medium text-ocean-800">{headline}</p>
					<p className="text-sm text-ocean-600 mt-1">{body}</p>
					<div className="flex gap-2 mt-3">
						<Button
							size="sm"
							onClick={handleEnable}
							disabled={isSubscribing}
							className="bg-ocean-600 hover:bg-ocean-700"
						>
							{isSubscribing ? "Enabling..." : "Enable Reminders"}
						</Button>
						<Button size="sm" variant="ghost" onClick={handleDismiss}>
							Not now
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};
