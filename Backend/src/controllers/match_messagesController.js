const connection = require('../database/connection.js')
const { compareSync } = require('bcrypt')

module.exports = {
    async index(request, response) {
        const { cod_partida } = request.params
        console.log(cod_partida)
        const messages = await connection('match_messages').select('*').where('cod_partida', cod_partida)
        
        return response.json(messages)
    },

    async create(request, response) {
        const { cod_partida, autor, desc_message } = request.body
        
        const status = 1

        await connection('match_messages').insert({

            cod_partida,
            autor,
            desc_message,
            status,

        })

        return response.json({ desc_message })
    },

}