const symbols = ["🐥", "💣"]; // Symbols for the players
let currentPlayer = 0; // Index of the current player (0 or 1)
let board = []; // Representation of the game board (empty at first)
let gameBoard; // Reference to the table element
let statusMessage; // Reference to where we display game status

// Function to set up the game
function setupGame(containerId) {
	const container = document.getElementById(containerId);

	// Create the table element for the game board
	gameBoard = document.createElement("table");
	for (let i = 0; i < 3; i++) {
		const row = document.createElement("tr");
		board.push([]); // Initialize an empty row in our board array
		for (let j = 0; j < 3; j++) {
			const cell = document.createElement("td");
			cell.addEventListener("click", handleCellClick);
			row.appendChild(cell);
			board[i].push(""); // Store empty state in our board representation
		}
		gameBoard.appendChild(row);
	}
	container.appendChild(gameBoard);

	// Create a status message element
	statusMessage = document.createElement("p");
	statusMessage.textContent = `It's ${symbols[currentPlayer]}'s turn!`;
	container.appendChild(statusMessage);
}

// Function to handle the clicks on a cell of the table
function handleCellClick(event) {
	if (checkWinner()) return;
	const cell = event.target;
	const rowIndex = cell.parentElement.rowIndex;
	const colIndex = cell.cellIndex;

	// Check if the cell is empty
	if (board[rowIndex][colIndex] !== "") return; // Do nothing if not empty

	board[rowIndex][colIndex] = symbols[currentPlayer];
	cell.textContent = symbols[currentPlayer];

	// Check for winner or draw
	if (checkWinner()) {
		statusMessage.textContent = `Player ${symbols[currentPlayer]} wins!`;
	} else if (checkDraw()) {
		statusMessage.textContent = `It's a draw!`;
	} else {
		// Change the current player
		currentPlayer = (currentPlayer + 1) % 2;
		statusMessage.textContent = `It's ${symbols[currentPlayer]}'s turn!`;
	}
}

// Function to check if there is a winner
function checkWinner() {
	// Check rows, columns, and diagonals.
	return checkRows() || checkColumns() || checkDiagonals();
}

function checkRows() {
	for (let i = 0; i < 3; i++) {
		if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
			return true;
		}
	}
	return false;
}

function checkColumns() {
	for (let i = 0; i < 3; i++) {
		if (board[0][i] !== "" && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
			return true;
		}
	}
	return false;
}

function checkDiagonals() {
	if (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
		return true;
	}
	if (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
		return true;
	}
	return false;
}

// Function to check for a draw
function checkDraw() {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] === "") return false; // Game not over if a cell is empty
		}
	}
	return true; // All cells are filled
}

setupGame("tic-tac-toe");