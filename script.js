/* Primero para probar con console.log, habrà que hacer un array sobre un array algo asì: const myArray =[ [[],[],[]], 
                                                                                                           [[],[],[]],
                                                                                                           [[],[],[]] ]
    De tal manera que al acceder desde un jugador, a travès de un input, este le pregunte que posiciòn quiere jugar, allì
    se marcarà la opciòn con una X
    
    Investigar primero como rotar entre jugadores 
        "      crear cada jugador, con sus especificas puntuaciones: Nombre, Simbolo, Partidas Ganadas*/


function game(){
    const board =     [[[],[],[]], 
                       [[],[],[]],
                       [[],[],[]]];

    const createPlayer = function(name, mark){
        const player = name;
        const getScore = () => score;
        const increaseScore = () => score++;
        return {name, score: 0, player, mark, getScore, increaseScore}

    }

    
    const playerTurn = (firstPosition, secondPosition, mark) => {
        if (board[firstPosition][secondPosition] == ''){
            board[firstPosition][secondPosition] = mark;
            if (gameOver()){
                alert(`${mark} wins!`);
            }
        } else {
            alert('this position is already taken');
        }
        
    }

    const gameOver = () => {
        const allEqual = arr => arr.every(val => val === arr[0] && val !== ''); //https://dev.to/rajnishkatharotiya/function-to-check-if-all-records-are-equal-in-array-javascript-3mo3#:~:text=Javascript%20Useful%20Snippets%20%E2%80%94%20allEqual(),are%20equal%20and%20false%20otherwise.
        const winningPositions = [[[0, 0], [0, 1], [0, 2]],
                                  [[1, 0], [1, 1], [1, 2]],
                                  [[2, 0], [2, 1], [2, 2]],
                            
                                // Columns
                                  [[0, 0], [1, 0], [2, 0]],
                                  [[0, 1], [1, 1], [2, 1]],
                                  [[0, 2], [1, 2], [2, 2]],
                            
                                // Diagonals
                                  [[0, 0], [1, 1], [2, 2]],
                                  [[0, 2], [1, 1], [2, 0]]];

            for (let positions of winningPositions) {
            const values = positions.map(([x, y]) => board[x][y]);
            if (allEqual(values)) {
                alert("We have a winner!");
                return true;
            }
        }
        return false;
    }

    return {board, createPlayer, playerTurn, gameOver}
}


const play = game();
const playerOne = play.createPlayer('Carlo', 'X');
const playerTwo = play.createPlayer('Jose', 'O');

play.playerTurn(0,0, playerOne.mark);
play.playerTurn(0,1, playerTwo.mark);
play.playerTurn(0,2, playerOne.mark);
console.table(play.board);


