// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");


// Quiz Questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false }
    ]
  },

  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  },

  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true }
    ]
  },

  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false }
    ]
  },

  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false }
    ]
  }
];


// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;


// Initial Values
totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


// Start Quiz
function startQuiz() {

  currentQuestionIndex = 0;
  score = 0;
  answersDisabled = false;

  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}


// Show Question
function showQuestion() {

  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Question number
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // Progress bar
  const progressPercent =
    (currentQuestionIndex / quizQuestions.length) * 100;

  progressBar.style.width = progressPercent + "%";

  // Question
  questionText.textContent = currentQuestion.question;

  // Clear previous answers
  answersContainer.innerHTML = "";


  // Create answer buttons
  currentQuestion.answers.forEach(answer => {

    const button = document.createElement("button");

    button.textContent = answer.text;

    // IMPORTANT: Must match CSS class
    button.classList.add("answers-btn");

    // Store correct/incorrect value
    button.dataset.correct = answer.correct;

    // Add click event
    button.addEventListener("click", selectAnswer);

    // Add button to container
    answersContainer.appendChild(button);
  });
}


// Select Answer
function selectAnswer(event) {

  // Prevent multiple clicks
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;

  const isCorrect =
    selectedButton.dataset.correct === "true";


  // Show correct and incorrect answers
  Array.from(answersContainer.children).forEach(button => {

    if (button.dataset.correct === "true") {

      // Correct answer
      button.classList.add("correct");

    } else if (button === selectedButton) {

      // Selected wrong answer
      button.classList.add("incorrect");
    }
  });


  // Update score
  if (isCorrect) {

    score++;

    scoreSpan.textContent = score;
  }


  // Move to next question after 1 second
  setTimeout(() => {

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {

      showQuestion();

    } else {

      showResults();
    }

  }, 1000);
}


// Show Results
function showResults() {

  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage =
    (score / quizQuestions.length) * 100;


  if (percentage === 100) {

    resultMessage.textContent =
      "Perfect! You're a Genius!";

  } else if (percentage >= 80) {

    resultMessage.textContent =
      "Great Job! You know your stuff!";

  } else if (percentage >= 60) {

    resultMessage.textContent =
      "Good effort! Keep learning!";

  } else if (percentage >= 40) {

    resultMessage.textContent =
      "Not bad! Try again to improve!";

  } else {

    resultMessage.textContent =
      "Keep studying! You will get better!";
  }
}


// Restart Quiz
function restartQuiz() {

  resultScreen.classList.remove("active");

  startQuiz();
}