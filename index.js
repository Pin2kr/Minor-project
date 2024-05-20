let allindex = Array.from(document.querySelectorAll(".boxes"));
let clicked = false;
let alreadyWon = false;
let terminate = false;

let spaces = Array(allindex.length).fill(null);

const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const player1ScoreDisplay = document.getElementById("player1Score");
const player2ScoreDisplay = document.getElementById("player2Score");

let player1 = {
	name: "Player 1",
	score: 0,
};

let player2 = {
	name: "Player 2",
	score: 0,
};

player1ScoreDisplay.textContent = `${player1.name}: ${player1.score}`;
player2ScoreDisplay.textContent = `${player2.name}: ${player2.score}`;

function putXandY() {
	if (alreadyWon === false) {
		for (let i = 0; i < allindex.length; i++) {
			allindex[i].addEventListener("click", function () {
				if (terminate !== false) return;
				if (!player1Input.value || !player2Input.value) {
					alert("Please enter names for both players.");
					return;
				}
				if (clicked === false && spaces[i] === null) {
					allindex[i].innerText = "❌";
					spaces[i] = "❌";
					clicked = true;
					playerWins();
					if (alreadyWon === true) {
						terminate = true;
						return;
					}
				} else if (spaces[i] === null) {
					allindex[i].innerText = "⭕";
					spaces[i] = "⭕";
					clicked = false;
					playerWins();
					if (alreadyWon === true) {
						terminate = true;
						return;
					}
				}
			});
		}
	}
}

putXandY();

const winningCondition = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function playerWins() {
	for (let element of winningCondition) {
		let [a, b, c] = element;
		if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
			document.querySelector(".player").innerText = `${spaces[a]} Wins`;
			alreadyWon = true;
			allindex[a].style.background = "#317773";
			allindex[b].style.background = "#317773";
			allindex[c].style.background = "#317773";

			updateScore(spaces[a]);
		}
	}
}

function updateScore(winner) {
	if (winner === "❌") {
		player1.score++;
		player1ScoreDisplay.textContent = `${player1.name}: ${player1.score}`;
	} else if (winner === "⭕") {
		player2.score++;
		player2ScoreDisplay.textContent = `${player2.name}: ${player2.score}`;
	}
}

player1Input.addEventListener("change", (e) => {
	player1.name = e.target.value;
	player1.score = 0; // Reset score to 0
	player1ScoreDisplay.textContent = `${player1.name}: ${player1.score}`;
});

player2Input.addEventListener("change", (e) => {
	player2.name = e.target.value;
	player2.score = 0; // Reset score to 0
	player2ScoreDisplay.textContent = `${player2.name}: ${player2.score}`;
});

let resetGameBtn = document.querySelector(".resetbtn .btn");
resetGameBtn.addEventListener("click", function () {
	for (let i = 0; i < allindex.length; i++) {
		allindex[i].innerText = "";
		spaces[i] = null;
		allindex[i].style = "none";
	}
	terminate = false;
	clicked = false;
	alreadyWon = false;
	document.querySelector(".player").innerText = "Tic Tac Toe";
});

let resetScoresBtn = document.querySelector(".reset-scores-btn .btn");
resetScoresBtn.addEventListener("click", function () {
	player1.score = 0;
	player2.score = 0;
	player1ScoreDisplay.textContent = `${player1.name}: ${player1.score}`;
	player2ScoreDisplay.textContent = `${player2.name}: ${player2.score}`;
});
