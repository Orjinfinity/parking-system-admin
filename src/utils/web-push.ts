import urlBase64ToUint8Array from './urlBase64ToUint8Array';

const askPermission = (): Promise<string> =>
  new Promise(function (resolve, reject) {
    try {
      const permissionResult = Notification.requestPermission();

      permissionResult.then(resolve, reject);
    } catch (err) {
      reject(err);
    }
  });

const registerServiceWorker = async (): Promise<ServiceWorkerRegistration> => {
  try {
    const registration = await navigator.serviceWorker.register(
      '/service-worker.js'
    );

    return registration;
  } catch (err) {
    console.error('Unable to register service worker.', err);
    throw err;
  }
};

const initWebPush = async (): Promise<PushSubscription> =>
  new Promise(async (resolve, reject) => {
    try {
      if (!('serviceWorker' in navigator)) {
        // Service Worker isn't supported on this browser, disable or hide UI.
        throw new Error("Service Worker isn't supported on this browser");
      }

      if (!('PushManager' in window)) {
        // Push isn't supported on this browser, disable or hide UI.
        throw new Error("Push isn't supported on this browser");
      }

      const result = await askPermission();

      if (result !== 'granted') {
        throw new Error('Please allow request');
      }

      const registration = await registerServiceWorker();

      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BDsM673dnazTzPkvREFaRsXRd4uS7MCdLDPKmJ6m8R1xQYLjmA0whmQLOOz-wH6o_9P2lAWsUG46IJMwJE_Leak'
        ),
      };

      const subscriptionData = await registration.pushManager.subscribe(
        subscribeOptions
      );

      resolve(subscriptionData);
    } catch (err) {
      reject(err);
    }
  });

export default initWebPush;
