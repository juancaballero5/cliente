"use strict";

async function datosAPICiudades(prefijo) {
  const baseURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
  const params = {
    types: "city",
    namePrefix: prefijo,
    languageCode: "es",
    limit: 10,
  };

  const headers = {
    "x-rapidapi-key": "906bfc86e9mshbbc3ad60fe01f31p1fd7c7jsn50c604e1f819",
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
  };

  const data = await llamarAPI({ baseURL, params, headers });
  return data; // Devuelve el objeto completo, que incluye: data.data[]
}

