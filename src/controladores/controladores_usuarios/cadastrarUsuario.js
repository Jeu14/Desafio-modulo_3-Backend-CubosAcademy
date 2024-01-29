const knex = require("../../conexao_bancoDeDados/conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const verificarEmail = await knex('usuarios').where('email', email);

        if (verificarEmail.length > 0) {
            return res.status(400).json({
                mensagem:
                    "Já existe usuário cadastrado com o e-mail informado.",
            });
        } 

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        
        const novoUsuario = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada,
        }).returning(['id', 'nome', 'email']);
        
        return res.status(201).json(novoUsuario);
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({ mensagem: "[ERRO] Não foi possível cadastrar o usuário" });
    }
};

module.exports = cadastrarUsuario;
