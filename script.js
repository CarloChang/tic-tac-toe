function game() {
    const board = [['', '', ''],
                   ['', '', ''], 
                   ['', '', '']];

    const createPlayer = function(name, mark) {
        let score = 0;
        const getScore = () => score;
        const increaseScore = () => score++;
        return { name, mark, getScore, increaseScore };
    };

    const playerTurn = (player) => {
        let validMove = false;
        while (!validMove) {
            const firstPosition = prompt(`${player.name}, select your first position:`);
            const secondPosition = prompt(`${player.name}, select your second position:`);
    
            if (board[firstPosition][secondPosition] === '') {
                board[firstPosition][secondPosition] = player.mark;
                validMove = true;  
            } else {
                alert('This position is already taken, try again.');
            }
        }
    
        if (gameOver()) {
            console.log(`${player.name} wins with mark ${player.mark}!`);
            player.increaseScore();
        }
    };
    

    const startGame = (playerOne, playerTwo) => {
        let currentPlayer = playerOne;
        let isGameOver = false;
        while (!isGameOver) {
            playerTurn(currentPlayer);  
    
            isGameOver = gameOver();
    
            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        }
    };
    

    const gameOver = () => {
        const allEqual = arr => arr.every(val => val === arr[0] && val !== '');

        const winningPositions = [
            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],

            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],

            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        
        for (let positions of winningPositions) {
            const values = positions.map(([x, y]) => board[x][y]);
            if (allEqual(values)) {
                console.log("We have a winner!");
                return true;  
            }
        }

        
        const isBoardFull = board.every(row => row.every(cell => cell !== ''));
        if (isBoardFull) {
            console.log("It's a tie!");
            return true; 
        }

        return false;  
    };

    const playAgain = () => {
        board.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                board[rowIndex][cellIndex] = '';
            })
        })
    }

    return { board, createPlayer, playerTurn, gameOver, startGame, playAgain };
}

const play = game();
const playerOne = play.createPlayer('Carlo', 'X');
const playerTwo = play.createPlayer('Jose', 'O');

play.startGame(playerOne, playerTwo);

console.table(play.board);
console.log(playerOne.getScore(), playerTwo.getScore());

play.playAgain();
console.table(play.board);
