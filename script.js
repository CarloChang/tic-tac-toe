function game() {
    const board = [['', '', ''], ['', '', ''], ['', '', '']];

    const createPlayer = function(name, mark) {
        let score = 0;
        const getScore = () => score;
        const increaseScore = () => score++;
        return { name, mark, getScore, increaseScore };
    };
    
    let gameActive = true;
    let currentPlayer;

    const handleClick = (x, y, player) => {
        if (gameActive) {
            if (board[x][y] === '') {
                board[x][y] = player.mark;
                document.querySelector(`#grid${x * 3 + y}`).textContent = player.mark;

                if (gameOver()) {
                    document.getElementById('displayWinner').textContent = `${player.name} has won!`;
                    player.increaseScore();
                    updateScores();
                    gameActive = false;  // Game over, no more clicks should be allowed
                } else if (isBoardFull()) {
                    document.getElementById('displayWinner').textContent = "It's a tie!";
                    gameActive = false;  // Game is a tie, no more clicks should be allowed
                } else {
                    // Switch to the next player
                    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
                    document.getElementById('displayName').textContent = `${currentPlayer.name}'s turn`;
                }
            }
        }
    };

    // Add event listeners to each grid cell
    const addEventListeners = () => {
        document.querySelectorAll('.gameGrid').forEach((grid, index) => {
            grid.addEventListener('click', () => {
                let x = Math.floor(index / 3);
                let y = index % 3;
                handleClick(x, y, currentPlayer);
            });
        });
    };

    // Remove event listeners from each grid cell
    const removeEventListeners = () => {
        document.querySelectorAll('.gameGrid').forEach((grid, index) => {
            let clone = grid.cloneNode(true);
            grid.parentNode.replaceChild(clone, grid);
        });
    };

    const startGame = (playerOne, playerTwo) => {
        currentPlayer = playerOne;
        document.getElementById('displayName').textContent = `${currentPlayer.name}'s turn`;
        gameActive = true;  // Reset game active state

        removeEventListeners();  // Clear any previous event listeners
        addEventListeners();  // Add new event listeners for the game
    };

    const gameOver = () => {
        const allEqual = arr => arr.every(val => val === arr[0] && val !== '');

        const winningPositions = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (let positions of winningPositions) {
            const values = positions.map(([x, y]) => board[x][y]);
            if (allEqual(values)) {
                return true;  
            }
        }

        return false;
    };

    const isBoardFull = () => {
        return board.every(row => row.every(cell => cell !== ''));
    };

    const playAgain = () => {
        // Clear the board and reset the UI
        board.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                board[rowIndex][cellIndex] = '';
                document.querySelector(`#grid${rowIndex * 3 + cellIndex}`).textContent = '';  // Clear DOM
            });
        });

        document.getElementById("displayWinner").textContent = '';  // Clear winner message
        gameActive = true;  // Set game active again
        startGame(playerOne, playerTwo);  // Restart the game
    };

    const updateScores = () => {
        document.getElementById("playerOneScore").textContent = playerOne.getScore();
        document.getElementById("playerTwoScore").textContent = playerTwo.getScore();
    };

    document.getElementById('playAgain').addEventListener('click', playAgain);

    return { board, createPlayer, startGame, playAgain };
}

// Create game instance and players
const play = game();
const playerOne = play.createPlayer('Carlo', 'X');
const playerTwo = play.createPlayer('Jose', 'O');

// Start the game
play.startGame(playerOne, playerTwo);
