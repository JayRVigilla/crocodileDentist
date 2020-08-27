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
  teeth.forEach(t => t.setAttribute('picked', 'false'));
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
  if (t.getAttribute('picked') === 'false') t.setAttribute('picked', 'true');
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

function setPlayerCount(num) {
  if (round === null) askHowManyPlayers();
  playerCount = num;
}

function incrementTurn() {
  turnCounter += 1
}

function askHowManyPlayers() {

}

function decideTurn() {
  return(turnCounter % 2 === 0 ? "Player 2" : "Player 1");
}