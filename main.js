"use strict";
import { Tris9 } from "./Tris9.js";
import { Tris } from "./Tris.js";

let currentPlayer = 'X';
const tris9 = new Tris9();
setupGame();

function setupGame() {
    const turnLabel = document.getElementById("turn");
    turnLabel.textContent = "Player 0's turn";
    turnLabel.style.color = "lightblue";
    turnLabel.style.fontSize = "20px";

    const outerTable = createOuterTable(tris9);

    document.getElementById("tris").appendChild(outerTable);
}

function createOuterTable(tris9) {
    const outerTable = document.createElement("table");
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        const row = outerTable.insertRow();
        tris9.board.push([]);
        for (let cellIndex = 0; cellIndex < 3; cellIndex++) {
            const cell = row.insertCell();
            const tris = new Tris();
            const innerTable = createInnerTable(tris);
            innerTable.style.border = "5px solid lightgreen";
            cell.appendChild(innerTable);
            tris9.board[rowIndex].push(innerTable);
        }
    }
    return outerTable;
}

function createInnerTable(tris) {
    const innerTable = document.createElement("table");
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        const innerRow = innerTable.insertRow();
        tris.board.push([]);
        for (let cellIndex = 0; cellIndex < 3; cellIndex++) {
            const innerCell = innerRow.insertCell();
            tris.board[rowIndex].push(innerCell);
        }
    }
    innerTable.addEventListener("click", (event) => handleCellClick(event, tris));
    return innerTable;
}

function handleCellClick(event, tris) {
    const target = event.target;
    const rowIndex = target.parentElement.rowIndex;
    const cellIndex = target.cellIndex;
    const innerTable = target.closest("table");

    if (innerTable.style.border != "5px solid lightgreen" || target.textContent != "") return;

    setColorsForNextTurn(rowIndex, cellIndex);



    target.textContent = currentPlayer;
    tris.board[rowIndex][cellIndex].style.color =
        currentPlayer === 'X' ? "lightblue" : "lightsalmon";

    if (tris.checkWinner()) {
        innerTable.style.border =
            tris.winner == 'X' ? "5px solid lightblue" : "5px solid lightsalmon";
    }
}

function setColorsForNextTurn(rowIndex, cellIndex) {
    for (const row of tris9.board) {
        for (const innerTable of row) {
            innerTable.style.border = "3px solid grey";
        }
    }

    tris9.board[rowIndex][cellIndex].style.border = "5px solid lightgreen";
}