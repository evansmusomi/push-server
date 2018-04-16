// SW Registration
let swReg;

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

fetch("http://localhost:3333")
  .then(response => response.text())
  .then(console.log);
