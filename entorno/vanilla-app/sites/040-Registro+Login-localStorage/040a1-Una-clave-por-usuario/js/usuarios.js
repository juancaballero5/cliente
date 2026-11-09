"use strict";

const formulario = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");
const tbody = document.querySelector("#tablaUsuarios tbody");

listarUsuarios();

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  if (usuario.includes(";") || usuario.includes("=") || password.includes(";") || password.includes("=")) {
    mensaje.textContent = "El usuario y la contraseña no pueden llevar ; ni =.";
    return;
  }

  if (usuario === "usuario") {
    mensaje.textContent = `No puedes registrarte con el nombre "${usuario}" (está reservado).`;
    return;
  }

  if (leeUsuario(usuario) !== null) {
    mensaje.textContent = `El usuario "${usuario}" ya está registrado.`;
    return;
  }

  const dato = {  // [{ clave: usuario1, valor: password1 }, { clave: usuario2, valor: password2 }, ...]
    clave: usuario,
    valor: password
  };
  guardaUsuario(dato, "");

  mensaje.textContent = `Usuario "${usuario}" registrado correctamente.`;
  listarUsuarios();
});

function listarUsuarios() {
  const usuarios = leeUsuarios().filter(usuario => usuario.clave !== "usuario"); // [{ clave: usuario1, valor: password1 }, { clave: usuario2, valor: password2 }, ...]
  tbody.textContent = "";

  if (usuarios.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 3;
    td.textContent = "No hay usuarios registrados.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  usuarios.forEach((usuario) => {
    const tr = document.createElement("tr");

    const tdUsuario = document.createElement("td");
    tdUsuario.textContent = usuario.clave;

    const tdPassword = document.createElement("td");
    tdPassword.textContent = usuario.valor;

    const tdAcciones = document.createElement("td");

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => editarUsuario(usuario)); // [{ clave: usuario1, valor: password1 }, { clave: usuario2, valor: password2 }, ...]

    const btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", () => borrarUsuario(usuario)); // [{ clave: usuario1, valor: password1 }, { clave: usuario2, valor: password2 }, ...]

    tdAcciones.appendChild(btnEditar);
    tdAcciones.appendChild(document.createTextNode(" "));
    tdAcciones.appendChild(btnBorrar);

    tr.appendChild(tdUsuario);
    tr.appendChild(tdPassword);
    tr.appendChild(tdAcciones);
    tbody.appendChild(tr);
  });
}

function editarUsuario(usuario) {
  if (usuario.clave == sesion.valor) {
    mensaje.innerHTML = `El usuario: "${usuario.clave}" tiene la sesión abierta.<br>No se puede editar`;
    setTimeout(() => {
      mensaje.textContent = "";
    }, 1500);
    return;
  } else {
    document.getElementById("usuario").value = usuario.clave;
    document.getElementById("password").value = usuario.valor;
    borrarUsuario(usuario); // [{ clave: usuario1, valor: password1 }, { clave: usuario2, valor: password2 }, ...]
    listarUsuarios();
  }
}

function borrarUsuario(usuario) {
  if (usuario.clave == sesion.valor) {
    mensaje.innerHTML = `El usuario: "${usuario.clave}" tiene la sesión abierta.<br>No se puede borrar`;
    setTimeout(() => {
      mensaje.textContent = "";
    }, 1500);
    return;
  } else {
    borraUsuario(usuario.clave); // [{ clave: usuario1, valor: password1 }, { clave: usuario2, valor: password2 }, ...]
    listarUsuarios();
  }
}
