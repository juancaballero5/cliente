"use strict"

function multiplicarMatrices(matrizA, matrizB) {
    let matrizR = generaMatriz(matrizA.length);
    for (let i=0; i<matrizA.length; i++) {
        for (let j=0; j<matrizB.length; j++) {
            for (let k=0; k<matrizB.length; k++)
            matrizR[i][j] += matrizA[i][k] * matrizB[k][j]; 
        }
    }
    return matrizR;
}