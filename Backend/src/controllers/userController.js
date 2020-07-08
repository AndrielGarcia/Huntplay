const connection = require('../database/connection.js')
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*')
    
        return response.json(users)
    },

    async create(request, response) {
        const { id_user, nome, data_nascimento, nacionalidade, email, password } = request.body

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
            
                const senha = hash
                await connection('users').insert({
                    id_user,
                    nome,
                    data_nascimento,
                    nacionalidade,
                    email,
                    senha,
                })
            })
        })

        return response.json({ id_user })
    },

    async delete(request, response) {
        const { id_user } = request.params
        console.log(id_user)
        await connection('users').where('id_user', id_user).del()
        return response.status(204).send()
    }
}