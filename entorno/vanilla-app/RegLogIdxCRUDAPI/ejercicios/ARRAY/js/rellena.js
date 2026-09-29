"use strict"

function rellena(matriz, min = 10, max = 99) {
    for (let i = 0; i < matriz.length ; i++) {
        for (let j = 0; j < matriz.length; j++) {
            matriz[i][j] = aleatorio(min, max);
        }
    }
    console.log(matriz);
    return matriz;
}