const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultEl = document.getElementById("result");
const popup = document.querySelector(".popup");
const restartBtn = document.getElementById("restart-btn");

let playerScore = 0;
let computerScore = 0;

// Olası seçimler
const choices = ["rock", "paper", "scissors"];

// Random bilgisayar seçimi
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Kazananı belirle
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "Eşitlik!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    playerScore++;
    return "Oyuncu kazandı!";
  } else {
    computerScore++;
    return "Bilgisayar kazandı!";
  }
}

// Oyunu başlat
function playGame(playerChoice) {
  const computerChoice = getComputerChoice();

  playerHand.classList.add("shake");
  computerHand.classList.add("shake");

  setTimeout(() => {
    playerHand.classList.remove("shake");
    computerHand.classList.remove("shake");

    const result = determineWinner(playerChoice, computerChoice);
    resultEl.textContent = result;

    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;

    playerHand.src = `resimler/${playerChoice}.png`;
    computerHand.src = `resimler/${computerChoice}.png`;

    // Oyun bitiş kontrolü
    if (playerScore === 5 || computerScore === 5) {
      showPopup(playerScore === 5 ? "Oyuncu kazandı!" : "Bilgisayar kazandı!");
    }
  }, 500);
}

// Butonlara tıklama olayları
document.getElementById("rock").addEventListener("click", () => playGame("rock"));
document.getElementById("paper").addEventListener("click", () => playGame("paper"));
document.getElementById("scissors").addEventListener("click", () => playGame("scissors"));

// Popup'ı göster
function showPopup(winner) {
  popup.querySelector("h1").textContent = winner;
  popup.style.display = "block";
}

// Yeniden başlatma butonuna tıklama
restartBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  resultEl.textContent = "SEÇİMİNİ YAP İLK 5 OLAN KAZANIR!";
  popup.style.display = "none"; // Popup'ı gizle
});
