const connection = require('../database/connection.js')

module.exports = {
    async index(request, response) {
        const moderador = request.headers.authorization

        const matches = await connection('matches')
        .where('moderador', moderador)
        .select('*')
    
        return response.json(matches)
    }
}