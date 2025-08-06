// Quiz Questions
const quizQuestions = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yen", "Won", "Rupee"],
    answer: "Yen"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  }
];

let currentQuestionIndex = 0;

function loadQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  document.getElementById("question").textContent = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("quiz-result").textContent = "";
}

function checkAnswer(selected) {
  const correct = quizQuestions[currentQuestionIndex].answer;
  const result = document.getElementById("quiz-result");

  if (selected === correct) {
    result.textContent = "✅ Correct!";
    result.style.color = "green";
    // Move to next question
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
      } else {
        document.getElementById("question").textContent = "🎉 You've completed the quiz!";
        document.getElementById("options").innerHTML = "";
      }
    }, 1000);
  } else {
    result.textContent = "❌ Wrong answer. Try again!";
    result.style.color = "red";
  }
}

// Fetch Joke Function
async function fetchJoke() {
  try {
    const res = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await res.json();
    document.getElementById('joke').textContent = `${data.setup} - ${data.punchline}`;
  } catch (error) {
    document.getElementById('joke').textContent = 'Failed to load joke 😢';
  }
}

// Light/Dark Mode Switch
document.getElementById("mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const modeText = document.body.classList.contains("dark-mode") ? "☀ Light Mode" : "🌙 Dark Mode";
  document.getElementById("mode-toggle").textContent = modeText;
});

// Load first question on page load
window.onload = loadQuestion;