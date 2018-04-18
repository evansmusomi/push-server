// Modules
const webpush = require("web-push");
const urlsafeBase64 = require("urlsafe-base64");
const Storage = require("node-storage");

// Vapid keys
const vapid = require("./vapid.json");

// Configure web-push
webpush.setVapidDetails(
  "mailto:app@evansmusomi.com",
  vapid.publicKey,
  vapid.privateKey
);

// Subscriptions
const store = new Storage(`${__dirname}/db`);
let subscriptions = store.get("subscriptions") || [];

// Create url safe vapid public key
module.exports.getKey = () => urlsafeBase64.decode(vapid.publicKey);

// Add subscriptions to array
module.exports.addSubscription = subscription => {
  // Add to subscriptions array
  subscriptions.push(subscription);

  // Persist subscriptions
  store.put("subscriptions", subscriptions);
};

// Send notifications to all registered subscriptions
module.exports.send = message => {
  // Notification Promises
  let notifications = [];

  // Loop subscriptions and send notification
  let p = subscriptions.forEach((subscription, i) => {
    webpush.sendNotification(subscription, message).catch(status => {
      // Check for "410 - Gone" status and mark for deletion
      if (status.statusCode === 410) subscriptions[i]["delete"] = true;

      // Return any value
      return null;
    });
  });

  // Push notification promise to array
  notifications.push(p);

  // Clean subscriptions marked for deletion
  Promise.all(notifications).then(() => {
    // Filter subscriptions
    subscriptions = subscriptions.filter(subscription => !subscription.delete);
    // Store 'cleaned' subscriptions
    store.put("subscriptions", subscriptions);
  });
};
