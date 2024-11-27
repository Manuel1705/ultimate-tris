export class Tris9 {

    constructor(invalidMoveColor, validMoveColor, player1Color) {
        this.invalidMoveColor = invalidMoveColor;
        this.validMoveColor = validMoveColor;
        this.player1Color = player1Color;
        this.board = [];
    }

    checkWinner() {
        return this.checkRows() || this.checkColumns() || this.checkDiagonals();
    }

    checkRows() {
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0].style.border !== this.invalidMoveColor
                && this.board[i][0].style.border === this.board[i][1].style.border
                && this.board[i][1].style.border === this.board[i][2].style.border) {
                if (this.board[i][0].style.border == this.player1Color)
                    return true;
            }
        }
        return false;
    }

    checkColumns() {
        for (let i = 0; i < 3; i++) {
            if (this.board[0][i].style.border !== this.invalidMoveColor
                && this.board[0][i].style.border === this.board[1][i].style.border
                && this.board[1][i].style.border === this.board[2][i].style.border) {
                if (this.board[0][i].style.border == this.player1Color)
                    return true;
            }
        }
        return false;
    }

    checkDiagonals() {
        if (this.board[0][0].style.border !== this.invalidMoveColor
            && this.board[0][0].style.border === this.board[1][1].style.border
            && this.board[1][1].style.border === this.board[2][2].style.border) {
            if (this.board[0][0].style.border == this.player1Color)
                return true;
        }
        if (this.board[0][2].style.border !== this.invalidMoveColor
            && this.board[0][2].style.border === this.board[1][1].style.border
            && this.board[1][1].style.border === this.board[2][0].style.border) {
            if (this.board[0][2].style.border == this.player1Color)
                return true;
        }
        return false;
    }

    checkDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j].style.border === this.invalidMoveColor) {
                    return false;
                }
            }
        }
        return true;
    }

}