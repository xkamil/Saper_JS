var gameStatus = "started";
var boardSize = 6;
var markedField = -50;
var coveredField = 0;
var bomb = -100;
var board = [];
var bombsCount = 10;
var markedBombs = 0;
var discoveredFields = 0;

initBoard();
placeMines(10);
initBombsIndicators();
printBoard();
updateBoard();

function resetGame(gameSize, bombs) {
    gameStatus = "started";
    boardSize = gameSize;
    markedField = -50;
    coveredField = 0;
    bomb = -100;
    board = [];
    bombsCount = bombs;
    markedBombs = 0;
    discoveredFields = 0;

    initBoard();
    placeMines(10);
    initBombsIndicators();
    printBoard();
    updateBoard();

}

function printBoard() {
    var output = "";

    for (var i = 0; i<boardSize; i++){
        output = output + "<div>";

        for (var j = 0; j<boardSize; j++) {
            var color;

            switch(board[i][j]){
                case 0 : color = "#20BF00"; break;
                case 1 : color = "#4B9B00"; break;
                case 2 : color = "#4B9B00"; break;
                case 3 : color = "#767800"; break;
                case 4 : color = "#A15400"; break;
                case 5 : color = "#CC3100"; break;
                case 6 : color = "#B62D02"; break;
                case 7 : color = "#B62D02"; break;
                case 8 : color = "#721E04"; break;
                case 9 : color = "#721E04"; break;
            }

            output = output + "<div style=\"color: "+color+"\" oncontextmenu=\"mark(" + i + "," + j + ");return false\" onclick=\"show(" + i + "," + j + ")\" class=\"cell covered\" id=\"" + i + "_" + j + "\">&nbsp;</div>";
        }

        output = output + "</div>";
    }

    document.getElementById("board").innerHTML = output;
}

function initBoard() {
    for(var i = 0; i< boardSize; i++){
        board[i] = [];
        for(var j = 0; j < boardSize; j++){
            board[i][j] = coveredField;
        }
    }
}

function placeMines() {
    var placedBombs = 0;

    while(placedBombs < bombsCount){
        var successfullyPlaced = false;

        while(!successfullyPlaced){
            var col = Math.floor(Math.random() * boardSize);
            var row = Math.floor(Math.random() * boardSize);
            if(board[row][col] >= coveredField){
                board[row][col] = bomb;
                successfullyPlaced = true;
            }
        }
        placedBombs++;
    }
}

function initBombsIndicators(){
    for (var i = 0; i<boardSize; i++){
        for (var j = 0; j<boardSize; j++) {
            if(board[i][j] < 0){
                try{ board[i-1][j+1] += 1}catch(e){};
                try{  board[i-1][j] += 1}catch(e){};
                try{  board[i-1][j-1] += 1}catch(e){};
                try{  board[i][j-1] += 1}catch(e){};
                try{  board[i][j+1] += 1}catch(e){};
                try{  board[i+1][j+1] += 1}catch(e){};
                try{  board[i+1][j] += 1}catch(e){};
                try{  board[i+1][j-1] += 1}catch(e){};
            }
        }
    }
}

function show(i, j) {
    if (gameStatus == "started") {
        var cell = document.getElementById(i + '_' + j);

        if (board[i][j] < 0) {
            cell.className = "cell bomb";
            gameStatus = "end";
            alert('Przegrałeś!');
        } else {
            cell.className = "cell discovered";
            cell.innerHTML = board[i][j];
            discoveredFields++;
            updateBoard();
        }
    }
}

function mark(i,j) {
    if (gameStatus == "started") {
        var cell = document.getElementById(i + '_' + j);
        if (cell.className == "cell marked_cell") {
            cell.className = "cell covered";
            markedBombs--;
            updateBoard();
        } else if (cell.className == "cell covered") {
            cell.className = "cell marked_cell";
            markedBombs++;
            updateBoard();
        }
    }
}

function updateBoard() {
    console.log("discovered fields: " + discoveredFields);
    console.log("marked bombs: " + markedBombs);
    document.getElementById("bombsLeft").innerHTML = "" + (bombsCount - markedBombs);
    if(discoveredFields == (boardSize * boardSize) - bombsCount){
        alert("Wygrałeś!");
    }
}