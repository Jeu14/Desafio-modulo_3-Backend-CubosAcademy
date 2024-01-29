const joi = require('joi')

const schemaUsuarios = joi.object({
  nome: joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório',
    'string.empty': 'O campo nome não pode ficar vazio',
  }),

  email: joi.string().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email não pode ficar vazio',
  }),

  senha: joi.string().min(6).required().messages({
    'any.required': 'O campo senha é obrigatório',
		'string.empty': 'O campo senha não pode ficar vazio',
		'string.min': 'A senha precisa conter, no mínimo, 6 caracteres',
  }),
}) 

module.exports = schemaUsuarios