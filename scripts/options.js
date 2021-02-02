const allowed_list = document.getElementById("allowed_list");
const blocked_list = document.getElementById("blocked_list");

const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");

const blacklist = document.getElementById("blacklist");
const whitelist = document.getElementById("whitelist");

const blacklist_div = document.getElementById("blacklist-div");
const whitelist_div = document.getElementById("whitelist-div");

save.addEventListener("click", () => {
  chrome.storage.sync.get(["mode"], function (sync) {
    const { mode } = sync;
    if (mode === "whitelist") {
      const allowed = allowed_list.value.split("\n").map(s => s.trim()).filter(Boolean);
      chrome.storage.sync.set({allowed});
      alert("Whitelist saved");
    } else {
      const blocked = blocked_list.value.split("\n").map(s => s.trim()).filter(Boolean);
      chrome.storage.sync.set({blocked});
      alert("Blacklist saved")
    }
  })
});

checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;
  chrome.storage.local.set({enabled});
});

blacklist.addEventListener("click", () => {
  chrome.storage.sync.set({mode: "blacklist"});
  blacklist_div.style.display = "block";
  whitelist_div.style.display = "none";
});

whitelist.addEventListener("click", () => {
  chrome.storage.sync.set({mode: "whitelist"});
  whitelist_div.style.display = "block";
  blacklist_div.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["allowed", "blocked", "mode"], function (sync) {
    const {allowed, blocked, mode} = sync;
    chrome.storage.local.get(["enabled"], function (local) {
      const {enabled} = local;
      if (Array.isArray(allowed)) {
        allowed_list.value = allowed.join("\n");
      }
      if (Array.isArray(blocked)) {
        blocked_list.value = blocked.join("\n");
      }
      checkbox.checked = enabled;
      document.getElementById(mode).checked = true;
      if (mode === "blacklist") {
        whitelist_div.style.display = "none";
      } else {
        blacklist_div.style.display = "none";
      }
    })
  });
});
