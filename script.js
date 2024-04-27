"use strict";

function setupGame() {
    let validMove = true;
    const turnLabel = document.getElementById("turn");
    turnLabel.textContent = "Player 0's turn";
    turnLabel.style.color = "lightblue";
    turnLabel.style.fontSize = "20px";

    const outerTable = document.createElement("table");
    const tris9 = new Tris9();

    for (let i = 0; i < 3; i++) {

        const row = outerTable.insertRow();
        tris9.board.push([]);

        for (let j = 0; j < 3; j++) {

            let cell = row.insertCell();

            const innerTable = document.createElement("table");
            innerTable.style.border = "3px solid grey";
            const tris = new Tris();

            for (let k = 0; k < 3; k++) {

                const innerRow = innerTable.insertRow();
                tris.board.push([]);

                for (let l = 0; l < 3; l++) {

                    const innerCell = innerRow.insertCell();
                    tris.board[k].push(innerCell);
                }
            }
            innerTable.addEventListener("click",
                function handleCellClick(event) {

                    const target = event.target;
                    const rowIndex = target.parentElement.rowIndex;
                    const cellIndex = target.cellIndex;
                    if (innerTable.style.border == "3px solid lightgreen" ||
                        (innerTable.style.border != "3px solid lightgreen" && validMove)) {

                        if (target.textContent == "") {

                            validMove = false;
                            target.parentElement.parentElement.parentElement.style.border = "3px solid grey";
                            target.textContent = tris9.currentPlayer;
                            tris.board[rowIndex][cellIndex].textContent = tris9.currentPlayer;
                            if (tris9.currentPlayer == 0)
                                tris.board[rowIndex][cellIndex].style.color = "lightblue";
                            else
                                tris.board[rowIndex][cellIndex].style.color = "lightsalmon";

                            if (tris.checkWinner() || tris.checkDraw()) {

                                innerTable.removeEventListener("click", handleCellClick);

                                if (tris.winner == 0) {

                                    innerTable.style.border = "3px solid lightblue";
                                }
                                else if (tris.winner == 1) {
                                    innerTable.style.border = "3px solid lightsalmon";
                                }
                                else {
                                    innerTable.style.border = "3px solid black";
                                }
                            }

                            if (tris9.board[rowIndex][cellIndex].style.border == "3px solid grey") {
                                tris9.board[rowIndex][cellIndex].style.border = "3px solid lightgreen";
                            }
                            else
                                validMove = true;

                            tris9.currentPlayer = (tris9.currentPlayer + 1) % 2;
                            turnLabel.textContent = "Player " + tris9.currentPlayer + "'s turn";
                            if (tris9.currentPlayer == 0)
                                turnLabel.style.color = "lightblue";
                            else
                                turnLabel.style.color = "lightsalmon";
                        }
                    }
                    if (tris9.checkWinner()) {
                        turnLabel.textContent = "Player " + tris9.winner + " wins!";
                        if (tris9.winner == 0) {
                            turnLabel.style.color = "lightblue";
                        }
                        else {
                            turnLabel.style.color = "lightsalmon";
                        }
                        setTimeout(() => {
                            alert("Player " + tris9.winner + " wins!");
                            location.reload();
                        }
                            , 1000);
                    }
                    if (tris9.checkDraw()) {
                        turnLabel.textContent = "It's a draw!";
                        turnLabel.style.color = "black";
                    }
                }
            );
            cell.appendChild(innerTable);
            tris9.board[i].push(innerTable);
        }
    }

    document.getElementById("tris").appendChild(outerTable);
}

class Tris {
    constructor() {
        this.board = [];
        this.winner = null;
    }

    checkWinner() {
        return this.checkRows() || this.checkColumns() || this.checkDiagonals();
    }

    checkRows() {
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0].textContent !== ""
                && this.board[i][0].textContent === this.board[i][1].textContent
                && this.board[i][1].textContent === this.board[i][2].textContent) {
                this.winner = this.board[i][0].textContent;
                return true;
            }
        }
        return false;
    }

    checkColumns() {
        for (let i = 0; i < 3; i++) {
            if (this.board[0][i].textContent !== ""
                && this.board[0][i].textContent === this.board[1][i].textContent
                && this.board[1][i].textContent === this.board[2][i].textContent) {
                this.winner = this.board[0][i].textContent;
                return true;
            }
        }
        return false;
    }

    checkDiagonals() {
        if (this.board[0][0].textContent !== ""
            && this.board[0][0].textContent === this.board[1][1].textContent
            && this.board[1][1].textContent === this.board[2][2].textContent) {
            this.winner = this.board[0][0].textContent;
            return true;
        }
        if (this.board[0][2].textContent !== ""
            && this.board[0][2].textContent === this.board[1][1].textContent
            && this.board[1][1].textContent === this.board[2][0].textContent) {
            this.winner = this.board[0][2].textContent;
            return true;
        }
        return false;
    }

    checkDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j].textContent === "") {
                    return false;
                }
            }
        }
        if (this.winner == null)
            this.winner = "draw";

        return true;
    }

}

class Tris9 {

    constructor() {
        this.board = [];
        this.currentPlayer = 0;
        this.winner = null;
    }

    checkWinner() {
        return this.checkRows() || this.checkColumns() || this.checkDiagonals();
    }

    checkRows() {
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0].style.border !== "3px solid grey"
                && this.board[i][0].style.border === this.board[i][1].style.border
                && this.board[i][1].style.border === this.board[i][2].style.border) {
                if (this.board[i][0].style.border == "3px solid lightblue")
                    this.winner = 0;
                else
                    this.winner = 1;

                return true;
            }
        }
        return false;
    }

    checkColumns() {
        for (let i = 0; i < 3; i++) {
            if (this.board[0][i].style.border !== "3px solid grey"
                && this.board[0][i].style.border === this.board[1][i].style.border
                && this.board[1][i].style.border === this.board[2][i].style.border) {
                if (this.board[0][i].style.border == "3px solid lightblue")
                    this.winner = 0;
                else
                    this.winner = 1;

                return true;
            }
        }
        return false;
    }

    checkDiagonals() {
        if (this.board[0][0].style.border !== "3px solid grey"
            && this.board[0][0].style.border === this.board[1][1].style.border
            && this.board[1][1].style.border === this.board[2][2].style.border) {
            if (this.board[0][0].style.border == "3px solid lightblue")
                this.winner = 0;
            else
                this.winner = 1;

            return true;
        }
        if (this.board[0][2].style.border !== "3px solid grey"
            && this.board[0][2].style.border === this.board[1][1].style.border
            && this.board[1][1].style.border === this.board[2][0].style.border) {
            if (this.board[0][2].style.border == "3px solid lightblue")
                this.winner = 0;
            else
                this.winner = 1;

            return true;
        }
        return false;
    }

    checkDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j].style.border === "3px solid grey") {
                    return false;
                }
            }
        }
        this.winner = "draw";
        return true;
    }

}

setupGame();