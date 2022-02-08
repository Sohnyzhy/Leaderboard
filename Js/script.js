const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const ComputerScore = document.querySelector("[data-computer-score]");
const scoreScore = document.querySelector("[data-your-score]");
let leaderboard = "";
let leaderboardfb = "";
const headerObject = { "Content-type": "application/json; charset=UTF-8" };
let x = document.getElementById("playernames").value;

function myFunction() {
  document.getElementById("demo").innerHTML = x;
}

const SELECTIONS = [
  {
    name: "rock",
    emoji: "👊",
    beats: "scissors",
  },
  {
    name: "paper",
    emoji: "🖐️",
    beats: "rock",
  },
  {
    name: "scissors",
    emoji: "✌️",
    beats: "paper",
  },
];

selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );
    makeSelection(selection);
  });
});

function makeSelection(selection) {
  const computerSelection = randomSelection();
  const Yourwinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);

  AddTheResult(computerSelection, computerWinner);
  AddTheResult(selection, Yourwinner);
  if (Yourwinner) incrementScore(scoreScore);

  if (computerWinner) incrementScore(ComputerScore);
}

function incrementScore(score) {
  let name = document.getElementById("playernames").value;
  if (name == "") {
    return;
  }

  score.innerText = parseInt(score.innerText) + 1;

  if (parseInt(scoreScore.innerText) === 100) {
    alert(` Winner winner chicken dinner!!`);
  } else if (parseInt(ComputerScore.innerText) === 1) {
    alert("Pc Win!");
    changePlayerOneName();
  }
}

function AddTheResult(selection, winner) {
  const div = document.createElement("div");
  div.innerText = selection.emoji;
  div.classList.add("result-selection");
  if (winner) div.classList.add("winner");
  finalColumn.after(div);
}

function isWinner(selection, opponentSelection) {
  console.log(selection.beats);
  console.log(opponentSelection.name);
  return selection.beats === opponentSelection.name;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}

const url =
  "https://leaderboard-ec787-default-rtdb.firebaseio.com/player/.json";

function init() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let arr = [];
      for (const playerX in data) {
        arr.push(data[playerX]);
      }
      arr.sort(function (a, b) {
        console.log(a.score);
        return b.score - a.score;
      });
      leaderboard = arr;
      leaderboardfb = data;
      for (let index = 0; index < 5; index++) {
        console.log(leaderboard[index].name);
        let nametag = document.createElement("li");
        nametag.setAttribute("id", leaderboard[index].name);
        nametag.setAttribute("oldvalue", leaderboard[index].name);
        nametag.innerHTML = leaderboard[index].name;
        document.querySelector(".leaderboard").appendChild(nametag);

        let score = document.createElement("li");
        score.setAttribute("id", leaderboard[index].name + "-score");
        score.innerHTML = leaderboard[index].score;
        document.querySelector(".leaderboard").appendChild(score);
      }
    });
}
init();

const nameChange = `https://leaderboard-ec787-default-rtdb.firebaseio.com/player/.json`;
async function changePlayerOneName() {
  console.log(scoreScore.innerHTML);
  console.log(x);
  await fetch(nameChange, {
    method: "POST",
    headers: headerObject,
    body: JSON.stringify({ name: x, score: scoreScore.innerHTML }),
  })
    .then((r) => r.json())
    .then((data) => console.log(data));
}

function inputChange(e) {
  console.log(e.value);
  console.log(e.oldvalue);
}

function addPlayerName() {}
