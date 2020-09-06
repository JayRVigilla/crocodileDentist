const CHOICES = 13;
let round = null;

function randomNumber(choices) {
  return Math.ceil(Math.random() * choices);
}
let trigger = randomNumber(CHOICES);
console.log("*trigger*", trigger);

function isTrigger() {
  if (confirm("CHOMP !!!\nNew Game?")) resetBoard();
}

const teeth = document.querySelectorAll(".tooth");

function resetBoard() {
  teeth.forEach((t) => t.setAttribute("show", "true"));
  trigger = randomNumber(CHOICES);
  console.log("*trigger*", trigger);
}

/**
 * Jaw
 * event listener on click in jaw
 *    if div.tooth has attribute picked === 'false' -> change to 'true'
 */
const jaw = document.querySelector("#lower-jaw");
jaw.addEventListener("click", pickTooth);

function togglePicked(t) {
  if (t.getAttribute("show") === "true") t.setAttribute("show", "false");
  incrementTurn();
}

function pickTooth(evt) {
  if (playerCountSelected) {
    const tooth = evt.target;
    const toothNum = tooth.getAttribute("num");
    console.log("#", toothNum);
    parseInt(toothNum) === trigger ? isTrigger() : togglePicked(tooth);
  } else {
    console.log('you need to select how many players first');
  }
}

/**
 * Players
 * choose amount of players:
 *    game operates under musical chairs rules -> loser out, rest continue until one remaining
 *    dynamically add player spaces to message hub
 * name players
 * track whose turn
 * upon losing remove losing player
 */
let playerCount = 0;
let turnCounter = 1;
let players = []; // keeping to allow function for adding personal names
let rounds = 0;
let playerCountSelected = false;

const playersSlider = document.querySelector("#player-count-slider");
const sliderPosition = document.querySelector("#slider-position");
const selectPlayerCount = document.querySelector(
  "#player-count-console > button"
);
const playerCountConsole = document.querySelector("#player-count-console");
const playerConsole = document.querySelector("#player-console");

function incrementTurn() {
  turnCounter < players.length ? (turnCounter += 1) : (turnCounter = 1);
  // turnCounter = turnCounter === playerCount ? 1 : turnCounter + 1;
  whoseTurn();
}

function showSliderPosition(val) {
  sliderPosition.value = val;
}

function makePlayers(num) {
  function makePlayersInArr(num, arr) {
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
  }

  function makePlayerDiv(num) {
    let playerDiv = document.createElement("div");
    const playerName = document.createElement("h3");
    playerName.innerHTML = "Player" + num;
    playerDiv.setAttribute("playernum", num);
    playerDiv.setAttribute("class", "player");
    playerDiv.setAttribute("turn", "false");
    playerDiv.appendChild(playerName);
    playerConsole.appendChild(playerDiv);
  }

  for (let i = 1; i <= num; i++) {
    makePlayerDiv(i);
  }
  makePlayersInArr(playerCount, players);
}

function showPlayers() {
  playerCount = sliderPosition.value;
  // hide playerCountConsole
  playerCountConsole.setAttribute("show", "false");
  // make playerCount amount of Player divs
  makePlayers(playerCount);
  // show player-console
  playerConsole.setAttribute("show", "true");
  whoseTurn();
  playerCountSelected = true;
}

// shows players on click
selectPlayerCount.addEventListener("click", showPlayers);

function whoseTurn() {
  const playerDivs = document.querySelectorAll("div.player");
  for (let player of playerDivs) {
    player.getAttribute("playernum") === turnCounter.toString()
      ? player.setAttribute("turn", "true")
      : player.setAttribute("turn", "false");
  }
}
