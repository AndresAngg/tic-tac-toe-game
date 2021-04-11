// ==================== CONSTANTS ==================== //
const STATUS_DISPLAY = document.querySelector('.game-notification'),
  GAME_STATE = ["", "", "", "", "", "", "", "", ""],
  WINNINGS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  WIN_MESSAGE = () => `<b>${nameTurn}</b> es el ganador!`,
  DRAW_MESSAGE = () => `<b>EMPATE!!</b>`,
  CURRENT_PLAYER_TURN = () => `Turno de <b>${nameTurn}(${currentPlayer})</b>`

// ==================== VARIABLES ==================== //
function datos() {

}

var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');
var gameActive = true,
  currentPlayer = "X",
  nameplayer1 = player1.value,
  nameplayer2 = player2.value
nameTurn = nameplayer1;


// ==================== FUNCTIONS ==================== //
function turnos() {

}
function updateName() {
  if (player1.value == '' && player2.value == '' || player1.value == '' && player2.value != '' || player1.value != '' && player2.value == '') {
    document.getElementById('warnn').setAttribute("class", "show")
  }
  if (player1.value != '' && player2.value != '') {
    document.getElementById('warnn').setAttribute("class", "hidden")
    nameplayer1 = player1.value;
    nameplayer2 = player2.value;
    document.getElementById('cont').removeAttribute('hidden');
    document.getElementById('form').setAttribute('hidden', '')
    handleUpdateName()
  }
}

function main() {
  handleStatusDisplay(CURRENT_PLAYER_TURN())
  listeners()
}

function listeners() {
  document.querySelector('.game-container').addEventListener('click', handleCellClick)
  document.querySelector('.game-restart').addEventListener('click', handleRestartGame)
}

function handleStatusDisplay(message) {
  STATUS_DISPLAY.innerHTML = message
}
function resetNames() {

  document.getElementById('player1').setAttribute("value", "Jugador1")
  document.getElementById('player2').setAttribute("value", "Jugador2")
  location.reload();
}
function handleUpdateName() {
  gameActive = true
  currentPlayer = "X"
  nameTurn = nameplayer1
  restartGameState()
  handleStatusDisplay(CURRENT_PLAYER_TURN())
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "")
}
function handleRestartGame() {
  gameActive = true
  currentPlayer = "X"
  nameTurn = nameplayer1
  restartGameState()
  resetNames()
  handleStatusDisplay(CURRENT_PLAYER_TURN())
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "")
}

function handleCellClick(clickedCellEvent /** Type Event **/) {

  const clickedCell = clickedCellEvent.target
  if (clickedCell.classList.contains('cell')) {
    const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
    if (GAME_STATE[clickedCellIndex] !== '' || !gameActive) {
      return false
    }

    handleCellPlayed(clickedCell, clickedCellIndex)
    handleResultValidation()
  }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  GAME_STATE[clickedCellIndex] = currentPlayer
  clickedCell.innerHTML = currentPlayer 
}

function handleResultValidation() {
  let roundWon = false
  for (let i = 0; i < WINNINGS.length; i++) {
    const winCondition = WINNINGS[i] 
    let position1 = GAME_STATE[winCondition[0]],
      position2 = GAME_STATE[winCondition[1]],
      position3 = GAME_STATE[winCondition[2]] 

    if (position1 === '' || position2 === '' || position3 === '') {
      continue; 
    }
    if (position1 === position2 && position2 === position3) {

      
      roundWon = true 
      break
    }
  }

  if (roundWon) {
    handleStatusDisplay(WIN_MESSAGE())
    gameActive = false
    return
  }

  let roundDraw = !GAME_STATE.includes("") // Si todas las celdas tienen valor y la sentencia anterior fue falsa entonces es empate
  if (roundDraw) {
    handleStatusDisplay(DRAW_MESSAGE())
    gameActive = false
    return
  }

  handlePlayerChange()
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  if (currentPlayer == "X") {
    nameTurn = player1.value
  }
  if (currentPlayer == "O") {
    nameTurn = player2.value
  }

  handleStatusDisplay(CURRENT_PLAYER_TURN())
}

function restartGameState() {
  let i = GAME_STATE.length
  while (i--) {
    GAME_STATE[i] = ''
  }
}

main()