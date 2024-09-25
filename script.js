function game() {
    const board = [['', '', ''], ['', '', ''], ['', '', '']];

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
                validMove = true;  // Exit the loop if the move is valid
            } else {
                alert('This position is already taken, try again.');
            }
        }
    
        // After a valid move, check for game over
        if (gameOver()) {
            console.log(`${player.name} wins with mark ${player.mark}!`);
            player.increaseScore();
        }
    };
    

    const startGame = (playerOne, playerTwo) => {
        let currentPlayer = playerOne;
        let isGameOver = false;
        while (!isGameOver) {
            playerTurn(currentPlayer);  // Let playerTurn handle prompting for positions
    
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

        // Check for a winner
        for (let positions of winningPositions) {
            const values = positions.map(([x, y]) => board[x][y]);
            if (allEqual(values)) {
                console.log("We have a winner!");
                return true; // End the game if a winner is found
            }
        }

        // Check for a tie
        const isBoardFull = board.every(row => row.every(cell => cell !== ''));
        if (isBoardFull) {
            console.log("It's a tie!");
            return true; // Game over due to a tie
        }

        return false;  // Continue the game
    };

    return { board, createPlayer, playerTurn, gameOver, startGame };
}

const play = game();
const playerOne = play.createPlayer('Carlo', 'X');
const playerTwo = play.createPlayer('Jose', 'O');

play.startGame(playerOne, playerTwo);

console.table(play.board);
console.log(playerOne.getScore(), playerTwo.getScore());
