self.addEventListener('push', function (event) {
  if (event.data) {
    var data = event.data.json();
    var options = {
      body: data.description,
      icon: '/favicon.ico',
      actions: [
        { action: 'read', title: 'Göster' },
        { action: 'close', title: 'Kapat' },
      ],
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: 'PUSH_NOTIFICATION',
          data: data,
        });
      });
    });
  } else {
    console.log('Push mesajı boş geldi!');
  }
});

//browser push notification "onClick" event heandler
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  /**
   * if exists open browser tab with matching url just set focus to it,
   * otherwise open new tab/window with sw root scope url
   */
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == self.registration.scope && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/request-calls');
        }
      })
  );
});

self.addEventListener('pushsubscriptionchange', function (event) {
  event.waitUntil(
    self.registration.pushManager
      .subscribe(event.oldSubscription.options)
      .then(function (subscription) {
        console.log('Yeni abonelik: ', subscription);
      })
  );
});
