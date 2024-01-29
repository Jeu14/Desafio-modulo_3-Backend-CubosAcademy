const joi = require('joi')

const schemaTransacao = joi.object({
  tipo: joi.string().valid('entrada', 'saida').required().messages({
    'any.required': 'O campo tipo é obrigatório',
		'string.empty': 'O campo tipo não pode ficar vazio',
    'any.only': 'Especifique se o tipo da transação é de entrada ou de saída'
  }),

  descricao: joi.string().required().messages({
    'any.required': 'O campo descrição é obrigatório',
		'string.empty': 'O campo descrição não pode ficar vazio',
  }),

  valor: joi.number().required().messages({
    'any.required': 'O campo descrição é obrigatório',
		'string.empty': 'O campo descrição não pode ficar vazio',
    'number.base': 'O campo valor precisa ser obrigatoriamente do tipo numérico',
  }),

  data: joi.date().required().messages({
    'date.format': 'O campo data precisa estar no formato correto'
  }),

  categoria_id: joi.number().required().messages({
    'any.required': 'O campo descrição é obrigatório',
		'string.empty': 'O campo descrição não pode ficar vazio',
    'number.base': 'O campo valor precisa ser obrigatoriamente do tipo numérico',
  }),
}) 

module.exports = schemaTransacao