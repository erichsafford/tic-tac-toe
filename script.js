function Gameboard() {
    board = []
    for (let i = 1; i < 10; i++) {
        board.push(squareFactory())
    }

    const getBoard = () => board

    const printBoard = () => {
        const boardWithCellValues = board.map((square) => square.getValue())
        console.log(boardWithCellValues)
    }

    const markSquare = (square, player) => {
        if (board[square].getValue() !== 0) {
            return
        } else {
            board[square].placeMark(player)
        }
    }

    return { getBoard, printBoard, markSquare }
}

function squareFactory() {
    let value = 0

    const getValue = () => value

    const placeMark = (player) => {
        value = player
    }

    return { getValue, placeMark }

}

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard()

    const players = [
        {
            name: playerOneName,
            mark: 1
        },
        {
            name: playerTwoName,
            mark: 2
        }
    ]

    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
      };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
    }

    const checkForWin = (square) => {
        const squares = board.getBoard()
        if (square === 0) {
            return (((squares[0].getValue() === squares[1].getValue()) && (squares[1].getValue() === squares[2].getValue())) || ((squares[0].getValue() === squares[3].getValue()) && (squares[3].getValue() === squares[6].getValue())) || ((squares[0].getValue() === squares[4].getValue()) && (squares[4].getValue() === squares[8].getValue())))
        } else if (square === 1) {
            return (((squares[1].getValue() === squares[0].getValue()) && (squares[0].getValue() === squares[2].getValue())) || ((squares[1].getValue() === squares[4].getValue()) && (squares[4].getValue() === squares[7].getValue())))
        } else if (square === 2) {
            return (((squares[2].getValue() === squares[0].getValue()) && (squares[0].getValue() === squares[1].getValue())) || ((squares[2].getValue() === squares[5].getValue()) && (squares[5].getValue() === squares[8].getValue())) || ((squares[2].getValue() === squares[4].getValue()) && (squares[4].getValue() === squares[6].getValue())))
        } else if (square === 3) {
            return (((squares[3].getValue() === squares[4].getValue()) && (squares[4].getValue() === squares[5].getValue())) || ((squares[3].getValue() === squares[0].getValue()) && (squares[0].getValue() === squares[6].getValue())))
        } else if (square === 4) {
            return (((squares[4].getValue() === squares[3].getValue()) && (squares[3].getValue() === squares[5].getValue())) || ((squares[4].getValue() === squares[1].getValue()) && (squares[1].getValue() === squares[7].getValue())) || ((squares[4].getValue() === squares[0].getValue()) && (squares[0].getValue() === squares[8].getValue())) || ((squares[4].getValue() === squares[2].getValue()) && (squares[2].getValue() === squares[6].getValue())))
        } else if (square === 5) {
            return (((squares[5].getValue() === squares[3].getValue()) && (squares[3].getValue() === squares[4].getValue())) || ((squares[5].getValue() === squares[2].getValue()) && (squares[2].getValue() === squares[8].getValue())))
        } else if (square === 6) {
            return (((squares[6].getValue() === squares[7].getValue()) && (squares[7].getValue() === squares[8].getValue())) || ((squares[6].getValue() === squares[0].getValue()) && (squares[0].getValue() === squares[3].getValue())) || ((squares[6].getValue() === squares[4].getValue()) && (squares[4].getValue() === squares[3].getValue())))
        } else if (square === 7) {
            return (((squares[7].getValue() === squares[1].getValue()) && (squares[1].getValue() === squares[4].getValue())) || ((squares[7].getValue() === squares[6].getValue()) && (squares[6].getValue() === squares[8].getValue())))
        } else if (square === 8) {
            return (((squares[8].getValue() === squares[6].getValue()) && (squares[6].getValue() === squares[7].getValue())) || ((squares[8].getValue() === squares[2].getValue()) && (squares[2].getValue() === squares[5].getValue())) || ((squares[8].getValue() === squares[4].getValue()) && (squares[4].getValue() === squares[0].getValue())))
        }
    }

    const playRound = (square) => {
        board.markSquare(square, getActivePlayer().mark)
        if (checkForWin(square)) {
            console.log(`${getActivePlayer().name} WINS!`)
        };
        switchPlayerTurn();
        printNewRound();
    }

    return { playRound, getActivePlayer, checkForWin }
}

let game = gameController()
