function connect4Winner(player, board) {
    let height = board[0].length
    let width = board.length

    // horizontal
    for (let j = 0; j < height - 3; j++) {
        for (let i = 0; i < width; i++) {
            if (board[i][j] === player
                && board[i][j + 1] === player
                && board[i][j + 2] === player
                && board[i][j + 3] === player
            ) {
                return true
            }
        }
    }
    // vertical
    for (let i = 0; i < width - 3; i++) {
        for (let j = 0; j < height; j++) {
            if (board[i][j] === player
                && board[i + 1][j] === player
                && board[i + 2][j] === player
                && board[i + 3][j] === player
            ) {
                return true
            }
        }
    }
    // ascending diagonal 
    for (let i = 3; i < width; i++) {
        for (let j = 0; j < height - 3; j++) {
            if (board[i][j] === player
                && board[i - 1][j + 1] === player
                && board[i - 2][j + 2] === player
                && board[i - 3][j + 3] === player
            )
                return true
        }
    }
    // descending diagonal
    for (let i = 3; i < width; i++) {
        for (let j = 3; j < height; j++) {
            if (board[i][j] === player
                && board[i - 1][j - 1] === player
                && board[i - 2][j - 2] === player
                && board[i - 3][j - 3] === player
            )
                return true
        }
    }
    return false
}

// TODO: uncomment upon submission
// module.exports = { connect4Winner }
