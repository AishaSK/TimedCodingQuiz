
var time = questions.length * 15;
var timerID;
var currentQuestionIndex = 0
let timerElement = document.getElementById("timer");

var questionsElement = document.getElementById("questions");
var startBtn = document.getElementById("startQuizBtn");
var choicesElement = document.getElementById("choices");
var checkAnswerElement = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highScores");
var submitButton = document.getElementById("submitButton");
var clearScores = document.getElementById("clearScores");
var initialsElement = document.getElementById("initials");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var feedbackElement = document.getElementById("feedback");

startBtn.addEventListener("click", startQuiz);
checkAnswerElement.addEventListener("click", () => {
currentQuestionIndex ++
setNextQuestion ()
});

 function startQuiz () {
    var sec = 100;
    function startTimer(){
        console.log('')
        var timer = setInterval(function(){
            sec--;
            document.getElementById('timer').innerHTML='00:'+sec;
            if (sec < 0) {
                clearInterval(timer);
                alert("Time is up!")
            }
        }, 1000);
    }

    // //document.getElementById('incorrect').addEventListener('click', function() {
    //     sec -= 5;
    //     document.getElementById('timerDisplay').innerHTML='00:'+sec;
    // });
    startQuizBtn()
    startTimer();
    };

var sfxRight = new Audio("assets/sfx/correct.wav");

function questionClick () {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15 ;

        if (time < 0) {
        time = 0 ;
        timerElement.textContent = 'time';
        feedbackElement.textContent = 'Incorrect!';
        } else {
        sfxRight.play();
        feedbackElement.textContent = "Correct!"; }
        
    feedbackElement.setAttribute("class", "feedback");

    setTimeout(function() {
        feedbackElement.setAttribute("class", "feedback hide");
    }, 1000);

    if(currentQuestionIndex === questions.length) {
        quizEnd()
    } else {
        getQuestion();
    }}}

        function startQuizBtn(){
            questionsElement.removeAttribute("class", "hide");
            let currentQuestion = questions[currentQuestionIndex];
            let questionTitle = document.getElementById("question-title");
            questionTitle.textContent = currentQuestion.title;
            choicesElement.innerHTML = "";
            currentQuestion.choices.forEach(function(choice, index) {
                let choiceButton = document.createElement("button");
                choiceButton.setAttribute("class", choice);
                choiceButton.setAttribute("value", choice);
                choiceButton.textContent = `${index + 1}. ${choice}`;
                choiceButton.addEventListener("click", questionClick);
                choicesElement.appendChild(choiceButton);  
            
            })}

            function quizEnd () {
                 clearInterval(timerID);
                
                let endScreenElement = document.getElementById("endScreen");
                endScreenElement.removeAttribute("class");
                let finalScore = document.getElementById("finalScore");
                finalScoreElement.textContent = time;
                questionsElement.setAttribute("class", "hide");
                questionsElement.removeAttribute("class");
                timerID = setInterval (clockTick, 1000)
                timerElement.textContent = time;
                getQuestionElement();
            }

            function saveHighScore () {
                let initials = initialsElement.value.trim();
                console.log(initials);
                
                if (initials !== "") {
                    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
                    let newScore = {
                    score: time,
                    initials: initials
                }
                highScores.push(newScore);
                localStorage.setItem("highScores", JSON.stringify(highScores));
                
                window.location.assign("highscores.html");

            }}

            function checkForEnter (event) {
            if(event.key === "Enter") {
                saveHighScore();
            }}

            startBtn.addEventListener("click", startQuiz);
            
            submitButton.addEventListener("click", saveHighScore);

            initialsElement.addEventListener("keypress", checkForEnter);

