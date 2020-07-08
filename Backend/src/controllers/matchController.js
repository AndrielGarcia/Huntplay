const connection = require('../database/connection.js')
const crypto = require('crypto')

module.exports = {
    async index(request, response) {
        const matches = await connection('matches').select('*')
    
        return response.json(matches)
    },

    async create(request, response) {
        console.log(request.id_user)
        const { nome_partida, data, modalidade, modo } = request.body
        const moderador = request.id_user

        const cod_partida = crypto.randomBytes(4).toString('HEX')
        console.log(cod_partida)

    await connection('matches').insert({
        
        cod_partida,
        moderador,
        nome_partida,
        data,
        modalidade,
        modo,
    })
    return response.json({ cod_partida })
    },

    async delete(request, response) {
        const { cod_partida } = request.params
        const moderador = request.id_user

        const match = await connection('matches')
        .where('cod_partida', cod_partida)
        .select('moderador')
        .first()

        console.log(match.moderador)
        console.log(moderador)

        if (match.moderador != moderador) {
            return response.status(401).json({ error: 'Operation not permitted' })
        }

        console.log(cod_partida)

        await connection('matches').where('cod_partida', cod_partida).del()
        return response.status(204).send()
    }
}