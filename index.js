const questions = [
  {
    question: "1) EETPNRSS is a synonym of snakes.",
    choices: ["SERPENTS", "PRESENTS", "REPENTSS", "PERTNESS"],
    correctAnswer: "SERPENTS",
  },
  {
    question: "2) AGRTMISNE the piano is a lifelong task.",
    choices: ["GRAMIENTS", "MASTERING", "TRAGMINES", "STREAMING"],
    correctAnswer: "MASTERING",
  },
  {
    question: "3) Mirages are a kind of ACTLPOI illusion.",
    choices: ["TOPICAL", "OPTICAL", "CAPITOL", "LOPCAIT"],
    correctAnswer: "OPTICAL",
  },
  {
    question: "4) The rugby player was heavy and KITETCHS.",
    choices: ["THICKEST", "THICKSET", "THICKETS", "SHICKETT"],
    correctAnswer: "THICKSET",
  },
  {
    question: "5) Jets can travel at PICEROSSUN speeds",
    choices: ["SCOURPINES", "PERCUSSION", "CONIPURESS", "SUPERSONIC"],
    correctAnswer: "SUPERSONIC",
  },
  {
    question: "6) The polar bear is the largest TROPERAD.",
    choices: ["TEARDROP", "PARDOTER", "PREDATOR", "PARROTED"],
    correctAnswer: "PREDATOR",
  },
];
const app = document.getElementById("app");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const questionInfo = document.getElementById("question-info");
const choicesList = document.getElementById("choices");
const scoreCard = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score");
const viewDisplay = document.getElementById("view-container");
const exitButton = document.getElementById("exit-button");
const jsConfetti = new JSConfetti();

let currentQuestionIndex = 0;
let score = 0;
let userName;
const userInfoForm = document.getElementById("userInfo");
questionContainer.style.display = "none";
scoreCard.style.display = "none";
exitButton.style.display = "none";
scoreDisplay.textContent = score + " / " + questions.length;

exitButton.addEventListener("click", function buttonClick() {
  console.log("Button click");
  alert(`Do you want to exit the game`);
  finishQuiz();
});
function startQuiz() {
  userInfoForm.style.display = "none";
  questionContainer.style.display = "block";
  scoreCard.style.display = "block";
  exitButton.style.display = "block";
  nextQuestion(); // Next question
}
// Event listener for user info form submission
userInfoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const codeInput = document.getElementById("code");
  userName = nameInput.value;
  const userCode = codeInput.value;
  console.log(userName);
  viewDisplay.textContent = `Welcome, ${userName}!!`;
  viewDisplay.style.color = "white";
  //console.log(viewDisplay.firstChild.nodeName);
  // viewDisplay.firstElementChild;
  startQuiz(); // Start the quiz
});
function nextQuestion() { // Function to load and display the next question
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    questionText.style.fontSize = "20px";
    questionContainer.firstElementChild.textContent =
      "The sentence below has a word with letters jumbled up." +
      " Rearrange the letters in capitals and choose the correct option";
    questionInfo.style.fontSize = "15px";
    const choicesForm = document.getElementById("choices-form");
    choicesForm.innerHTML = "";

    question.choices.forEach((choice, index) => {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.classList.add("choice-button");
      choiceButton.dataset.choiceIndex = index;

      choiceButton.addEventListener("click", function () {
        const selectedChoiceIndex = parseInt(this.dataset.choiceIndex);
        const selectedChoice = question.choices[selectedChoiceIndex];
        validateAnswer(selectedChoice, question.correctAnswer);
        highlightAnswer(question.correctAnswer, choicesForm);
      });
      choicesForm.appendChild(choiceButton);
    });
  } else {
    finishQuiz();
  }
}
function validateAnswer(chosenAnswer, correctAnswer) { // Function to check the selected answer
  //   const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!chosenAnswer) {
    return; // No answer selected
  }
  if (chosenAnswer === correctAnswer) {
    score++;
    scoreDisplay.textContent = score + " / " + questions.length;
  }
  currentQuestionIndex++;
  //nextQuestion();
}
function highlightAnswer(correctAnswer, choicesForm) { // Function to highlight the correct answer
  const choiceButtons = choicesForm.querySelectorAll(".choice-button");
  choiceButtons.forEach((button) => {
    if (button.textContent === correctAnswer) {
      button.classList.add("correct-answer");
    }
  });
  setTimeout(nextQuestion, 1500);
}
const choicesForm = document.getElementById("choices-form");
choicesForm.addEventListener("submit", function (event) {
  event.preventDefault();
  validateAnswer();
});
function finishQuiz() { // Function to display the results and score
  const finish = document.getElementById("finish-container");
  questionText.textContent = "Quiz Completed!";
  finish.textContent = `Thank you for participating, ${userName} !!`;
  choicesForm.innerHTML = "";
  viewDisplay.style.display = "none";
  questionInfo.style.display = "none";
  exitButton.style.display = "none";
  jsConfetti.addConfetti();
}
nextQuestion();
