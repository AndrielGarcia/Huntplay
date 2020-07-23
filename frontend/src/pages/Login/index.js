import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import imgLogo from '../../assets/logo hunters.png'
import imgAndriel from '../../assets/foto com wendel.jpg'

export default function Login() {

    const [id_user, setIdUser] = useState('')
    const [senha, setSenha] = useState('')

    const history = useHistory()
    const jwt = require('jsonwebtoken')
    const authConfig = require('../../auth.json')

    async function handleLogin(e) {
        e.preventDefault()

        const data = {
            id_user,
            senha,
        }

        console.log(data)
        
        try{
           const response = await api.post('login', data)

            const decoded = jwt.verify(response.data.token, authConfig.secret)

            alert(`Bem-vindo ${decoded.id_user}`)

            localStorage.setItem('jwt', response.data.token)

            history.push('/profile')
            
        } catch(err) {
            alert(`Erro de Login`)
        }

    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={imgLogo} alt="HuntPlay"/>

                <form onSubmit={handleLogin}>
                    <h1>login</h1>

                    <input 
                    type="Text"
                    placeholder="ID Usuário"
                    value={id_user}
                    onChange={e => setIdUser(e.target.value)}
                    />
                    <input 
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    />
                    <button type="submit">Entrar</button>

                    <Link to="/register">
                        <FiLogIn size={16}/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
    

            <img src={imgAndriel} alt="Imagem Aleatória"/>
        </div>
    )
    
}