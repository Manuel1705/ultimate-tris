"use strict";
import { Tris9 } from "./Tris9.js";
import { Tris } from "./Tris.js";

const player1 = {
    name: 'Player X',
    cellMark: 'X',
    color: 'lightblue',
    borderColor: '5px solid lightblue'
};
const player2 = {
    name: 'Player O',
    cellMark: 'O',
    color: 'salmon',
    borderColor: '5px solid lightsalmon'
};
let currentPlayer = player1.cellMark;
const validMoveColor = '5px solid lightgreen';
const invalidMoveColor = '3px solid grey';
const tris9 = new Tris9();
setupGame();

function setupGame() {
    const turnLabel = document.getElementById("turn");
    turnLabel.textContent = player1.name;
    turnLabel.style.color = player1.color;

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
            innerTable.style.border = validMoveColor;
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
    const innerTable = target.closest("table");

    if (innerTable.style.border != validMoveColor || target.textContent != "") return;

    target.textContent = currentPlayer;
    target.style.color = currentPlayer === player1.cellMark ? player1.color : player2.color;

    if (tris.checkWinner()) {
        innerTable.style.border =
            tris.winner == player1.cellMark ? player1.borderColor : player2.borderColor;
    }

    const rowIndex = target.parentElement.rowIndex;
    const cellIndex = target.cellIndex;
    setColorsForNextTurn(rowIndex, cellIndex);

}


function setColorsForNextTurn(rowIndex, cellIndex) {
    colorPlayableTables(invalidMoveColor);
    const nextTable = tris9.board[rowIndex][cellIndex];
    if (canBeNextPlayableTable(nextTable)) {
        nextTable.style.border = validMoveColor;
    } else {
        colorPlayableTables(validMoveColor);
    }
}

function colorPlayableTables(color) {
    for (const row of tris9.board) {
        for (const innerTable of row) {
            if (canBeNextPlayableTable(innerTable))
                innerTable.style.border = color;
        }
    }
}

function canBeNextPlayableTable(table) {
    return table.style.border != player1.borderColor && table.style.border != player2.borderColor;

}