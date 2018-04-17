// Modules
const webpush = require("web-push");
const urlsafeBase64 = require("urlsafe-base64");

// Vapid keys
const vapid = require("./vapid.json");

// Subscriptions
let subscriptions = [];

// Create url safe vapid public key
module.exports.getKey = () => urlsafeBase64.decode(vapid.publicKey);

// Add subscriptions to array
module.exports.addSubscription = subscription => {
  subscriptions.push(subscription);
};
