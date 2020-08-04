import React, { useState, useEffect} from 'react'
//import { Link } from 'react-router-dom'
import io from 'socket.io-client'

import api from '../../services/api'

import './styles.css'

export default function Login() {
    const [matches, setMatches] = useState([])
    //const { user, matches } = perfil

    const [conexao, setConexao] = useState('')

    const socket = io('http://localhost:3333')
    socket.on('connect', () => setConexao('Você está conectado'))

    const jwt = require('jsonwebtoken')
    const authConfig = require('../../auth.json')

    const decoded = jwt.verify(localStorage.getItem('jwt'), authConfig.secret)
    console.log(decoded.id_user) 

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: decoded.id_user,
            }
        }).then(response => {
            setMatches(response.data)
        })
    }, [decoded.id_user])

    

    return(
        <div>

            <div>
                <h1>{conexao}</h1>
                <ul>
                    {matches.map(match => ( 
                            <li key={match.cod_partida}>

                            <strong>Partida:</strong>
                            <p>{match.nome_partida}</p>

                            <strong>Moderador:</strong>
                            <p>{match.moderador}</p>

                            <strong>Data:</strong>
                            <p>{match.data}</p>

                            <strong>Modalidade:</strong>
                            <p>{match.modalidade}</p>

                            <strong>Modo:</strong>
                            <p>{match.modo}</p>
                            
                            </li>
                        
                    ))}
                </ul>
            </div>
        </div>
    )
    
}