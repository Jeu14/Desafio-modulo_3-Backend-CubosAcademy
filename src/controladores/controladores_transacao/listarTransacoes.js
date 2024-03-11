const knex = require("../../conexao_bancoDeDados/conexao");

const listarTransacoes = async (req, res) => {
    try {
        const filtroCategorias = req.query.filtro || [];

        const transacoes = await knex('transacoes as t')
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
                't.usuario_id': req.usuario.id
            });

        if (filtroCategorias.length < 1) {
            return res.status(200).json(transacoes);
        } else {
            const transacoesFiltradas = transacoes.filter(transacao => filtroCategorias.includes(transacao.categoria_nome));
            return res.status(200).json(transacoesFiltradas);
        }

    } catch (error) {
        return res.status(500).json({
            mensagem:
                "[ERRO] Não foi possível listar as transações do usuário logado",
        });
    }
};

module.exports = listarTransacoes;
