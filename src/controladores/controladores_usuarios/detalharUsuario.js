const knex = require("../../conexao_bancoDeDados/conexao");

const detalharUsuario = async (req, res) => {
    try {
        const [usuario] = await knex('usuarios')
            .select('id', 'nome', 'email')
            .where('id', req.usuario.id);

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
           .json({ mensagem: "[ERRO] Não foi possível detalhar o usuário" });
    } 
};

module.exports = detalharUsuario;
