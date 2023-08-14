function Gameboard() {
    const board = []
    const rows = 3
    const columns = 3

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const markSquare = (row, column, player) => {
        if (board[row][column] !== 0) {
            return
        } else {
            board[row][column].addMove(player)
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues)
    }

    return { getBoard, markSquare, printBoard }
}

/*--------------------------------------------------------------*/

function Cell() {
    let value = 0;

    const addMove = (player) => {
        value = player
    }

    const getValue = () => value

    return {
        addMove,
        getValue
    }
}

/*--------------------------------------------------------------*/

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ]

    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const getActivePlayer = () => activePlayer

    const printNewRound = () => {
        board.printBoard()
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} marks their ${getActivePlayer().token}`)
        board.markSquare(row, column, getActivePlayer().token)
        switchPlayerTurn()
        printNewRound()
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
    }
}

/*--------------------------------------------------------------*/

const game = GameController()
