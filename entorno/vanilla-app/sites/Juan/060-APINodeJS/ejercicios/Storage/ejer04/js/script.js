"use strict";

const PATRON_USUARIO = /^[a-z][a-z0-9_]{2,15}$/;
const PATRON_PASSWORD = /^.{4,20}$/;
const PATRON_TELEFONO = /^[5-9]\d{8,9}$/;
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PATRON_CP = /^\d{5}$/;

const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const calle = document.getElementById("calle");
const cp = document.getElementById("cp");
const ciudad = document.getElementById("ciudad");
const provincia = document.getElementById("provincia");
const imagen = document.getElementById("imagen");
const guardar = document.getElementById("guardar");
const leer = document.getElementById("leer");
const borrar = document.getElementById("borrar");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
});

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject("Error al leer el archivo");
    lector.readAsDataURL(file);
  });
}

listarUsuarios();

guardar.addEventListener("click", async () => {
  if (!PATRON_USUARIO.test(usuario.value.trim())) {
    resultado.textContent =
      "Usuario no válido (minúsculas, números o _; 3-16 caracteres; empieza por letra).";
    return;
  }

  if (!PATRON_PASSWORD.test(password.value.trim())) {
    resultado.textContent = "Contraseña no válida (entre 4 y 20 caracteres).";
    return;
  }

  if (telefono.value.trim() && !PATRON_TELEFONO.test(telefono.value.trim())) {
    resultado.textContent = "Teléfono no válido (9 dígitos; empieza por 6-9).";
    return;
  }

  if (email.value.trim() && !PATRON_EMAIL.test(email.value.trim())) {
    resultado.textContent = "Email no válido.";
    return;
  }

  if (cp.value.trim() && !PATRON_CP.test(cp.value.trim())) {
    resultado.textContent = "Código postal no válido (5 dígitos).";
    return;
  }

  const dataURL = imagen.files[0] ? await fileToDataURL(imagen.files[0]) : FOTO_DEFECTO;

  const user = {
    nombre: nombre.value.trim(),
    usuario: usuario.value.trim(),
    password: password.value.trim(),
    telefono: telefono.value.trim() || "5551234567",
    email: email.value.trim() || "sin-email@ejemplo.com",
    direccion: {
      calle: calle.value.trim() || "Sin calle",
      cp: cp.value.trim() || "00000",
      ciudad: ciudad.value.trim() || "Sin ciudad",
      provincia: provincia.value.trim() || "Sin provincia",
    },
    imagen: dataURL,
  };

  guardaUsuarioEjercicio(user);
  listarUsuarios();
});

leer.addEventListener("click", () => {
  let mensaje = "📦 El valor del usuario es:<br>";
  const user = leeUsuarioEjercicio(usuario.value.trim());
  if (!user) {
    resultado.innerHTML = mensaje + "⚠️ No existe el usuario.";
  } else {
    const foto = `<img src="${user.imagen}" alt="${user.usuario}">`;
    resultado.innerHTML = mensaje + `${foto} <b>${user.nombre}</b> ${user.usuario} - ${user.telefono} - ${user.email} - ${user.direccion.calle} - ${user.direccion.cp} - ${user.direccion.ciudad} - ${user.direccion.provincia}<br>`;
  }
  setTimeout(() => {
    listarUsuarios();
  }, 1500);
});

borrar.addEventListener("click", () => {
  const user = leeUsuarioEjercicio(usuario.value.trim());
  if (!user) {
    resultado.innerHTML = "⚠️ No existe el usuario.";
  } else {
    borraUsuarioEjercicio(user.usuario);
    resultado.innerHTML = `El usuario <b>${user.usuario}</b> ha sido borrado.`;
  }
  setTimeout(() => {
    listarUsuarios();
  }, 1500);
});

function listarUsuarios() {
  let listado = "Usuarios guardados (1 clave = todos):<br>";
  const usuarios = Object.values(leeUsuariosEjercicio());
  if (usuarios.length === 0) {
    resultado.innerHTML = listado + "No hay usuarios guardados.";
  } else {
    usuarios.forEach((user) => {
      const foto = `<img src="${user.imagen}" alt="${user.usuario}">`;
      listado += `${foto} <b>${user.nombre}</b> ${user.usuario} - ${user.telefono} - ${user.email} - ${user.direccion.calle} - ${user.direccion.cp} - ${user.direccion.ciudad} - ${user.direccion.provincia}<br>`;
    });
    resultado.innerHTML = listado;
  }
}
