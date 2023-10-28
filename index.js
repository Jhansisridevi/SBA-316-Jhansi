const questions = [
  {
    question: "Which bird do you see in the wall art?",
    choices: ["Owl", "Crow", "Eagle", "Sparrow"],
    correctAnswer: "Owl",
  },
  {
    question: "What was the MOM's Day Special Raffle gift",
    choices: ["shadow box", "Greeting card", "ceramic pot", "ceramic mug"],
    correctAnswer: "ceramic mug",
  },
];

const app = document.getElementById("app");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices");
const scoreCard = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score");
const viewDisplay = document.getElementById("view-container");

let currentQuestionIndex = 0;
let score = 0;

const userInfoForm = document.getElementById("userInfo");
questionContainer.style.display = "none";
scoreCard.style.display = "none";

function startQuiz() {
  userInfoForm.style.display = "none";
  questionContainer.style.display = "block";
  scoreCard.style.display = "block";
  nextQuestion(); // Next question
}

// Event listener for user info form submission
userInfoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  let userName = nameInput.value;
  const userPhone = phoneInput.value;
  console.log(userName);
  viewDisplay.textContent = `Welcome, ${userName}! Let's start the game!!`;
  // Start the quiz
  startQuiz();
});

// Function to load and display the next question
function nextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    const choicesForm = document.getElementById("choices-form");
    choicesForm.innerHTML = "";

    question.choices.forEach((choice, index) => {
      const choiceItem = document.createElement("label");
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "answer";
      radioInput.value = choice;
      radioInput.id = "choice " + index;
      const choiceText = document.createTextNode(choice);
      choiceItem.appendChild(radioInput);
      choiceItem.appendChild(choiceText);
      choiceItem.addEventListener("click", function () {
        validateAnswer();
      });
      choicesForm.appendChild(choiceItem);
    });

    // Timer function if required
  } else {
    finishQuiz();
  }
}

// Function to check the selected answer
function validateAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!selectedAnswer) {
    return; // No answer selected
  }

  if (selectedAnswer.value === questions[currentQuestionIndex].correctAnswer) {
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
  questionText.textContent = "Quiz Completed!";
  choicesForm.innerHTML = "";
  viewDisplay.style.display = "none";
}

nextQuestion();
