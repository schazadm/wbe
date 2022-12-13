function connect4Winner(player, board) {
    let rows = board.length
    let columns = board[0].length

    // horizontal
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] === player
                && board[row][col + 1] === player
                && board[row][col + 2] === player
                && board[row][col + 3] === player
            ) {
                return true
            }
        }
    }

    // vertical
    for (let row = 0; row < rows - 3; row++) {
        for (let col = 0; col < columns; col++) {
            if (board[row][col] === player
                && board[row + 1][col] === player
                && board[row + 2][col] === player
                && board[row + 3][col] === player
            ) {
                return true
            }
        }
    }

    // ascending diagonal
    for (let row = 3; row < rows; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] === player
                && board[row - 1][col + 1] === player
                && board[row - 2][col + 2] === player
                && board[row - 3][col + 3] === player
            )
                return true
        }
    }

    // descending diagonal
    for (let row = 0; row < rows - 3; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] === player
                && board[row + 1][col + 1] === player
                && board[row + 2][col + 2] === player
                && board[row + 3][col + 3] === player
            )
                return true
        }
    }

    return false
}
