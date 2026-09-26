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
