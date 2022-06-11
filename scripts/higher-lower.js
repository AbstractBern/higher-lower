let max = 20;
let guesses = new Array();
let randomNumber = Math.floor( Math.random() * max) + 1;

function Guess() {
    let textInput = document.getElementById('guess').value;
    let display = document.getElementById('prompt');
    var result = parseInt(textInput);
    console.log(randomNumber);
    if ( isDigit(textInput) === -1) {
        display.style.color = "red";
        display.innerText = "That number is not in range, try again.";
    } else if ( !isDigit(textInput)) {
        display.style.color = "red";
        display.innerText = "That is not a number!";
    } else if ( result < 1 || (result > max ) ) {
        display.style.color = "red";
        display.innerText = "That number is not in range, try again.";
    } else {
        if (isDigit(textInput) === 2) {
            result = Math.round(textInput);
        }
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
                display.innerText += "\n**A new number to guess has been generated.**\n**Refreshing tracked guesses.";
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

function isDigit(input) {
    let isDig = 1;
    let isNeg = 0;
    let needsRounded = 0;
    if (input.charAt(0) === '-' ) {
        isNeg = 1;
    }
    for(let i = 0; i < input.length; i++) {
        if (isNaN(input[i]) && input[i] != '.' && input[i] != '-') {
            isDig = 0;
            break;
        } else if (input[i] === '.' ) {
            needsRounded = 1;
            continue;
        } else if ( input[i] === '-') {
            continue;
        }
    }
    if (isNeg && isDig) {
        return -1;
    } else if (isDig && needsRounded) {
        return 2;
    }
    return isDig;
}