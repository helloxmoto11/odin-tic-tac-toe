const Game = (function () {
    let board = ['', '', '', '', '', '', '', '', '',]
    const playTurn = (index, marker) => {
        board[index] = marker;
    }
    const getBoard = () => board;
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", "",]
    }
    const possibleWins = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 4, 6], [2, 5, 8], [4, 5, 6], [6, 7, 8]]

    return {getBoard, playTurn, resetBoard, possibleWins};
})();

const Display = (function () {
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
                const markers = Controller.getMarkers();
                const marker = turn === "X" ? markers.x : markers.o;
                Game.playTurn(i, marker)
                updateDisplay(Game.getBoard());
                Controller.checkWinner();
                if (Controller.gameIsRunning()) {
                    Controller.toggleTurn();
                }
            }
        })
    }
    const highlightWinner = (pWin) => {
        pWin.forEach(index => {
            places[index].style.backgroundColor = "#00ff00";
            places[index].style.color = "#ff00ff";
        })
    }
    const updateDisplay = (board) => {
        for (let i = 0; i < board.length; i++) {
            places[i].textContent = board[i];
        }
    }
    return {highlightWinner};
})();

const Controller = (function () {
    let running = true;
    let turn = "X";
    let playerXScore = 0;
    let playerYScore = 0;
    let markers = {x: "X", o: "O"};
    const playerOneH3 = document.getElementById("player-1");
    const playerTwoH3 = document.getElementById("player-2");
    const animation = "growShrink 1s infinite";
    playerOneH3.style.animation = animation;

    const getMarkers = () => markers;
    const setGameOver = () => running = false;
    const gameIsRunning = () => running;
    const whosTurn = () => turn;
    const toggleTurn = () => {
        turn = turn === "X" ? turn = "O" : "X";
        if (turn === "X") {
            playerOneH3.style.animation = animation;
            playerTwoH3.style.animation = undefined;
        } else {
            playerTwoH3.style.animation = animation;
            playerOneH3.style.animation = undefined;
        }
    }
    const checkWinner = () => {
        const board = Game.getBoard();
        Game.possibleWins.forEach(pWin => {
            let countX = 0;
            let countO = 0;
            for (let index of pWin) {
                if (board[index] === "X")
                    countX++;
                if (board[index] === "O")
                    countO++;
            }
            if (countX === 3) {
                console.log("X is the winner")
                console.log(pWin)
                Display.highlightWinner(pWin)
                Controller.setGameOver()
                Game.resetBoard()
            }
            if (countO === 3) {
                console.log("O is the winner")
                console.log(pWin)
                Display.highlightWinner(pWin)
                Controller.setGameOver()
                Game.resetBoard()
            }


        })
    }
    return {gameIsRunning, setGameOver, getMarkers, whosTurn, toggleTurn, checkWinner}
})();
