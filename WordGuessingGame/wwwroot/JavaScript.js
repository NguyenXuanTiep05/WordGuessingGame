


var inputs = document.querySelectorAll("#field input");
var form = document.getElementById("guessForm");







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
        .then(data => write(data));
}

function write(verdict) {

    var answers = document.getElementById("answers");

    verdict.trim().split('').forEach(function (letter) {
        var div = document.createElement("div");
        div.textContent = letter === "T" ? "correct" : "wrong";
        answers.appendChild(div);
    });
}












