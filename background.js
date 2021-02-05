chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete") {
    chrome.tabs.get(tabId, (current_tab_info) => {
      if (/^https:\/\/www\.cs.utexas.edu\/~gheith/.test(current_tab_info.url)) {
        chrome.tabs.insertCSS(null, {
          file: "./bootstrap.min.css",
        });
        chrome.tabs.insertCSS(null, {
          file: "./styles/default.css",
        });
        chrome.tabs.executeScript(null, { file: "./highlight.pack.js" }, () => {
          console.log("highlighter loaded");
        });
        chrome.tabs.executeScript(null, { file: "./foreground.js" }, () => {
          console.log("foreground loaded");
        });
      }
    });
  }
});