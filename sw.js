const BLACKLIST = [
    /\/pages\//,
    /\/audio\//
];

const HOSTNAME_WHITELIST = [
    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net'
];

const getFixedUrl = (req) => {
    var now = Date.now();
    var url = new URL(req.url);

    url.protocol = self.location.protocol;

    if (url.hostname === self.location.hostname) {
        url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
    }
    return url.href;
};

function isBlacklisted(url) {
    return BLACKLIST.some(regex => regex.test(url));
}

/**
 *  @Lifecycle Activate
 *  New one activated when old isn't being used.
 *
 *  waitUntil(): activating ====> activated
 */
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });

/**
 *  @Functional Fetch
 *  All network requests are being intercepted here.
 *
 *  void respondWith(Promise<Response> r)
 */
self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);

    // Skip requests to the /pages directory and any audio files
    if (isBlacklisted(requestUrl.pathname) ||
        requestUrl.pathname.endsWith('.mp3') ||
        requestUrl.pathname.endsWith('.wav') ||
        requestUrl.pathname.endsWith('.ogg') ||
        requestUrl.pathname.endsWith('.flac') ||
        requestUrl.pathname.endsWith('.m4a')) {
        return;
    }

    // Skip some of cross-origin requests, like those for Google Analytics.
    if (HOSTNAME_WHITELIST.indexOf(requestUrl.hostname) === -1) {
        // Stale-while-revalidate
        const cached = caches.match(event.request);
        const fixedUrl = getFixedUrl(event.request);
        const fetched = fetch(fixedUrl, { cache: 'no-store' });
        const fetchedCopy = fetched.then(resp => resp.clone());

        // Call respondWith() with whatever we get first.
        // If the fetch fails (e.g disconnected), wait for the cache.
        // If there’s nothing in cache, wait for the fetch.
        // If neither yields a response, return offline pages.
        event.respondWith(
            Promise.race([fetched.catch(_ => cached), cached])
                .then(resp => resp || fetched)
                .catch(_ => { /* eat any errors */ })
        );

        // Update the cache with the version we fetched (only for ok status)
        event.waitUntil(
            Promise.all([fetchedCopy, caches.open("pwa-cache")])
                .then(([response, cache]) => response.ok && cache.put(event.request, response))
                .catch(err => { console.error("Failed to update cache: " + err.toString()); })
        );
    }
});