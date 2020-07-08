const connection = require('../database/connection.js')

module.exports = {
    async index(request, response) {
        const countries = await connection('countries').select('*')

    return response.json(countries)
    },

    async create(request, response) {
        const { desc_country } = request.body

        console.log(desc_country)

        const [id] = await connection('countries').insert({
            desc_country
        }).returning('id')
        console.log(id)
    return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params
        console.log(id)
        await connection('countries').where('id', id).del()
        return response.status(204).send()
    }
}
