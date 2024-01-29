const express = require("express");
const cadastrarUsuario = require("../controladores/controladores_usuarios/cadastrarUsuario");
const loginUsuario = require("../controladores/controladores_usuarios/loginUsuario");
const verificarLogin = require("../intermediarios/verificarLogin");
const detalharUsuario = require("../controladores/controladores_usuarios/detalharUsuario");
const atualizarUsuario = require("../controladores/controladores_usuarios/atualizarUsuario");
const listarCategorias = require("../controladores/controlador_categorias/listarCategorias");
const listarTransacoes = require("../controladores/controladores_transacao/listarTransacoes");
const validarCorpoRequisicao = require("../intermediarios/validarCorpoRequisicao");
const schemaUsuarios = require("../validacoes/schemaUsuarios");
const schemaLoginUsuario = require("../validacoes/schemaLoginUsuario");

const rotas = express();

rotas.post(
    "/cadastrar",
    validarCorpoRequisicao(schemaUsuarios),
    cadastrarUsuario
);
rotas.post("/login", validarCorpoRequisicao(schemaLoginUsuario), loginUsuario);

rotas.use(verificarLogin);

rotas.get("/detalharUsuario", detalharUsuario);
rotas.put(
    "/atualizar",
    validarCorpoRequisicao(schemaUsuarios),
    atualizarUsuario
);
rotas.get("/listarCategorias", listarCategorias);
rotas.get("/listarTransacoes", listarTransacoes);
 
module.exports = rotas;
