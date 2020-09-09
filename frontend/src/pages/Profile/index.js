import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

export default function Login() {
    const [matches, setMatches] = useState([])   

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
                <ul>
                    {matches.map(match => ( 
                            <li key={match.cod_partida}>

                            <strong>Partida:</strong>
                            <Link to={`/match/${match.cod_partida}`}>{match.nome_partida}</Link>

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