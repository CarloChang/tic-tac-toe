/* Primero para probar con console.log, habrà que hacer un array sobre un array algo asì: const myArray =[ [[],[],[]], 
                                                                                                           [[],[],[]],
                                                                                                           [[],[],[]] ]
    De tal manera que al acceder desde un jugador, a travès de un input, este le pregunte que posiciòn quiere jugar, allì
    se marcarà la opciòn con una X
    
    Investigar primero como rotar entre jugadores 
        "      crear cada jugador, con sus especificas puntuaciones: Nombre, Simbolo, Partidas Ganadas*/


function gameboard(){
    const myArray =   [[[],[],[]], 
                       [[],[],[]],
                       [[],[],[]]];

    return myArray
}
/* Se podría hacer un While para que esté en constante loop hasta que se acabe el juego
    varios if con condicion de que se elija un número entre 0-2, cualquiera de esos, repetiria el input
    se me ocurre una soluciòn muy vaga y poco eficiente que es que si la posición (ejemplo) [0][0],[0][1],[0][2] es igual a = "X" ó "O", gana dicho jugador
     que ocurre con dicha solución tendría que hacerlo para cada posición posible que tampoco es tanto, pero es tedioso */
const board = gameboard();
board[0][0] = 'X';

console.table(board)

function createUser(name){
    const userName = `Your username is: ${name}`;
    return {name, userName}
}

function createPlayer(name){
    const player = createUser(name);
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;

    return {name, score, player, getScore, increaseScore};
}

const playerOne = createPlayer('Carlo');
playerOne.increaseScore();
//const playerTwo = createPlayer('Jose');

console.log({
    playerOne: playerOne.player,
    playerOneScore: playerOne.getScore()
});

