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
		plugins: [new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 })],
	}),
);

registerRoute(
	/^https:\/\/fonts\.gstatic\.com\/.*/i,
	new CacheFirst({
		cacheName: "gstatic-fonts-cache",
		plugins: [new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 })],
	}),
);

// ============================================
// PUSH NOTIFICATION HANDLERS
// ============================================

interface PushData {
	title: string;
	body: string;
	url?: string;
}

self.addEventListener("push", (event) => {
	if (!event.data) return;

	let data: PushData;
	try {
		data = event.data.json() as PushData;
	} catch {
		// Fallback for plain text payloads
		data = {
			title: "Ellinika",
			body: event.data.text(),
		};
	}

	const options: NotificationOptions & { renotify?: boolean } = {
		body: data.body,
		icon: "/icons/icon-192.png",
		badge: "/icons/icon-192.png",
		data: { url: data.url || "/" },
		tag: "greek-notification",
		renotify: true,
	};

	event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
	event.notification.close();

	const url = (event.notification.data as { url?: string })?.url || "/";

	event.waitUntil(
		self.clients.matchAll({ type: "window" }).then((clients) => {
			// Focus existing tab if available
			for (const client of clients) {
				if (client.url.includes(self.location.origin) && "focus" in client) {
					client.focus();
					if ("navigate" in client) {
						(client as WindowClient).navigate(url);
					}
					return;
				}
			}
			// Open new tab if no existing window
			return self.clients.openWindow(url);
		}),
	);
});
