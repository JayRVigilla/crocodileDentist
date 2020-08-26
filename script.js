const CHOICES = 12;

function randomNumber(choices) {
  return Math.ceil((Math.random()*choices))
}
let trigger = randomNumber(CHOICES);

function isTrigger() {
    if (confirm("CHOMP !!!\nNew Game?")) resetBoard();
  };

const teeth = document.querySelectorAll('.tooth');
function resetBoard() {
  teeth.forEach(t => t.setAttribute('picked', 'false'));
  trigger = randomNumber(CHOICES);
  console.log(trigger);
}

/**
 * Jaw
 * event listener on click in jaw
 *    if div.tooth has attribute picked === 'false' -> change to 'true'
 */
const jaw = document.querySelector('#jaw');
jaw.addEventListener("click", pickTooth);

function togglePicked(t) {
  if (t.getAttribute('picked') === 'false') t.setAttribute('picked', 'true');
}

function pickTooth(evt) {
  const tooth = evt.target;
  const toothNum = tooth.getAttribute('num');
  console.log('*****\n\n Value of toothNum in ', toothNum, '\n\n *****')
  parseInt(toothNum) === trigger ? isTrigger() : togglePicked(tooth);
}

console.log(trigger);

/**
 * Players
 * name player 1 & 2
 * track turns
 */