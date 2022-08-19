let words = ["naturaleza", "atletismo", "empanada"];
let input = document.querySelector('input');
let h2 = document.querySelector('h2');
let lives = 5;
let previousGuesses = [];
let chosenWord = words[Math.floor(Math.random() * words.length)];

input.addEventListener('keypress', onKeyPress, false);

function printChosenWord() {
    for (let i = 0; i < chosenWord.length; i++) {
        h2.innerHTML = h2.innerHTML + `<span data-id='${i}'>_</span>`;
    }
}

function checkLetter(letter) {
    if (!previousGuesses.includes(letter)) {
        document.querySelector('.error').innerHTML = "";
        updatePreviousGuesses(letter);
        let found = false;
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] == letter) {
                let char = document.querySelector(`[data-id="${i}"]`);
                char.innerHTML = letter;
                found = true;
            }
        }
        if (!found) {
            lives--;
            document.querySelector('.lives').innerHTML = lives;
            if (lives == 0) {
                document.querySelector('h1').innerHTML = "GAME OVER";
                input.removeEventListener('keypress', onKeyPress, false);
            }
        }
        else {
            var content = h2.innerHTML;
            var x = content.indexOf('_') > -1;
            if (!x) {
                document.querySelector('h1').innerHTML = "YOU WIN!";
                input.removeEventListener('keypress', onKeyPress, false);
            }
        }
    }
    else {
        document.querySelector('.error').innerHTML = "Ya has elegedido esa letra anteriormente.";
    }
}

function onKeyPress(key) {
    var letter = input.value.toLowerCase();
    if (key.keyCode == 13 && letter != "") {
        checkLetter(letter);
        input.value = "";
    }
}

function updatePreviousGuesses(letter) {
    previousGuesses.push(letter);
    document.querySelector('.previousGuesses').innerHTML = "Letras usadas: " + previousGuesses.toString();
}

printChosenWord();