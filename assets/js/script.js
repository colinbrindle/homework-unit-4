// index.html variables
var startScreen = document.getElementById("start-screen");
var questionScreen = document.getElementById("main-quiz");

// Button variables
var startButton = document.getElementById("quiz-start");
var submitButton = document.getElementById("submit-button");

// Quiz variables
var qList = [
    {
        question: "Which of the following statements about the DOM is correct?",
        choices: [
            "DOM stands for 'Document Object Model' and is the data representation of the objects that comprise the structure and content of an HTML file",
            "DOM stands for 'Document Object Manager' and is a software intermediary that allows sites to interface with one another",
            "DOM stands for 'Document Object Model' and is a software intermediary that allows sites to interface with one another",
            "DOM stands for 'Document Object Manager' and is the data representation of the objects that comprise the structure and content of an HTML file"
        ],
        answer: "DOM stands for 'Document Object Model' and is the data representation of the objects that comprise the structure and content of an HTML file"
    },
    {
        question: "Inside which HTML element do you put a JavaScript and what is the correct syntax for referring to an external script called 'script.js'?",
        choices: [
            "<header href='script.js'></header>",
            "<script src='script.js'><script>",
            "<link rel='JavaScript' href='script.js'>",
            "<html scr='script.js'>"
        ],
        answer: "<script src='script.js'><script>"
    },
    {
        question: "How would you start a loop that increments by 1 and loops a maximum of 10 times?",
        choices: [
            "for {i = 0; i <= 10; i++} ()",
            "for (i = 0; i <= 10; i++) {}",
            "for (i = 0; i < 10; i++) {}",
            "for {i = 0; i < 10; i++} ()"
        ],
        answer: "for (i = 0; i < 10; i++) {}"
    },
    {
        question: "What is the correct JavaScript syntax to change the text content of an HTML element with the ID main-banner?",
        choices: [
            "document.getElementByClass('main-banner').textContent = \"Welcome!\"",
            "document.getElementById(#main-banner).textContent = \"Welcome!\"",
            "#main-banner.textContent = \"Welcome!\"",
            "document.getElementById('main-banner').textContent = \"Welcome!\""
        ],
        answer: "document.getElementById('main-banner').textContent = \"Welcome!\""
    }
];
var questionNum = 0;
var answerList = document.getElementById("answer-options");
var responseMessage = document.getElementById("response-message");

// Timer variables
var secondsLeft = qList.length * 30;
var timeLeft = document.getElementById("time-left");
var timerInterval;

// Scoreboard variables
var scoreEl = document.getElementById("scoreboard");
var scoreScreen = document.getElementById("score-screen");
var scoredPoints = 0;
var endTimeEl = document.getElementById("end-time");
var endPointsEl = document.getElementById("end-points");
var finalScoreEl = document.getElementById("final-score");

// Start quiz button function
function startQuiz () {
    startScreen.setAttribute("class","hide");
    questionScreen.setAttribute("class","show");

    countdownTimer();
    scoreboard();
    quizQuestions();
}

// Main page button function
function toMainPage () {
    startScreen.setAttribute("class","show");
    questionScreen.setAttribute("class","hide");
}

// Countdown timer function
function countdownTimer () {
    timeLeft.textContent = secondsLeft + " seconds left!"

    timerInterval = setInterval(function() {
        secondsLeft--;
        timeLeft.textContent = secondsLeft + " seconds left!";

        if (secondsLeft === 1) {
            timeLeft.textContent = secondsLeft + " second left!";
        }
        else if (secondsLeft === 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Out of time!";
        }
    }, 1000)
}

// Show quiz questions function
function quizQuestions() {
    var currentQuestion = qList[questionNum];
    var questionText = document.getElementById("question-text");
    var answerChoices = currentQuestion.choices;

    questionText.textContent = currentQuestion.question;

    answerList.textContent  = "";

    for (i = 0; i < answerChoices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("data-answerchoice",answerChoices[i]);
        choiceButton.textContent = "( " + (i + 1) + " ) " + answerChoices[i];
        
        answerList.append(choiceButton);

        choiceButton.onclick = questionLogic;
    }
}

// End quiz function
function endQuiz() {
    var endTime = secondsLeft;
    var endPoints = scoredPoints;
    var totalPoints = scoredPoints + secondsLeft;
    clearInterval(timerInterval);

    questionScreen.setAttribute("class","hide");

    scoreScreen.setAttribute("class","show");

    endTimeEl.textContent = endTime;
    endPointsEl.textContent = endPoints;
    finalScoreEl.textContent = totalPoints;
}

// Question answer logic function
function questionLogic() {
    if (this.dataset.answerchoice === qList[questionNum].answer){
        scoredPoints += 25;
        correctResponse();
        scoreboard();
    }
    else {
        secondsLeft -= 15;
        incorrectResponse();
    }

    questionNum++;

    if (questionNum === qList.length) {
        endQuiz();

        if (secondsLeft === 1) {
            timeLeft.textContent = secondsLeft + " second left!";
        }
        else if (secondsLeft === 0) {
            timeLeft.textContent = "Out of time!";
        }
        else {
            timeLeft.textContent = secondsLeft + " seconds left!";
        }
    }
    else {
        quizQuestions();
    }
}

// Scoreboard function
function scoreboard() {
    scoreEl.textContent = scoredPoints;
}

function correctResponse() {
    responseMessage.textContent = "Correct! +25 points!";
    responseMessage.setAttribute("class","show");

    setTimeout(function() {
        responseMessage.setAttribute("class","hide");
    },1500);
}

function incorrectResponse() {
    responseMessage.textContent = "Incorrect! 15 seconds deducted!";
    responseMessage.setAttribute("class","show");

    setTimeout(function() {
        responseMessage.setAttribute("class","hide");
    },1500);
}

function recordName() {
    console.log("it's recorded! but not really");
}

startButton.onclick = startQuiz;
submitButton.onclick = recordName;