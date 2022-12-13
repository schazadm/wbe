import { render } from "./lib/suiweb.js"
import { connect4Winner } from "./lib/winner.js"
import { renderSJDON } from "./lib/render-sjdon.js"

// DOM
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
let stateSeq = []

async function init() {
    // check api
    // automatic load disabled
    if (await isApiReachable()) {
        // fetch current data from api
        await loadBoardSize()
        // await loadState()
    } else {
        disableServerBtns()
        // loadStateLocal()
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
    addFieldListeners()
    addBtnEventListeners()
}

/* =====================================================================
 *  game
 * =====================================================================
*/
async function resetGame() {
    state.board = Array(n_rows).fill('').map(el => Array(n_columns).fill(''))
    state.currPlayer = 'r'
    board_dom.innerHTML = ''
    h2Title_dom.innerHTML = 'Current Player: '
    await saveState()
    saveStateLocal()
    init()
}

async function loadAndRefresh() {
    await loadState()
    showCurrPlayer()
    refreshBoard()
}

function loadAndRefreshLocal() {
    loadStateLocal()
    showCurrPlayer()
    refreshBoard()
}

function undoLastTurn() {
    if (stateSeq.length > 0)
        state = stateSeq.pop()
    showCurrPlayer()
    refreshBoard()
}

function addBtnEventListeners() {
    document.querySelector('#undoLastTurn').addEventListener('click', undoLastTurn)
    document.querySelector('#resetGame').addEventListener('click', resetGame)
    document.querySelector('#loadAndRefresh').addEventListener('click', loadAndRefresh)
    document.querySelector('#saveState').addEventListener('click', saveState)
    document.querySelector('#loadAndRefreshLocal').addEventListener('click', loadAndRefreshLocal)
    document.querySelector('#saveStateLocal').addEventListener('click', saveStateLocal)
}

/* =====================================================================
 *  board
 * =====================================================================
*/
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
            if (state.board[i][j] === 'r') {
                piece_class = 'red'
            } else if (state.board[i][j] === 'b') {
                piece_class = 'blue'
            }
            if (piece_class === '') {
                findPiece(i, j).classList.remove('red')
                findPiece(i, j).classList.remove('blue')
            } else {
                findPiece(i, j).classList.add(piece_class)
            }
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

function addFieldListeners() {
    document.querySelectorAll('.field').forEach(field => {
        field.addEventListener('click', e => setPiece(e))
    })
}

function setPiece(element) {
    stateSeq.push(structuredClone(state))
    if (!addPiece(element.currentTarget)) {
        stateSeq.pop()
        return
    }
    if (!isThereAreWinner()) {
        toggleCurrPlayer()
        showCurrPlayer()
    }
    refreshBoard()

    // automatic save disabled
    // saveState()
    // saveStateLocal()
}

/* =====================================================================
 *  player
 * =====================================================================
*/
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

function toggleCurrPlayer() {
    state.currPlayer = (state.currPlayer === 'r') ? 'b' : 'r'
}

function showCurrPlayer() {
    currPlayer_dom.innerHTML = (state.currPlayer === 'r') ? 'Red' : 'Blue'
    currPlayer_dom.style.color = (state.currPlayer === 'r') ? 'red' : 'blue'
}

/* =====================================================================
 *  local
 * =====================================================================
*/
function loadStateLocal() {
    if (localStorage.getItem('c4state') !== null)
        state = JSON.parse(localStorage.getItem('c4state'))
}

function saveStateLocal() {
    localStorage.setItem('c4state', JSON.stringify(state))
}

/* =====================================================================
 *  server - ⚠ Caution!! ⚠ Here the space-time continuum is shifted 🥵
 * =====================================================================
*/
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
    if (await isApiReachable()) {
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
}

/* =====================================================================
 *  helper
 * =====================================================================
*/
function setInList(list, idx, new_value) {
    let new_list = [...list]
    new_list[idx] = new_value
    return new_list
}

function setInObj(obj, attr, new_value) {
    let new_obj = { ...obj }
    new_obj[attr] = new_value
    return new_obj
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

/* =====================================================================
 *  exports
 * =====================================================================
*/
export { init }