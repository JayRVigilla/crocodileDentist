const CHOICES = 12;
let round = null;

function randomNumber(choices) {
  return Math.ceil((Math.random()*choices))
}
let trigger = randomNumber(CHOICES);
console.log("*trigger*",trigger);

function isTrigger() {
    if (confirm("CHOMP !!!\nNew Game?")) resetBoard();
  };

const teeth = document.querySelectorAll('.tooth');

function resetBoard() {
  teeth.forEach(t => t.setAttribute('show', 'true'));
  trigger = randomNumber(CHOICES);
  console.log("*trigger*",trigger);
}

/**
 * Jaw
 * event listener on click in jaw
 *    if div.tooth has attribute picked === 'false' -> change to 'true'
 */
const jaw = document.querySelector('#lower-jaw');
jaw.addEventListener("click", pickTooth);

function togglePicked(t) {
  if (t.getAttribute('show') === 'true') t.setAttribute('show', 'false');
  incrementTurn();
  console.log(decideTurn(),"**", turnCounter)
}

function pickTooth(evt) {
  const tooth = evt.target;
  const toothNum = tooth.getAttribute('num');
  console.log("#", toothNum);
  parseInt(toothNum) === trigger ? isTrigger() : togglePicked(tooth);
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
let players = {};
let rounds = 0;


const playersSlider = document.querySelector("#player-count-slider");
const sliderPosition = document.querySelector("#slider-position");
const selectPlayerNumber = document.querySelector("#player-count-console > button")
const playerCountConsole = document.querySelector("#player-count-console");
const playerConsole = document.querySelector("#player-console")

function incrementTurn() {
  turnCounter += 1
}

function showSliderPosition(val) {
  sliderPosition.value = val;
}

function makePlayersInObj(num, obj) {
  for (let i = 1; i <= num; i++) {
    obj[i] = "Player" + i;
  }
}

function showPlayers() {
  playerCount = sliderPosition.value
  // players object gets keys for sliderPosition players (#: Player#)
  makePlayersInObj(playerCount, players);
  // hide playerCountConsole
  playerCountConsole.setAttribute('show', 'false');
  // make playerCount amount of Player divs
  // show player-console
  playerConsole.setAttribute('show', 'true');
  console.log('*****\n\n Running showPlayers from  \n\n *****')
}
// sets player count on click
selectPlayerNumber.addEventListener("click", showPlayers)