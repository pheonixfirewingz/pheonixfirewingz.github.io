const websiteFileRegistry = [
    "/",
    "/index.html",
    "/LocalServer.js",
    "/manifest.webmanifest",
    "/assets/js/App.js",
    "/assets/styles/style.css",
    "/assets/images/favicon.ico",
    "/assets/images/logo.svg",
    "/assets/images/app/icon-192x192.png",
    "/assets/images/app/icon-256x256.png",
    "/assets/images/app/icon-384x384.png",
    "/assets/images/app/icon-512x512.png",
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("application-caches").then(cache => {
           return cache.addAll(websiteFileRegistry);
        }));
    console.log("Service worker installed");
 });

self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });

self.addEventListener("fetch", event => {
    event.respondWith((async () => {
        const r = await caches.match(event.request);
        console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
        if (r) return r;
        const response = await fetch(event.request);
        const cache = await caches.open("application-caches");
        console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
        cache.put(event.request, response.clone());
        return response;
      })());
});