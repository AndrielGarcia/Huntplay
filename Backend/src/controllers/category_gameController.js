const connection = require('../database/connection.js')

module.exports = {
    async index(request, response) {
        const categories_games = await connection('categories_games').select('*')

    return response.json(categories_games)
    },

    async create(request, response) {
        const { desc_category } = request.body

        console.log(desc_category)

        const [id] = await connection('categories_games').insert({
            desc_category
        }).returning('id')

        console.log(id)
        
    return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params

        console.log(id)

        await connection('categories_games').where('id', id).del()
        return response.status(204).send()
    }
}
