const knex = require("../../conexao_bancoDeDados/conexao");

const excluirTransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const transacao = await knex('transacoes')
            .where({
                'id': id,
                'usuario_id': req.usuario.id
            })
            .first();

        if (!transacao) {
            return res
                .status(404)
                .json({ mensagem: "Transação não encontrada" });
        }
 
        await knex('transacoes')
            .where('id', id)
            .del();

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            mensagem: "[ERRO] Não foi possível excluir esta transação",
        });
    }
};

module.exports = excluirTransacao;
