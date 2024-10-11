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
    let playerOne, playerTwo; // Declare playerOne and playerTwo here

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

    let playerOneInput;
    let playerTwoInput;

    // When the "Send" button is clicked
    document.getElementById('send').addEventListener('click', () => {
        playerOneInput = document.getElementById('playerOneInput').value;
        playerTwoInput = document.getElementById('playerTwoInput').value;
        
        // Create playerOne and playerTwo objects from the inputs
        playerOne = createPlayer(playerOneInput, 'X');
        playerTwo = createPlayer(playerTwoInput, 'O');

        //Display buttons
        document.getElementById('startGame').style.visibility = 'visible';
        document.getElementById('startGame').style.display = 'block';

        document.getElementById('playAgain').style.visibility = 'visible';
        document.getElementById('playAgain').style.display = 'block';

        // Display Names
        document.getElementById('playerOneName').textContent = playerOneInput;
        document.getElementById('playerTwoName').textContent = playerTwoInput;

        //Hide inputs
        document.getElementById('form').style.visibility = 'hidden';
        document.getElementById('form').style.display = 'none';
        
    });

    // Start game when "Start Game" button is clicked
    document.getElementById('startGame').addEventListener('click', () => {
        startGame(playerOne, playerTwo);  // Pass playerOne and playerTwo
        document.getElementById('startGame').style.visibility = 'hidden';
        document.getElementById('startGame').style.display = 'none';
    });

    // Reset game when "Play Again" button is clicked
    document.getElementById('playAgain').addEventListener('click', playAgain);

    return { board, createPlayer, startGame, playAgain };
}

// Create game instance
const play = game();
