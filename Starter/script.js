let currentPlayer = 'X';
const NUMBERS_OF_ROWS = 3;
const turns = NUMBERS_OF_ROWS ** 2;
let counter = 0;


let createBoardArray = () => {
    let board = [];
    for (let i = 0; i <NUMBERS_OF_ROWS; i++) {
        board.push(Array.from({length: NUMBERS_OF_ROWS}, ()=> '_'))
    }
    return board;
}


let board = createBoardArray();

const getCellPlacement = (ind, noOfRows) => {
    const row = Math.floor(ind / noOfRows);
    const col = ind % noOfRows;
    return [row, col]
};
const resetFun = () => {

    document.querySelector('.board').remove()
    board = createBoardArray();
    createBoard();
    counter = 0;
};
const checkRows = (currentPlayer) => {
    let column = 0;
    for (let row = 0; row < NUMBERS_OF_ROWS; row++) {
        while(column < NUMBERS_OF_ROWS) {
            if(board[row][column] !==currentPlayer) {
                column = 0;
                break;
            }
            column++;
        }
        if (column === NUMBERS_OF_ROWS) {
            return true
        }
    }


};
const checkColumns = (currentPlayer) => {
    let row = 0;
    for (let column = 0; column < NUMBERS_OF_ROWS; column++) {
        while(row < NUMBERS_OF_ROWS) {
            if(board[row][column] !==currentPlayer) {
                row = 0;
                break;
            }
            row++;
        }
        if (row === NUMBERS_OF_ROWS) {
            return true
        }
    }


};
const checkDiagonalsReverse = (currentPlayer) => {
    let count = 0;
        while(count < NUMBERS_OF_ROWS) {
            if(board[count][NUMBERS_OF_ROWS - 1 - count] !==currentPlayer) {
                count = 0;
                break;
            }
            count++;
        }
        if (count === NUMBERS_OF_ROWS) {
            return true
        }
};
const checkDiagonals = (currentPlayer) => {
    let count = 0;
        while(count < NUMBERS_OF_ROWS) {
            if(board[count][count] !==currentPlayer) {
                count = 0;
                break;
            }
            count++;
        }
        if (count === NUMBERS_OF_ROWS) {
            return true
        }
};

const checkWin = (currentPlayer) => {
    if(checkRows(currentPlayer)) {
        return true;
    }
    if(checkColumns(currentPlayer)) {
        return true;
    }
    if(checkDiagonals(currentPlayer)) {
        return true;
    }
    if(checkDiagonalsReverse(currentPlayer)) {
        return true;
    }
};
const ruWinEvent = () => {
    setTimeout(()=> {
        alert(`Player ${currentPlayer} Won`);
        resetFun()}, 100
    )
};
const runDrawEvent = () => {
    setTimeout(()=> {
        alert("Draw");
        resetFun()}, 100)
};
const drawMarkCell = (cell , currentPlayer) => {
    cell.querySelector('.value').textContent = currentPlayer;
    cell.classList.add(`cell--${currentPlayer}`);
}

const cellButtonHandler = (event, index) => {
  const cell = event.target;
  let [row, col] = getCellPlacement(index, NUMBERS_OF_ROWS);
  
  if (board[row][col] === '_') {
    counter++;
    board[row][col] = currentPlayer;
    drawMarkCell(cell, currentPlayer);

    if (checkWin(currentPlayer)) {
        ruWinEvent();
    }else {
        if (counter === turns) {
            runDrawEvent();
        };
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
        }else {
            currentPlayer = "X"
        }

    };
  };
};

const createBoard = () => {
    const container = document.querySelector('.container');
    const board = document.createElement('div');

    board.classList.add('board');
    for (let i = 0; i < turns; i++) {
        let cellElementString = `<div class='cell' role='button' tabindex='${i + 1}'><span class='value'></span></div>`;
        let cellElement = document.createRange().createContextualFragment(cellElementString);

        cellElement.querySelector('.cell').onclick = (event) => cellButtonHandler(event, i);
        cellElement.querySelector('.cell').onkeydown = (event) => event.key ==="Enter" ? cellButtonHandler(event, i) : true;
        board.appendChild(cellElement);
        document.documentElement.style.setProperty('--grid-rows', NUMBERS_OF_ROWS);

    }

    container.insertAdjacentElement('afterbegin', board);
}

createBoard();

const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', resetFun);