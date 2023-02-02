let local_cache;

function updateData(request) {
    local_cache.put(request,fetch(request));
}

function getData(request) {
    console.log(`URL requested: ${request.url}`);
    local_cache.match(request).then(data => {
        return data || updateData(request);
    });
}



self.addEventListener("install", event => {
    event.waitUntil(
        local_cache = caches.open("application-caches").then(cache => {
           return cache.addAll(["index.html","manifest.webmanifest","assets/styles/style.css","assets/js/App.js","assets/js/LocalServer.js"]);
        }));
    console.log("Service worker installed");
 });

self.addEventListener("activate", event => {
    local_cache = caches.open("application-caches");
    console.log("Service worker activated");
 });

self.addEventListener("fetch", event => {
    event.respondWith(getData(event.request));
});