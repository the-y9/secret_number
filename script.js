let low = 1;
let high = 50;
let gn = 0;

let phase = 1; // 1 = exponential search, 2 = binary search
let gameOver = false;

const guessText = document.getElementById("guess");
const attemptsText = document.getElementById("attempts");

function updateUI(message, isGuess = true) {
    guessText.innerText = message;
    
    if (isGuess) {
        gn++;    
    }

  attemptsText.innerText = `Attempts: ${gn}`;
}

function currentGuess() {
  if (phase === 1) {
    return high;
  }

  return Math.floor((low + high) / 2);
}

function handleResponse(response) {

  if (gameOver) return;

  response = response.toLowerCase().trim();

  let guess = currentGuess();


  // =========================
  // PHASE 1 : FIND UPPER BOUND
  // =========================
  if (phase === 1) {

    if (response === "higher") {

      low = high + 1;
      high *= 2;

      updateUI(`My guess is: ${currentGuess()}`, true);
    }

    else if (response === "lower") {

      phase = 2;

      updateUI(`My guess is: ${currentGuess()}`, true);
    }

    else if (response === "correct" || response === "yes") {

      updateUI(`Yay! I guessed it in ${gn} attempt(s).`, false);

      gameOver = true;
    }

    else {
      updateUI("Invalid input.", false);
    }

    return;
  }

  // =========================
  // PHASE 2 : BINARY SEARCH
  // =========================

  if (response === "higher") {

    low = guess + 1;
  }

  else if (response === "lower") {

    high = guess - 1;
  }

  else if (response === "correct" || response === "yes") {

    updateUI(`Yay! I guessed it in ${gn} attempt(s).`, false);

    gameOver = true;

    return;
  }

  else {

    updateUI("Invalid input.", false);

    return;
  }

  // contradiction detection
  if (low > high) {

    updateUI("Your answers are contradictory!", false);

    gameOver = true;

    return;
  }

  updateUI(`My guess is: ${currentGuess()}`, true);
}

// initial guess
updateUI(`My guess is: ${currentGuess()}`, true);