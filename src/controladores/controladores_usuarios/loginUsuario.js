const knex = require("../../conexao_bancoDeDados/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [usuario] = await knex('usuarios').select('*').where('email', email);

        if (!usuario) {
            return res.status(400).json({
                mensagem: "Email ou senha inválida",
            });
        }
 
        const { senha: senhaUsuario, ...usuarioSemSenha } = usuario;

        const senhaValida = await bcrypt.compare(senha, senhaUsuario);

        if (!senhaValida) {
            return res.status(400).json({
                mensagem: "Email ou senha inválida",
            });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.SENHA_JWT, {
            expiresIn: "8h",
        });
        return res.status(200).json({ usuario: usuarioSemSenha, token });
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({ mensagem: "[ERRO] Não foi possível fazer login" });
    }
};

module.exports = loginUsuario;
