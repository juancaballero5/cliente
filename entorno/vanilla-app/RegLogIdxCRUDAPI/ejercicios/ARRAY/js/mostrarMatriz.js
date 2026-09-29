"use strict"

function mostrarMatriz(matriz) {
    let tabla = document.createElement('table');
/*     tabla.setAttribute("id", "salidaDOM"); */
    for (let i = 0; i < matriz.length; i++) {
        let fila = document.createElement('tr');
        for (let j = 0; j < matriz.length; j++) {
            let contenido = document.createTextNode(matriz[i][j]);
            let columna = document.createElement('td');
            columna.appendChild(contenido);
            fila.appendChild(columna);
        }
        tabla.appendChild(fila);
    }
    console.log(tabla);
    return tabla;
    
/*     let cadena = '<table>';
    for (let i = 0; i < matriz.length; i++) {
        cadena += "<tr>";
        for (let j = 0; j < matriz.length; j++) {
            cadena += `<td>${matriz[i][j]}</td>`;
        }
        cadena += "</tr>";
    }
    cadena += "</table>";
    console.log(cadena);
    return cadena; */
}