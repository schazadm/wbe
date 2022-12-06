// dom
const board_dom = document.getElementsByClassName('board')[0]
const h2Title_dom = document.getElementById('title')
const currPlayer_dom = document.getElementById('currPlayer')
// fetch api
let url = "http://localhost:3000/api/data/{0}?api-key=c4game"
// defaults
let boardLayout = []
let n_rows = 6
let n_columns = 7
let state = Object.create({})
state.board = Array(n_rows).fill('').map(el => Array(n_columns).fill(''))
state.currPlayer = 'r'

async function init() {
    if (await isApiReachable()) {
        // fetch current data from api
        await loadBoardSize()
        await loadState()
    } else {
        disableServerBtns()
    }
    // player stat
    showCurrPlayer()
    // board creation and drawing
    createBoard()
    drawBoard()
    refreshBoard()
    // first thing first check for winner 😎
    isThereAreWinner()
    // add event listeners to all fields
    document.querySelectorAll('.field').forEach(field => {
        field.addEventListener('click', e => {
            if (!addPiece(e.currentTarget))
                return
            if (!isThereAreWinner()) {
                toggleCurrPlayer()
                showCurrPlayer()
            }
            refreshBoard()
            saveState()
        })
    })
}

async function resetGame() {
    state.board = Array(n_rows).fill('').map(el => Array(n_columns).fill(''))
    state.currPlayer = 'r'
    board_dom.innerHTML = ''
    h2Title_dom.innerHTML = 'Current Player: '
    await saveState()
    init()
}

async function isApiReachable() {
    try {
        await fetch(url.format('c4nRows'))
    } catch (e) {
        return false
    }
    return true
}

function disableServerBtns() {
    document.querySelectorAll('button.server').forEach(btn => {
        btn.disabled = true
    })
}

async function loadBoardSize() {
    let res = await fetch(url.format('c4nRows'))
    n_rows = await res.json()
    res = await fetch(url.format('c4nColumns'))
    n_columns = await res.json()
}

async function loadState() {
    let res = await fetch(url.format('c4state'))
    state = await res.json()
}

async function saveState() {
    fetch(
        url.format('c4state'),
        {
            method: 'PUT',
            headers:
            {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(state)
        }
    )
}

function saveStateLocal() {
    localStorage.setItem('c4state', JSON.stringify(state))
}

async function loadAndRefresh() {
    let res = await fetch(url.format('c4state'))
    state = await res.json()
    showCurrPlayer()
    refreshBoard()
}

function loadAndRefreshLocal() {
    state = JSON.parse(localStorage.getItem('c4state'))
    showCurrPlayer()
    refreshBoard()
}

function isThereAreWinner() {
    if (connect4Winner(state.currPlayer, state.board)) {
        showWinner()
        return true
    }
    return false
}

function showWinner() {
    document.querySelectorAll('.field').forEach(field => {
        field.classList.add('disabled')
    })

    h2Title_dom.innerHTML = ''
    currPlayer_dom.innerHTML = `The winner is ${(state.currPlayer === 'r') ? 'Red' : 'Blue'}`
}

function createBoard() {
    for (let i = 0; i < n_rows; i++) {
        let row = new Array('div', { 'class': 'row' })
        for (let j = 0; j < n_columns; j++) {
            row.push(new Array(
                'div',
                {
                    'class': 'field',
                    'data-row': i,
                    'data-column': j
                },
                new Array(
                    'div',
                    { 'class': 'piece' }
                )
            ))
        }
        boardLayout.push(row)
    }
}

function drawBoard() {
    for (let i = 0; i < n_rows; i++) {
        renderSJDON(boardLayout[i], board_dom)
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
    let column = field.dataset.column
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

/**
 * src: https://sebhastian.com/javascript-format-string/
 */
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != "undefined" ? args[number] : match;
        });
    };
}