window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["password"], function (local) {
    const {password} = local;

    if (password == "") {
      window.location.replace("set-password.html")
    }
    else {
      window.location.replace("authenticate.html")
    }
  });
});
