// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    summarizeText(request.text)
      .then((summary) => {
        sendResponse({ summary });
      })
      .catch((error) => {
        sendResponse({ summary: request.text });
      });
    return true;
  }
});

async function summarizeText(text) {
  const groqAPIKey = process.env.GROQ_API_KEY;
  const apiUrl = "https://api.groq.ai/summarize";
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqAPIKey}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to summarize text");
  }

  const result = await response.json();
  return result;
}
