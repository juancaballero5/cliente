"use strict";

// Función genérica para llamar a cualquier API (reutilizable en todo el proyecto)
async function llamarAPI({ baseURL, params = {}, headers = {}, method = "GET", body = null }) {
  const qs = new URLSearchParams(params).toString();
  const url = qs ? `${baseURL}?${qs}` : baseURL;

  const options = { method, headers };

  if (method === "POST" && body) {
    options.body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Error al llamar a la API", error);
    return null;
  }
}
