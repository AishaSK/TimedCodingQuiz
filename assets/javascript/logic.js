
//keeping track of variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
let timerID;


//html elements
 var startScreen = document.createElementById("startScreen");

 var highScoresBoard = document.createElementById("highScoresBoard");
 
 var submit = document.createElementById("submit");
 
 var questionTitle = document.createElementById("questionTitle");

 var choicesListParent = document.createElementById("choicesListParent");
 
 var timerDisplay = document.createElementById("timerDisplay");

 var startBtn = document.createElementById("startBtn");
 
 var questionScreen = document.createElementById("questionScreen");

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
    if (this.value === questions [currentQuestionIndex].correctAnswer) {
time +10 ;

if (this.value === questions [currentQuestionIndex].wrongAnswer) {
    time -= 10;
}}
 timerElement.textContent = time;
 
 feedbackElement.textContent = "wrong";
}
else {
    sfxRight.play();
    feedbackElement.textContent = "correct";
}

    feedbackElement.setAttribute("class", "feedback");

    setTimeout (function () {
        feedbackElement.setAttribute("class", "feedback hidden");
    }, 1000);


    if (currentQuestionIndex === questions.length) {
        quizEnd()
    } else {
        getQuestion();
    }

    function startTimer() {
        quizTimer = setInterval (function () {
            time --;
            timerDisplay.textContent = time;
            if (time <= 0) {
                time = 0;
                endQuiz ();
            }
        }, 1000);
    }

    function startQuestions () {
        var currentQuestion = questions [currentQuestionIndex].title;
        questionTitle.textContent = currentQuestion;
        answersListParent.innerHTML = "";
        var currentQuestionAnswers = questions [currentQuestionIndex].choices;
        currentQuestionAnswers.forEach (function (answer) {
            var answerButton = document.createElement("button");
            answerButton.setAttribute("value", answer);
            answerButton.textContent = answer;
            answerButton.onclick = checkAnswerSelected;
            answersListParent.appendChild(answerButton);
        )
        }
            

 function checkAnswerSelected() {
    var answerSelected = this.value;
    if (answerSelected === questions[questionAskedIndex].answer) {
        alert("correct")
    } else{
     alert("wrong")
     time -=10;
     if (time <= 0){
        endQuiz();
     }
        timerDisplay.textContent = time;
    }
    questionAskedIndex++;
    console.log(questionAskedIndex)
    if (questionAskedIndex === questions.length){
        endQuiz();
    }
    startQuestions();
}

    initialsInput.addEventListener("keyup", function (event) {
        checkForEnterKey(event);
    }




    addEventListener, ("click", questionClick);
    addEventListener, ("click", startQuizTimer);
    addEventListener, ("click", startQuestions);

