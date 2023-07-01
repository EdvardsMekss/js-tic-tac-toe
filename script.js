let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

const cells = Array.from(document.getElementsByClassName('cell'));
const resultElement = document.getElementById('result');
const playAgainButton = document.getElementById('play-again');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
playAgainButton.addEventListener('click', resetGame);

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = cells.indexOf(clickedCell);

  if (gameBoard[cellIndex] === '' && !gameOver) {
    gameBoard[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    if (checkWin()) {
      resultElement.textContent = `Player ${currentPlayer} wins!`;
      gameOver = true;
      playAgainButton.style.display = 'block';
    } else if (checkDraw()) {
      resultElement.textContent = "It's a draw!";
      gameOver = true;
      playAgainButton.style.display = 'block';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return gameBoard.every(cell => cell !== '');
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  cells.forEach(cell => {
    cell.textContent = '';
  });
  resultElement.textContent = '';
  playAgainButton.style.display = 'none';
}
