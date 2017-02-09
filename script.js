// Globals

var userInput = document.getElementById('userInput');
var submitButton = document.querySelector('.submitBtn');

var textResults = document.querySelector('.textResults')
var lastGuess = document.querySelector('.lastGuess');
var guesses = document.querySelector('.guesses');
var highOrLow = document.querySelector('.highOrLow');

// App object
var app = {
    guessCount: 1,
    previousGuesses: "",
    theNumber: "",
    init: function(){
        this.randomNumberGenerator();
        userInput.focus();
    },
    randomNumberGenerator: function () {
        answer = Math.floor(Math.random() * 100) + 1;
        this.theNumber = answer;
    },
    checkGuess: function () {
        var userGuess = Number(userInput.value);
        if (this.guessCount == 1) {
            guesses.textContent = "Previous guesses: ";
        };
        guesses.textContent += userGuess + ', ';

        if (userGuess > this.theNumber) {
            highOrLow.textContent = "Your last guess was higher than my number.";
        } else if (userGuess < this.theNumber) {
            highOrLow.textContent = "Your last guess was lower than my number."
        }

        if (userGuess === this.theNumber) {
            lastGuess.textContent = "Bingo! You win.";
            lastGuess.style.backgroundColor = "green";
            highOrLow.textContent = "The number was: " + this.theNumber;
            this.endGame()
        } else if (this.guessCount === 10) {
            lastGuess.textContent = "You've used up all your tries! Game over.";
            highOrLow.textContent = "The number was: " + this.theNumber;
            this.endGame()
        } else {
            lastGuess.textContent = "Wrong!";
            lastGuess.style.backgroundColor = "red";

            this.guessCount++;
            userInput.value = "";
        }
    },
    endGame: function () {
        userInput.disabled = true;
        submitButton.disabled = true;
        resetBtn = document.createElement('button');
        resetBtn.textContent = "Play again";
        resetBtn.className = "resetBtn"
        textResults.appendChild(resetBtn);
        resetBtn.addEventListener('click', function () {
            app.resetGame();
        })
    },
    resetGame: function () {
        this.guessCount = 1;
        userInput.value = "";
        userInput.disabled = false;
        submitButton.disabled = false;
        var textResultsChildren = document.querySelectorAll('.textResults p');
        for (var i = 0; i < textResultsChildren.length; i++) {
            textResultsChildren[i].textContent = "";
        };
        resetBtn.parentNode.removeChild(resetBtn)
        this.init();
    }
}

// Event handlers
var handlers = {
    checkGuess: function () {
        app.checkGuess();
    }
}
app.init();