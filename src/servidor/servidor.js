const express = require("express");
const { rotasTransacao, rotasContas } = require("../rotas/rotas");

const app = express();

app.use(express.json());
app.use(rotasContas);
app.use(rotasTransacao);

module.exports = app;
 