document.getElementById("summarizeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getText" }, (response) => {
      if (response && response.text) {
        chrome.runtime.sendMessage({ action: "summarize", text: response.text }, (result) => {
          const summary = result.summary || "Failed to summarize text, displaying original text.";
          document.getElementById("summary").textContent = summary;
        });
      } else {
        document.getElementById("summary").textContent = "Failed to retrieve text.";
      }
    });
  });
});
