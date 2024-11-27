export class Tris {
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
        return true;
    }
}