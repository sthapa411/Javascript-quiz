var questions = [{
    question: "1. Commonly used data DO NOT include:",
    choices: ["strings", "alerts", "numbers", "booleans"],
    answer: "alerts"
}, {
    question: "2. The condition in an if /else stament is enclosed within _______.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "curly brackets"
}, {
    question: "3. Arrays in javascript can be used to store ________.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
}, {
	question: "6. Which software company developed JavaScript?",
	choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
	answer: "Netscape"
}];




var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
var secondsLeft = 60;
var timerElement = document.getElementById("timer");
var submitScoreElement = document.querySelector("#submit-score");
var userScoreElement = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");

var questionNumber = -1;
var answer;


function startTimer() {
 
    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');

    // timer set for countdown - 10*6 questions = 60 seconds(left)
    setTime();

    // create questions to display
    generateQuestions();
}

function setTime() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, );
        }
    }, 1000);
}


function generateQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer;

    questionHead.textContent = questions[questionNumber].question;
    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for (var q = 0; q < choices.length; q++) {
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[q]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
}

// displaying option to enter name to scoreboard
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreElement.textContent = "Your Score: " + secondsLeft + ".";
}

// Event Listeners for Main Buttons
startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();

    window.location.href = 'highscore.html'
    
});

function addScore () {
    userNameInput = document.getElementById("userName").value
    
    // creating a new object with name and score keys
var newScore = {
        name: userNameInput,
        score: secondsLeft
    };
    // checking if there are scores in local storage first and take value
    //if not, making a blank array
    var highScores = JSON.parse(localStorage.getItem("newScore") || "[]");
    // pushing object into score array
    highScores.push(newScore)
    // turning objects into an array of strings + put it into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function hideFeedback(){
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.style.display='none'
}

function showFeedback(){
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) {
    var pElement = document.getElementsByClassName("feedback")[0]
    
    // evaluation of user's answer choices & feedback
    if (answer === event.target.textContent) {   
        pElement.innerHTML = "Correct!";
        setTimeout(hideFeedback, 1000);
        showFeedback();   
        
    } else {
        pElement.innerHTML = "Wrong!";
        setTimeout(hideFeedback,1000);
        secondsLeft = secondsLeft - 10;
        showFeedback();
    }    
    generateQuestions();
});
  // restart, clear choices, display scores

var restartBtn = document.querySelector("button.restartBtn"),
    clearBtn = document.querySelector("button.clearBtn"),
    // getting the highScores list and turning it back into an object
    highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
    scoreList = document.getElementById("score-list");

// sorting scores from high to low
highScores.sort(function (a, b) {
    return b.score - a.score
})

// displaying the scores
for (var s = 0; s < highScores.length; s++) {
    var newLi = document.createElement("li")
    newLi.textContent = highScores[s].name + " - " + highScores[s].score;
    scoreList.appendChild(newLi);
}


// click handlers for restart and clearing scoreboard
clearBtn.addEventListener("click", function () {
    localStorage.clear();

});
restartBtn.addEventListener("click", function () {
    generateQuestions();
});

