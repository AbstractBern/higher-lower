let max = 20;
let guesses = new Array();
let randomNumber = Math.floor( Math.random() * max) + 1;

function Guess() {
    let textInput = document.getElementById('guess').value;
    let display = document.getElementById('prompt');
    console.log(randomNumber);
    var result = Number(textInput);

    if ( Number.isInteger(Number(textInput)) === false ) {
        console.log("Rounding");
        result = Math.round(result);
        console.log(result);
    }
    if ( isNaN(Number(textInput)) ) {
        console.log("HEY");
        display.style.color = "red";
        display.innerText = "That is not a number!";
    } else if ( ( Number.isInteger(Number(textInput)) === true || Number.isInteger(Number(textInput)) === false )  && ( result < 1 || result > max ) ) {
        display.style.color = "red";
        display.innerText = "That number is not in range, try again.";
    } else {
        if ( guesses.includes(result)) {
            display.style.color = "red";
            display.innerText = "This guess has been attempted and will not be counted!";
        } else {
            if ( result < randomNumber ) {
                guesses.push(result);
                display.style.color = "black";
                display.innerText = "No, try a higher number.";
            } else if ( result > randomNumber ) {
                guesses.push(result);
                display.style.color = "black";
                display.innerText = "No, try a lower number.";
            } else if ( result === randomNumber ) {
                guesses.push(result);
                display.style.color = "green";
                display.innerText = `You got it!\nIt took you ${guesses.length} tries and your guesses were  `;
                for (let i=0; i<guesses.length; i++ ) {
                    display.innerText += " " + guesses[i];
                    if (i === guesses.length-1 ) {
                        display.innerText += ".";
                    } else {
                        display.innerText += ", "
                    }
                }
                display.innerText += "\n**A new number to guess has been generated.**\n**Refreshing tracked guesses.**";
                guesses.splice(0, guesses.length);
                randomNumber = Math.floor( Math.random() * max) + 1;
            }
        }
    }
}

function setMaximumRange() {
    var input;
    let inputValid = false;
    max = 0
    while (!inputValid) {
        input = window.prompt("Enter max number to guess from (0 - N): ");
        if ( !Number.isInteger(input)) {
            max = Math.round(input);    // hits if is decimal
        } else {
            max = Number(input);
        }
        // bad input should be NaN by this condition statement
        if ( max != NaN && max > 0) {
            inputValid = true;
        }
    }
    let prompt = document.getElementById('range-prompt');
    prompt.innerText = `Guess a number between 1 and ${max}.`;
    randomNumber = Math.floor( Math.random() * max) + 1;
}
