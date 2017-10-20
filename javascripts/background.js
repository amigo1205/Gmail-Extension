
function refreshBrowser(target, bring_to_foreground_flag) {

  chrome.windows.getAll({
    populate: true
  }, function(windows) {
    var found_existing_flag = false;

    windows.forEach(function(win) {
      win.tabs.forEach(function(tab) {
        // Ignore tabs not matching the target.
        if (target === 'gmail') {
          if (!/https:\/\/(mail|inbox)\.google\.com/.test(tab.url)) return;
        } else {
          return; // Unknown target.
        }

        // Reload the matching tab.
        chrome.tabs.reload(tab.id);

        // If this is the first one found, activate it.
        if (bring_to_foreground_flag && !found_existing_flag) {
          chrome.tabs.update(tab.id, {
            active: true
          });
        }

        found_existing_flag = true;
      });
    });

    // If no gmail tab found, just open a new one.
    if (bring_to_foreground_flag && !found_existing_flag) {
      chrome.tabs.create({
        url: 'https://mail.google.com',
        active: true
      });
    }
  });
}


// Refresh on install and update
chrome.runtime.onInstalled.addListener(function(details) {
  if ((details.reason === 'install') || (details.reason === 'update')) {
    refreshBrowser('gmail', true  );
  }
});

chrome.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSf4m0gANzCy1MHM75EqMsp_kH8W6Tg3a_ptUjiBJgokAOToJg/viewform");

chrome.runtime.onSuspend.addListener(function() {
  localStorage['cloudhq_ext_lock'] = '';
  localStorage['cloudhq_ext_registered'] = '[]';
});

chrome.runtime.onStartup.addListener(function(e) {
  // this one is only invoked when user profile is started.
});
