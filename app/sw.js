// Version 0.1

console.log('Started', self);
// Setup events
self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', event => {
  console.log('Activated', event);
});
// Push the notification
self.addEventListener('push', event => {
  console.log('Push received', event);
  var title = 'Push message';
  event.waitUntil(
    self.registration.showNotification(title, {
      actions: [
        {action: 'like', title: 'Like'},
        {action: 'reply', title: 'Reply'}
      ],
      body: 'The Message',
      icon: 'images/icon.png',
      tag: 'my-tag'
    }));
});
// Perform action when notification is clicked
self.addEventListener('notificationclick', event => {
  // console.log('Notification click: tag ', event.notification.tag);
  var messageId = event.notification.data;
  event.notification.close();
  if (event.action === 'like') {
    console.log('Like');
  } else if (event.action === 'reply') {
    console.log('Reply');
  } else {
    console.log('Da fuq?');
  }
  /* Detect click anywhere
  var url = 'https://broken-links.com/';
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(windowClients => {
      for (var client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  ); */
});
