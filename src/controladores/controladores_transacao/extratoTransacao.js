const knex = require("../../conexao_bancoDeDados/conexao");

const extratoTransacao = async (req, res) => {
    try {
        const obterSomaEntrada = await knex('transacoes')
            .sum('valor as total')
            .where({
                'usuario_id': req.usuario.id,
                'tipo': 'entrada'
            })
            .first();

        const obterSomaSaida = await knex('transacoes')
            .sum('valor as total')
            .where({
                'usuario_id': req.usuario.id,
                'tipo': 'saida'
            }) 
            .first();

        const extrato = {
            entrada: obterSomaEntrada.total || 0,
            saida: obterSomaSaida.total || 0,
        };

        return res.status(200).json(extrato);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            mensagem: "[ERRO] Não foi possível obter o extrato das transações",
        });
    }
};
module.exports = extratoTransacao;
