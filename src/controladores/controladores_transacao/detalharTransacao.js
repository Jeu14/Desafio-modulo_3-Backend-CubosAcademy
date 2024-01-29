const knex = require("../../conexao_bancoDeDados/conexao");

const detalharTransacao = async (req, res) => {
    const { id } = req.params;

    if (!id || id === "" || id === undefined || id === null) {
        return res.status(400).json({
            mensagem: "Insira o id da transação que deseja visualizar",
        });
    }
 
    try {
        const transacao = await knex('transacoes as t')
            .select(
                't.id',
                't.tipo',
                't.descricao',
                't.valor',
                't.data',
                't.usuario_id',
                't.categoria_id',
                'c.descricao as categoria_nome'
            )
            .leftJoin('categorias as c', 't.categoria_id', 'c.id')
            .where({
                't.usuario_id': req.usuario.id,
                't.id': id
            })
            .first();

        if (!transacao) {
            return res
                .status(404)
                .json({ mensagem: "Transação não encontrada." });
        }

        return res.status(200).json(transacao);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            mensagem:
                "[ERRO] Não foi possível detalhar a transação do usuário logado",
        });
    }
};

module.exports = detalharTransacao;
