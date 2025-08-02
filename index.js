const Game = (function () {
    let board = ['', '', '', '', '', '', '', '', '',]
    const playTurn = (index, marker) => {
        if (board[index]) {
            throw Error(`marker already in use at index ${index}.`);
        }
        board[index] = marker;
    }
    const getBoard = () => board;
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", "",]
    }
    const checkWinner = () => {
        if (board[0] === 'X' && board[1] === 'X' && board[2] === 'X') {
            setTimeout(function () {

                alert("Player X wins")
            },400)
        }
    }
    return {getBoard, playTurn, resetBoard, checkWinner}
})();

const Display = (function () {
    let updatingDisplay = false;
    const gameBoard = document.getElementById("game-board");
    const places = gameBoard.children;
    for (let i = 0; i < places.length; i++) {
        places[i].addEventListener("click", (e) => {
            if (Controller.gameIsRunning()) {
                if (e.target.textContent !== '') {
                    alert("This place is already taken!")
                    return;
                }
                const turn = Controller.whosTurn();
                console.log(`turn: ${turn}`);
                const markers = Controller.getMarkers();
                const marker = turn === "p1" ? markers.p1 : markers.p2;
                Game.playTurn(i, marker)
                updateDisplay(Game.getBoard());
                Game.checkWinner();
                Controller.toggleTurn();
            }
        })
    }
    const updateDisplay = (board) => {
        for (let i = 0; i < board.length; i++) {
            places[i].textContent = board[i];
        }
    }
    return undefined;
})();

const Controller = (function () {
    let running = true;
    let turn = "p1";
    let markers = {}
    const setMarkers = (playerOneMarker) => {
        markers.p1 = playerOneMarker;
        markers.p2 = playerOneMarker === "X" ? "O" : "X";
    }
    const getMarkers = () => markers;
    const gameIsRunning = () => running;
    const whosTurn = () => turn;
    const toggleTurn = () => {
        turn = turn === "p1" ? turn = "p2" : "p1";
    }
    return {gameIsRunning, setMarkers, getMarkers, whosTurn, toggleTurn}
})();
Controller.setMarkers("X");
// while (Controller.gameIsRunning()) {
//
// }