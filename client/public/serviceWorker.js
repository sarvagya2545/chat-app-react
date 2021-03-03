const CACHE_NAME = 'cache_v1'

const urlsToCache = [ 'index.html', './offline.html' ];

const self = this;

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res) return res;
                return fetch(e.request)
                    .catch(() => caches.match('offline.html'));
            })
    );
})

self.addEventListener('activate', e => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    e.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if(!cacheWhiteList.includes(cacheName))
                    return caches.delete(cacheName);
            })
        ))
    )
})