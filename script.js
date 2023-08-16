function Gameboard() {
    board = []
    for (let i = 1; i < 10; i++) {
        board.push(squareFactory())
    }

    const getBoard = () => board

    const printBoard = () => {
        const boardWithCellValues = board.map((square) => square.getValue())
        return boardWithCellValues
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
        clearScreen()
        displayController();
    }

    return { playRound, getActivePlayer, board }
}

let game = gameController()

function clearScreen() {
    const valueBoard = game.board.printBoard()
    const container = document.querySelector('.container')
    for (i = 0; i < valueBoard.length; i++) {
        let squareToRemove = document.querySelector('.square')
        container.removeChild(squareToRemove)
    }
}

function displayController() {
    const valueBoard = game.board.printBoard()
    const container = document.querySelector('.container')
    for (i = 0; i < valueBoard.length; i++) {
        const div = document.createElement('div')
        div.classList.add('square')
        div.setAttribute('id', `${i}`)
        div.addEventListener('click', function (e) {
            game.playRound(e.target.id)

        })
        container.appendChild(div)
        if (valueBoard[i] === 1) {
            const cross = document.createElement('img')
            cross.src = 'img/cross.svg'
            div.appendChild(cross)
        } else if (valueBoard[i] === 2) {
            const naught = document.createElement('img')
            naught.src = 'img/circle.svg'
            div.appendChild(naught)
        }
    }
}



displayController()

