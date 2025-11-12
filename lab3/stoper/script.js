let startTime,
  elapsedTime = 0,
  timerInterval;

const display = document.querySelector(".display");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes}min ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}

function updateDisplay() {
  const currentTime = Date.now();
  const seconds = Math.floor((currentTime - startTime + elapsedTime) / 1000);
  display.textContent = formatTime(seconds);
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateDisplay, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;
  startButton.disabled = false;
  stopButton.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = "0s";
  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

stopButton.disabled = true;
