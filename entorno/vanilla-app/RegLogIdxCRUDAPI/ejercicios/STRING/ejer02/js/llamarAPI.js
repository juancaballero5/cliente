"use strict";

async function llamarAPI({ baseURL, params = {}, headers = {}, method = "GET", body = null }) {
  const qs = new URLSearchParams(params).toString(); 
  const url = qs ? `${baseURL}?${qs}` : baseURL; // CUBRE EL CASO DE QUE NO HAYA PARÁMETROS

  const options = { method, headers };

  if (method === "POST" && body) {
    options.body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

    const data = await response.json();
    return data; // ✅ devolvemos los datos para que el que llama decida

  } catch (error) {
    throw error; // ✅ lanzamos el error para que lo capture quien llama
  }
}

/* "use strict";

async function llamarAPI(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json(); // Convertimos la respuesta a JSON
    return data; // Devolvemos el resultado
  } catch (error) {
    throw error; // Lo capturará quien llama (datosAPI)
  }
} */