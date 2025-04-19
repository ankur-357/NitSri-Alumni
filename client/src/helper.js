import { API_URL } from "./constant";

async function regSw() {
    if ('serviceWorker' in navigator) {
        let url = `${API_URL}/sw.js`;
        const reg = await navigator.serviceWorker.register(url, { scope: '/' });
        console.log('service config is', { reg });
        return reg;
    }
    throw Error('serviceworker not supported');
}

async function subscribe(serviceWorkerReg, uid) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    if (subscription === null) {
        subscription = await serviceWorkerReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BB12svZvz9FhimAVNpibHZNOu91_JvBQRxewmDXq72xBSgrhs6Gu2tJ1qhRsaTvjk61XUhlPR59i8pO1JV81nS4',
        });

        await fetch(import.meta.env.VITE_BACKEND_URL + '/subscribe', {
            method: 'POST',
            body: JSON.stringify({
                subscription,
                uid,
            }),
            headers: {
                'content-type': 'application/json',
            },
        });
    }
}

const unSubscribe = async (serviceWorkerReg) => {
    const subscription = await serviceWorkerReg.pushManager.getSubscription();
    if (subscription) {
        await subscription.unsubscribe();
        await fetch(import.meta.env.VITE_BACKEND_URL + '/unsubscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json',
            },
        });
    }
}

export { regSw, subscribe, unSubscribe };