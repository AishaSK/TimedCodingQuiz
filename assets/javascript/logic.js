
//keeping track of variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
let timerID;


//html elements
 var startScreen = document.createElementById("startScreen");

 var highScoresBoard = document.createElementById("highScoresBoard");
 
 var submit = document.createElementById("submit");
 
 var questionsElement = document.createElementById("questions");

 var choicesElement = document.createElementById("choices");

 var startButton = document.createElementById("start");
 
var initialsElement = document.createElementById("initials");

var feedbackElement = document.createElementById("feedback");


 function startQuiz() {
    var sec = 145;
    function startTimer(){
        console.log('timer suppose to go')
        var timer = setInterval(function(){
            sec--;
            document.getElementById('timerDisplay').innerHTML='00:'+sec;
            if (sec < 0) {
                clearInterval(timer);
                alert("Time is up!")
            }
        }, 1000);
    }
    document.getElementById('incorrect').addEventListener('click', function() {
        sec -= 5;
        document.getElementById('timerDisplay').innerHTML='00:'+sec;
    });
    startTimer();
};

var sfxRight = new Audio("assets/sfx/correct.wav");


function questionClick () {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15 ;

        if (time < 0) {
        time = 0 ;
        timerElement.textContent = '00:00';
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

        function getQuestion () {
            let currentQuestion = questions[currentQuestionIndex];
            let questionTitle = document.createElementById("questionTitle");
            questionTitle.textContent = currentQuestion.title;
            choicesElement.innerHTML = "";
            currentQuestion.choices.forEach(function(choice, index) {
                let choiceElement = document.createElement("button");
                choiceElement.setAttribute("class", choice);
                choiceButton.setAttribute("value", choice);
                choiceButton.textContent = `${index + 1}. ${choice}`;
                choiceButton.addEventListener("click", questionClick);
                choicesElement.appendChild(choiceButton);
                
            })}


            function quizEnd () {

                clearInterval(timerID);
                
                let endScreenElement = document.createElementById("endScreen");
                endScreenElement.removeAttribute("class");
                let finalScore = document.createElementById("finalScore");
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

            startButton.addEventListener("click", startQuiz);
            
            submitButton.addEventListener("click", saveHighScore);

            initialsElement.addEventListener("keypress", checkForEnter);

