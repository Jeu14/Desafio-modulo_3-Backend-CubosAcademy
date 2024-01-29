const knex = require("../../conexao_bancoDeDados/conexao");

const atualizarTransacao = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const [validarCategoria] = await knex('categorias').select('descricao').where('id', categoria_id)

        if (!validarCategoria) {
            return res
                .status(404)
                .json({ mensagem: "Não existe categoria para o ID informado" });
        }

        const resultado = await knex('transacoes')
            .where({id, usuario_id: req.usuario.id})
            .update({
                descricao,
                valor,
                data,
                categoria_id,
                tipo,
            });

        if (resultado === 0) {
            return res.status(404).json({
                mensagem: "Não foi possível encontrar a transação para atualização",
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            mensagem: "[ERRO] Não foi possível atualizar os dados da transação",
            error: error.message
        });
    }
};

module.exports = atualizarTransacao;
