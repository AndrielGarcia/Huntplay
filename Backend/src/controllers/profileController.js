const connection = require('../database/connection.js')

module.exports = {
    async index(request, response) {
        const id_user = request.headers.authorization

        const matches = await connection('matches')
        .where('moderador', id_user)
        .select('*')
    
        return response.json(matches)
    }
}