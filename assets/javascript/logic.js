
//keeping track of variables
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerID;


//html elements
const questionsElement = document.getElementById('questions');

const timerElement = document.getElementById('time');
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const startButton = document.getElementById("start-button");
const initialElement = document.getElementById("initials");
const feedbackElement = document.getElementById("feedback");

let sfxRight = new Audio("assets/sfx/correct.wav");


function questionClick() {
    if(this.value !== questions[currentQuestionIndex].answer) {
 time -= 15;
 
 if(time < 0) {
 time = 0;
 }

 timerElement.textContent= time;
 
 feedbackElement.textContent = "Wrong"
} else {
sfxRight.play();
    feedbackElement.textContent = "Correct!";
}


    feedbackElement.setAttribute("class", "feedback");

    setTimeout(function() {
        feedbackElement.setAttribute("class", "feedback hide")
    }, 1000);

    
    if (currentQuestionIndex === questions.length) {
        quizEnd()
    } else {
        getQuestion();
    }}


function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];

    let titleElement= document.getElementById("questions-title");

    titleElement.textContent = currentQuestion.title;

    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach (function(choice, index) {
    let choiceButton = document.createElement("button");

    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);
    
    choiceButton.textContent = `${index + 1}. ${choice}`

        choiceButton.addEventListener("click", questionClick);
        choicesElement.appendChild(choiceButton);
        
    })}


function quizEnd() {
    clearInterval(timerID);
let endScreenElement = document.getElementById("end-screen");
endScreenElement.removeAttribute ("class");

let finalScoreElement = document.getElementById("final-score");
finalScoreElement.textContent = time;
questionsElement.setAttribute("class", "hide");
}


function clockTick() {
    time--;
    timerElement.textContent= time;
    
    if(time < 0) {
        quizEnd();
    }}

    

function startQuiz() {
    let startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class", "hide");
    questionsElement.removeAttribute("class");
    timerID = setInterval(clockTick, 1000)
    timerElement.textContent = time;
    getQuestion();
}


function saveHighscore() {
    let initials = initialElement.value.trim();
    console.log(initials);
    
    if (initials !== "") {

        let highscores = JSON.parse(localStorage.getItem("highscores") ) || [];
        let newScore = {
        score:time,
        initials:initials
        }

        highscores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highscores));
        
        window.localStorage.href = "highscores.html";
    } 
}


function checkforEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
