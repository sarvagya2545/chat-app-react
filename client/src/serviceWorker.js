const self = window.self;

self.addEventListener('install', (e) => {
    console.log('Service worker installed');
})

self.addEventListener('activate', (e) => {
    console.log('Service worker activated');
})