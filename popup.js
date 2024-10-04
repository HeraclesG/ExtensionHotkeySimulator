var port = chrome.runtime.connectNative(hostName);
port.onMessage.addListener((message) => {
    console.log(message);
});
chrome.storage.sync.get(["key"]).then((result) => {
  document.getElementById('keyCTRL').checked = result.key.kctrl;
  document.getElementById('keySHIFT').checked = result.key.kshift;
  document.getElementById('keyALT').checked = result.key.kalt;
  document.getElementById('keyText').value = result.key.ktext;
});
document.addEventListener("keydown", async (event) => {
  document.getElementById('keyText').value =  event.key.toUpperCase();
});

document.getElementById("btnSave").addEventListener("click", () => {
  var hotkey = {
    kctrl: document.getElementById('keyCTRL').checked,
    kshift: document.getElementById('keySHIFT').checked,
    kalt: document.getElementById('keyALT').checked,
    ktext: document.getElementById('keyText').value.toUpperCase()
  }
  // chrome.storage.sync.set({ 'key': hotkey }, function() {
  // });
  var hostName = "com.blue.chrome.load.host";
        
 
  port.postMessage('werwer');
      console.log("sdfsdf")

  // chrome.storage.sync.get(["key"]).then((result) => {
  //     var msg = {
  //         'SCTRL': result.key.kctrl,
  //         'SSHIFT': result.key.kshift,
  //         'SALT': result.key.kalt,
  //         'SCODE': result.key.ktext.charCodeAt(0)
  //     }
  //     console.log(msg);
  //     console.log(JSON.stringify(msg));
      
  // });
});
