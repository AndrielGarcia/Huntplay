const connection = require('../database/connection.js')

module.exports = {
    async index(request, response) {
        const mods_games = await connection('mods_games').select('*')

    return response.json(mods_games)
    },

    async create(request, response) {
        const { desc_mod } = request.body

        console.log(desc_mod)

        const [id] = await connection('mods_games').insert({
            desc_mod,

        }).returning('id')

        console.log(id)

    return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params
        console.log(id)
        await connection('mods_games').where('id', id).del()
        return response.status(204).send()
    }
}