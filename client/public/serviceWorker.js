console.log('Service worker loaded...');
const receiveNotif = e => {
    const data = e.data.json();
    console.log(data);

    const parsedData = JSON.parse(data);

    const title = parsedData.title;

    console.log(parsedData);
    const options = {
        body: `${parsedData.text}`,
        icon: `${parsedData.image}`
    }
    e.waitUntil(self.registration.showNotification(title, options))
}

const openPushNotification = e => {
    console.log('notif data',e.notification.data);

    e.notification.close();
    e.waitUntil(clients.openWindow(e.notification.data));
}

self.addEventListener('push', receiveNotif)
self.addEventListener('notificationclick', openPushNotification)