import React, { useState, useEffect,} from 'react'
import io from 'socket.io-client'
//import { Link } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'
//import { param } from '../../../../Backend/src/routes'

export default function Match(props) {
    const [conexao, setConexao] = useState('')

    const cod_partida = props.match.params.cod_partida

    const socket = io('http://localhost:3666')
   
    const jwt = require('jsonwebtoken')
    const authConfig = require('../../auth.json')

    const decoded = jwt.verify(localStorage.getItem('jwt'), authConfig.secret)

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        api.get(`/match_messages/${cod_partida}`).then(response => {
            setMessages(response.data)
        })
    }, [cod_partida])

    useEffect(() => {
        socket.on('receive.message', data => {
            setMessages([...messages, data])
        })
        return () => socket.off('receive.message')
    }, [messages])
   

    async function handleFormSubmit(e) {
        e.preventDefault()
        if (message.trim()) {
            const data = {
                cod_partida: cod_partida,
                autor: decoded.id_user,
                desc_message: message,
            }
            socket.emit('send.message', data)
            const response = await api.post('/match_messages', data)
            //setMessages([...messages, response.data])

            setMessage('')
        }
    }

    return(
        <main className="container">
            <h1>{conexao}</h1>
            <ul className="list">
            {messages.map(message => ( 
        
                <li className={`list__item--${message.autor === decoded.id_user ? 'mine' : 'other'}`}
                key={message.id} 
                >
                    <span className={`message--${message.autor === decoded.id_user ? 'mine' : 'other'}`}>
                        { message.desc_message }
                    </span>
                </li>  
            
                     
            ))}
            </ul>
            <form className="form" onSubmit={handleFormSubmit}>
                <input 
                className="form__field" 
                placeholder="Digite uma mensagem..."
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                />

                <button type="submit">Enviar</button>
            </form>

        </main>
    )
    
}