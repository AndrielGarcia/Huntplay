import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import imgLogo from '../../assets/logo hunters.png'
import imgAndriel from '../../assets/foto com wendel.jpg'

export default function Login() {

    const [id_user, setIdUser] = useState('')
    const [nome, setNome] = useState('')
    const [data_nascimento, setDataNascimento] = useState('')
    const [nacionalidade, setNacionalidade] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            id_user,
            nome,
            data_nascimento,
            nacionalidade,
            email,
            password,
        }

        console.log(data)
        
        try{
           const response = await api.post('users', data)

            alert(`Seu ID de acesso: ${response.data.id_user}`)

            history.push('/')
            
        } catch(err) {
            alert(`Erro no cadastro, tente novamente`)
        }

    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={imgLogo} alt="HuntPlay"/>

                <form onSubmit={handleRegister}>
                    <h1>Cadastro</h1>

                    <input 
                    type="text"
                    placeholder="ID Usuário"
                    value={id_user}
                    onChange={e => setIdUser(e.target.value)}
                    />
                
                    <input 
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    />

                    <input 
                    type="date"
                    placeholder="Data Nascimento"
                    value={data_nascimento}
                    onChange={e => setDataNascimento(e.target.value)}
                    />

                    <input 
                    type="number"
                    placeholder="Nacionalidade"
                    value={nacionalidade}
                    onChange={e => setNacionalidade(e.target.value)}
                    />

                    <input 
                    placeholder="E-mail"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />

                    <button type="submit">Cadastrar</button>

                    <Link to="/">
                        <FiLogIn size={16}/>
                        Já tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={imgAndriel} alt="Imagem Aleatória"/>
        </div>
    )
    
}
