function extractPageContent() {
  let paragraphs = document.getElementsByTagName("p");
  let content = "";

  for (let p of paragraphs) {
    content += p.innerText + " ";
  }

  return content;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "generate_lesson") {
    let pageContent = extractPageContent();
    summarizeText(pageContent).then((summary) => {
      sendResponse({ lesson: summary });
    });
    return true; // Indicate that this is an asynchronous response
  }
});

async function summarizeText(text) {
  const apiKey =
    "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";
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003", // or another model like GPT-4 if available
      prompt: `Summarize this text in a concise, 2-3 minute lesson:\n\n${text}`,
      max_tokens: 300, // Limiting token length for lesson size
    }),
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}
