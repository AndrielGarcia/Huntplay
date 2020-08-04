const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const http = require('http')
const socket = require('socket.io')

const app = express()

const server = http.createServer(app)
const io = socket(server)

io.on('connection', (socket) => {
    console.log('new connection', socket.id)
    socket.on('chat.message', (data) => {
        console.log('mensagem recebida', data)
    })
    socket.on('disconnect', () => {
        console.log('desconnction')
    })
})
app.use(cors())
app.use(express.json())
app.use(routes)


server.listen(3333)