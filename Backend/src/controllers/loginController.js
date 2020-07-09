const connection = require('../database/connection.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const authConfig = require('../auth.json')

module.exports = {

    async index(request, response) {
        const { id_user, senha } = request.body

        const user = await connection('users').select('*').where('id_user', id_user).orWhere('email', id_user)
        console.log(user)
        if (user.length < 1) {
            return response.status(401).send({ mensagem: 'Falha na Autenticação1' })
        }

        bcrypt.compare(senha, user[0].senha, function(err, result) {
            if (err) {
                return response.status(401).send({ mensagem: 'Falha na Autenticação2' })
            }
            if (result) {
                const token = jwt.sign({ 
                    id_user: user[0].id_user,
                    email: user[0].email
                },
                authConfig.secret,
                {
                    expiresIn: '1h'
                });
                return response.status(200).send({ 
                    mensagem: 'Autenticado com sucesso!!',
                    token: token
                })
            }
            return response.status(401).send({ mensagem: 'Falha na Autenticação3' })
        });
        
    },
}