"use strict";

const formulario = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

async function credencialCorrecta(usuario, password) {
  const user = await leeUsuarioIDX(usuario);
  if (!user) return false;
  return user.password === password;
}

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  const valida = await credencialCorrecta(usuario, password);
  if (!valida) {
    mensaje.textContent = "Usuario o contraseña incorrectos.";
    return;
  }
  const usuarioGuardado = await leeUsuarioIDX(usuario);
  await guardaSesionIDX(usuarioGuardado);

  mensaje.textContent = `Bienvenido, ${usuario}. Redirigiendo...`;
  setTimeout(() => {
    window.location.href = PORTADA;
  }, 1500);
});
