// consts
const n_rows = 6
const n_columns = 7
const board_dom = document.getElementsByClassName('board')[0]
const currPlayer_dom = document.getElementById('currPlayer')
// state
let state = Object.create({})
state.board = Array(n_rows).fill('').map(el => Array(n_columns).fill(''))
state.currPlayer = 'r'

function elt(type, attrs, ...children) {
    let node = document.createElement(type)
    for (a in attrs) {
        node.setAttribute(a, attrs[a])
    }
    for (let child of children) {
        if (typeof child != "string")
            node.appendChild(child)
        else
            node.appendChild(document.createTextNode(child))
    }
    return node
}

function drawBoard() {
    for (let i = 0; i < n_rows; i++) {
        let row = elt('div', { 'class': 'row' })
        for (let j = 0; j < n_columns; j++) {
            row.appendChild(
                elt(
                    'div',
                    {
                        'class': 'field',
                        'data-row': i,
                        'data-column': j
                    },
                    elt('div', { 'class': 'piece' })
                )
            )
        }
        board_dom.appendChild(row)
    }
}

function refreshBoard() {
    for (let i = 0; i < n_rows; i++) {
        for (let j = 0; j < n_columns; j++) {
            let piece_class = ''

            if (state.board[i][j] === 'r')
                piece_class = 'red'
            else if (state.board[i][j] === 'b')
                piece_class = 'blue'

            if (piece_class === '')
                continue

            findPiece(i, j).classList.add(piece_class)
        }
    }
}

function findPiece(row, column) {
    return board_dom.children[row].children[column].children[0]
}

function addPiece(field) {
    let row = field.dataset.row
    let column = field.dataset.column

    // row 0, col 0

    for (let i = n_rows - 1; i >= 0; i--) {
        if (state.board[i][column] === '') {
            state.board[i][column] = state.currPlayer
            return true
        }
    }
    return false
}

function toggleCurrPlayer() {
    state.currPlayer = (state.currPlayer === 'r') ? 'b' : 'r'
}

function showCurrPlayer() {
    currPlayer_dom.innerHTML = (state.currPlayer === 'r') ? 'Red' : 'Blue'
    currPlayer_dom.style.color = (state.currPlayer === 'r') ? 'red' : 'blue'
}

function init() {
    showCurrPlayer()
    drawBoard()
    // add event listeners to all fields
    document.querySelectorAll('.field').forEach(field => {
        field.addEventListener('click', e => {
            if (!addPiece(e.currentTarget))
                return
            toggleCurrPlayer()
            showCurrPlayer()
            refreshBoard()
        })
    })
}

function resetGame() {
    state.board = Array(n_rows).fill('').map(el => Array(n_columns).fill(''))
    state.currPlayer = 'r'
    board_dom.innerHTML = ''
    init()
}