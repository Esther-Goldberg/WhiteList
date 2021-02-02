const password_submit = document.getElementById("password_submit");
password_submit.addEventListener("click", () => {
  const password_input = document.getElementById("password");
  chrome.storage.sync.get(["password"], function(local) {
    const { password } = local;
    if (CryptoJS.SHA256(password_input.value).toString(CryptoJS.enc.Base64) === password) {
      window.location.replace("options.html")
    } else {
      alert("Password is incorrect");
    }
  });
});
