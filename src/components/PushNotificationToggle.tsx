import { useState, useEffect } from "react";
import { Bell, BellOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	isPushSupported,
	getNotificationPermission,
	requestNotificationPermission,
	subscribeToPush,
	unsubscribeFromPush,
	getCurrentSubscription,
	serializeSubscription,
} from "@mmmike/web-push/client";

interface PushNotificationToggleProps {
	userId: number;
	className?: string;
}

type SubscriptionState = "loading" | "unsupported" | "denied" | "subscribed" | "unsubscribed";

export const PushNotificationToggle = ({ userId, className }: PushNotificationToggleProps) => {
	const [state, setState] = useState<SubscriptionState>("loading");
	const [isToggling, setIsToggling] = useState(false);

	useEffect(() => {
		checkSubscriptionState();
	}, []);

	const checkSubscriptionState = async () => {
		// Check if push is supported
		if (!isPushSupported()) {
			setState("unsupported");
			return;
		}

		// Check permission
		const permission = getNotificationPermission();
		if (permission === "denied") {
			setState("denied");
			return;
		}

		// Check if already subscribed
		const subscription = await getCurrentSubscription();
		setState(subscription ? "subscribed" : "unsubscribed");
	};

	const handleToggle = async () => {
		setIsToggling(true);

		try {
			if (state === "subscribed") {
				// Unsubscribe
				const subscription = await getCurrentSubscription();
				if (subscription) {
					const serialized = serializeSubscription(subscription);
					await fetch("/api/push/unsubscribe", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ endpoint: serialized.endpoint }),
					});
					await unsubscribeFromPush();
				}
				setState("unsubscribed");
			} else {
				// Subscribe
				const permission = await requestNotificationPermission();
				if (permission !== "granted") {
					setState("denied");
					return;
				}

				// Get VAPID public key from server
				const keyResponse = await fetch("/api/push/vapid-key");
				if (!keyResponse.ok) {
					console.error("Failed to get VAPID key");
					return;
				}
				const { vapidPublicKey } = (await keyResponse.json()) as { vapidPublicKey: string };

				// Subscribe to push
				const subscription = await subscribeToPush(vapidPublicKey);
				if (!subscription) {
					console.error("Failed to subscribe to push");
					return;
				}

				// Send subscription to server
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

				setState("subscribed");
			}
		} catch (error) {
			console.error("Push toggle error:", error);
		} finally {
			setIsToggling(false);
		}
	};

	if (state === "loading") {
		return (
			<Button variant="ghost" size="sm" disabled className={className}>
				<Loader2 size={16} className="animate-spin" />
			</Button>
		);
	}

	if (state === "unsupported") {
		return null; // Don't show anything if push is not supported
	}

	if (state === "denied") {
		return (
			<Button
				variant="ghost"
				size="sm"
				disabled
				className={className}
				title="Notifications blocked. Enable in browser settings."
			>
				<BellOff size={16} className="text-muted-foreground" />
			</Button>
		);
	}

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={handleToggle}
			disabled={isToggling}
			className={className}
			title={state === "subscribed" ? "Disable notifications" : "Enable notifications"}
		>
			{isToggling ? (
				<Loader2 size={16} className="animate-spin" />
			) : state === "subscribed" ? (
				<Bell size={16} className="text-ocean" />
			) : (
				<BellOff size={16} className="text-muted-foreground" />
			)}
		</Button>
	);
};

export default PushNotificationToggle;
