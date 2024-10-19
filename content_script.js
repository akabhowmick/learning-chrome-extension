chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getText") {
    const text = document.body.innerText;
    sendResponse({ text });
  }
});
