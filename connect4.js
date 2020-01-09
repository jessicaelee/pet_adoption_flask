/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    let columnArray = [];
    for (let i = 0; i < WIDTH; i++) {
      columnArray.push(null);
    }
    board.push(columnArray)
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // create "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // create first row of table that listens for clicks
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // create all rows and cells in the board and add the id with x and y coordinates
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return the topmost empty y (null if filled) */

function findSpotForCol(x) {
  for (let i = HEIGHT - 1; i >= 0; i--) {
    if (board[i][x] === null) {
      return i
    }
  }
  return "no more";
}

function updateBoardArray(x, y) {
  board[y][x] = currPlayer;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  let piece = document.createElement("div");
  piece.setAttribute("class", `piece piece${currPlayer}`);
  document.getElementById(`${y}-${x}`).appendChild(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  document.getElementById("column-top").removeEventListener("click", handleClick)
  setTimeout(() => alert(msg));
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === "no more") {
    return;
  }

  updateBoardArray(x, y)

  // place piece in board and add to HTML table
  placeInTable(y, x);

  // check for win, check for tie, if not, switch player
  if (checkForWin()) {

    endGame(`Player ${currPlayer} won!`)
  }
  else if (checkForTie()) {

    endGame("Neither player won - TIE.");

  }
  else {
    if (currPlayer === 1) {
      currPlayer = 2;
    }
    else {
      currPlayer = 1;
    }
  }
}

/** checkForTie: check if all cells in board are filled. */
function checkForTie() {
  return board.every(row => {
    return row.every(cell => cell !== null)
  })
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // Check for horiz, vert, diagonal wins 

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
