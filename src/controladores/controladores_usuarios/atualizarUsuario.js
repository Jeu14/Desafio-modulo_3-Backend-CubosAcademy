const knex = require("../../conexao_bancoDeDados/conexao");
const bcrypt = require("bcrypt");

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const [verificarEmail] = await knex('usuarios')
            .select('*')
            .where('email', email)
            .whereNot('id', req.usuario.id);

        if (verificarEmail) {   
            return res.status(400).json({
                mensagem:
                    "O e-mail informado já está sendo utilizado por outro usuário.",
            }); 
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await knex('usuarios')
            .where('id', req.usuario.id)
            .update({
                nome,
                email,
                senha: senhaCriptografada,
            });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            mensagem:
                "[ERRO] Não foi possível atualizar as informações do usuário",
        });
    }
};

module.exports = atualizarUsuario;
