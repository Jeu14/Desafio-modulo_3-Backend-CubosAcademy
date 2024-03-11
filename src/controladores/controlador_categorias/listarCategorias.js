const knex = require("../../conexao_bancoDeDados/conexao");

const listarCategorias = async (req, res) => {
    try {
        const categorias = await knex('categorias').select('*');
        return res.status(200).json(categorias);
    } catch (error) {
        return res
            .status(500)
            .json({ mensagem: "[ERRO] Não foi possível listar as categorias" });
    }
}; 

module.exports = listarCategorias;
