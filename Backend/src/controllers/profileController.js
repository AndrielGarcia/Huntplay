const connection = require('../database/connection.js')

module.exports = {
    async index(request, response) {
        const id_user = request.headers.authorization

        const user = await connection('users')
        .where('id_user', id_user).select(
            'nome'
        ).first()

        const matches = await connection('matches')
        .where('moderador', id_user)
        .select('*')

        const data = {
            user,
            matches,
        }
    
        return response.json(data)
    }
}