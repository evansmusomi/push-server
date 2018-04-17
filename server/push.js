// Modules
const webpush = require("web-push");
const urlsafeBase64 = require("urlsafe-base64");

// Vapid keys
const vapid = require("./vapid.json");

// Create url safe vapid public key
module.exports.getKey = () => urlsafeBase64.decode(vapid.publicKey);
