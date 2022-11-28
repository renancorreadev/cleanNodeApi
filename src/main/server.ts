/**
 * Camada que fica altamente acoplada
 * Não necessario desenvolver testes unitarios porem é importante desenvolver testes
 * de integração.
 */

import express from "express";

const app = express();

app.listen(5050, () => {
  console.log("Server running at http://localhost:5050");
});
