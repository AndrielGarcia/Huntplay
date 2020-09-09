const connection = require('../database/connection.js')
const { compareSync } = require('bcrypt')

module.exports = {
    async index(request, response) {
        const { cod_partida } = request.params
        console.log(cod_partida)
        const messages = await connection('match_messages')
        .select('*')
        .where('cod_partida', cod_partida)
        .orderBy('id')
        
        return response.json(messages)
    },

    async create(request, response) {
        const { cod_partida, autor, desc_message } = request.body
        
        const status = 1

        const [id] = await connection('match_messages').insert({

            cod_partida,
            autor,
            desc_message,
            status,

        }).returning('id')

        return response.json({ id, cod_partida, autor, desc_message, status })
    },

    async delete(request, response) {
        const { cod_partida } = request.params

        await connection('match_messages').where('cod_partida', cod_partida).del()
        return response.status(204).send()
    }

}