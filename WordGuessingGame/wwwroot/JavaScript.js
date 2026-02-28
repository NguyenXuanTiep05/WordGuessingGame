


var inputs = document.querySelectorAll("#field input");
var form = document.getElementById("guess_Form");







(function () {
    inputs.forEach(function (input, i) {
        input.addEventListener("keyup", function (e) {

            if (!isLetter(input.value)) {
                input.value = "";
            }

            if (input.value.length === input.maxLength && inputs[i + 1]) {
                inputs[i + 1].disabled = false;
                    inputs[i + 1].focus();
            }


            else if (!input.value.length && inputs[i + 1]) {
                for (var j = i + 1; j < inputs.length; j++) {
                    inputs[j].disabled = true;
                    inputs[j].value = "";
                }
            }


            if (e.key === "Backspace" && !input.value.length && inputs[i - 1]) {
                inputs[i].disabled = true;
                if (inputs[i].value === "") {
                    inputs[i - 1].value = "";
                }
                inputs[i - 1].focus();
            }

            var allFilled = Array.from(inputs).every(function (inp) {
                return inp.value.length === inp.maxLength;
            });
            if (allFilled) {
                var word = Array.from(inputs).map(input => input.value).join('');
                callValidation(word);
                rest();
            }
        });
    });
})();


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function rest(e) {
    inputs.forEach(function (input, i) {
        input.value = "";
        if (i !== 0) input.disabled = true;
    });
    inputs[0].focus();
}

function callValidation(word) {
    fetch('/Index?handler=Validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: word })
    })
        .then(res => res.text())
        .then(data => verdict(data, word));
}

let numberOfGuesses = 0;


function verdict(verdict, word) {

    var answerField = document.getElementById("answers");
    var rightGuessed = true;
    for (let i = 0; i < verdict.length; i++) {
        var div = document.createElement("div");
        switch (verdict[i]) {
            case "T":
                div.className = 'answers__Letter answers__Letter--Right'
                break;
            case "F":
                div.className = 'answers__Letter answers__Letter--Wrong'
                rightGuessed = false;
                break;
            case "C":
                div.className = 'answers__Letter answers__Letter--WrongPosition'
                rightGuessed = false;
                break;
            default:
        }
        div.textContent = word[i];
        answerField.appendChild(div);
    }

    numberOfGuesses++;
    if (rightGuessed) {
        checkEndGame(true)
    }

    else if (numberOfGuesses >= word.length) {
        checkEndGame(false)
    }

 
}

function checkEndGame(win) {

    var Notfication = document.getElementById("notification_Text");

    var victoryText = document.createElement("h1");
    victoryText.innerText = win ? "You guessed right!!!!!!!!!!!" : "You are out of guesses";

    var resetBtn = document.createElement("button");
    resetBtn.addEventListener('click', function () {
        window.location.reload();
    });
    resetBtn.className = "notification_Text__Reset_Button";
    resetBtn.innerText = "Click here to play again";

    Notfication.appendChild(resetBtn);
    Notfication.appendChild(victoryText);

    inputs.forEach(function (input) {
        input.disabled = true;
    });
}












