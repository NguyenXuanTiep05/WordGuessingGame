


const inputs = document.querySelectorAll("#field input");
const form = document.getElementById("guess_Form");



const Main = () => {
    inputs[0].focus();


    inputs.forEach( (input, i) => {
        input.addEventListener("keyup", (e) => {

            if (!isLetter(input.value)) {
                input.value = "";
            }

            if (e.key === "Backspace" && !input.value.length && inputs[i - 1]) {
                inputs[i].disabled = true;
                if (inputs[i].value === "") {
                    inputs[i - 1].value = "";
                }
                inputs[i - 1].focus();
            }

            if (input.value.length === input.maxLength && inputs[i + 1]) {
                inputs[i + 1].disabled = false;
                    inputs[i + 1].focus();
            }


            else if (!input.value.length && inputs[i + 1]) {
                for (let j = i + 1; j < inputs.length; j++) {
                    inputs[j].disabled = true;
                    inputs[j].value = "";
                }
            }




            const allFilled = Array.from(inputs).every( (inp) =>{
                return inp.value.length === inp.maxLength;
            });
            if (allFilled) {
                let word = Array.from(inputs).map(input => input.value).join('');
                callValidation(word);
                rest();
            }
        });
    });
};

Main();


const isLetter = (str) => {
    return str.length === 1 && str.match(/[a-z]/i);
}

const rest = (e) => {
    inputs.forEach( (input, i) => {
        input.value = "";
        if (i !== 0) input.disabled = true;
    });
    inputs[0].focus();
}

const callValidation = (word) => {
    fetch('/Index?handler=Validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: word })
    })
        .then(res => res.text())
        .then(data => verdict(data, word));
}

let numberOfGuesses = 0;


const verdict = (verdict, word) => {

    let answerField = document.getElementById("answers");
    let rightGuessed = true;
    for (let i = 0; i < verdict.length; i++) {
        let div = document.createElement("div");
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

const checkEndGame = (win) => {

    let Notfication = document.getElementById("notification_Text");

    let victoryText = document.createElement("h1");
    victoryText.innerText = win ? "You guessed right!!!!!!!!!!!" : "You are out of guesses";

    let resetBtn = document.createElement("button");
    resetBtn.addEventListener('click',  () =>{
        window.location.reload();
    });

    document.addEventListener("keyup",(e) =>{
        if(e.key === "Enter"){
            window.location.reload();
        }
    } )


    resetBtn.className = "notification_Text__Reset_Button";
    resetBtn.innerText = "Click here or press ENTER to play again";

    Notfication.appendChild(resetBtn);
    Notfication.appendChild(victoryText);

    inputs.forEach( (input) => {
        input.disabled = true;
    });
}












