const password_set_submit = document.getElementById("password_set_submit");
password_set_submit.addEventListener("click", () => {
  const password1 = document.getElementById("password1");
  const password2 = document.getElementById("password2");
  if (password1.value === password2.value) {
    chrome.storage.sync.set({ "password": CryptoJS.SHA256(password1.value).toString(CryptoJS.enc.Base64) }, function () {
      alert("Admin password set");
      window.location.replace("options.html")
    });
  }
  else {
    alert("Passwords do not match");
    password1.value = "";
    password2.value = "";
  }
})
