"use strict"

function generaMatriz(dimension) {
    let matriz = []; // [] y new Array(dimension), es lo mismo
    for (let i = 0; i < dimension; i++) {
        matriz[i] = [];
    }
    for (let i=0; i<dimension; i++) {
        for (let j=0; j<dimension; j++) {
            matriz[i][j] = 0; 
        }
    }
    console.table(matriz);
    return matriz;
}

