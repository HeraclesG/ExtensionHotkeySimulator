chrome.runtime.onInstalled.addListener(async () => {
    var hotkey = {
        kctrl: true,
        kshift: true,
        kalt: false,
        ktext: 'S'
      }
      chrome.storage.sync.set({ 'key': hotkey }, function() {
      });
  });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
    }
  });
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("mative msg", request.message)
    if (request.action === 'sendToNative') {
        console.log("sdfsdf")
        var hostName = "com.blue.chrome.load.host";
        var port = chrome.runtime.connectNative(hostName);
        port.onMessage.addListener((message) => {
            console.log(message);
        });
        port.onDisconnect.addListener(() => {
            console.log('Disconnected from native app');
        });
        port.postMessage(request.message);
    }
});