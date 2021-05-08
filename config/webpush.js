const webpush = require('web-push');
const crypto = require('crypto');

// VAPID keys
const vapidKeys = {
	publicKey: process.env.PUBLIC_VAPID_KEY,
	privateKey: process.env.PRIVATE_VAPID_KEY
};
webpush.setVapidDetails(`mailto:test@test.com`, vapidKeys.publicKey, vapidKeys.privateKey)

// object that handles all our subscriptions.
const subscriptions = {};

const addSubscription = (subObj) => {
	const subId = createHash(subObj)
	subscriptions[subId] = subObj;
	console.log('subscriptions', subscriptions);
	return subId;
};
const getSubscriptionObj = (subId) => subscriptions[subId];

const sendNotification = (notifObj, subObj) => {
	webpush.sendNotification(
		subObj,
		JSON.stringify(notifObj)
	)
	.catch(err => console.log(err));
}

function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

function createHash(input) {
	const md5sum = crypto.createHash("md5");
	md5sum.update(Buffer.from(input));
	return md5sum.digest("hex");
}

module.exports = { addSubscription, getSubscriptionObj, sendNotification };