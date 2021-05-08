const pushServerPublicKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;

const isPushNotifSupported = () => "serviceWorker" in navigator && "PushManager" in window

const askUserPermission = async () => await Notification.requestPermission()

const registerServiceWorker = () => navigator.serviceWorker.register('/serviceWorker.js')

const createNotificationSubscription = async () => {
    const serviceWorker = await navigator.serviceWorker.ready;
    return await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: pushServerPublicKey
    })
}

const getUserSubscription = () => {
    return navigator.serviceWorker.ready
        .then((serviceWorker) => serviceWorker.pushManager.getSubscription())
        .then((pushSubscription) => pushSubscription);
}

const sendNotification = (title, options) => {
    navigator.serviceWorker.ready.then(reg => reg.showNotification(title, options))
}

export {
    isPushNotifSupported,
    askUserPermission,
    registerServiceWorker,
    createNotificationSubscription,
    getUserSubscription,
    sendNotification
}