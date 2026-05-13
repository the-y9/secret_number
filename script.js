let low = 1;
let high = Math.floor(Math.random() * 100) + 1;
let gn = 1;

let phase = 1; // 1 = exponential search, 2 = binary search
let gameOver = false;
let gameStarted = false;
if (gameStarted === true) {
  
}
const startBtn = document.getElementById("start");
const attemptsText = document.getElementById("attempts");
const gameControls = document.getElementById("gameControls");
const guessText = document.getElementById("guess");

function startGame() {
  gameControls.style.display = "block";
  startBtn.style.display = 'none';
  gameStarted = true;
  resetGame();

}

function resetGame() {
  if (gameStarted) {
    low = 1;
    high = Math.floor(Math.random() * 100) + 1;
    gn = 1;
    phase = 1;
    gameOver = false;
    guessText.innerText = `My guess is: ${currentGuess()}`;
    attemptsText.innerText = `Attempts: ${gn}`;
  }
}


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
      fireworks();
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

function fireworks() {

  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 }
  });

  confetti({
    particleCount: 150,
    angle: 60,
    spread: 80,
    origin: { x: 0 }
  });

  confetti({
    particleCount: 150,
    angle: 120,
    spread: 80,
    origin: { x: 1 }
  });
}