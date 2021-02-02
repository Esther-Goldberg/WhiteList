chrome.runtime.onInstalled.addListener(function () {

  chrome.storage.sync.get(["allowed", "blocked", "password", "mode"], function (sync) {
    if (!Array.isArray(sync.allowed)) {
      chrome.storage.sync.set({ allowed: [] });
    }
    if (!Array.isArray(sync.blocked)) {
      chrome.storage.sync.set({ blocked: [] });
    }
    if (typeof sync.password !== "string") {
      chrome.storage.sync.set({password: ""});
    }
    if (sync.mode !== "blacklist") {
      chrome.storage.sync.set({mode: "whitelist"});
    }
  });

  chrome.storage.local.get(["enabled"], function(local) {
    if (typeof local.enabled !== "boolean") {
      chrome.storage.local.set({enabled: false});
    };
  });


  chrome.extension.isAllowedIncognitoAccess(function (isAllowedAccess) {
    if (isAllowedAccess) return;
    alert('Please allow incognito mode in the following screen for the extension to perform properly.')
    chrome.tabs.create({
      url: 'chrome://extensions/?id=' + chrome.runtime.id
    });
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {

  const url = changeInfo.pendingUrl || changeInfo.url;
  if (!url || !url.startsWith("http")) {
    return;
  }

  const hostname = new URL(url).hostname;

  chrome.storage.sync.get(["allowed", "blocked", "mode"], function (sync) {
    const { allowed, blocked, mode } = sync;

    chrome.storage.local.get(["enabled"], function (local) {
      const { enabled } = local;

      if (sync.mode == "whitelist") {
        if (enabled && !allowed.find(domain => hostname.includes(domain))) {
          chrome.tabs.update(tabId, {"url": "block.html"});
        }
      } else {
        if (enabled && blocked.find(domain => hostname.includes(domain))) {
          chrome.tabs.update(tabId, {"url": "block.html"});
        }
      }
    });
  });
});
