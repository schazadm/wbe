const n_rows = 6
const n_columns = 7
let state = Array(n_rows).fill('').map(el => Array(n_columns).fill(''))

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

function showBoard() {
    let board = document.getElementsByClassName('board')[0]
    board.innerHTML = ''
    for (let i = 0; i < n_rows; i++) {
        let row = elt('div', { 'class': 'row' })
        for (let j = 0; j < n_columns; j++) {
            let piece = undefined
            switch (state[i][j]) {
                case 'r':
                    piece = elt('div', { 'class': 'piece red' })
                    break
                case 'b':
                    piece = elt('div', { 'class': 'piece blue' })
                    break
            }
            let field = elt('div', { 'class': 'field' }, (piece) ? piece : '')
            row.appendChild(field)
        }
        board.appendChild(row)
    }
}

function randomPicker() {
    setInterval(() => {
        let options = ['', 'r', 'b']
        let row = Math.floor(Math.random() * n_rows)
        let column = Math.floor(Math.random() * n_columns)
        state[row][column] = options[Math.floor(Math.random() * options.length)]
        showBoard()
    }, 1000)
}

function init() {
    randomPicker()
}