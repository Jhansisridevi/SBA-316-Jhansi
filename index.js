const questions = [
  {
    question: "EETPNRSS is a synonym of snakes.",
    choices: ["SERPENTS", "PRESENTS", "REPENTSS", "PERTNESS"],
    correctAnswer: "SERPENTS",
  },
  {
    question: "AGRTMISNE the piano is a lifelong task.",
    choices: ["GRAMIENTS", "MASTERING", "TRAGMINES", "STREAMING"],
    correctAnswer: "MASTERING",
  },
  {
    question: "Mirages are a kind of ACTLPOI illusion.",
    choices: ["TOPICAL", "OPTICAL", "CAPITOL", "LOPCAIT"],
    correctAnswer: "OPTICAL",
  },
  {
    question: "The rugby player was heavy and KITETCHS.",
    choices: ["THICKEST", "THICKSET", "THICKETS", "SHICKETT"],
    correctAnswer: "THICKSET",
  },
  {
    question: "Jets can travel at PICEROSSUN speeds",
    choices: ["SCOURPINES", "PERCUSSION", "CONIPURESS", "SUPERSONIC"],
    correctAnswer: "SUPERSONIC",
  },
  {
    question: "The polar bear is the largest TROPERAD.",
    choices: ["TEARDROP", "PARDOTER", "PREDATOR", "PARROTED"],
    correctAnswer: "PREDATOR",
  },
];
const mainBody = document.querySelector("body");
const app = document.getElementById("app");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices");
const scoreCard = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score");
const viewDisplay = document.getElementById("view-container");
const exitButton = document.getElementById("exit-button");

let currentQuestionIndex = 0;
let score = 0;
let userName;
const userInfoForm = document.getElementById("userInfo");
questionContainer.style.display = "none";
scoreCard.style.display = "none";
exitButton.style.display = "none";

exitButton.addEventListener("click", function buttonClick() {
  console.log("Button click");
  alert(`Do you want to exit`);
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
  const phoneInput = document.getElementById("phone");
  userName = nameInput.value;
  const userPhone = phoneInput.value;
  console.log(userName);
  viewDisplay.textContent = `Welcome, ${userName}!!`;
  viewDisplay.style.color = "white";
  startQuiz();  // Start the quiz
});
// Function to load and display the next question
function nextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    const choicesForm = document.getElementById("choices-form");
    choicesForm.innerHTML = "";

    question.choices.forEach((choice, index) => {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choiceButton.addEventListener("click", function () {
        validateAnswer(choice, question.correctAnswer);
      });
      choicesForm.appendChild(choiceButton);
    });
  } else {
    finishQuiz();
  }
}
// Function to check the selected answer
function validateAnswer(chosenAnswer, correctAnswer) {
  //   const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!chosenAnswer) {
    return; // No answer selected
  }

  if (chosenAnswer === correctAnswer) {
    score++;
    scoreDisplay.textContent = score;
  }
  currentQuestionIndex++;
  nextQuestion();
}

const choicesForm = document.getElementById("choices-form");
choicesForm.addEventListener("submit", function (event) {
  event.preventDefault();
  validateAnswer();
});

function finishQuiz() {
  const finish = document.getElementById("finish-container");
  questionText.textContent = "Quiz Completed!";
  finish.textContent = `Thank you for participating, ${userName} !!`;
  choicesForm.innerHTML = "";
  viewDisplay.style.display = "none";
  exitButton.style.display = "none";
  //viewDisplay.textContent=`Thank you ${userName}!`;
  //mainBody.style.display="inline-flex";
}

nextQuestion();
//   const choiceItem = document.createElement("label");
//   const radioInput = document.createElement("input");
//   radioInput.type = "radio";
//   radioInput.name = "answer";
//   radioInput.value = choice;
//   radioInput.id = "choice " + index;
//   const choiceText = document.createTextNode(choice);
//   choiceItem.appendChild(radioInput);
//   choiceItem.appendChild(choiceText);
//   choiceItem.addEventListener("click", function () {
//     validateAnswer();
//   });
//   choicesForm.appendChild(choiceItem);
// });
