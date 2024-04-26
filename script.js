"use strict";




function setupGame() {
    const turnLabel = document.getElementById("turn");
    turnLabel.textContent = "Player 0's turn";
    const outerTable = document.createElement("table");
    const tris9 = new Tris9();

    for (let i = 0; i < 3; i++) {

        const row = outerTable.insertRow();
        tris9.board.push([]);

        for (let j = 0; j < 3; j++) {

            let cell = row.insertCell();

            const innerTable = document.createElement("table");
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

                    if (target.textContent == "") {

                        target.parentElement.parentElement.parentElement.style.border = "none";
                        target.textContent = tris9.currentPlayer;
                        tris.board[rowIndex][cellIndex].textContent = tris9.currentPlayer;

                        if (tris.checkWinner() || tris.checkDraw()) {

                            innerTable.removeEventListener("click", handleCellClick);

                            if (tris.winner == 0) {

                                innerTable.style.border = "5px solid blue";
                            }
                            else {

                                innerTable.style.border = "5px solid red";
                            }
                        }

                        if (tris9.board[rowIndex][cellIndex].style.border != "5px solid blue" && tris9.board[rowIndex][cellIndex].style.border != "5px solid red") {

                            tris9.board[rowIndex][cellIndex].style.border = "5px solid green";
                        }

                        tris9.currentPlayer = (tris9.currentPlayer + 1) % 2;
                        turnLabel.textContent = "Player " + tris9.currentPlayer + "'s turn";
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
                console.log(this.winner);
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
                console.log(this.winner);
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
            console.log(this.winner);
            return true;
        }
        if (this.board[0][2].textContent !== ""
            && this.board[0][2].textContent === this.board[1][1].textContent
            && this.board[1][1].textContent === this.board[2][0].textContent) {
            this.winner = this.board[0][2].textContent;
            console.log(this.winner);
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

        console.log("draw");
        return true;
    }

}

class Tris9 {

    constructor() {
        this.board = [];
        this.currentPlayer = 0;
    }

    checkWinner() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j].checkWinner()) {
                    return true;
                }
            }
        }
        return false;
    }

    checkDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!this.board[i][j].checkDraw()) {
                    return false;
                }
            }
        }
        return true;
    }





}

setupGame();