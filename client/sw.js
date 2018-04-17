// Service Worker

// Listen for notifications
self.addEventListener("push", e => {
  self.registration.showNotification(e.data.text());
});
