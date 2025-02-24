export class Tris {
    constructor() {
        this.board = [];
    }

    checkWinner() {
        return this.checkRows() || this.checkColumns() || this.checkDiagonals();
    }

    checkRows() {
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0].textContent !== "E"
                && this.board[i][0].textContent === this.board[i][1].textContent
                && this.board[i][1].textContent === this.board[i][2].textContent) {
                return true;
            }
        }
        return false;
    }

    checkColumns() {
        for (let i = 0; i < 3; i++) {
            if (this.board[0][i].textContent !== "E"
                && this.board[0][i].textContent === this.board[1][i].textContent
                && this.board[1][i].textContent === this.board[2][i].textContent) {
                return true;
            }
        }
        return false;
    }

    checkDiagonals() {
        return (this.board[0][0].textContent !== "E"
            && this.board[0][0].textContent === this.board[1][1].textContent
            && this.board[1][1].textContent === this.board[2][2].textContent)
            ||
            (this.board[0][2].textContent !== "E"
                && this.board[0][2].textContent === this.board[1][1].textContent
                && this.board[1][1].textContent === this.board[2][0].textContent);
    }

    checkDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j].textContent === "E") {
                    return false;
                }
            }
        }
        return true;
    }

}