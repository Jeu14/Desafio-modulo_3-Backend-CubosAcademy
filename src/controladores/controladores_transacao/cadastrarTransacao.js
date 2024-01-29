const knex = require("../../conexao_bancoDeDados/conexao");

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const [validarCategoria] = await knex('categorias')
            .select('descricao')
            .where('id', categoria_id);

        if (!validarCategoria) {
            return res.status(404).json({ mensagem: "Não existe categoria para o ID informado" });
        } 

        const [novaTransacao] = await knex('transacoes')
            .insert({
                descricao,
                valor,
                data,
                categoria_id,
                tipo,
                usuario_id: req.usuario.id,
            })
            .returning('*');

        const transacaoFormatada = {
            id: novaTransacao.id,
            tipo: novaTransacao.tipo,
            descricao: novaTransacao.descricao,
            valor: novaTransacao.valor,
            data: novaTransacao.data,
            usuario_id: novaTransacao.usuario_id,
            categoria_id: novaTransacao.categoria_id,
            categoria_nome: validarCategoria.descricao,
        };

        return res.status(201).json(transacaoFormatada);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            mensagem: "[ERRO] Não foi possível cadastrar a transação",
        });
    }
};

module.exports = cadastrarTransacao;
