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
       
        var hostName = "com.blue.chrome.load.host";
        
        port = chrome.runtime.connectNative(hostName);
        port.onMessage.addListener((message) => {
            console.log(message);
        });
      
        chrome.storage.sync.get(["key"]).then((result) => {
            var msg = {
                'SCTRL': result.key.kctrl,
                'SSHIFT': result.key.kshift,
                'SALT': result.key.kalt,
                'SCODE': result.key.ktext.charCodeAt(0)
            }
            console.log(msg);
            console.log(JSON.stringify(msg));
            port.postMessage(msg);
       
        });
        
    }
  });
  
