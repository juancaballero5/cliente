"use strict";

async function datosAPI(n = 1) {
  const baseURL = "https://randomuser.me/api/";
  const params = {
    results: n
  };

  // Reutilizamos tu utilidad genérica
  const data = await llamarAPI({ baseURL, params });
  return data; // devolvemos tal cual (con "results")
}
