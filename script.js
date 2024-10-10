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

    // const playerTurn = (player) => { //this makes no sense now since we are using inputs from DOM
    //     let validMove = false;
    //     while (!validMove) {
    //         const firstPosition = prompt(`${player.name}, select your first position:`);
    //         const secondPosition = prompt(`${player.name}, select your second position:`);
    
    //         if (board[firstPosition][secondPosition] === '') {
    //             board[firstPosition][secondPosition] = player.mark;
    //             validMove = true;  
    //         } else {
    //             alert('This position is already taken, try again.');
    //         }
    //     }
    
    //     if (gameOver()) {
    //         console.log(`${player.name} wins with mark ${player.mark}!`);
    //         player.increaseScore();
    //     }
    // };
    

    const handleClick = (x,y, player) => {
        if (board[x][y] === ''){
            board[x][y] = player.mark;
            document.querySelector(`#grid${x*3+y}`).textContent = player.mark;
            if (gameOver()){
                document.getElementById('displayName').textContent = `${player.name} has won!`
                player.increaseScore();
                updateScores();
            } else if(isBoardFull()){
                document.getElementById('displayName').textContent = "It's a tie!"
            }
        }
    }

    const startGame = (playerOne, playerTwo) => {
        let currentPlayer = playerOne;
        document.getElementById('displayName').textContent = `${currentPlayer.name}'s turn`;
        
        document.querySelectorAll('.gameGrid').forEach((grid,index) => {
            grid.addEventListener('click', () => {
                let x = Math.floor(index / 3);
                let y = index % 3;
                if (board[x][y] === ''){
                    document.getElementById('displayName').textContent = `${currentPlayer.name}'s turn`
                    handleClick(x,y, currentPlayer);
                    //
                    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
                }
            });
        });
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
    }

    const playAgain = () => {
        board.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                board[rowIndex][cellIndex] = '';
                document.querySelector(`#grid${rowIndex * 3 + cellIndex}`).textContent = '';  // Clear DOM
            });
        });
        document.getElementById("displayName").textContent = '';  // Clear message
        
    }

    const updateScores = () => {
        document.getElementById("playerOneScore").textContent = playerOne.getScore();
        document.getElementById("playerTwoScore").textContent = playerTwo.getScore();
    };

    document.getElementById('playAgain').addEventListener('click', playAgain);

    return { board, createPlayer, handleClick, gameOver, startGame, playAgain };
}

const play = game();
const playerOne = play.createPlayer('Carlo', 'X');
const playerTwo = play.createPlayer('Jose', 'O');



play.startGame(playerOne, playerTwo);


