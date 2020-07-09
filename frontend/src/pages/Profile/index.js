import React, { useState, useEffect} from 'react'
//import { Link } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

export default function Login() {
    const [perfil, setPerfil] = useState([])

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
            setPerfil(response.data)
        })
    }, [decoded.id_user])

    console.log(perfil)

    return(
        <div>
            <div>
                <h1>{perfil.user}</h1>
            </div>

            <div>
                <ul>
                    {perfil.matches.map(match => (
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