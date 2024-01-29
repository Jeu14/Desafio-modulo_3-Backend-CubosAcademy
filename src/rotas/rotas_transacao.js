const express = require("express");
const cadastrarTransacao = require("../controladores/controladores_transacao/cadastrarTransacao");
const verificarLogin = require("../intermediarios/verificarLogin");
const atualizarTransacao = require("../controladores/controladores_transacao/atualizarTransacao");
const excluirTransacao = require("../controladores/controladores_transacao/excluirTransacao");
const detalharTransacao = require("../controladores/controladores_transacao/detalharTransacao");
const extratoTransacao = require("../controladores/controladores_transacao/extratoTransacao");
const validarCorpoRequisicao = require("../intermediarios/validarCorpoRequisicao");
const schemaTransacao = require("../validacoes/schemaTransacao");

const rotas = express();

rotas.use(verificarLogin);

rotas.get("/extrato", extratoTransacao);
rotas.get("/detalharTransacao/:id", detalharTransacao);

rotas.post(
    "/cadastrarTransacao",
    validarCorpoRequisicao(schemaTransacao),
    cadastrarTransacao
);

rotas.put(
    "/atualizarTransacao/:id", validarCorpoRequisicao(schemaTransacao),
     atualizarTransacao);

rotas.delete("/excluirTransacao/:id", excluirTransacao);

module.exports = rotas;
 