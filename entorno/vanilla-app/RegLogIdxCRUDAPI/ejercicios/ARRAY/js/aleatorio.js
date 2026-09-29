"use strict"

function aleatorio(min, max) {
    if (min > max) {
        let temp = min;
        min = max;
        max = temp;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}