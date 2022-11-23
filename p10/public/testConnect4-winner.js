const { connect4Winner } = require('./connect4-winner.js')

function printBoard(board) {
    let output = ''
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            output += board[row][col]
        }
        output += '\r\n'
    }
    return output
}

let testBoard_horizontal = [
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', 'b', '_', '_'],
    ['_', '_', '_', 'r', 'r', 'r', 'r'],
    ['_', '_', 'b', '_', '_', '_', '_'],
    ['_', 'b', 'b', 'r', 'b', '_', '_']
]

console.log(`horizontal test:\r\n${printBoard(testBoard_horizontal)}`)
console.log('red: ' + connect4Winner('r', testBoard_horizontal))
console.log('blue: ' + connect4Winner('b', testBoard_horizontal))

console.log('\n')

let testBoard_vertical = [
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', 'b', '_', 'b', '_', '_'],
    ['_', '_', 'b', 'r', 'r', 'r', '_'],
    ['_', '_', 'b', '_', '_', '_', '_'],
    ['_', 'b', 'b', 'r', 'b', '_', '_']
]

console.log(`vertical test:\r\n${printBoard(testBoard_vertical)}`)
console.log('red: ' + connect4Winner('r', testBoard_vertical))
console.log('blue: ' + connect4Winner('b', testBoard_vertical))

console.log('\n')

let testBoard_ascDiagonal  = [
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', 'b', '_', 'b', '_', '_'],
    ['_', '_', 'r', 'b', 'r', 'r', '_'],
    ['_', '_', 'b', '_', '_', '_', '_'],
    ['_', 'b', 'b', 'r', 'b', '_', '_']
]

console.log(`ascending diagonal test:\r\n${printBoard(testBoard_ascDiagonal)}`)
console.log('red: ' + connect4Winner('r', testBoard_ascDiagonal))
console.log('blue: ' + connect4Winner('b', testBoard_ascDiagonal))

console.log('\n')

let testBoard_descDiagonal  = [
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['r', '_', 'b', '_', 'b', '_', '_'],
    ['_', 'r', 'r', '_', 'r', 'r', '_'],
    ['_', '_', 'r', '_', '_', '_', '_'],
    ['_', 'b', 'b', 'r', 'b', '_', '_']
]

console.log(`descending diagonal test:\r\n${printBoard(testBoard_descDiagonal)}`)
console.log('red: ' + connect4Winner('r', testBoard_descDiagonal))
console.log('blue: ' + connect4Winner('b', testBoard_descDiagonal))