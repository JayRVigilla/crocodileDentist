
  const CHOICES = 12;
  const teeth = document.querySelectorAll(".tooth");
  let round = null;

  function randomNumber(choices) {
    return Math.ceil(Math.random() * choices);
  }
  let trigger = randomNumber(CHOICES);
  console.log("*trigger*", trigger);

// changes css of crocodile.
function chomp() {
  const eog = document.querySelector('div.chomp')
  const message = document.querySelector('p#message')
  message.innerHTML = `Player ${turnCounter} Loses, New game?`
  };

  function resetPrompt() {
    if (confirm("New Game?")) resetBoard()
  }

function isTrigger() {
  chomp();
  const eog = document.querySelector('div.chomp')
  const button = document.querySelector('div.chomp button')
  eog.classList.remove('hidden');
  button.addEventListener('click', resetBoard)
}

function resetBoard() {
  const eog = document.querySelector('div.chomp')

  eog.classList.add("hidden")
    teeth.forEach((t) => t.setAttribute("show", "true"));
    trigger = randomNumber(CHOICES);
    console.log("*trigger*", trigger);
  }

  /**
   * Jaw
   * event listener on click in jaw
   *    if div.tooth has attribute picked === 'false' -> change to 'true'
   */
  const jaw = document.querySelector(".bottom-jaw-container");
  jaw.addEventListener("click", pickTooth);

  function togglePicked(t) {
    t.setAttribute("hidden", true)
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
      alert('Oy mate, select the number of players before playing.')
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
  const selectPlayerCount = document.querySelector("#player-count-console > button");
  const playerCountConsole = document.querySelector("#player-count-console");
  const playerConsole = document.querySelector("#player-console");

  function incrementTurn() {
    turnCounter < players.length ? (turnCounter += 1) : (turnCounter = 1);
    whoseTurn();
  }


  function showSliderPosition(val) {
    sliderPosition.value = val;
  }

  playersSlider.addEventListener("change", showSliderPosition(playersSlider.value));

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
    playerCountConsole.setAttribute("show", "false");
    makePlayers(playerCount);
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
