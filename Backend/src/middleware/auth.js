const jwt = require('jsonwebtoken')
const authConfig = require('../auth.json')

module.exports = (req, res, next) => {
        
        const authHeader = req.headers.authorization

        if (!authHeader)
            return res.status(401).send({ erro: 'token não informado' })
        
        const parts = authHeader.split(' ')

        if (!parts.lenght === 2)
            return res.status(401).send({ erro: 'erro de token' })

        const [ scheme, token ] = parts

        if (!/^Bearer$/i.test(scheme))
            return res.status(401).send({ erro: 'erro de token' })

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) return res.status(401).send({ erro: 'token inválido' })
        
            req.id_user = decoded.id_user
            return next()
        })
   

}