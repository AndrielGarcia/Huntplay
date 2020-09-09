const express = require('express')
const authMiddleware = require('./middleware/auth')

const userController = require('./controllers/userController')
const countryController = require('./controllers/countryController')
const gameController = require('./controllers/gameController')
const category_gameController = require('./controllers/category_gameController')
const matchController = require('./controllers/matchController')
const mod_gameController = require('./controllers/mod_gameController')
const profileController = require('./controllers/profileController')
const loginController = require('./controllers/loginController')
const match_messagesController = require('./controllers/match_messagesController')


const routes = express.Router()

routes.get('/countries', countryController.index)
routes.post('/countries', countryController.create)
routes.delete('/countries/:id', countryController.delete)

routes.get('/users', userController.index)
routes.post('/users', userController.create)
routes.delete('/users/:id_user', userController.delete)

routes.get('/games', gameController.index)
routes.post('/games', gameController.create)
routes.delete('/games/:id', gameController.delete)

routes.get('/categories_games', category_gameController.index)
routes.post('/categories_games', category_gameController.create)
routes.delete('/categories_games/:id', category_gameController.delete)

routes.get('/matches', matchController.index)
routes.post('/matches', authMiddleware, matchController.create)
routes.delete('/matches/:cod_partida', authMiddleware, matchController.delete)

routes.get('/profile', profileController.index)

routes.get('/mods_games', mod_gameController.index)
routes.post('/mods_games', mod_gameController.create)
routes.delete('/mods_games/:id', mod_gameController.delete)

routes.get('/match_messages/:cod_partida', match_messagesController.index)
routes.post('/match_messages', match_messagesController.create)
routes.delete('/match_messages/:cod_partida', match_messagesController.delete)

routes.post('/login', loginController.index)



module.exports = routes