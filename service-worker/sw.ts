/// <reference lib="webworker" />
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope & {
	__WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

// Workbox injects precache manifest here
precacheAndRoute(self.__WB_MANIFEST);

// Google Fonts caching
registerRoute(
	/^https:\/\/fonts\.googleapis\.com\/.*/i,
	new CacheFirst({
		cacheName: "google-fonts-cache",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 10,
				maxAgeSeconds: 60 * 60 * 24 * 365,
			}),
		],
	}),
);

registerRoute(
	/^https:\/\/fonts\.gstatic\.com\/.*/i,
	new CacheFirst({
		cacheName: "gstatic-fonts-cache",
		plugins: [
			new ExpirationPlugin({
				maxEntries: 10,
				maxAgeSeconds: 60 * 60 * 24 * 365,
			}),
		],
	}),
);

// ============================================
// PUSH NOTIFICATION HANDLERS
// ============================================

interface PushData {
	title: string;
	body: string;
	url?: string;
	userId?: number;
	quickSessionUrl?: string;
}

self.addEventListener("push", (event) => {
	if (!event.data) return;

	let data: PushData;
	try {
		data = event.data.json() as PushData;
	} catch {
		// Fallback for plain text payloads
		data = {
			title: "Kalimera",
			body: event.data.text(),
		};
	}

	const options: NotificationOptions & { renotify?: boolean; actions?: { action: string; title: string }[] } = {
		body: data.body,
		icon: "/icons/icon-192.png",
		badge: "/icons/icon-192.png",
		data: {
			url: data.url || "/",
			userId: data.userId,
			quickSessionUrl: data.quickSessionUrl || "/practice/speed?size=quick",
		},
		tag: "greek-notification",
		renotify: true,
		actions: [
			{ action: "start_2min", title: "2 min" },
			{ action: "snooze", title: "Later" },
		],
	};

	event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
	event.notification.close();

	const notifData = event.notification.data as {
		url?: string;
		userId?: number;
		quickSessionUrl?: string;
	};

	const navigateTo = async (url: string) => {
		const clients = await self.clients.matchAll({ type: "window" });
		for (const client of clients) {
			if (client.url.includes(self.location.origin) && "focus" in client) {
				client.focus();
				if ("navigate" in client) {
					(client as WindowClient).navigate(url);
				}
				return;
			}
		}
		await self.clients.openWindow(url);
	};

	if (event.action === "start_2min") {
		const url = notifData.quickSessionUrl || "/practice/speed?size=quick";
		event.waitUntil(
			fetch("/api/push/log-tap", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: notifData.userId, tappedAction: "2min" }),
			})
				.catch(() => {}) // Non-fatal — log best-effort
				.then(() => navigateTo(url)),
		);
	} else if (event.action === "snooze") {
		event.waitUntil(
			fetch("/api/push/snooze", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: notifData.userId }),
			})
				.catch(() => {})
				.then(() => Promise.resolve()),
		);
	} else {
		// Body tap (no action) — navigate to the notification's URL
		const url = notifData.url || "/";
		event.waitUntil(
			fetch("/api/push/log-tap", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: notifData.userId, tappedAction: "body" }),
			})
				.catch(() => {})
				.then(() => navigateTo(url)),
		);
	}
});
