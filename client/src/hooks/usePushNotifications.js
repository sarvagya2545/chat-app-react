import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { askUserPermission, createNotificationSubscription, isPushNotifSupported, registerServiceWorker } from '../pushSW';
import { tokenConfig } from '../redux/actions/authActions';

const pushNotificationSupported = isPushNotifSupported();

const usePushNotifications = () => {
    // state for user id
    const userId = useSelector(state => state.auth.user?._id);
    // state for user permission
    const [userPermission, setUserPermission] = useState(Notification.permission);
    // state for subscription object
    const [subscriptionObj, setSubscriptionObj] = useState(null);
    // state for subscription id
    const [subscriptionId, setSubscriptionId] = useState(null);

    useEffect(() => {
        if(pushNotificationSupported && userId) {
            registerServiceWorker().then(() => {
                // if(userPermission !== 'granted') {
                    askUserPermission().then(async consent => {
                        console.log('consent', consent);
                        setUserPermission(consent);
                    })
                // }
            })
        }
    }, [userId]);

    useEffect(() => {
        if(userId !== null && subscriptionObj !== null) {
            axios.post(`/api/users/subscribe/push`, subscriptionObj, tokenConfig())
                .then(res => {
                    // console.log(res.data);
                    setSubscriptionId(res.data.subscriptionId);
                })
                .catch(err => console.log(err))
            ;
        }
    }, [userId, subscriptionObj])

    useEffect(() => {
        (async () => {
            if(userPermission === 'granted') {
                const subscription = await createNotificationSubscription()
                // console.log(subscription);
                await setSubscriptionObj(subscription);
            }
        })()
    }, [userPermission])

    return [subscriptionId, userPermission, pushNotificationSupported]
}

export default usePushNotifications;