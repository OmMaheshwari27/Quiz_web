const Qbank = [
    {
        question: "which is the largest animal in the world?",
        answers: [
            { text: "shark", correct: false },
            { text: "dog", correct: false },
            { text: "blue whale", correct: true },
            { text: "rat", correct: false }
        ],
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "berlin", correct: false },
            { text: "madrid", correct: false },
            { text: "paris", correct: true },
            { text: "rome", correct: false }
        ],
    },
    {
        question: "Who wrote the play Romeo and Juliet?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false }
        ],
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false }
        ]
    },
];
const QuestionElement = document.getElementById("question");
const Answer_buttons = document.getElementById("answerbutton");
const next_button = document.getElementById("next_btn");
let current_question_idx = 0;
let score = 0;


function resetState() {
    next_button.style.display = "none";
    while (Answer_buttons.firstChild) {
        Answer_buttons.removeChild(Answer_buttons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(Answer_buttons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    next_button.style.display = "block";
}

function showQuestion() {
    resetState();
    let currentQuestion = Qbank[current_question_idx];
    let questionNo = current_question_idx + 1;
    QuestionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        Answer_buttons.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}
function startquiz() {
    current_question_idx = 0;
    score = 0;
    next_button.innerHTML = "Next";
    showQuestion();
}


function displayScore() {
    resetState();
    QuestionElement.innerHTML = `you scored ${score} out of ${Qbank.length}!`;
    next_button.innerHTML = "play again";
    next_button.style.display = "block";
}
function handleNextButton() {
    current_question_idx++;
    if (current_question_idx < Qbank.length) {
        showQuestion();
    }
    else {
        displayScore();
    }
}
next_button.addEventListener("click", () => {
    if (current_question_idx < Qbank.length) {
        handleNextButton();
    }
    else {
        startquiz();
    }
})


startquiz();
