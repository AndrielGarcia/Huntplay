const connection = require('../database/connection.js')

module.exports = {
    async index(request, response) {
        const games = await connection('games').select('*')

    return response.json(games)
    },

    async create(request, response) {
        const { nome, categoria } = request.body

        console.log(nome)

        const [id] = await connection('games').insert({
            nome,
            categoria,

        }).returning('id')

        console.log(id)

    return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params
        console.log(id)
        await connection('games').where('id', id).del()
        return response.status(204).send()
    }
}