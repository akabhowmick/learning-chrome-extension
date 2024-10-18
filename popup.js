document.getElementById("startQuizButton").addEventListener("click", () => {
  generateQuiz();
});

function generateQuiz() {
  const lessonText = document.getElementById("lesson").innerText;
  let sentences = lessonText.match(/[^.!?]+[.!?]+/g) || [];
  let quizContainer = document.getElementById("quiz");

  quizContainer.innerHTML = "";
  sentences.slice(0, 3).forEach((sentence, index) => {
    let questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    let questionText = document.createElement("p");
    questionText.innerText = `Question ${
      index + 1
    }: What is the main idea of this sentence: "${sentence.trim()}"?`;

    let answerInput = document.createElement("input");
    answerInput.setAttribute("type", "text");
    answerInput.setAttribute("id", `answer${index}`);

    questionDiv.appendChild(questionText);
    questionDiv.appendChild(answerInput);
    quizContainer.appendChild(questionDiv);
  });

  quizContainer.style.display = "block";
  document.getElementById("startQuizButton").style.display = "none";

  let submitButton = document.createElement("button");
  submitButton.innerText = "Submit Quiz";
  submitButton.addEventListener("click", submitQuiz);
  quizContainer.appendChild(submitButton);
}

function submitQuiz() {
  let userAnswers = [];

  for (let i = 0; i < 3; i++) {
    let answer = document.getElementById(`answer${i}`).value;
    userAnswers.push(answer);
  }

  saveQuizResults(userAnswers);
}

function saveQuizResults(answers) {
  chrome.storage.local.get("quizResults", function (data) {
    let results = data.quizResults || [];

    results.push({
      timestamp: new Date().toISOString(),
      answers: answers,
    });

    chrome.storage.local.set({ quizResults: results }, function () {
      console.log("Quiz results saved.");
    });
  });
}

document.getElementById("reviewResultsButton").addEventListener("click", () => {
  chrome.storage.local.get("quizResults", function (data) {
    let results = data.quizResults || [];
    let pastResultsContainer = document.getElementById("pastResults");

    pastResultsContainer.innerHTML = ""; // Clear old results

    if (results.length === 0) {
      pastResultsContainer.innerHTML = "<p>No quiz results found.</p>";
    } else {
      results.forEach((result) => {
        let resultDiv = document.createElement("div");
        resultDiv.classList.add("result");

        let dateText = document.createElement("p");
        dateText.innerText = `Date: ${new Date(result.timestamp).toLocaleString()}`;

        let answersText = document.createElement("p");
        answersText.innerText = `Answers: ${result.answers.join(", ")}`;

        resultDiv.appendChild(dateText);
        resultDiv.appendChild(answersText);
        pastResultsContainer.appendChild(resultDiv);
      });
    }

    pastResultsContainer.style.display = "block";
  });
});
