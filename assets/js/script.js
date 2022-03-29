// index.html variables
var startScreen = document.getElementById("start-screen");
var questionScreen = document.getElementById("main-quiz");

// Button variables
var startButton = document.getElementById("quiz-start");
// var backButton = document.getElementById("goBack");

// Quiz variables
var qList = [
    {
        question: "Placeholder question 1",
        choices: ["1A","B","C","D"],
        answer: "1A"
    },
    {
        question: "Placeholder question 2",
        choices: ["2A","2B","2C","2D"],
        answer: "2B"
    },
    {
        question: "Placeholder question 3",
        choices: ["3A","3B","3C","3D"],
        answer: "3C"
    },
    {
        question: "Placeholder question 4",
        choices: ["4A","4B","4C","4D"],
        answer: "4D"
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
var scoredPoints = 0;

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
    console.log("coutndown called");
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
    clearInterval(timerInterval);   
    console.log("quiz end function called");
}

// Question answer logic function
function questionLogic() {
    console.log("button press registered");
    console.log(this.dataset.answerchoice);
    console.log(qList[questionNum].answer);

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
        console.log(secondsLeft);

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
    console.log("scoreboard function called");
    
    scoreEl.textContent = scoredPoints;
}

function correctResponse() {
    responseMessage.textContent = "Correct! +25 points!";
    responseMessage.setAttribute("class","show");
    console.log("called correct response");

    setTimeout(function() {
        responseMessage.setAttribute("class","hide");
    },1500);
}

function incorrectResponse() {
    responseMessage.textContent = "Incorrect! 15 seconds deducted!";
    responseMessage.setAttribute("class","show");
    console.log("called incorrect response");

    setTimeout(function() {
        responseMessage.setAttribute("class","hide");
    },1500);
}

startButton.onclick = startQuiz;
