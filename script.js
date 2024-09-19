/* Primero para probar con console.log, habrà que hacer un array sobre un array algo asì: const myArray =[ [[],[],[]], 
                                                                                                           [[],[],[]],
                                                                                                           [[],[],[]] ]
    De tal manera que al acceder desde un jugador, a travès de un input, este le pregunte que posiciòn quiere jugar, allì
    se marcarà la opciòn con una X
    
    Investigar primero como rotar entre jugadores 
        "      crear cada jugador, con sus especificas puntuaciones: Nombre, Simbolo, Partidas Ganadas*/


function gameboard(){
    const board =     [[[],[],[]], 
                       [[],[],[]],
                       [[],[],[]]];

    const playerOneTurn = (firstPosition, secondPosition) => {
        board[firstPosition][secondPosition] = 'X';
        return {newPosition: 'X', board}
    }

    const playerTwoTurn = (firstPosition, secondPosition) => {
        board[firstPosition][secondPosition] = 'O';
        return {newPosition: 'O', board}
    }


    return {board, playerOneTurn, playerTwoTurn}
}

const game = gameboard();
game.playerOneTurn(0,2);
console.table(game.board);


const createUser = function(name){
    const userName = `Your username is: ${name}`;

    const createPlayer = (name) => {
        const player = createUser(name);
        let score = 0;
        const getScore = () => score;
        const increaseScore = () => score++;

        return {name, score, player, getScore, increaseScore};
    }

    return {name, userName, createPlayer}

}

const playerOne = createUser('Carlo').createPlayer('Carlo');
// playerOne.increaseScore();
const playerTwo = createUser('Jose').createPlayer('Jose');


console.log({
    playerOne: playerOne.player,
    playerOneScore: playerOne.getScore()
});


