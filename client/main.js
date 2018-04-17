// Globals
let swReg;
const serverUrl = "http://localhost:3333";

// Update UI with subscription status
const setSubscribedStatus = state => {
  if (state) {
    document.getElementById("subscribe").className = "hidden";
    document.getElementById("unsubscribe").className = "";
  } else {
    document.getElementById("subscribe").className = "";
    document.getElementById("unsubscribe").className = "hidden";
  }
};

// Register Service Worker
navigator.serviceWorker
  .register("sw.js")
  .then(registration => {
    swReg = registration;
    swReg.pushManager.getSubscription().then(setSubscribedStatus);
  })
  .catch(console.error);

// Get public key from server
const getAppServerKey = () => {
  return fetch(`${serverUrl}/key`)
    .then(response => response.arrayBuffer())
    .then(key => new Uint8Array(key));
};

// Unsubscribe from the push service
const unsubscribe = () => {
  // Unsubscribe and update UI
  swReg.pushManager.getSubscription().then(subscription => {
    subscription.unsubscribe().then(() => {
      setSubscribedStatus(false);
    });
  });
};

// Subscribe for push notifications
const subscribe = () => {
  if (!swReg) return console.error("Service Worker Registration Not Found");

  getAppServerKey()
    .then(applicationServerKey => {
      swReg.pushManager
        .subscribe({ userVisibleOnly: true, applicationServerKey })
        .then(response => response.toJSON())
        .then(subscription => {
          // Pass subscription to the server
          fetch(`${serverUrl}/subscribe`, {
            method: "POST",
            body: JSON.stringify(subscription)
          })
            .then(setSubscribedStatus)
            .catch(unsubscribe);
        });
    })
    .catch(console.error);
};
