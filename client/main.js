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
